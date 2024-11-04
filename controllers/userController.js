const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createUser = (req, res) => {
  const userData = req.body;
  userData.usuario_criacao = req.userId;
  userData.data_criacao = new Date();
  userData.senha = bcrypt.hashSync(userData.senha, 8);
  User.create(userData, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Erro ao criar usuário', err });
    } else {
      res.status(201).send({ message: 'Usuário criado com sucesso', id: result.insertId });
    }
  });
};

exports.login = (req, res) => {
    const { cpf, senha } = req.body;
    console.log(req.body);
  
    User.findByCpf(cpf, (err, results) => {
      if (err || results.length === 0) {
        return res.status(404).send({ message: 'Usuário não encontrado' });
      }
  
      const user = results[0];
      const passwordIsValid = bcrypt.compareSync(senha, user.senha);
  
      if (!passwordIsValid) {
        return res.status(401).send({ token: null, message: "Senha Inválida" });
      }
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400
      });
  
      res.status(200).send({ token });
    });
};

exports.listUsers = (req, res) => {
    User.all((err, results) => {
      if (err) {
        res.status(500).send({ message: 'Erro ao buscar usuários', err });
      } else {
        res.status(200).send(results);
      }
    });
  };

exports.getUser= (req, res) => {
    const userCPF = req.params.cpf;
    User.findByCpf(userCPF, (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao buscar usuário', err });
        } else if (!result) {
            res.status(404).send({ message: 'Usuário não encontrado' });
        } else {
            res.status(200).send(result);
        }
    });
};

exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  updatedData.usuario_atualizacao = req.userId;
  updatedData.data_atualizacao = new Date();
  
  if (updatedData.senha) {
      updatedData.senha = bcrypt.hashSync(updatedData.senha, 8);
  }

  User.updateUser(userId, updatedData, (err, result) => {
      if (err) {
          res.status(500).send({ message: 'Erro ao atualizar usuário', err });
      } else if (result.affectedRows === 0) {
          res.status(404).send({ message: 'Usuário não encontrado' });
      } else {
          res.status(200).send({ message: 'Usuário atualizado com sucesso' });
      }
  });
};
exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  const userData = {
    data_remocao: new Date(),
    usuario_remocao: req.userId,
    status: "Removido"
  }

  User.updateUser(userId, userData, (err, result) => {
      if (err) {
          res.status(500).send({ message: 'Erro ao remover usuário', err });
      } else if (result.affectedRows === 0) {
          res.status(404).send({ message: 'Usuário não encontrado' });
      } else {
          res.status(200).send({ message: 'Usuário removido com sucesso' });
      }
  });
};



// Adicione mais métodos para read, update e delete

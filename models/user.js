const connection = require('../config/db');

const User = {};

User.create = (userData, callback) => {
  const sql = 'INSERT INTO users SET ?';
  connection.query(sql, userData, callback);
};

User.findByCpf = (cpf, callback) => {
  const sql = 'SELECT * FROM users WHERE cpf = ?';
  connection.query(sql, [cpf], callback);
};

User.updateUser = (id, userData, callback) => {
  const sql = 'UPDATE users SET ? WHERE id = ?';
  connection.query(sql, [userData, id], (err, result) => {
      if (err) {
          return callback(err, null);
      }
      return callback(null, result);
  });
};

User.deleteUser = (id, callback) => {
  const sql = 'DELETE FROM users WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
      if (err) {
          return callback(err, null);
      }
      return callback(null, result);
  });
};

User.all = (callback) => {
  const sql = 'SELECT * FROM users WHERE status = "Ativo"';
  connection.query(sql, callback);
};

module.exports = User;

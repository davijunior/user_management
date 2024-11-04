const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const User = require('../models/user'); 
const should = chai.should();

chai.use(chaiHttp);

describe('Users API', () => {
    let createdUserId;
    let jwtoken;
    let userCPF = "12346teste5";
    // Teste para criar um usuário
    it('should create a new user', (done) => {
        const user = {
            cpf: userCPF,
            nome: "João da Silva",
            data_nascimento: "1990-01-01",
            endereco: "Rua das Flores, 123",
            senha: "minhaSenhaSegura",
            usuario_criacao: "admin"
        }

        chai.request(server)
            .post('/api/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Usuário criado com sucesso');
                res.body.should.have.property('id');
                createdUserId = res.body.id
                done();
            });
    });

    it('should receive status 500 when cpf already exists', (done) => {
        const user = {
            cpf: userCPF,
            nome: "João da Silva2",
            data_nascimento: "1990-01-02",
            endereco: "Rua das Flores, 123",
            senha: "minhaSenhaSegura",
            usuario_criacao: "admin"
        }

        chai.request(server)
            .post('/api/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });

    // Teste para login de usuário
    it('should login a user', (done) => {
        const user = {
            cpf: userCPF,
            senha: 'minhaSenhaSegura'
        };

        chai.request(server)
            .post('/api/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('token');
                jwtoken = res.body.token
                done();
            });
    });

    // Teste para listar todos os usuários
    it('should list all users', (done) => {
        chai.request(server)
            .get('/api/users')
            .set('Authorization', jwtoken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });


    // Testes para verificar a autenticação com o token
    it('/api/users should receive status 403 (without token)', (done) => {
        chai.request(server)
            .get('/api/users')
            .end((err, res) => {
                res.should.have.status(403);
                done();
            });
    });

    it('/api/users/cpf should receive status 403 (without token)', (done) => {
        chai.request(server)
            .get(`/api/users/${userCPF}`)
            .end((err, res) => {
                res.should.have.status(403);
                done();
            });
    });

    it('(put) /api/users/ should receive status 403 (without token)', (done) => {
        chai.request(server)
            .put(`/api/users/${createdUserId}`)
            .end((err, res) => {
                res.should.have.status(403);
                done();
            });
    });

    // Teste para obter um usuário específico
    it('should get a user by CPF', (done) => {

        chai.request(server)
            .get(`/api/users/${userCPF}`)
            .set('Authorization', jwtoken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.forEach(user => {
                    user.should.have.property('id').eql(createdUserId);
                });
                done();
            });
    });

    // Teste para atualizar um usuário
    it('should update a user', (done) => {
        const updatedData = {
            nome: 'Updated User'
        };

        chai.request(server)
            .put(`/api/users/${createdUserId}`)
            .set('Authorization', jwtoken)
            .send(updatedData)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').eql('Usuário atualizado com sucesso');
                done();
            });
    });

    after((done) => {
        User.deleteUser(createdUserId, (err, result) => {
            should.not.exist(err);
            result.affectedRows.should.equal(1);
            done();
        });
    });
});

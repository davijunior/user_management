<h1> User Management API </h1>

<h2> Descrição </h2>

Esta API permite gerenciar usuários, fornecendo funcionalidades como criação, autenticação, listagem, atualização e remoção de usuários.

<h2> Tecnologias Utilizadas </h2>

- Node.js
- Express
- MySQL
- JWT (JSON Web Tokens)
- Docker
- Mocha & Chai (para testes)

<h2> Pré-requisitos </h2>

- Docker
- Docker Compose

<h2> Instalação </h2>

1. Clone este repositório:
   <code>git clone https://github.com/davijunior/user_management.git
   cd user_management</code>

2. Configure o arquivo .env na raiz do projeto com as variáveis de ambiente necessárias:

    <code>PORT=3000
    DB_HOST=mysql
    DB_USER=root
    DB_PASSWORD=rootpassword
    DB_NAME=user_registration
    JWT_SECRET=sua_chave_secreta</code>
3. Suba os container (utilize o comando abaixo para que o container faça um refresh ao alterar o código)
    <code>docker-compose up --build</code>

4. A API estará disponível em http://localhost:3000

<h2> Endpoints </h2>

<h3> Criar usuário </h3>
    POST /api/users

    Payload
    {
        "cpf": "12345678901",
        "nome": "João da Silva",
        "data_nascimento": "1990-01-01",
        "endereco": "Rua das Flores, 123",
        "senha": "minhaSenhaSegura",
        "usuario_criacao": "admin"
    }

<h3> Login </h3>
    POST /api/login

    Payload
    {
        "cpf": <CPF>,
        "senha": <Senha>
    }
    O login traz como resposta o token a ser usado em outras requisiçoes

<h3> Listar Usuários </h3>
    GET /api/users

    -Header:

    Authorization: <Seu token>

<h3> Encontrar um Usuário específico </h3>
    GET /api/user/:cpf

    -Header:

    Authorization: <Seu token>


<h3> Atualizar Usuário </h3>
    PUT /api/users/:id
    -Header:

    Authorization: <Seu token>
    Payload
    {
        "cpf": "12345678901",
        "nome": "João da Silva",
        "data_nascimento": "1990-01-01",
        "endereco": "Rua das Flores, 123",
        "senha": "minhaSenhaSegura",
    }

<h3> Deletar Usuário </h3>
    DELETE /api/users/:id
    -Header:

    Authorization: <Seu token>

<h2> Executando Testes </h2>

    <code>
    docker-compose run app test
    </code>


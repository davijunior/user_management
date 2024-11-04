# User Management API

## Descrição

Esta API permite gerenciar usuários, fornecendo funcionalidades como criação, autenticação, listagem, atualização e remoção de usuários.

## Tecnologias Utilizadas

- Node.js
- Express
- MySQL
- JWT (JSON Web Tokens)
- Docker
- Mocha & Chai (para testes)

## Pré-requisitos

- Docker
- Docker Compose

## Instalação

1. Clone este repositório:
   ```sh
   git clone https://github.com/davijunior/user_management.git
   cd user_management
   ```

2. Configure o arquivo .env na raiz do projeto com as variáveis de ambiente necessárias:

    ```sh 
    PORT=3000
    DB_HOST=mysql
    DB_USER=root
    DB_PASSWORD=rootpassword
    DB_NAME=user_registration
    JWT_SECRET=sua_chave_secreta
    ```
3. Suba os container (utilize o comando abaixo para que o container faça um refresh ao alterar o código)
    ```sh
    docker-compose up --build
    ```

4. A API estará disponível em http://localhost:3000

## Endpoints

### Criar usuário
    POST /api/users

    Payload
    ´´´
    {
        "cpf": "12345678901",
        "nome": "João da Silva",
        "data_nascimento": "1990-01-01",
        "endereco": "Rua das Flores, 123",
        "senha": "minhaSenhaSegura",
        "usuario_criacao": "admin"
    }
    ´´´

### Login
    POST /api/login

    Payload
    ´´´
    {
        "cpf": <CPF>,
        "senha": <Senha>
    }
    ´´´
    O login traz como resposta o token a ser usado em outras requisiçoes

### Listar Usuários
    GET /api/users

    -Header:

    Authorization: <Seu token>

### Encontrar um Usuário específico
    GET /api/user/:cpf

    -Header:

    Authorization: <Seu token>


### Atualizar Usuário
    PUT /api/users/:id
    -Header:

    Authorization: <Seu token>
    Payload
    ´´´
    {
        "cpf": "12345678901",
        "nome": "João da Silva",
        "data_nascimento": "1990-01-01",
        "endereco": "Rua das Flores, 123",
        "senha": "minhaSenhaSegura",
    }
    ´´´

### Deletar Usuário
    DELETE /api/users/:id
    -Header:

    Authorization: <Seu token>

## Executando Testes

    ```sh
    docker-compose run app test
    ```


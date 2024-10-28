# Como Executar o Projeto

Siga os passos abaixo para configurar e executar o projeto.

## Pré-requisitos

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

## Configuração do Banco de Dados

1. Crie um banco de dados no PostgreSQL, caso ainda não tenha um.

2. No diretório raiz do projeto, crie um arquivo `.env` com a seguinte variável de ambiente, configurando a string de conexão do seu banco de dados:
    ```plaintext
    DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/YOUR_DATABASE"
    ```

## Configuração do Prisma

1. Execute o comando abaixo para replicar o schema no banco de dados:
    ```bash
    npx prisma migrate dev
    ```

## Instalação e Execução

1. Instale as dependências do projeto:
    ```bash
    npm install
    ```

2. Inicie o servidor:
    ```bash
    npm start
    ```

3. A API estará disponível em `http://localhost:3001`.

# Como Executar o Projeto

Siga os passos abaixo para configurar e executar o projeto.

## Pré-requisitos

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

## Configuração do Banco de Dados

1. Crie um banco de dados no PostgreSQL:
    ```sql
    CREATE DATABASE YOUR_DATABASE;
    ```

2. Crie a tabela `clientes`:
    ```sql
    CREATE TABLE clientes (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        telefone VARCHAR(20)
    );
    ```

## Instalação e Execução

1. Clone este repositório:

2. Navegue até o diretório do projeto:

3. Instale as dependências:
    ```bash
    npm install
    ```

4. Configure as credenciais do banco de dados no arquivo `index.js`:
    ```javascript
    const pool = new Pool({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'YOUR_PASSWORD',
        database: 'YOUR_DATABASE'
    });
    ```

5. Inicie o servidor:
    ```bash
    npm start
    ```

6. A API estará disponível em `http://localhost:3001`.

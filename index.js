const express = require('express')
const pg = require('pg')

const app = express()
const { Pool } = pg

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'YOUR_PASSWORD',
    database: 'YOUR_DATABASE'
})

app.use(express.json())

// Rota para listar todos os clientes (GET)
app.get('/clientes', async (request, response) => {
    try {
        const clientes = await pool.query('SELECT * FROM clientes');
        return response.status(200).json(clientes.rows);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
});

// Rota para buscar um cliente por ID (GET)
app.get('/clientes/:id', async (request, response) => {
    const { id } = request.params;
    try {
        const cliente = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
        if (cliente.rows.length === 0) {
            return response.status(404).json({ message: 'Cliente não encontrado' });
        }
        return response.status(200).json(cliente.rows[0]);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
});

// Rota para criar um novo cliente (POST)
app.post('/clientes', async (request, response) => {
    const { nome, email, telefone } = request.body;
    try {
        const novoCliente = await pool.query(
            'INSERT INTO clientes (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *',
            [nome, email, telefone]
        );
        return response.status(201).json(novoCliente.rows[0]);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
});

// Rota para atualizar um cliente existente (PUT)
app.put('/clientes/:id', async (request, response) => {
    const { id } = request.params;
    const { nome, email, telefone } = request.body;
    try {
        const clienteAtualizado = await pool.query(
            'UPDATE clientes SET nome = $1, email = $2, telefone = $3 WHERE id = $4 RETURNING *',
            [nome, email, telefone, id]
        );
        if (clienteAtualizado.rows.length === 0) {
            return response.status(404).json({ message: 'Cliente não encontrado' });
        }
        return response.status(200).json(clienteAtualizado.rows[0]);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
});

// Rota para excluir um cliente (DELETE)
app.delete('/clientes/:id', async (request, response) => {
    const { id } = request.params;
    try {
        const clienteDeletado = await pool.query('DELETE FROM clientes WHERE id = $1 RETURNING *', [id]);
        if (clienteDeletado.rows.length === 0) {
            return response.status(404).json({ message: 'Cliente não encontrado' });
        }
        return response.status(200).json({ message: 'Cliente excluído com sucesso' });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
});

app.listen(3001, () => {
    console.log('Running server')
})
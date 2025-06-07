const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Configura o pool usando a variável de ambiente DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Servidor rodando! Hora do banco: ${result.rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no banco de dados');
  }
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
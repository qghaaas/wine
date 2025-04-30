const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const PORT = process.env.PORT || 3010;

const app = express();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1234',
    port: 5432,
});

app.use(cors());
app.use(express.json()); 

app.get('/api/wines', async (req, res) => {
  try {
      const { rows } = await pool.query('SELECT * FROM wine_assortment');
      res.json(rows);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Получение конкретного вина по ID
app.get('/api/wines/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const { rows } = await pool.query('SELECT * FROM wine_assortment WHERE id = $1', [id]);
      if (rows.length === 0) {
          return res.status(404).json({ error: 'Wine not found' });
      }
      res.json(rows[0]);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
    console.log(`Server starting on port ${PORT}`);
});
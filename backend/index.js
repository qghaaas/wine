const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 3010;

const app = express();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1234',
    port: 5432,
    options: '-c search_path=wine'
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

app.get('/api/wines/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM wine_assortment WHERE id = $1', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Wine not found' });
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.json(rows[0]);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/whiskey', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM whiskey_assortment');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/whiskey/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM whiskey_assortment WHERE id = $1', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Wine not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/blog-cards', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM blog_card');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/blog-cards/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM blog_card WHERE id = $1', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Card not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/blogpost/:card_id', async (req, res) => {
    try {
        const { card_id } = req.params;

        const query = `
            SELECT 
                bp.main_title,
                bp.main_content,
                bp.main_image_url,
                bp.subtitle_1,
                bp.content_1,
                bp.subtitle_2,
                bp.content_2,
                bp.subtitle_3,
                bp.content_3,
                bc.title AS card_title,
                bc.subtitle AS card_subtitle
            FROM blog_post bp
            JOIN blog_card bc ON bp.blog_card_id = bc.id
            WHERE bp.blog_card_id = $1
        `;

        const { rows } = await pool.query(query, [card_id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/register', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const existingUser = await pool.query('SELECT * FROM wine.user WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Email уже зарегистрирован' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO wine.user (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)',
      [first_name, last_name, email, hashedPassword]
    );

    res.status(201).json({ message: 'Пользователь зарегистрирован' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query('SELECT * FROM wine.user WHERE email = $1', [email]);
    const user = userResult.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', {
      expiresIn: '1d',
    });

    res.json({ token, user: { id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Защищенный маршрут для корзины
app.get('/api/cart', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM wine.cart WHERE user_id = $1',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.listen(PORT, () => {
    console.log(`Server starting on port ${PORT}`);
});
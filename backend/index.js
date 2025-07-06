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

app.post('/api/basket', authenticateToken, async (req, res) => {
  const { product_id, product_type } = req.body;
  try {
    const existing = await pool.query(
      `SELECT * FROM wine.basket WHERE user_id = $1 AND product_id = $2 AND product_type = $3`,
      [req.user.id, product_id, product_type]
    );

    if (existing.rows.length) {
      await pool.query(
        `UPDATE wine.basket SET quantity = quantity + 1 WHERE id = $1`,
        [existing.rows[0].id]
      );
    } else {
      await pool.query(
        `INSERT INTO wine.basket (user_id, product_id, product_type, quantity) VALUES ($1, $2, $3, 1)`,
        [req.user.id, product_id, product_type]
      );
    }

    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при добавлении в корзину' });
  }
});

app.get('/api/basket', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
        SELECT b.id, b.product_id, b.quantity, b.product_type,
             COALESCE(w.wine_name, wk.whiskey_name) AS name,
             COALESCE(w.wine_year_volume, wk.whiskey_year_volume) AS year_volume,
             COALESCE(w.price, wk.price) AS price,
             COALESCE(w.country_manufacturer, wk.country_manufacturer) AS country_manufacturer,
             COALESCE(w.wine_image_path, wk.whiskey_image_path) AS image_path,
             COALESCE(w.flag_image_path, wk.flag_image_path) AS flag_image_path
      FROM wine.basket b
      LEFT JOIN wine.wine_assortment w ON b.product_type = 'wine' AND b.product_id = w.id
      LEFT JOIN wine.whiskey_assortment wk ON b.product_type = 'whiskey' AND b.product_id = wk.id
      WHERE b.user_id = $1
    `, [req.user.id]);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении корзины' });
  }
});

app.delete('/api/basket/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM wine.basket WHERE id = $1 AND user_id = $2`, [id, req.user.id]);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при удалении товара' });
  }
});

app.patch('/api/basket/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { change } = req.body;

  try {
    await pool.query(`
      UPDATE wine.basket
      SET quantity = GREATEST(quantity + $1, 1)
      WHERE id = $2 AND user_id = $3
    `, [change, id, req.user.id]);

    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при изменении количества' });
  }
});

app.put('/api/basket/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    if (quantity < 1) {
      return res.status(400).json({ error: 'Минимум 1 единица товара' });
    }

    await pool.query(
      `UPDATE wine.basket SET quantity = $1 WHERE id = $2 AND user_id = $3`,
      [quantity, id, req.user.id]
    );

    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при установке количества' });
  }
});

app.get('/api/wines/search', async (req, res) => {
  try {
    const { q } = req.query;
    const searchQuery = `%${q}%`;

    const { rows } = await pool.query(`
      SELECT id, wine_name, wine_image_path 
      FROM wine_assortment 
      WHERE LOWER(wine_name) LIKE LOWER($1) 
        OR LOWER(color) LIKE LOWER($1) 
        OR LOWER(sweetness) LIKE LOWER($1) 
        OR LOWER(region) LIKE LOWER($1)
        OR LOWER(country_manufacturer) LIKE LOWER($1)
        OR LOWER(grape_varieties) LIKE LOWER($1)
    `, [searchQuery]);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Search failed' });
  }
});

app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ role: 'admin' }, 'your_jwt_secret', {
      expiresIn: '1d',
    });
    return res.json({ token });
  }

  res.status(401).json({ message: 'Неверные учетные данные' });
});

app.get('/api/admin/users', authenticateToken, async (req, res) => {
  try {
    const users = await pool.query('SELECT id, first_name, last_name, email FROM wine.user');
    res.json(users.rows);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.post('/api/admin/wines', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const {
      wine_name,
      wine_year_volume,
      price,
      country_manufacturer,
      region,
      color,
      sweetness,
      classification,
      grape_varieties,
      alcohol_content,
      sugar_content,
      importer,
      rating,
      color_taste_aroma,
      legend,
      vinification,
      wine_image_path,
      flag_image_path
    } = req.body;

    const { rows } = await pool.query(
      `INSERT INTO wine_assortment (
        wine_name, wine_year_volume, price, country_manufacturer, region, color, sweetness,
        classification, grape_varieties, alcohol_content, sugar_content, importer, rating,
        color_taste_aroma, legend, vinification, wine_image_path, flag_image_path
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING *`,
      [
        wine_name,
        wine_year_volume,
        price,
        country_manufacturer,
        region,
        color,
        sweetness,
        classification,
        grape_varieties,
        alcohol_content,
        sugar_content,
        importer,
        rating,
        color_taste_aroma,
        legend,
        vinification,
        wine_image_path,
        flag_image_path
      ]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/admin/wines/:id', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const { id } = req.params;
    const {
      wine_name,
      wine_year_volume,
      price,
      country_manufacturer,
      region,
      color,
      sweetness,
      classification,
      grape_varieties,
      alcohol_content,
      sugar_content,
      importer,
      rating,
      color_taste_aroma,
      legend,
      vinification,
      wine_image_path,
      flag_image_path
    } = req.body;

    const { rows } = await pool.query(
      `UPDATE wine_assortment SET
        wine_name = $1, wine_year_volume = $2, price = $3, country_manufacturer = $4, region = $5,
        color = $6, sweetness = $7, classification = $8, grape_varieties = $9, alcohol_content = $10,
        sugar_content = $11, importer = $12, rating = $13, color_taste_aroma = $14, legend = $15,
        vinification = $16, wine_image_path = $17, flag_image_path = $18, updated_at = CURRENT_TIMESTAMP
      WHERE id = $19 RETURNING *`,
      [
        wine_name,
        wine_year_volume,
        price,
        country_manufacturer,
        region,
        color,
        sweetness,
        classification,
        grape_varieties,
        alcohol_content,
        sugar_content,
        importer,
        rating,
        color_taste_aroma,
        legend,
        vinification,
        wine_image_path,
        flag_image_path,
        id
      ]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Wine not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/admin/wines/:id', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const { id } = req.params;
    const { rows } = await pool.query('DELETE FROM wine_assortment WHERE id = $1 RETURNING *', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Wine not found' });
    }

    res.json({ message: 'Wine deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/admin/whiskey', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const {
      whiskey_name,
      whiskey_year_volume,
      price,
      country_manufacturer,
      region,
      classification,
      whiskey_image_path,
      flag_image_path
    } = req.body;

    const { rows } = await pool.query(
      `INSERT INTO whiskey_assortment (
        whiskey_name, whiskey_year_volume, price, country_manufacturer, region,
        classification, whiskey_image_path, flag_image_path
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        whiskey_name,
        whiskey_year_volume,
        price,
        country_manufacturer,
        region,
        classification,
        whiskey_image_path,
        flag_image_path
      ]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/admin/whiskey/:id', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const { id } = req.params;
    const {
      whiskey_name,
      whiskey_year_volume,
      price,
      country_manufacturer,
      region,
      classification,
      whiskey_image_path,
      flag_image_path
    } = req.body;

    const { rows } = await pool.query(
      `UPDATE whiskey_assortment SET
        whiskey_name = $1, whiskey_year_volume = $2, price = $3, country_manufacturer = $4,
        region = $5, classification = $6, whiskey_image_path = $7, flag_image_path = $8,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $9 RETURNING *`,
      [
        whiskey_name,
        whiskey_year_volume,
        price,
        country_manufacturer,
        region,
        classification,
        whiskey_image_path,
        flag_image_path,
        id
      ]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Whiskey not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/admin/whiskey/:id', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const { id } = req.params;
    const { rows } = await pool.query('DELETE FROM whiskey_assortment WHERE id = $1 RETURNING *', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Whiskey not found' });
    }

    res.json({ message: 'Whiskey deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/wine-colors', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT DISTINCT color FROM wine.wine_assortment ORDER BY color');
    res.json(rows.map(row => row.color));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/wine-sweetness-levels', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT DISTINCT sweetness FROM wine.wine_assortment ORDER BY sweetness');
    res.json(rows.map(row => row.sweetness));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`);
});
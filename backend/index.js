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

app.listen(PORT, () => {
    console.log(`Server starting on port ${PORT}`);
});
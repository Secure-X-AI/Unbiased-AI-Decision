import express from 'express';
import { getPool } from '../config/db.js';
import { requireAuth, requireRole } from '../services/auth.js';
const router = express.Router();

router.get('/content', async (req, res, next) => {
  try {
    const db = getPool();
    const [blogs] = await db.query('SELECT * FROM blogs ORDER BY updated_at DESC');
    const [news] = await db.query('SELECT * FROM news ORDER BY created_at DESC');
    const [pricing] = await db.query('SELECT * FROM pricing_plans ORDER BY price ASC');
    res.json({ success:true, data:{ blogs, news, pricing } });
  } catch(err){ next(err); }
});

router.post('/content/blogs', requireAuth, requireRole('admin','moderator'), async (req, res, next) => {
  try { const { title, body } = req.body; await getPool().query('INSERT INTO blogs (title, body, author_id) VALUES (?,?,?)', [title, body, req.user.id]); res.json({ success:true }); } catch(err){ next(err); }
});
router.put('/content/blogs/:id', requireAuth, requireRole('admin','moderator'), async (req, res, next) => {
  try { const { title, body } = req.body; await getPool().query('UPDATE blogs SET title=?, body=? WHERE id=?', [title, body, req.params.id]); res.json({ success:true }); } catch(err){ next(err); }
});
router.delete('/content/blogs/:id', requireAuth, requireRole('admin'), async (req, res, next) => {
  try { await getPool().query('DELETE FROM blogs WHERE id=?', [req.params.id]); res.json({ success:true }); } catch(err){ next(err); }
});

router.post('/content/news', requireAuth, requireRole('admin','moderator'), async (req, res, next) => {
  try { const { title, body } = req.body; await getPool().query('INSERT INTO news (title, body, author_id) VALUES (?,?,?)', [title, body, req.user.id]); res.json({ success:true }); } catch(err){ next(err); }
});
router.put('/content/news/:id', requireAuth, requireRole('admin','moderator'), async (req, res, next) => {
  try { const { title, body } = req.body; await getPool().query('UPDATE news SET title=?, body=? WHERE id=?', [title, body, req.params.id]); res.json({ success:true }); } catch(err){ next(err); }
});
router.delete('/content/news/:id', requireAuth, requireRole('admin'), async (req, res, next) => {
  try { await getPool().query('DELETE FROM news WHERE id=?', [req.params.id]); res.json({ success:true }); } catch(err){ next(err); }
});

router.put('/content/pricing/:id', requireAuth, requireRole('admin'), async (req, res, next) => {
  try { const { name, price, features } = req.body; await getPool().query('UPDATE pricing_plans SET name=?, price=?, features=? WHERE id=?', [name, price, features, req.params.id]); res.json({ success:true }); } catch(err){ next(err); }
});

export default router;

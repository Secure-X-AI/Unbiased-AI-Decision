import express from 'express';
import { getPool } from '../config/db.js';
import { hashPassword, verifyPassword, makeToken, requireAuth, requireRole } from '../services/auth.js';

const router = express.Router();

router.post('/auth/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ success:false, message:'Username, email and password are required.' });
    if (password.length < 4) return res.status(400).json({ success:false, message:'Password must be at least 4 characters.' });
    const db = getPool();
    const [existing] = await db.query('SELECT id FROM users WHERE username=? OR email=?', [username, email]);
    if (existing.length) return res.status(409).json({ success:false, message:'Username or email already exists.' });
    await db.query('INSERT INTO users (username,email,password_hash,role,status) VALUES (?,?,?,?,?)', [username, email, hashPassword(password), 'user', 'active']);
    res.json({ success:true, message:'User registered. Please login.' });
  } catch (err) { next(err); }
});

router.post('/auth/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const db = getPool();
    const [rows] = await db.query('SELECT * FROM users WHERE username=? OR email=? LIMIT 1', [username, username]);
    if (!rows.length || !verifyPassword(password, rows[0].password_hash)) return res.status(401).json({ success:false, message:'Invalid username or password.' });
    if (rows[0].status !== 'active') return res.status(403).json({ success:false, message:'Account is not active.' });
    const token = makeToken();
    await db.query('INSERT INTO auth_tokens (user_id, token, expires_at) VALUES (?,?, DATE_ADD(NOW(), INTERVAL 7 DAY))', [rows[0].id, token]);
    res.json({ success:true, token, user:{ id: rows[0].id, username: rows[0].username, email: rows[0].email, role: rows[0].role } });
  } catch (err) { next(err); }
});

router.post('/auth/logout', requireAuth, async (req, res, next) => {
  try { await getPool().query('DELETE FROM auth_tokens WHERE token=?', [req.token]); res.json({ success:true }); } catch(err){ next(err); }
});

router.get('/auth/me', requireAuth, (req, res) => res.json({ success:true, user:req.user }));

router.get('/admin/users', requireAuth, requireRole('admin'), async (req, res, next) => {
  try { const [rows] = await getPool().query('SELECT id, username, email, role, status, created_at FROM users ORDER BY created_at DESC'); res.json({ success:true, data:rows }); } catch(err){ next(err); }
});

router.post('/admin/users', requireAuth, requireRole('admin'), async (req, res, next) => {
  try {
    const { username, email, password, role='moderator' } = req.body;
    if (!['admin','moderator','user'].includes(role)) return res.status(400).json({ success:false, message:'Invalid role.' });
    await getPool().query('INSERT INTO users (username,email,password_hash,role,status) VALUES (?,?,?,?,?)', [username, email, hashPassword(password), role, 'active']);
    res.json({ success:true, message:`${role} created.` });
  } catch(err){ next(err); }
});

router.patch('/admin/users/:id', requireAuth, requireRole('admin'), async (req, res, next) => {
  try {
    const { role, status, password } = req.body;
    const fields=[]; const values=[];
    if (role && ['admin','moderator','user'].includes(role)) { fields.push('role=?'); values.push(role); }
    if (status && ['active','blocked'].includes(status)) { fields.push('status=?'); values.push(status); }
    if (password) { fields.push('password_hash=?'); values.push(hashPassword(password)); }
    if (!fields.length) return res.status(400).json({ success:false, message:'Nothing to update.' });
    values.push(req.params.id);
    await getPool().query(`UPDATE users SET ${fields.join(', ')} WHERE id=?`, values);
    res.json({ success:true });
  } catch(err){ next(err); }
});

export default router;

import crypto from 'crypto';
import { getPool } from '../config/db.js';

export function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password, stored) {
  if (!stored || !stored.includes(':')) return false;
  const [salt, hash] = stored.split(':');
  return hashPassword(password, salt).split(':')[1] === hash;
}

export function makeToken() {
  return crypto.randomBytes(32).toString('hex');
}

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ success: false, message: 'Login required.' });
    const db = getPool();
    const [rows] = await db.query(
      `SELECT u.id, u.username, u.email, u.role, u.status
       FROM auth_tokens t JOIN users u ON u.id=t.user_id
       WHERE t.token=? AND t.expires_at > NOW() AND u.status='active'`,
      [token]
    );
    if (!rows.length) return res.status(403).json({ success: false, message: 'Forbidden. Invalid or expired login.' });
    req.user = rows[0];
    req.token = token;
    next();
  } catch (err) { next(err); }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden. Your account does not have permission for this action.' });
    }
    next();
  };
}

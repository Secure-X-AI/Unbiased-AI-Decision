import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { hashPassword } from '../services/auth.js';

dotenv.config();
let pool = null;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'unbiased_ai_decision',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  return pool;
}

export async function initDatabase() {
  if (process.env.DB_DISABLED === 'true') return false;
  try {
    const db = getPool();
    await db.query(`CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(80) NOT NULL UNIQUE,
      email VARCHAR(160) NOT NULL UNIQUE,
      password_hash VARCHAR(200) NOT NULL,
      role ENUM('admin','moderator','user') NOT NULL DEFAULT 'user',
      status ENUM('active','blocked') NOT NULL DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

    await db.query(`CREATE TABLE IF NOT EXISTS auth_tokens (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      token VARCHAR(128) NOT NULL UNIQUE,
      expires_at DATETIME NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

    await db.query(`CREATE TABLE IF NOT EXISTS analyses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NULL,
      input_text LONGTEXT NOT NULL,
      bias_detected BOOLEAN NOT NULL,
      severity_score INT NOT NULL,
      categories JSON NULL,
      explanation LONGTEXT NOT NULL,
      rewritten_text LONGTEXT NOT NULL,
      provider VARCHAR(50) DEFAULT 'local',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

    await db.query(`CREATE TABLE IF NOT EXISTS blogs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(220) NOT NULL,
      body LONGTEXT NOT NULL,
      author_id INT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

    await db.query(`CREATE TABLE IF NOT EXISTS news (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(220) NOT NULL,
      body LONGTEXT NOT NULL,
      author_id INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

    await db.query(`CREATE TABLE IF NOT EXISTS pricing_plans (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      price DECIMAL(10,2) NOT NULL DEFAULT 0,
      features TEXT NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

    const [admins] = await db.query(`SELECT id FROM users WHERE username='admin'`);
    if (!admins.length) {
      await db.query('INSERT INTO users (username,email,password_hash,role,status) VALUES (?,?,?,?,?)', ['admin','admin@local.test', hashPassword('admin'), 'admin', 'active']);
    }
    const [plans] = await db.query('SELECT id FROM pricing_plans LIMIT 1');
    if (!plans.length) {
      await db.query('INSERT INTO pricing_plans (name, price, features) VALUES ?',[ [
        ['Free',0,'10 analyses/day\nBasic bias score\nPDF report download'],
        ['Pro',499,'Unlimited analyses\nShareable reports\nHistory dashboard'],
        ['Enterprise',4999,'Admin controls\nModerator workflow\nPriority AI model fallback']
      ]]);
    }
    const [blogs] = await db.query('SELECT id FROM blogs LIMIT 1');
    if (!blogs.length) {
      await db.query('INSERT INTO blogs (title, body) VALUES (?,?)', ['About Unbiased AI Decision', 'This platform helps teams inspect high-stakes decision text for hidden bias, explain risk, and rewrite content in a fairer way.']);
    }
    const [news] = await db.query('SELECT id FROM news LIMIT 1');
    if (!news.length) {
      await db.query('INSERT INTO news (title, body) VALUES (?,?)', ['Platform launched locally', 'Role-based login, database storage, report download, sharing, and content management are enabled.']);
    }
    return true;
  } catch (error) {
    console.warn('Database not connected:', error.message);
    return false;
  }
}

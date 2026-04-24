CREATE DATABASE IF NOT EXISTS unbiased_ai_decision
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE unbiased_ai_decision;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(80) NOT NULL UNIQUE,
  email VARCHAR(160) NOT NULL UNIQUE,
  password_hash VARCHAR(200) NOT NULL,
  role ENUM('admin','moderator','user') NOT NULL DEFAULT 'user',
  status ENUM('active','blocked') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS auth_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token VARCHAR(128) NOT NULL UNIQUE,
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS analyses (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS blogs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(220) NOT NULL,
  body LONGTEXT NOT NULL,
  author_id INT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(220) NOT NULL,
  body LONGTEXT NOT NULL,
  author_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS pricing_plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  features TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO users (username, email, password_hash, role, status)
VALUES ('admin', 'admin@local.test', '0123456789abcdef0123456789abcdef:f684b1da4200f1154cce92470fd2f9d950b0e78f3d546e8cd4f3a308cb429b0b20ee8d92ff7e2ab9aedfa7efb9421fc8299ad1895268bd09dded69ab214c44d5', 'admin', 'active')
ON DUPLICATE KEY UPDATE role='admin', status='active';

INSERT INTO pricing_plans (id, name, price, features) VALUES
(1, 'Free', 0, '10 analyses/day\nBasic bias score\nPDF report download'),
(2, 'Pro', 499, 'Unlimited analyses\nShareable reports\nHistory dashboard'),
(3, 'Enterprise', 4999, 'Admin controls\nModerator workflow\nPriority AI model fallback')
ON DUPLICATE KEY UPDATE name=VALUES(name), price=VALUES(price), features=VALUES(features);

INSERT INTO blogs (id, title, body) VALUES
(1, 'About Unbiased AI Decision', 'This platform helps teams inspect high-stakes decision text for hidden bias, explain risk, and rewrite content in a fairer way.')
ON DUPLICATE KEY UPDATE title=VALUES(title), body=VALUES(body);

INSERT INTO news (id, title, body) VALUES
(1, 'Platform launched locally', 'Role-based login, database storage, report download, sharing, and content management are enabled.')
ON DUPLICATE KEY UPDATE title=VALUES(title), body=VALUES(body);

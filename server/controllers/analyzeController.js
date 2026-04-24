import { analyzeWithGemini } from '../services/geminiAnalyzer.js';
import { getPool } from '../config/db.js';

export async function analyzeText(req, res, next) {
  try {
    const { text } = req.body;
    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ success: false, message: 'Text is required.' });
    }
    if (text.length > 20000) {
      return res.status(413).json({ success: false, message: 'Text is too long. Keep it under 20,000 characters.' });
    }

    const analysis = await analyzeWithGemini(text.trim());

    let saved = false;
    if (process.env.DB_DISABLED !== 'true') {
      try {
        const db = getPool();
        await db.query(
          `INSERT INTO analyses (input_text, bias_detected, severity_score, categories, explanation, rewritten_text, provider)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [text.trim(), analysis.biasDetected, analysis.severityScore, JSON.stringify(analysis.categories), analysis.explanation, analysis.rewrittenText, analysis.provider]
        );
        saved = true;
      } catch (dbError) {
        console.warn('Could not save analysis:', dbError.message);
      }
    }

    res.json({ success: true, data: analysis, saved });
  } catch (error) {
    next(error);
  }
}

export async function getHistory(req, res, next) {
  try {
    const db = getPool();
    const [rows] = await db.query(
      `SELECT id, input_text, bias_detected, severity_score, categories, explanation, rewritten_text, provider, created_at
       FROM analyses ORDER BY created_at DESC LIMIT 50`
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
}

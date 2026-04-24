import { GoogleGenerativeAI } from '@google/generative-ai';
import { localAnalyze } from './localBiasAnalyzer.js';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function parseJson(text) {
  const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
  const first = cleaned.indexOf('{');
  const last = cleaned.lastIndexOf('}');
  if (first === -1 || last === -1) throw new Error('Gemini did not return JSON');
  return JSON.parse(cleaned.slice(first, last + 1));
}

function validateResult(data) {
  return {
    biasDetected: Boolean(data.biasDetected),
    severityScore: Math.max(0, Math.min(100, Number(data.severityScore) || 0)),
    categories: Array.isArray(data.categories) ? data.categories.map(String) : [],
    explanation: String(data.explanation || 'Analysis completed.'),
    rewrittenText: String(data.rewrittenText || '')
  };
}

export async function analyzeWithGemini(text) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return { ...localAnalyze(text), provider: 'local-no-api-key' };
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const modelName = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
  const model = genAI.getGenerativeModel({ model: modelName });

  const prompt = `You are an AI fairness evaluator for automated decision systems.
Analyze the user text for bias in hiring, loans, medical care, admission, policy, scoring, or recommendation contexts.
Check age, gender, race, culture, disability, socioeconomic, religion, tone, and proxy discrimination.
Return ONLY valid JSON. No markdown.
Schema:
{
  "biasDetected": boolean,
  "severityScore": number,
  "categories": ["Age", "Gender", "Tone"],
  "explanation": "clear explanation",
  "rewrittenText": "fair inclusive alternative"
}
Text: ${JSON.stringify(text)}`;

  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      return { ...validateResult(parseJson(responseText)), provider: modelName };
    } catch (error) {
      lastError = error;
      const msg = String(error.message || error);
      const retryable = msg.includes('503') || msg.includes('429') || msg.toLowerCase().includes('overload') || msg.toLowerCase().includes('rate');
      if (!retryable || attempt === 3) break;
      await sleep(attempt * 1200);
    }
  }

  const fallback = localAnalyze(text);
  return {
    ...fallback,
    provider: 'local-fallback',
    explanation: `${fallback.explanation} Note: Gemini was temporarily unavailable, so this result used the built-in fairness analyzer. Original error: ${String(lastError?.message || lastError).slice(0, 180)}`
  };
}

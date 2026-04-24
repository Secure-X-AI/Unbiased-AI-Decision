const patterns = [
  { category: 'Age', regex: /\b(young|fresh graduate|digital native|energetic youth|under\s*\d{2}|recent graduate)\b/gi, reason: 'Age-related wording may exclude qualified older candidates.' },
  { category: 'Gender', regex: /\b(male|female|manpower|salesman|chairman|he must|she must|housewife|girls?|boys?)\b/gi, reason: 'Gendered wording may unfairly prefer or exclude a gender.' },
  { category: 'Tone', regex: /\b(aggressive|dominant|rockstar|ninja|handle pressure|work long hours|no excuses|tough skin)\b/gi, reason: 'Tone can create unnecessary pressure or discourage qualified applicants.' },
  { category: 'Disability', regex: /\b(able-bodied|physically fit|normal person|no medical issues|healthy only)\b/gi, reason: 'Disability-related wording may exclude people who can perform the role with accommodations.' },
  { category: 'Race/Culture', regex: /\b(native english|western|local only|culture fit|foreigners|specific caste|specific religion)\b/gi, reason: 'Cultural or identity-based wording can create discriminatory screening.' },
  { category: 'Socioeconomic', regex: /\b(top-tier college|elite school|premium background|family background|rich|well connected)\b/gi, reason: 'Socioeconomic markers can unfairly filter capable people.' }
];

const replacements = [
  [/\byoung\b/gi, 'qualified'],
  [/\bfresh graduate\b/gi, 'candidate with relevant skills'],
  [/\bdigital native\b/gi, 'comfortable using digital tools'],
  [/\bmale\b|\bfemale\b/gi, ''],
  [/\bsalesman\b/gi, 'sales professional'],
  [/\bchairman\b/gi, 'chairperson'],
  [/\baggressive\b/gi, 'proactive'],
  [/\bhandle pressure\b/gi, 'manage responsibilities effectively'],
  [/\bwork long hours\b/gi, 'meet role requirements while maintaining sustainable work practices'],
  [/\bculture fit\b/gi, 'values alignment and inclusive collaboration'],
  [/\bnative english\b/gi, 'strong communication skills'],
  [/\btop-tier college\b/gi, 'relevant education or equivalent experience']
];

export function localAnalyze(text) {
  const found = [];
  const reasons = [];
  let matchCount = 0;

  for (const item of patterns) {
    const matches = text.match(item.regex);
    if (matches?.length) {
      found.push(item.category);
      reasons.push(item.reason);
      matchCount += matches.length;
    }
  }

  const uniqueCategories = [...new Set(found)];
  const severityScore = Math.min(100, uniqueCategories.length * 22 + matchCount * 8);
  let rewrittenText = text;
  for (const [regex, replacement] of replacements) {
    rewrittenText = rewrittenText.replace(regex, replacement);
  }
  rewrittenText = rewrittenText.replace(/\s{2,}/g, ' ').replace(/\s+([,.])/g, '$1').trim();

  if (!uniqueCategories.length) {
    return {
      biasDetected: false,
      severityScore: 5,
      categories: [],
      explanation: 'No clear biased or exclusionary language was detected. Still review the decision process, data source, and evaluation criteria before using it for real people.',
      rewrittenText: text.trim()
    };
  }

  return {
    biasDetected: true,
    severityScore,
    categories: uniqueCategories,
    explanation: reasons.join(' '),
    rewrittenText: rewrittenText || 'Use clear, role-related, inclusive criteria focused on skills, responsibilities, experience, and measurable requirements.'
  };
}

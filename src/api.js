export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function getToken() { return localStorage.getItem('ubai_token'); }
export function setSession(token, user) { localStorage.setItem('ubai_token', token); localStorage.setItem('ubai_user', JSON.stringify(user)); }
export function clearSession() { localStorage.removeItem('ubai_token'); localStorage.removeItem('ubai_user'); }
export function getStoredUser() { try { return JSON.parse(localStorage.getItem('ubai_user')); } catch { return null; } }

export async function api(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) throw new Error(data.message || `Request failed: ${res.status}`);
  return data;
}

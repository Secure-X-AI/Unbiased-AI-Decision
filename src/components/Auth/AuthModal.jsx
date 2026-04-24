import React, { useState } from 'react';
import { X } from 'lucide-react';
import { api, setSession } from '../../api';
import './AuthModal.css';

export default function AuthModal({ mode='login', onClose, onLogin }) {
  const [tab, setTab] = useState(mode);
  const [form, setForm] = useState({ username:'', email:'', password:'' });
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setMessage('');
    try {
      if (tab === 'register') {
        await api('/api/auth/register', { method:'POST', body: JSON.stringify(form) });
        setMessage('Registration successful. Now login.');
        setTab('login');
      } else {
        const data = await api('/api/auth/login', { method:'POST', body: JSON.stringify({ username: form.username, password: form.password }) });
        setSession(data.token, data.user);
        onLogin(data.user);
        onClose();
      }
    } catch (err) { setMessage(err.message); }
    finally { setBusy(false); }
  };

  return <div className="modal-backdrop">
    <div className="auth-modal glass">
      <button className="modal-close" onClick={onClose}><X size={20}/></button>
      <h2>{tab === 'login' ? 'Login' : 'Create User Account'}</h2>
      <p className="auth-note">Admin login: <b>admin</b> / <b>admin</b>. Moderator accounts can be created only by an admin.</p>
      <div className="auth-tabs">
        <button className={tab==='login'?'active':''} onClick={()=>setTab('login')}>Login</button>
        <button className={tab==='register'?'active':''} onClick={()=>setTab('register')}>Sign Up</button>
      </div>
      <form onSubmit={submit} className="auth-form">
        <input placeholder="Username or email" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} required />
        {tab === 'register' && <input type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />}
        <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
        {message && <div className="auth-message">{message}</div>}
        <button className="btn btn-primary w-full" disabled={busy}>{busy ? 'Please wait...' : tab === 'login' ? 'Login' : 'Sign Up'}</button>
      </form>
    </div>
  </div>
}

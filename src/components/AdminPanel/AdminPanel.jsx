import React, { useEffect, useState } from 'react';
import { api } from '../../api';
import './AdminPanel.css';

export default function AdminPanel({ user }) {
  const [content, setContent] = useState({ blogs:[], news:[], pricing:[] });
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username:'', email:'', password:'', role:'moderator' });
  const [blog, setBlog] = useState({ title:'', body:'' });
  const [news, setNews] = useState({ title:'', body:'' });
  const [msg, setMsg] = useState('');

  const canEdit = user && ['admin','moderator'].includes(user.role);
  const isAdmin = user?.role === 'admin';
  const load = async () => {
    const c = await api('/api/content'); setContent(c.data);
    if (isAdmin) { const u = await api('/api/admin/users'); setUsers(u.data); }
  };
  useEffect(()=>{ if (canEdit) load().catch(e=>setMsg(e.message)); }, [user?.role]);
  if (!canEdit) return null;

  const saveBlog = async () => { await api('/api/content/blogs',{method:'POST',body:JSON.stringify(blog)}); setBlog({title:'',body:''}); setMsg('Blog saved.'); load(); };
  const saveNews = async () => { await api('/api/content/news',{method:'POST',body:JSON.stringify(news)}); setNews({title:'',body:''}); setMsg('News saved.'); load(); };
  const createUser = async () => { await api('/api/admin/users',{method:'POST',body:JSON.stringify(newUser)}); setNewUser({ username:'', email:'', password:'', role:'moderator' }); setMsg('Account created.'); load(); };
  const updatePrice = async (p) => { await api(`/api/content/pricing/${p.id}`,{method:'PUT',body:JSON.stringify(p)}); setMsg('Pricing updated.'); load(); };

  return <section id="admin" className="admin-section">
    <div className="container">
      <h2 className="section-title">{isAdmin ? 'Admin Maintenance Panel' : 'Moderator Content Panel'}</h2>
      <p className="section-subtitle">Manage site content, news, blogs, users and pricing according to your role.</p>
      {msg && <div className="admin-msg">{msg}</div>}
      <div className="admin-grid">
        <div className="admin-card glass"><h3>Add / Edit About Blog</h3><input placeholder="Blog title" value={blog.title} onChange={e=>setBlog({...blog,title:e.target.value})}/><textarea placeholder="Blog body" value={blog.body} onChange={e=>setBlog({...blog,body:e.target.value})}/><button className="btn btn-primary" onClick={saveBlog}>Save Blog</button></div>
        <div className="admin-card glass"><h3>Add News</h3><input placeholder="News title" value={news.title} onChange={e=>setNews({...news,title:e.target.value})}/><textarea placeholder="News body" value={news.body} onChange={e=>setNews({...news,body:e.target.value})}/><button className="btn btn-primary" onClick={saveNews}>Save News</button></div>
        {isAdmin && <div className="admin-card glass"><h3>Create Admin / Moderator</h3><input placeholder="Username" value={newUser.username} onChange={e=>setNewUser({...newUser,username:e.target.value})}/><input placeholder="Email" value={newUser.email} onChange={e=>setNewUser({...newUser,email:e.target.value})}/><input placeholder="Password" value={newUser.password} onChange={e=>setNewUser({...newUser,password:e.target.value})}/><select value={newUser.role} onChange={e=>setNewUser({...newUser,role:e.target.value})}><option value="moderator">Moderator</option><option value="admin">Admin</option><option value="user">User</option></select><button className="btn btn-primary" onClick={createUser}>Create Account</button></div>}
        {isAdmin && <div className="admin-card glass wide"><h3>Pricing Manipulation</h3>{content.pricing.map((p,i)=><div className="pricing-edit" key={p.id}><input value={p.name} onChange={e=>{const a=[...content.pricing];a[i]={...p,name:e.target.value};setContent({...content,pricing:a})}}/><input type="number" value={p.price} onChange={e=>{const a=[...content.pricing];a[i]={...p,price:e.target.value};setContent({...content,pricing:a})}}/><textarea value={p.features} onChange={e=>{const a=[...content.pricing];a[i]={...p,features:e.target.value};setContent({...content,pricing:a})}}/><button className="btn btn-secondary" onClick={()=>updatePrice(p)}>Update</button></div>)}</div>}
        {isAdmin && <div className="admin-card glass wide"><h3>Users</h3><table><tbody>{users.map(u=><tr key={u.id}><td>{u.username}</td><td>{u.email}</td><td>{u.role}</td><td>{u.status}</td></tr>)}</tbody></table></div>}
      </div>
    </div>
  </section>
}

import React, { useEffect, useState } from 'react';
import { api } from '../../api';
import './About.css';
export default function About(){
  const [data,setData]=useState({blogs:[],news:[]});
  useEffect(()=>{api('/api/content').then(r=>setData(r.data)).catch(()=>{});},[]);
  return <section id="about" className="about-section"><div className="container"><h2 className="section-title">About & News</h2><p className="section-subtitle">Transparent updates, blogs and platform information.</p><div className="about-grid"><div className="about-card glass"><h3>About</h3>{data.blogs.map(b=><article key={b.id}><h4>{b.title}</h4><p>{b.body}</p></article>)}</div><div className="about-card glass"><h3>News</h3>{data.news.map(n=><article key={n.id}><h4>{n.title}</h4><p>{n.body}</p></article>)}</div></div></div></section>
}

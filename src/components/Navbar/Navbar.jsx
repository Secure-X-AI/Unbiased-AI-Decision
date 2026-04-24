import React, { useState, useEffect } from 'react';
import { Scale, Menu, X, Moon, Sun } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ toggleTheme, isDark, user, onAuth, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => { const h=()=>setIsScrolled(window.scrollY>20); window.addEventListener('scroll',h); return()=>window.removeEventListener('scroll',h); }, []);
  const close=()=>setMobileMenuOpen(false);
  const links = <>
    <a href="#features" onClick={close}>Features</a><a href="#dashboard" onClick={close}>Dashboard</a><a href="#use-cases" onClick={close}>Use Cases</a><a href="#pricing" onClick={close}>Pricing</a><a href="#about" onClick={close}>About</a>{user && ['admin','moderator'].includes(user.role) && <a href="#admin" onClick={close}>Admin</a>}
  </>;
  const actions = <>
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">{isDark ? <Sun size={20}/> : <Moon size={20}/>}</button>
    {user ? <><span className="user-pill">{user.username} ({user.role})</span><button className="btn btn-ghost" onClick={onLogout}>Logout</button></> : <><button className="btn btn-ghost" onClick={()=>onAuth('login')}>Login</button><button className="btn btn-primary" onClick={()=>onAuth('register')}>Sign Up</button></>}
  </>;
  return <nav className={`navbar ${isScrolled ? 'scrolled glass' : ''}`}><div className="container navbar-container"><a className="navbar-logo" href="#"><div className="logo-icon"><Scale size={24} color="white" /></div><span className="logo-text">Unbiased AI Decision</span></a><div className="navbar-links desktop-only">{links}</div><div className="navbar-actions desktop-only">{actions}</div><div className="mobile-toggle mobile-only"><button className="theme-toggle" onClick={toggleTheme}>{isDark ? <Sun size={20}/> : <Moon size={20}/>}</button><button onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}</button></div></div>{mobileMenuOpen && <div className="mobile-menu glass">{links}<hr className="mobile-divider" />{actions}</div>}</nav>;
};
export default Navbar;

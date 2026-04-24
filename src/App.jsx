import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import TrustBar from './components/TrustBar/TrustBar';
import Features from './components/Features/Features';
import Dashboard from './components/Dashboard/Dashboard';
import Analytics from './components/Analytics/Analytics';
import UseCases from './components/UseCases/UseCases';
import HowItWorks from './components/HowItWorks/HowItWorks';
import Testimonials from './components/Testimonials/Testimonials';
import Pricing from './components/Pricing/Pricing';
import FAQ from './components/FAQ/FAQ';
import Footer from './components/Footer/Footer';
import AuthModal from './components/Auth/AuthModal';
import AdminPanel from './components/AdminPanel/AdminPanel';
import About from './components/About/About';
import { getStoredUser, clearSession } from './api.jsx';
import './App.css';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState(getStoredUser());

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) setIsDark(true);
  }, []);

  useEffect(() => {
    if (isDark) document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
  }, [isDark]);

  const openAuth = (mode='login') => { setAuthMode(mode); setAuthOpen(true); };
  const logout = () => { clearSession(); setUser(null); };

  return (
    <div className="app-container">
      <Navbar toggleTheme={() => setIsDark(!isDark)} isDark={isDark} user={user} onAuth={openAuth} onLogout={logout} />
      <main>
        <Hero />
        <TrustBar />
        <Features />
        <Dashboard user={user} onAuth={openAuth} />
        <Analytics />
        <UseCases />
        <HowItWorks />
        <About />
        <AdminPanel user={user} />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
      {authOpen && <AuthModal mode={authMode} onClose={() => setAuthOpen(false)} onLogin={setUser} />}
    </div>
  );
}
export default App;

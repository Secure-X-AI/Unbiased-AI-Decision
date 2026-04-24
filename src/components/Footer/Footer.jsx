import React from 'react';
import { Scale } from 'lucide-react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="navbar-logo">
              <div className="logo-icon">
                <Scale size={24} color="white" />
              </div>
              <span className="logo-text">Unbiased AI Decision</span>
            </div>
            <p className="footer-desc text-muted">
              Building fairer decisions with advanced AI. Detect hidden bias, rewrite policies, and build trust at scale across your entire organization.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Twitter"><FaTwitter size={20} /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin size={20} /></a>
              <a href="#" aria-label="GitHub"><FaGithub size={20} /></a>
            </div>
          </div>

          <div className="footer-links">
            <div className="link-group">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#dashboard">Analyzer</a>
              <a href="#pricing">Pricing</a>
              <a href="#">Enterprise</a>
              <a href="#">API Documentation</a>
            </div>
            <div className="link-group">
              <h4>Use Cases</h4>
              <a href="#">HR & Recruiting</a>
              <a href="#">Financial Services</a>
              <a href="#">Education</a>
              <a href="#">Government</a>
              <a href="#">Content Moderation</a>
            </div>
            <div className="link-group">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Blog</a>
              <a href="#">Contact</a>
              <a href="#">Partners</a>
            </div>
            <div className="link-group">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Security</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="text-muted text-sm">
            &copy; {new Date().getFullYear()} Unbiased AI Decision Inc. All rights reserved. Designed for the Hackathon.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

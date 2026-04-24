import React from 'react';
import { ArrowRight, Play, ShieldCheck, Activity } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-shape shape-1"></div>
        <div className="hero-shape shape-2"></div>
      </div>
      
      <div className="container hero-container">
        {/* Left Content */}
        <div className="hero-content animate-fade-in">
          <div className="badge badge-primary hero-badge">
            <span className="pulse-dot"></span>
            Now Available: Gemini Pro Engine
          </div>
          
          <h1 className="hero-title">
            Detect Hidden Bias Before <br />
            <span className="text-primary">Decisions Are Made</span>
          </h1>
          
          <p className="hero-subtitle">
            Use AI to identify unfair patterns, rewrite inclusive decisions, and build trust at scale. Protect your organization and ensure fairness in every word.
          </p>
          
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg">
              Start Free Analysis <ArrowRight size={20} />
            </button>
            <button className="btn btn-secondary btn-lg">
              <Play size={20} className="text-primary" /> Watch Demo
            </button>
          </div>
          
          <div className="hero-social-proof">
            <p className="text-muted text-sm">Trusted by HR teams, educators, innovators</p>
            <div className="avatars">
              <div className="avatar"></div>
              <div className="avatar"></div>
              <div className="avatar"></div>
              <div className="avatar"></div>
              <span className="avatar-text">+2k users</span>
            </div>
          </div>
        </div>

        {/* Right Content - Interactive Mockup */}
        <div className="hero-mockup-wrapper animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="hero-mockup glass">
            
            <div className="mockup-header">
              <div className="mockup-dots">
                <span></span><span></span><span></span>
              </div>
              <div className="mockup-title">Analysis Overview</div>
            </div>

            <div className="mockup-body">
              <div className="mockup-input">
                <p className="mockup-label">Original Text</p>
                <div className="mockup-text-box">
                  "We are looking for a young, aggressive salesman to lead our new initiative..."
                </div>
              </div>

              <div className="mockup-animated-flow">
                <div className="flow-line"></div>
                <div className="flow-icon"><Activity size={18} className="text-primary" /></div>
                <div className="flow-line"></div>
              </div>

              <div className="mockup-results">
                <div className="result-card warning">
                  <div className="result-card-header">
                    <span className="score-value text-warning">High Risk</span>
                    <span className="score-label">Bias Score: 82/100</span>
                  </div>
                  <div className="result-tags">
                    <span className="tag warning">Age</span>
                    <span className="tag warning">Gender</span>
                  </div>
                </div>

                <div className="result-card success">
                  <div className="result-card-header">
                    <span className="score-value text-success"><ShieldCheck size={18} /> Fair Rewrite</span>
                  </div>
                  <div className="mockup-text-box success-box">
                    "We are seeking an energetic sales professional to lead our new initiative..."
                  </div>
                </div>
              </div>
            </div>

          </div>
          
          {/* Floating UI Elements */}
          <div className="floating-card float-1 glass">
            <div className="float-icon success"><ShieldCheck size={16} /></div>
            <div>
              <div className="float-title">Fairness Verified</div>
              <div className="float-sub">Real-time check</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

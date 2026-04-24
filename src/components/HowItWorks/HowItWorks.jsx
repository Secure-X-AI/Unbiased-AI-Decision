import React from 'react';
import { Upload, Cpu, CheckCircle } from 'lucide-react';
import './HowItWorks.css';

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <div className="container">
        <div className="section-header">
          <div className="badge badge-primary">Process</div>
          <h2 className="section-title">Three Steps to Fairness</h2>
          <p className="section-subtitle">Seamlessly integrate unbiased intelligence into your existing workflows without complex setup.</p>
        </div>

        <div className="timeline">
          {/* Step 1 */}
          <div className="timeline-step">
            <div className="timeline-icon-container">
              <div className="timeline-number">1</div>
              <div className="timeline-icon glass">
                <Upload size={24} className="text-primary" />
              </div>
              <div className="timeline-line"></div>
            </div>
            <div className="timeline-content animate-fade-in glass">
              <h3>Submit Text</h3>
              <p className="text-muted">Paste your text, upload a document, or use our API to send content directly from your ATS, CRM, or content management system.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="timeline-step">
            <div className="timeline-icon-container">
              <div className="timeline-number">2</div>
              <div className="timeline-icon glass">
                <Cpu size={24} className="text-warning" />
              </div>
              <div className="timeline-line"></div>
            </div>
            <div className="timeline-content animate-fade-in glass" style={{ animationDelay: '0.2s' }}>
              <h3>AI Detects Bias</h3>
              <p className="text-muted">Our specialized Gemini engine scans for implicit and explicit bias across multiple dimensions including gender, race, age, and culture.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="timeline-step">
            <div className="timeline-icon-container">
              <div className="timeline-number">3</div>
              <div className="timeline-icon glass">
                <CheckCircle size={24} className="text-success" />
              </div>
            </div>
            <div className="timeline-content animate-fade-in glass" style={{ animationDelay: '0.4s' }}>
              <h3>Get Fair Alternative</h3>
              <p className="text-muted">Instantly review highlighted issues, read the explainability report, and apply AI-generated inclusive rewrites with one click.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

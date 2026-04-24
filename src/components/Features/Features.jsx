import React from 'react';
import { Search, BarChart3, HelpCircle, PenTool, Zap, Shield } from 'lucide-react';
import './Features.css';

const featuresList = [
  {
    icon: <Search className="feature-icon" />,
    title: 'Bias Detection',
    description: 'Find gender, age, racial, cultural, and disability bias hidden deep within your organizational texts.',
  },
  {
    icon: <BarChart3 className="feature-icon text-warning" />,
    title: 'Severity Score',
    description: 'Quantify fairness risk instantly with an easy-to-understand 0-100 gauge showing exact risk levels.',
  },
  {
    icon: <HelpCircle className="feature-icon text-primary" />,
    title: 'Explainability',
    description: 'See exactly why the AI flagged certain phrases. We believe AI must explain itself to build trust.',
  },
  {
    icon: <PenTool className="feature-icon text-success" />,
    title: 'Fair Rewrite',
    description: 'Get immediate, inclusive, and professional alternative phrasing for any problematic text.',
  },
  {
    icon: <Zap className="feature-icon text-amber" />,
    title: 'Real-Time Analysis',
    description: 'Fast, sub-second AI-powered results using the latest advanced models designed for fairness.',
  },
  {
    icon: <Shield className="feature-icon text-indigo" />,
    title: 'Enterprise Ready',
    description: 'Scalable decision governance with role-based access, API integration, and audit logs.',
  }
];

const Features = () => {
  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-header">
          <div className="badge badge-primary">Platform Capabilities</div>
          <h2 className="section-title">Everything You Need for <br /> Fairer Decisions</h2>
          <p className="section-subtitle">
            A comprehensive suite of tools designed specifically for teams that care about ethical language and fair outcomes.
          </p>
        </div>

        <div className="features-grid">
          {featuresList.map((feature, index) => (
            <div key={index} className="feature-card glass">
              <div className="feature-icon-wrapper">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

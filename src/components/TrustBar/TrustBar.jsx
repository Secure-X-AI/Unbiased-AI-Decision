import React from 'react';
import './TrustBar.css';

const TrustBar = () => {
  return (
    <section className="trust-bar">
      <div className="container">
        <p className="trust-title text-muted">Trusted by leading organizations globally</p>
        <div className="trust-logos">
          {/* Logo placeholders */}
          <div className="trust-logo">Google Cloud</div>
          <div className="trust-logo">Stripe Startups</div>
          <div className="trust-logo">HR Teams</div>
          <div className="trust-logo">Universities</div>
          <div className="trust-logo">NGOs</div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;

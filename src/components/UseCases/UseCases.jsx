import React from 'react';
import { Briefcase, Building2, GraduationCap, FileText, Landmark, MessageSquare } from 'lucide-react';
import './UseCases.css';

const useCasesList = [
  {
    icon: <Briefcase className="use-case-icon text-indigo" />,
    title: 'HR & Recruitment',
    description: 'Ensure job descriptions, interview feedback, and promotion reviews are free from gender and age bias.',
  },
  {
    icon: <Building2 className="use-case-icon text-success" />,
    title: 'Banking & Loans',
    description: 'Analyze loan approval narratives to prevent redlining and socioeconomic discrimination.',
  },
  {
    icon: <GraduationCap className="use-case-icon text-primary" />,
    title: 'Education Admissions',
    description: 'Review admission committee notes to ensure fair evaluation of candidates from all backgrounds.',
  },
  {
    icon: <FileText className="use-case-icon text-warning" />,
    title: 'Corporate Policies',
    description: 'Scan employee handbooks and internal communications for inclusive and accessible language.',
  },
  {
    icon: <Landmark className="use-case-icon text-danger" />,
    title: 'Government Services',
    description: 'Audit public-facing documents and policy proposals for equitable service delivery language.',
  },
  {
    icon: <MessageSquare className="use-case-icon text-amber" />,
    title: 'AI Content Moderation',
    description: 'Act as a safety layer for generative AI outputs to catch hallucinatory or biased generated text.',
  }
];

const UseCases = () => {
  return (
    <section id="use-cases" className="use-cases">
      <div className="container">
        <div className="section-header">
          <div className="badge badge-primary">Industry Solutions</div>
          <h2 className="section-title">Built for Every High-Stakes Decision</h2>
          <p className="section-subtitle">Discover how organizations are deploying Unbiased AI to ensure fairness across critical workflows.</p>
        </div>

        <div className="use-cases-grid">
          {useCasesList.map((item, index) => (
            <div key={index} className="use-case-card glass">
              <div className="use-case-header">
                <div className="icon-wrapper">{item.icon}</div>
                <h3 className="use-case-title">{item.title}</h3>
              </div>
              <p className="use-case-desc">{item.description}</p>
              <div className="use-case-hover-effect">
                <button className="btn-ghost icon-btn">→</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import './FAQ.css';

const faqs = [
  {
    question: "How accurate is the bias detection?",
    answer: "Our engine uses advanced fine-tuned language models achieving 94% accuracy on standard bias benchmarks. We continuously train on new datasets and allow organizations to set custom strictness thresholds to match their internal policies."
  },
  {
    question: "What types of bias are checked?",
    answer: "We scan for explicit and implicit bias across gender, race, age, cultural background, disability, socioeconomic status, and language tone (e.g., overly aggressive or passive framing that may disproportionately impact certain groups)."
  },
  {
    question: "Can enterprises use this securely?",
    answer: "Yes. Our enterprise plan offers zero-data-retention policies, meaning your texts are analyzed in memory and immediately discarded. We also provide on-premise deployment, SSO integration, and SOC2 compliance."
  },
  {
    question: "Is my data private?",
    answer: "Absolutely. We do not use your analyzed text to train our base models unless you explicitly opt-in to help improve fairness benchmarks. Your data is encrypted in transit and at rest."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="faq">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Common Questions</h2>
        </div>

        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item glass ${openIndex === index ? 'open' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                <div className="faq-icon">
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

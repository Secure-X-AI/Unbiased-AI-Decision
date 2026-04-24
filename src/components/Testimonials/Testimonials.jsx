import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
  {
    quote: "Unbiased AI completely transformed our recruitment process. We discovered implicit age bias in our standard JD templates and fixed them in minutes.",
    author: "Sarah Jenkins",
    role: "VP of HR, TechFlow Innovations",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    quote: "As a university, fairness is our mandate. This platform gave us the confidence that our admissions criteria letters are equitable for all applicants.",
    author: "Dr. Marcus Chen",
    role: "Director of Admissions, State University",
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    quote: "We use it as a final sanity check for all generative AI outputs before they go live on our site. It's an indispensable safety net.",
    author: "Elena Rodriguez",
    role: "Founder, CopyScale AI",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    quote: "The ability to instantly get fair rewrites is magic. It doesn't just point out problems; it provides actionable, inclusive solutions immediately.",
    author: "David Okafor",
    role: "Head of DEI, GlobalFinance Corp",
    avatar: "https://i.pravatar.cc/150?img=8"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Trusted by Leaders</h2>
        </div>

        <div className="testimonial-slider">
          <button className="slider-btn prev" onClick={prevTestimonial}>
            <ChevronLeft size={24} />
          </button>
          
          <div className="testimonial-card glass animate-fade-in" key={currentIndex}>
            <Quote size={48} className="quote-icon" />
            <p className="testimonial-text">"{testimonials[currentIndex].quote}"</p>
            <div className="testimonial-author">
              <img src={testimonials[currentIndex].avatar} alt={testimonials[currentIndex].author} className="author-avatar" />
              <div className="author-info">
                <h4>{testimonials[currentIndex].author}</h4>
                <p className="text-muted text-sm">{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </div>

          <button className="slider-btn next" onClick={nextTestimonial}>
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="slider-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

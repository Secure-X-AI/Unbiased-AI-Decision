import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { api } from '../../api';
import './Pricing.css';

const Pricing = () => {
  const [plans, setPlans] = useState([]);
  useEffect(()=>{ api('/api/content').then(r=>setPlans(r.data.pricing || [])).catch(()=>{}); }, []);
  const fallback = [
    { id:1, name:'Free', price:0, features:'10 analyses/day\nBasic bias score\nPDF report download' },
    { id:2, name:'Pro', price:499, features:'Unlimited analyses\nShareable reports\nHistory dashboard' },
    { id:3, name:'Enterprise', price:4999, features:'Admin controls\nModerator workflow\nPriority AI model fallback' }
  ];
  const list = plans.length ? plans : fallback;
  return <section id="pricing" className="pricing"><div className="container"><div className="section-header"><div className="badge badge-primary">Transparent Pricing</div><h2 className="section-title">Plans for Teams of All Sizes</h2><p className="section-subtitle">Admin can edit these prices from the maintenance panel.</p></div><div className="pricing-grid">{list.map((plan, idx)=><div key={plan.id} className={`pricing-card glass ${idx===1?'popular':''}`}>{idx===1 && <div className="popular-badge">Most Popular</div>}<h3 className="plan-name">{plan.name}</h3><div className="plan-price"><span className="currency">₹</span>{Number(plan.price).toLocaleString('en-IN')}<span className="period">/mo</span></div><p className="plan-desc">Fairness tools for {plan.name.toLowerCase()} workflows.</p><ul className="plan-features">{String(plan.features).split('\n').map((f,i)=><li key={i}><Check size={18} className="text-primary" /> {f}</li>)}</ul><a href="#dashboard" className="btn btn-primary w-full">Choose Plan</a></div>)}</div></div></section>;
};
export default Pricing;

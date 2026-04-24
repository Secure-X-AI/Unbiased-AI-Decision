import React, { useEffect, useRef } from 'react';
import { TrendingUp, Users, Clock, AlertTriangle } from 'lucide-react';
import Chart from 'chart.js/auto';
import './Analytics.css';

const Analytics = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    
    // Gradient for the chart line
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(79, 70, 229, 0.5)'); // primary color with opacity
    gradient.addColorStop(1, 'rgba(79, 70, 229, 0.0)');

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'Platform Fairness Score',
          data: [65, 68, 75, 82, 85, 92, 96],
          borderColor: '#4F46E5',
          backgroundColor: gradient,
          borderWidth: 3,
          pointBackgroundColor: '#fff',
          pointBorderColor: '#4F46E5',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1F2937',
            padding: 12,
            titleFont: { family: 'Inter', size: 13 },
            bodyFont: { family: 'Inter', size: 14, weight: 'bold' },
            displayColors: false,
            callbacks: {
              label: (context) => `Score: ${context.parsed.y}/100`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 50,
            max: 100,
            grid: { color: 'rgba(107, 114, 128, 0.1)' },
            ticks: { font: { family: 'Inter' } }
          },
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Inter' } }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  const stats = [
    { label: 'Analyses Completed', value: '1.2M+', icon: <TrendingUp className="text-primary" /> },
    { label: 'Avg Platform Fairness', value: '92/100', icon: <Users className="text-success" /> },
    { label: 'Most Common Bias', value: 'Age-related', icon: <AlertTriangle className="text-warning" /> },
    { label: 'Avg Time Saved/Doc', value: '45 mins', icon: <Clock className="text-indigo" /> },
  ];

  return (
    <section className="analytics">
      <div className="container">
        <div className="section-header">
          <div className="badge badge-primary">Impact & Analytics</div>
          <h2 className="section-title">Measurable Outcomes</h2>
          <p className="section-subtitle">Track your organization's journey toward completely unbiased decision-making over time.</p>
        </div>

        <div className="analytics-grid">
          {/* Stat Cards */}
          <div className="stats-container">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card glass animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-info">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Chart Area */}
          <div className="chart-card glass animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="chart-header">
              <h3>Fairness Trend Over Time</h3>
              <select className="chart-select">
                <option>Last 7 Months</option>
                <option>Last 30 Days</option>
                <option>Year to Date</option>
              </select>
            </div>
            <div className="chart-wrapper">
              <canvas ref={chartRef}></canvas>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;

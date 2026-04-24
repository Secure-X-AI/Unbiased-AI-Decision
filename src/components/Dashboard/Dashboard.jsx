import React, { useState } from 'react';
import { Upload, Clipboard, Mic, Trash2, AlertCircle, CheckCircle, Download, Share2, Copy } from 'lucide-react';
import './Dashboard.css';

const Dashboard = ({ user, onAuth }) => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    setHasResults(false);
    setError(null);
    setAnalysisResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText })
      });

      const payload = await response.json();
      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Failed to analyze text.");
      }

      setAnalysisResult(payload.data);
      setHasResults(true);
    } catch (err) {
      console.error("Analysis Error:", err);
      setError(err.message || "Failed to analyze text. Please check that the backend is running.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setInputText('');
    setHasResults(false);
    setAnalysisResult(null);
    setError(null);
  };

  const handleDownloadReport = () => {
    if (!analysisResult) return;
    const report = `Unbiased AI Decision Report\n\nInput:\n${inputText}\n\nVerdict: ${analysisResult.biasDetected ? 'Bias Detected' : 'No Bias Detected'}\nRisk Score: ${analysisResult.severityScore}/100\nCategories: ${(analysisResult.categories || []).join(', ') || 'None'}\n\nExplanation:\n${analysisResult.explanation}\n\nFair Rewrite:\n${analysisResult.rewrittenText}\n\nGenerated: ${new Date().toLocaleString()}`;
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `fairness-report-${Date.now()}.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  const handleShareReport = async () => {
    if (!analysisResult) return;
    const text = `Unbiased AI Decision Report\nRisk Score: ${analysisResult.severityScore}/100\nVerdict: ${analysisResult.biasDetected ? 'Bias Detected' : 'No Bias Detected'}\nFair Rewrite: ${analysisResult.rewrittenText}`;
    if (navigator.share) await navigator.share({ title: 'Fairness Report', text });
    else { await navigator.clipboard.writeText(text); alert('Report copied to clipboard.'); }
  };

  const sampleText = "We are looking for a young, aggressive salesman to lead our new initiative. The ideal candidate will be a true digital native who can work long hours.";

  return (
    <section id="dashboard" className="dashboard-section">
      <div className="container">
        <div className="dashboard-header">
          <h2 className="section-title">Analyze Decision Text</h2>
          <p className="section-subtitle">Paste your text below to instantly detect hidden bias and generate fair alternatives.</p>
        </div>

        <div className="dashboard-grid">
          {/* Left Panel: Input Workspace */}
          <div className="dashboard-panel input-panel glass">
            <div className="panel-header">
              <h3>Input Workspace</h3>
              <div className="toolbar">
                <button className="toolbar-btn" title="Upload File"><Upload size={18} /></button>
                <button className="toolbar-btn" title="Paste Clipboard"><Clipboard size={18} /></button>
                <button className="toolbar-btn" title="Voice Input"><Mic size={18} /></button>
                <button className="toolbar-btn text-danger" onClick={handleClear} title="Clear"><Trash2 size={18} /></button>
              </div>
            </div>

            <div className="textarea-wrapper">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste hiring policy, recommendation, prompt, loan rule, admission note, or AI output..."
                className="main-textarea"
              ></textarea>
            </div>

            <div className="panel-footer">
              <span className="char-count">{inputText.length} characters</span>
              <button 
                className="btn-ghost text-sm" 
                onClick={() => setInputText(sampleText)}
              >
                Try sample text
              </button>
            </div>

            <button 
              className={`btn btn-primary w-full analyze-btn ${isAnalyzing ? 'analyzing' : ''}`}
              onClick={handleAnalyze}
              disabled={isAnalyzing || !inputText.trim()}
            >
              {isAnalyzing ? (
                <>
                  <div className="spinner"></div>
                  AI evaluating fairness...
                </>
              ) : (
                'ANALYZE FAIRNESS'
              )}
            </button>
          </div>

          {/* Right Panel: Results Workspace */}
          <div className="dashboard-panel results-panel">
            {!hasResults && !isAnalyzing && !error ? (
              <div className="empty-state glass">
                <div className="empty-icon-wrapper">
                  <AlertCircle size={32} className="text-muted" />
                </div>
                <h3>No Analysis Yet</h3>
                <p className="text-muted text-center">Submit text in the left panel to see bias scores, categories, and fair rewrites here.</p>
              </div>
            ) : null}

            {error && (
              <div className="empty-state glass" style={{ borderColor: 'var(--color-danger)' }}>
                <div className="empty-icon-wrapper" style={{ color: 'var(--color-danger)' }}>
                  <AlertCircle size={32} />
                </div>
                <h3 style={{ color: 'var(--color-danger)' }}>Analysis Failed</h3>
                <p className="text-muted text-center">{error}</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="analyzing-state glass">
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-circle"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text short"></div>
              </div>
            )}

            {hasResults && !isAnalyzing && analysisResult && (
              <div className="results-content animate-fade-in">
                
                {/* A. Verdict Card */}
                <div className={`result-block verdict-block glass ${analysisResult.biasDetected ? 'warning' : 'success'}`}>
                  <div className="verdict-header">
                    {analysisResult.biasDetected ? (
                      <AlertCircle size={24} className="text-warning" />
                    ) : (
                      <CheckCircle size={24} className="text-success" />
                    )}
                    <h3 style={!analysisResult.biasDetected ? { color: 'var(--color-success)' } : {}}>
                      {analysisResult.biasDetected ? 'Bias Detected' : 'No Bias Detected'}
                    </h3>
                  </div>
                  <div className={`badge ${analysisResult.biasDetected ? 'badge-warning' : 'badge-success'}`}>
                    {analysisResult.severityScore > 70 ? 'High Risk' : analysisResult.severityScore > 30 ? 'Medium Risk' : 'Low/No Risk'}
                  </div>
                  {analysisResult.biasDetected && (
                    <div className="confidence text-sm text-muted">Action Recommended</div>
                  )}
                </div>

                <div className="metrics-row">
                  {/* B. Circular Bias Score Meter */}
                  <div className="result-block score-block glass">
                    <h4>Risk Score</h4>
                    <div className="circular-meter">
                      <svg viewBox="0 0 36 36" className={`circular-chart ${analysisResult.biasDetected ? 'warning' : 'success'}`}>
                        <path className="circle-bg"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path className="circle"
                          strokeDasharray={`${analysisResult.severityScore}, 100`}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <text x="18" y="20.35" className="percentage">{analysisResult.severityScore}</text>
                      </svg>
                      <span className="text-muted text-sm mt-2">out of 100</span>
                    </div>
                  </div>

                  {/* C. Bias Categories */}
                  <div className="result-block categories-block glass">
                    <h4>Categories Flagged</h4>
                    <div className="category-tags">
                      {analysisResult.categories && analysisResult.categories.length > 0 ? (
                        analysisResult.categories.map((cat, idx) => (
                          <span key={idx} className="tag warning">{cat}</span>
                        ))
                      ) : (
                        <span className="text-muted text-sm">None detected</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* D. AI Explanation Card */}
                <div className="result-block explanation-block glass">
                  <h4>AI Explanation</h4>
                  <p className="text-sm">
                    {analysisResult.explanation}
                  </p>
                </div>

                {/* E. Fair Rewrite Card */}
                <div className="result-block rewrite-block success glass">
                  <div className="rewrite-header">
                    <h4><CheckCircle size={18} className="text-success" /> Fair Rewrite</h4>
                    <button 
                      className="btn-ghost icon-btn" 
                      onClick={() => navigator.clipboard.writeText(analysisResult.rewrittenText)}
                      title="Copy to clipboard"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                  <div className="rewrite-content">
                    {analysisResult.rewrittenText}
                  </div>
                </div>

                {/* F. Export Card */}
                <div className="export-actions">
                  <button className="btn btn-secondary w-full" onClick={handleDownloadReport}><Download size={18} /> Download Report</button>
                  <button className="btn btn-secondary w-full" onClick={handleShareReport}><Share2 size={18} /> Share</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

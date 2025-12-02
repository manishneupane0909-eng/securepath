import React from 'react';
import api from '../api';

const Dashboard = ({ transactions }) => {
  // Calculate stats for ATC-05 visualization
  const total = transactions.length;
  const highRisk = transactions.filter(t => t.risk_score > 80).length;
  const mediumRisk = transactions.filter(t => t.risk_score > 40 && t.risk_score <= 80).length;
  const lowRisk = transactions.filter(t => t.risk_score <= 40).length;

  const riskRate = total > 0 ? ((highRisk / total) * 100).toFixed(1) : 0;

  // Handle Export (ATC-07)
  const handleExport = () => {
    // Simulating report generation based on ATP requirements
    alert(`Generating PDF Report for ${total} transactions...\nFilename: report_20251120.pdf`);
  };

  return (
    <div>
      {/* METRICS CARDS (ATC-05) */}
      <div className="metrics-grid">
        <div className="card danger">
          <h3>High Risk Alerts</h3>
          <p className="value" style={{color: '#ef4444'}}>{highRisk}</p>
        </div>
        <div className="card warning">
          <h3>Risk Rate</h3>
          <p className="value">{riskRate}%</p>
        </div>
        <div className="card success">
          <h3>Transactions Processed</h3>
          <p className="value">{total.toLocaleString()}</p>
        </div>
      </div>

      {/* RISK HEATMAP (ATC-05) */}
      <div className="card" style={{marginBottom: '2rem'}}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <h3>Risk Distribution Heatmap</h3>
            <button onClick={handleExport} className="action-btn" style={{background:'#f3f4f6', color:'#374151'}}>
                Export Report (ATC-07)
            </button>
        </div>

        <div className="heatmap-bar">
          <div className="segment" style={{width: `${(lowRisk/total)*100}%`, background: '#10b981'}} title={`Low: ${lowRisk}`} />
          <div className="segment" style={{width: `${(mediumRisk/total)*100}%`, background: '#f59e0b'}} title={`Medium: ${mediumRisk}`} />
          <div className="segment" style={{width: `${(highRisk/total)*100}%`, background: '#ef4444'}} title={`High: ${highRisk}`} />
        </div>
        <div style={{display:'flex', gap:'1rem', marginTop:'0.5rem', fontSize:'0.8rem', color:'#6b7280'}}>
            <span>● Safe ({lowRisk})</span>
            <span>● Review ({mediumRisk})</span>
            <span>● Fraud ({highRisk})</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
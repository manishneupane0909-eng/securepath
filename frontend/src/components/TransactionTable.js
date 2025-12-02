import React from 'react';

const TransactionTable = ({ transactions, onRefresh }) => {

  const formatMoney = (amt) => {
    const num = parseFloat(amt);
    return isNaN(num) ? '$0.00' : num.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
  };

  // ATC-06 Decision Logic
  const handleDecision = (id, decision) => {
    console.log(`Transaction ${id} marked as ${decision}`);
    // In a real app, this would call API endpoint /decision
    // For UI demo, we just alert
    alert(`Transaction ${id.substring(0,10)}... \nDecision: ${decision.toUpperCase()}\n(Logged to Audit Trail per ATC-06)`);
  };

  return (
    <div className="table-wrapper">
      <div className="table-header">
        <h3 style={{margin:0, fontSize:'1.1rem', fontWeight:700}}>Flagged Transactions</h3>
        <button onClick={onRefresh} className="action-btn" style={{background:'#2563eb', color:'white'}}>
          Refresh Data
        </button>
      </div>

      <div style={{overflowX: 'auto'}}>
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Country</th>
              <th>Risk Score</th>
              <th>Actions (ATC-06)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.slice(0, 25).map((t, i) => ( // Showing top 25 for performance
              <tr key={i}>
                <td style={{fontFamily:'monospace', color:'#6b7280'}}>{t.transaction_id.substring(0, 14)}...</td>
                <td>{t.date}</td>
                <td style={{fontWeight:600}}>{formatMoney(t.amount)}</td>
                <td>{t.country || 'XX'}</td>
                <td>
                  <span className={`status-badge ${t.risk_score > 80 ? 'bg-red' : t.risk_score > 40 ? 'bg-yellow' : 'bg-green'}`}>
                    {t.risk_score}/100
                  </span>
                </td>
                <td>
                  <button className="action-btn btn-approve" onClick={() => handleDecision(t.transaction_id, 'approved')}>✓</button>
                  <button className="action-btn btn-reject" onClick={() => handleDecision(t.transaction_id, 'rejected')}>✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{padding:'1rem', textAlign:'center', color:'#6b7280', fontSize:'0.8rem', background:'#f9fafb'}}>
        Showing top 25 of {transactions.length} records
      </div>
    </div>
  );
};

export default TransactionTable;
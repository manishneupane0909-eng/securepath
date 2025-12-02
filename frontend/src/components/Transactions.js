import React from 'react';
import api from './api'; // Your API util

const TransactionTable = ({ transactions, onRefresh }) => {
  const handleDecision = async (id, decision) => {
    let reason = '';
    if (decision === 'REJECTED') {
      reason = prompt('Reason for rejection:') || 'High risk flagged';
    }

    try {
      await api.post('/decision', { transaction_id: id, decision, reason });
      onRefresh(); // Refresh to show updated status/audit
      alert(`${decision} logged to audit trail (ATC-06)`);
    } catch (error) {
      alert('Decision failed');
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk Score</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason Code (ATC-04)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Action (ATC-06)</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id} className="border-t hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{txn.transaction_id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">${txn.amount?.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                  txn.risk_score > 70 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {txn.risk_score}/100
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 max-w-xs tooltip" title={txn.reason_code}>
                {txn.reason_code || 'Low risk'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                  txn.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                  txn.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {txn.status || 'PENDING'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {txn.status === 'PENDING' && (
                  <>
                    <button
                      onClick={() => handleDecision(txn.transaction_id, 'APPROVED')}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2 text-sm font-bold"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDecision(txn.transaction_id, 'REJECTED')}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-bold"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
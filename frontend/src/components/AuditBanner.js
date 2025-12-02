import React from 'react';

const AuditBanner = ({ message, type = 'info' }) => (
  <div className={`p-4 rounded-xl mb-4 shadow-md ${
    type === 'success' ? 'bg-green-100 text-green-800 border-l-4 border-green-500' :
    type === 'error' ? 'bg-red-100 text-red-800 border-l-4 border-red-500' :
    'bg-blue-100 text-blue-800 border-l-4 border-blue-500'
  }`}>
    <p className="font-semibold">{message}</p>
    <span className="text-xs">Audit logged (ATP ATC-06 compliant)</span>
  </div>
);

export default AuditBanner;
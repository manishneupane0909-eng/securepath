import React, { useState, useEffect } from 'react';
import { FileText, Loader } from 'lucide-react';
// Assuming api.js is in the root of 'src' or at '../api' relative to this component
import api from '../api';

export default function AuditLogView() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      // NOTE: We assume the backend is sending the Authorization header correctly
      // as part of the global Axios configuration or interceptor.
      const response = await api.get('/audit-log');
      setLogs(response.data.logs || []);
    } catch (err) {
      console.error("Failed to fetch audit logs:", err);
      setError("Failed to load audit logs. Check API connection.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader className="mx-auto text-blue-600 animate-spin" size={32} />
        <p className="text-gray-500 mt-4">Loading audit records...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-12 text-red-600 font-bold">{error}</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">System Activity Log ({logs.length} records)</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.map((log, i) => (
              <tr key={i} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-600">{log.timestamp}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-800">{log.action}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{log.user || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {logs.length === 0 && <p className="text-center text-gray-500 py-8">No audit records found.</p>}
      </div>
    </div>
  );
}
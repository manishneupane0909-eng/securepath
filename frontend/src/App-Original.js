import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Upload, Droplets, AlertTriangle,
  FileText, Shield, TestTube, Menu, X, CheckCircle,
  XCircle, Clock, TrendingUp, DollarSign, Activity, Loader
} from 'lucide-react';

const API_BASE = 'http://localhost:8000/api';
const AUTH_TOKEN = 'root';

// API Helper (Used for GET/POST requests that don't involve file uploads)
const apiCall = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${AUTH_TOKEN}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    let errorData = {};
    try {
        errorData = await response.json();
    } catch (e) {
        throw new Error(`Server Error (${response.status}): Failed to parse JSON response.`);
    }
    const errorMessage = errorData.error || errorData.detail || `Server responded with status ${response.status}`;
    throw new Error(errorMessage);
  }

  return response.json();
};

// Main App Component
export default function SecurePathDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load dashboard data
  useEffect(() => {
    if (activeTab === 'dashboard') {
      loadDashboardData();
    }
  }, [activeTab]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Uses the standard apiCall helper
      const statsData = await apiCall('/dashboard/stats');
      const transData = await apiCall('/dashboard/transactions?page=1&page_size=10');
      setStats(statsData);
      setTransactions(transData.transactions || []);
    } catch (error) {
      console.error('Error loading dashboard:', error);
      // You might want to display an error to the user here
      setStats(null);
      setTransactions([]);
    }
    setLoading(false);
  };

  // Sidebar navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'blue' },
    { id: 'upload', label: 'Upload', icon: Upload, color: 'green' },
    { id: 'cleansing', label: 'Cleansing', icon: Droplets, color: 'cyan' },
    { id: 'risk-scoring', label: 'Risk Scoring', icon: AlertTriangle, color: 'orange' },
    { id: 'audit-log', label: 'Audit Log', icon: FileText, color: 'purple' },
    { id: 'reports', label: 'Report Export', icon: Shield, color: 'indigo' },
    { id: 'api-test', label: 'API Test', icon: TestTube, color: 'pink' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-slate-800 to-slate-900 text-white transition-all duration-300 flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h1 className="text-xl font-bold">SecurePath</h1>
              <p className="text-xs text-slate-400">Fraud Detection System</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-700 rounded-lg transition"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive
                    ? `bg-${item.color}-600 text-white shadow-lg`
                    : 'hover:bg-slate-700 text-slate-300'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        {sidebarOpen && (
          <div className="p-4 border-t border-slate-700 text-xs text-slate-400">
            <p>Version 1.0.0</p>
            <p>API Connected ✓</p>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {navItems.find(i => i.id === activeTab)?.label}
              </h2>
              <p className="text-sm text-gray-500">Real-time fraud detection and monitoring</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Live</span>
            </div>
          </div>
        </header>

        {/* Content Area (Padding reduced for closer alignment) */}
        <div className="p-4">
          {activeTab === 'dashboard' && <DashboardView stats={stats} transactions={transactions} loading={loading} onRefresh={loadDashboardData} />}
          {activeTab === 'upload' && <UploadView onSuccess={loadDashboardData} />}
          {activeTab === 'cleansing' && <CleansingView />}
          {activeTab === 'risk-scoring' && <RiskScoringView onComplete={loadDashboardData} />}
          {activeTab === 'audit-log' && <AuditLogView />}
          {activeTab === 'reports' && <ReportsView />}
          {activeTab === 'api-test' && <APITestView />}
        </div>
      </main>
    </div>
  );
}

// Dashboard View Component
function DashboardView({ stats, transactions, loading, onRefresh }) {
  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>;
  }

  if (!stats) {
    return <div className="text-center py-12">
      <Activity size={48} className="mx-auto text-gray-400 mb-4" />
      <p className="text-gray-500">No data available. Upload transactions to get started.</p>
    </div>;
  }

  const statCards = [
    { label: 'Total Transactions', value: stats.total_transactions, icon: Activity, color: 'blue' },
    { label: 'Pending Review', value: stats.pending_review, icon: Clock, color: 'yellow' },
    { label: 'Fraud Detected', value: stats.fraud_detected, icon: AlertTriangle, color: 'red' },
    { label: 'Total Amount', value: `$${stats.total_amount.toLocaleString()}`, icon: DollarSign, color: 'green' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid (FIX: Fluid layout to prevent overflow) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                  <Icon className={`text-${stat.color}-600`} size={24} />
                </div>
                <TrendingUp className="text-green-500" size={20} />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
          <button onClick={onRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
            Refresh
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Merchant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fraud</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((txn, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">{txn.transaction_id}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">${txn.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{txn.merchant}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      txn.status === 'approved' ? 'bg-green-100 text-green-700' :
                      txn.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {(txn.fraud_score * 100).toFixed(1)}%
                  </td>
                  <td className="px-6 py-4">
                    {txn.is_fraud ?
                      <XCircle className="text-red-500" size={20} /> :
                      <CheckCircle className="text-green-500" size={20} />
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Upload View Component
function UploadView({ onSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // FIX: Authorization header is set correctly for file upload
      const response = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${AUTH_TOKEN}`
        },
        body: formData,
      });

      // 1. Check for non-successful HTTP status codes (4xx or 5xx)
      if (!response.ok) {
        let errorData = {};
        try {
            errorData = await response.json();
        } catch (e) {
            throw new Error(`Server Error (${response.status}): Could not parse error response.`);
        }

        const errorMessage = errorData.error || errorData.detail || `Server responded with status ${response.status}`;
        throw new Error(errorMessage);
      }

      // 2. Process successful 200 response
      const data = await response.json();

      setResult({
          status: 'success',
          message: data.message,
          records_uploaded: data.rows
      });

      if (data.rows && onSuccess) {
        onSuccess(); // Refresh Dashboard
      }

    } catch (error) {
      console.error("Upload failed:", error);
      setResult({ status: 'error', message: error.message || "An unknown network error occurred." });
    }

    setUploading(false);
  };

  return (
    // FIX: Adjusted max-w for closer alignment to sidebar
    <div className="max-w-4xl">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center mb-8">
          <Upload className="mx-auto text-blue-600 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Upload Transaction File</h3>
          <p className="text-gray-500">Upload CSV file with transaction data</p>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition">
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="text-gray-600 mb-4">
              {file ? (
                <p className="font-medium">{file.name}</p>
              ) : (
                <>
                  <p className="font-medium mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm">CSV files only</p>
                </>
              )}
            </div>
          </label>
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition font-medium"
        >
          {uploading ? 'Uploading...' : 'Upload File'}
        </button>

        {result && (
          <div className={`mt-6 p-4 rounded-lg ${result.status === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <p className={`font-medium ${result.status === 'success' ? 'text-green-800' : 'text-red-800'}`}>
              {result.message}
            </p>
            {/* Displaying records_uploaded from state */}
            {result.records_uploaded && (
              <div className="mt-2 text-sm text-gray-600 space-y-1">
                <p>Records uploaded: {result.records_uploaded}</p>
                {/* Duration and other metrics here */}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Cleansing View
function CleansingView() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <Droplets className="text-cyan-600 mb-4" size={48} />
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Data Cleansing</h3>
      <p className="text-gray-600 mb-6">Automatic data cleansing is applied during upload:</p>
      <ul className="space-y-2 text-gray-600">
        <li>✓ Duplicate detection and removal</li>
        <li>✓ Missing value imputation</li>
        <li>✓ Column name normalization</li>
        <li>✓ Data type validation</li>
      </ul>
    </div>
  );
}

// Risk Scoring View (UPDATED: Added spinning loader animation)
function RiskScoringView({ onComplete }) {
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);

  const runFraudDetection = async () => {
    setRunning(true);
    setResult(null);

    try {
      // Uses the standard apiCall helper
      const data = await apiCall('/detect-fraud', { method: 'POST' });
      setResult(data);
      if (onComplete) onComplete();
    } catch (error) {
      setResult({ status: 'error', message: error.message });
    }

    setRunning(false);
  };

  return (
    // FIX: Adjusted max-w for closer alignment to sidebar
    <div className="max-w-4xl">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <AlertTriangle className="mx-auto text-orange-600 mb-4" size={48} />
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Fraud Risk Scoring</h3>
        <p className="text-gray-600 mb-6 text-center">Run ML-based fraud detection on pending transactions</p>

        <button
          onClick={runFraudDetection}
          disabled={running}
          className="w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition font-medium flex items-center justify-center gap-2"
        >
          {running ? (
            <>
              <Loader className="animate-spin" size={20} />
              Running Detection...
            </>
          ) : (
            'Run Fraud Detection'
          )}
        </button>

        {result && (
          <div className={`mt-6 p-4 rounded-lg ${result.status === 'success' ? 'bg-green-50' : 'bg-red-50'}`}>
            <p className="font-medium">{result.message}</p>
            {result.transactions_processed && (
              <div className="mt-2 text-sm space-y-1">
                <p>Transactions processed: {result.transactions_processed}</p>
                <p>Fraud detected: {result.fraud_detected}</p>
                <p>Duration: {result.duration_seconds}s</p>
              </div>
            )}
          </div>
        )}

        {/* Cool animation placeholder for processing */}
        {running && (
            <div className="mt-6 p-4 bg-orange-50 border-2 border-orange-200 rounded-lg text-center text-orange-800 font-medium">
                Analyzing transactions... This may take a moment.
            </div>
        )}
      </div>
    </div>
  );
}

// Audit Log View (Dynamic fetching logic)
function AuditLogView() {
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
      const response = await apiCall('/audit-log?page=1&page_size=20');
      setLogs(response.logs || []);
    } catch (err) {
      console.error("Failed to fetch audit logs:", err);
      setError(err.message || "Failed to load audit logs. Check API connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">System Activity Log ({logs.length} records)</h3>
        <button onClick={fetchLogs} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm">
            {loading ? 'Refreshing...' : 'Refresh Log'}
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      )}

      {error && (
        <div className="p-6 text-center text-red-600 font-medium">
          Error: {error}
        </div>
      )}

      {!loading && !error && logs.length > 0 && (
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
                  <td className="px-6 py-4 text-sm text-gray-600">{log.user || 'SYSTEM'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && logs.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          <FileText className="mx-auto text-gray-400 mb-2" size={32} />
          <p>No audit records found. Upload a file to generate the first log entry.</p>
        </div>
      )}
    </div>
  );
}

// Reports View (UPDATED: Added spinning loader animation)
function ReportsView() {
  const [downloading, setDownloading] = useState(null); // Tracks 'csv' or 'pdf'

  const downloadReport = async (type) => {
    // Set the state to show loading animation
    setDownloading(type);

    // Simulate API/Browser delay before opening the new window
    await new Promise(resolve => setTimeout(resolve, 500));

    const url = `${API_BASE}/export/${type}`;
    // Token is passed via query string for browser download (Fix applied earlier)
    window.open(url + `?token=${AUTH_TOKEN}`, '_blank');

    // Clear the loading state after the download window is opened
    setTimeout(() => setDownloading(null), 2000);
  };

  return (
    // FIX: Adjusted max-w for closer alignment to sidebar
    <div className="max-w-4xl">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <Shield className="text-indigo-600 mb-4 mx-auto" size={48} />
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Export Reports</h3>
        <p className="text-center text-gray-600 mb-6">Generate and download comprehensive transaction reports.</p>

        <div className="space-y-4">
          <button
            onClick={() => downloadReport('csv')}
            disabled={downloading !== null}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 transition font-medium flex items-center justify-center gap-2"
          >
            {downloading === 'csv' ? (
                <>
                    <Loader className="animate-spin" size={20} />
                    Generating CSV...
                </>
            ) : (
                'Download CSV Report'
            )}
          </button>

          <button
            onClick={() => downloadReport('pdf')}
            disabled={downloading !== null}
            className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 transition font-medium flex items-center justify-center gap-2"
          >
            {downloading === 'pdf' ? (
                <>
                    <Loader className="animate-spin" size={20} />
                    Generating PDF...
                </>
            ) : (
                'Download PDF Report'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// API Test View
function APITestView() {
  const [endpoint, setEndpoint] = useState('/status');
  const [method, setMethod] = useState('GET');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    setResponse(null);

    try {
      const options = method === 'POST' ? { method: 'POST' } : {};
      // Use the helper for testing
      const data = await apiCall(endpoint, options);
      setResponse({ success: true, data });
    } catch (error) {
      setResponse({ success: false, error: error.message });
    }
    setLoading(false);
  };

  return (
    // FIX: Adjusted max-w for closer alignment to sidebar
    <div className="max-w-4xl">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <TestTube className="text-pink-600 mb-4 mx-auto" size={48} />
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">API Testing</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Endpoint</label>
            <input
              type="text"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="/status"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </select>
          </div>

          <button
            onClick={testAPI}
            disabled={loading}
            className="w-full py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:bg-gray-300 transition font-medium"
          >
            {loading ? 'Testing...' : 'Test API'}
          </button>

          {response && (
            <div className="mt-4">
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto text-sm">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';

// FIXED: Added '../' to go up one folder to find api.js
import api from '../api';

const CsvUpload = ({ onSuccess }) => {
  const [status, setStatus] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setStatus({ type: 'loading', message: 'Uploading & Analyzing...' });

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Step 1: Upload the file
      const uploadRes = await api.post('/upload', formData);

      if (uploadRes.status === 200) {
        // Step 2: Trigger the fraud detection engine
        await api.post('/detect-fraud');

        setStatus({
          type: 'success',
          message: `Success! Processed ${uploadRes.data.records_uploaded} transactions.`
        });

        // Notify App.js to refresh the dashboard
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error("Upload error:", error);
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Upload failed. Please check your CSV format.'
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg border-2 border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Upload Transaction Data (CSV)</h2>

      <div className="flex flex-col items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">CSV Files only</p>
            </div>
            <input type="file" accept=".csv" className="hidden" onChange={handleUpload} />
        </label>
      </div>

      {status && (
        <div className={`mt-6 p-4 rounded-xl text-center font-bold text-lg transition-all duration-500 ${
          status.type === 'success' ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-500 shadow-md' :
          status.type === 'error' ? 'bg-red-100 text-red-800 border-2 border-red-500' :
          'bg-blue-100 text-blue-800 animate-pulse'
        }`}>
          {status.message}
        </div>
      )}
    </div>
  );
};

export default CsvUpload;
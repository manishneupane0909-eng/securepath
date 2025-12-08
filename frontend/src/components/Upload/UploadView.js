import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Database, Shield } from 'lucide-react';
import apiService from '../../services/api';
import PlaidLink from '../PlaidLink';

export default function UploadView({ onSuccess }) {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState(null);

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setResult(null);

        try {
            const data = await apiService.uploadFile(file);

            setResult({
                status: 'success',
                message: data.message,
                records_uploaded: data.rows
            });

            if (data.rows && onSuccess) {
                onSuccess();
            }
        } catch (error) {
            console.error('Upload failed:', error);
            setResult({
                status: 'error',
                message: error.message || 'An unknown network error occurred.'
            });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
                <h3 className="text-3xl font-bold text-white mb-2 tracking-wide">DATA INGESTION</h3>
                <p className="text-cyber-text-secondary">Select a data source to begin analysis</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-panel p-6 relative overflow-hidden group hover:border-cyber-primary/50 transition-all duration-300 flex flex-col">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Database size={100} />
                    </div>

                    <div className="relative z-10 flex flex-col flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-cyber-primary/10 rounded-lg border border-cyber-primary/30">
                                <Upload className="text-cyber-primary" size={24} />
                            </div>
                            <h4 className="text-xl font-bold text-white">MANUAL UPLOAD</h4>
                        </div>

                        <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-cyber-primary/50 hover:bg-white/5 transition-all duration-300 relative mb-4 flex-1 flex items-center justify-center min-h-[120px]">
                            <input
                                type="file"
                                accept=".csv"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="hidden"
                                id="file-upload"
                            />
                            <label htmlFor="file-upload" className="cursor-pointer block w-full h-full">
                                <div className="text-cyber-text-muted group-hover:text-cyber-primary transition-colors">
                                    {file ? (
                                        <div className="flex flex-col items-center gap-3">
                                            <FileText size={48} className="text-cyber-primary" />
                                            <p className="font-bold text-white text-lg">{file.name}</p>
                                            <p className="text-sm text-cyber-success">Ready to upload</p>
                                        </div>
                                    ) : (
                                        <>
                                            <p className="font-bold text-lg text-white mb-2">Drop CSV file here</p>
                                            <p className="text-sm">or click to browse</p>
                                        </>
                                    )}
                                </div>
                            </label>
                        </div>

                        <button
                            onClick={handleUpload}
                            disabled={!file || uploading}
                            className={`w-full py-4 rounded-lg font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-lg
                                ${!file || uploading
                                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                                    : 'bg-cyber-primary text-black hover:bg-cyan-300 hover:shadow-neon-cyan border border-cyan-400'
                                }
                            `}
                        >
                            {uploading ? 'PROCESSING...' : 'UPLOAD CSV'}
                        </button>
                    </div>
                </div>

                <div className="glass-panel p-6 relative overflow-hidden group hover:border-cyber-secondary/50 transition-all duration-300 flex flex-col">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Shield size={100} />
                    </div>

                    <div className="relative z-10 flex flex-col flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-cyber-secondary/10 rounded-lg border border-cyber-secondary/30">
                                <Shield className="text-cyber-secondary" size={24} />
                            </div>
                            <h4 className="text-xl font-bold text-white">BANK CONNECTION</h4>
                        </div>

                        <div className="flex-1 flex flex-col justify-center items-center text-center p-4 border border-white/5 rounded-xl bg-white/5 mb-4 min-h-[120px]">
                            <p className="text-cyber-text-secondary mb-4">
                                Securely connect your bank account to import transaction data directly via Plaid API.
                            </p>
                            <div className="flex gap-2 justify-center mb-4">
                                <span className="px-2 py-1 bg-black/30 rounded text-xs font-mono text-cyber-text-muted">ENCRYPTED</span>
                                <span className="px-2 py-1 bg-black/30 rounded text-xs font-mono text-cyber-text-muted">REAL-TIME</span>
                            </div>
                        </div>

                        <div className="mt-auto">
                            <PlaidLink onSuccess={onSuccess} />
                        </div>
                    </div>
                </div>
            </div>

            {result && (
                <div className={`mt-8 p-4 rounded-lg border flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 ${result.status === 'success'
                    ? 'bg-cyber-success/10 border-cyber-success/30 text-cyber-success'
                    : 'bg-cyber-accent/10 border-cyber-accent/30 text-cyber-accent'
                    }`}>
                    {result.status === 'success' ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
                    <div>
                        <p className="font-bold uppercase tracking-wide">{result.status === 'success' ? 'UPLOAD SUCCESSFUL' : 'UPLOAD FAILED'}</p>
                        <p className="text-sm opacity-80">{result.message}</p>
                        {result.records_uploaded && (
                            <p className="text-xs mt-1 font-mono">RECORDS PROCESSED: {result.records_uploaded}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

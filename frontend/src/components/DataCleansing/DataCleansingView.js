import React, { useState } from 'react';
import { Droplets, CheckCircle, AlertCircle, Loader, RefreshCw, Database, Trash2, FileCheck } from 'lucide-react';
import apiService from '../../services/api';

export default function DataCleansingView({ onSuccess }) {
    const [cleansing, setCleansing] = useState(false);
    const [result, setResult] = useState(null);
    const [stats, setStats] = useState(null);

    const loadStats = async () => {
        try {
            const data = await apiService.getCleansingStats();
            setStats(data);
        } catch (error) {
            console.error('Failed to load cleansing stats:', error);
        }
    };

    React.useEffect(() => {
        loadStats();
    }, []);

    const handleCleanse = async () => {
        setCleansing(true);
        setResult(null);

        try {
            const data = await apiService.cleanseData();
            setResult({
                status: 'success',
                message: data.message,
                ...data
            });
            if (onSuccess) onSuccess();
            // Reload stats after cleansing
            await loadStats();
        } catch (error) {
            console.error('Cleansing failed:', error);
            setResult({
                status: 'error',
                message: error.message || 'Data cleansing failed. Please try again.'
            });
        } finally {
            setCleansing(false);
        }
    };

    const cleansingFeatures = [
        {
            icon: Trash2,
            title: 'Remove Duplicates',
            description: 'Eliminates duplicate transactions based on transaction ID',
            color: 'text-red-400'
        },
        {
            icon: FileCheck,
            title: 'Normalize Data',
            description: 'Standardizes dates, amounts, country codes, and currency codes',
            color: 'text-cyber-primary'
        },
        {
            icon: Database,
            title: 'Validate Formats',
            description: 'Ensures all data follows consistent formatting standards',
            color: 'text-cyber-success'
        },
        {
            icon: RefreshCw,
            title: 'Update Records',
            description: 'Applies cleansing rules to all existing transactions',
            color: 'text-cyber-secondary'
        }
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-2 tracking-wide flex items-center justify-center gap-3">
                    <Droplets className="text-cyber-primary" size={32} />
                    DATA CLEANSING
                </h3>
                <p className="text-cyber-text-secondary">Clean and normalize your transaction data</p>
            </div>

            {/* Stats Cards */}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass-panel p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-cyber-text-secondary text-sm uppercase tracking-wide">Total Records</span>
                            <Database className="text-cyber-primary" size={20} />
                        </div>
                        <p className="text-3xl font-bold text-white">{stats.total_transactions || 0}</p>
                    </div>
                    <div className="glass-panel p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-cyber-text-secondary text-sm uppercase tracking-wide">Duplicates Found</span>
                            <Trash2 className="text-red-400" size={20} />
                        </div>
                        <p className="text-3xl font-bold text-white">{stats.duplicates_count || 0}</p>
                    </div>
                    <div className="glass-panel p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-cyber-text-secondary text-sm uppercase tracking-wide">Last Cleansed</span>
                            <CheckCircle className="text-cyber-success" size={20} />
                        </div>
                        <p className="text-sm font-mono text-cyber-text-primary">
                            {stats.last_cleansed ? new Date(stats.last_cleansed).toLocaleString() : 'Never'}
                        </p>
                    </div>
                </div>
            )}

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cleansingFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <div key={index} className="glass-panel p-6 hover:border-cyber-primary/50 transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className={`p-3 bg-white/5 rounded-lg border border-white/10 ${feature.color}`}>
                                    <Icon size={24} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                                    <p className="text-sm text-cyber-text-secondary">{feature.description}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Cleansing Actions */}
            <div className="glass-panel p-6">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Droplets className="text-cyber-primary" size={24} />
                    Cleansing Operations
                </h4>
                <p className="text-cyber-text-secondary mb-6">
                    Run data cleansing to remove duplicates, normalize formats, and ensure data quality across all transactions.
                </p>

                <div className="space-y-4">
                    <button
                        onClick={handleCleanse}
                        disabled={cleansing}
                        className={`
                            w-full py-4 rounded-lg font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-lg flex items-center justify-center gap-3
                            ${cleansing
                                ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                                : 'bg-cyber-primary text-black hover:bg-cyan-300 hover:shadow-neon-cyan border border-cyan-400'
                            }
                        `}
                    >
                        {cleansing ? (
                            <>
                                <Loader className="animate-spin" size={20} />
                                CLEANSING DATA...
                            </>
                        ) : (
                            <>
                                <RefreshCw size={20} />
                                RUN DATA CLEANSING
                            </>
                        )}
                    </button>

                    {result && (
                        <div className={`p-4 rounded-lg border flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4 ${
                            result.status === 'success'
                                ? 'bg-cyber-success/10 border-cyber-success/30 text-cyber-success'
                                : 'bg-cyber-accent/10 border-cyber-accent/30 text-cyber-accent'
                        }`}>
                            {result.status === 'success' ? <CheckCircle size={24} className="flex-shrink-0" /> : <AlertCircle size={24} className="flex-shrink-0" />}
                            <div className="flex-1">
                                <p className="font-bold uppercase tracking-wide mb-1">
                                    {result.status === 'success' ? 'CLEANSING COMPLETE' : 'CLEANSING FAILED'}
                                </p>
                                <p className="text-sm opacity-80">{result.message}</p>
                                {result.status === 'success' && result.duplicates_removed && (
                                    <div className="mt-3 space-y-1 text-xs font-mono">
                                        <p>Duplicates Removed: {result.duplicates_removed}</p>
                                        <p>Records Normalized: {result.records_normalized || 0}</p>
                                        <p>Processing Time: {result.duration_seconds?.toFixed(2)}s</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Info Panel */}
            <div className="glass-panel p-6 border-cyber-primary/30">
                <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <AlertCircle className="text-cyber-primary" size={20} />
                    About Data Cleansing
                </h4>
                <div className="space-y-2 text-sm text-cyber-text-secondary">
                    <p>
                        Data cleansing (ATC-02) automatically processes your transaction data to ensure quality and consistency:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Removes duplicate transactions based on transaction ID</li>
                        <li>Normalizes timestamps to YYYY-MM-DD HH:MM:SS format</li>
                        <li>Rounds currency amounts to 2 decimal places</li>
                        <li>Standardizes country codes to uppercase (e.g., US, CA, GB)</li>
                        <li>Normalizes currency codes to uppercase (e.g., USD, EUR, GBP)</li>
                    </ul>
                    <p className="mt-3 text-cyber-text-muted text-xs">
                        Note: Cleansing operations are logged in the Audit Log for compliance and tracking.
                    </p>
                </div>
            </div>
        </div>
    );
}


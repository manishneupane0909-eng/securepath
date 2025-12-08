import React, { useState } from 'react';
import { AlertTriangle, Loader, ShieldAlert, Activity } from 'lucide-react';
import apiService from '../../services/api';

export default function RiskScoringView({ onComplete }) {
    const [running, setRunning] = useState(false);
    const [result, setResult] = useState(null);

    const runFraudDetection = async () => {
        setRunning(true);
        setResult(null);

        try {
            console.log('Starting fraud detection...');
            const data = await apiService.detectFraud();
            console.log('Fraud detection response:', data);
            
            // Ensure we have the expected format
            const result = {
                status: data.status || 'success',
                message: data.message || `Processed ${data.transactions_processed || 0} transactions`,
                transactions_processed: data.transactions_processed || data.processed || 0,
                fraud_detected: data.fraud_detected || data.flagged || 0,
                duration_seconds: data.duration_seconds || 0
            };
            
            setResult(result);
            if (onComplete) onComplete();
        } catch (error) {
            console.error('Fraud detection error:', error);
            setResult({ 
                status: 'error', 
                message: error.message || error.data?.message || 'Fraud detection failed. Please check console for details.' 
            });
        } finally {
            setRunning(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="glass-panel p-8 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyber-accent/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="text-center mb-10 relative z-10">
                    <div className="w-24 h-24 mx-auto bg-cyber-accent/10 rounded-full flex items-center justify-center mb-6 border border-cyber-accent/30 shadow-neon-pink group">
                        <ShieldAlert className="text-cyber-accent group-hover:scale-110 transition-transform duration-300" size={48} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">FRAUD RISK SCORING</h3>
                    <p className="text-cyber-text-secondary">Execute ML-based anomaly detection on transaction streams</p>
                </div>

                <div className="max-w-xl mx-auto">
                    <button
                        onClick={runFraudDetection}
                        disabled={running}
                        className={`
                            w-full py-5 rounded-xl font-bold text-lg tracking-widest uppercase transition-all duration-300 shadow-lg relative overflow-hidden group
                            ${running
                                ? 'bg-cyber-panel border border-cyber-accent/30 text-cyber-accent cursor-wait'
                                : 'bg-cyber-accent text-white hover:bg-red-600 hover:shadow-neon-pink border border-red-500'
                            }
                        `}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>

                        {running ? (
                            <span className="flex items-center justify-center gap-3">
                                <Loader className="animate-spin" size={24} />
                                ANALYZING VECTORS...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-3">
                                <Activity size={24} />
                                INITIATE DETECTION PROTOCOL
                            </span>
                        )}
                    </button>
                </div>

                {result && (
                    <div className={`mt-8 p-6 rounded-xl border animate-in fade-in slide-in-from-bottom-4 ${result.status === 'success'
                            ? 'bg-cyber-success/10 border-cyber-success/30 text-cyber-success shadow-[0_0_20px_rgba(0,255,148,0.1)]'
                            : 'bg-cyber-accent/10 border-cyber-accent/30 text-cyber-accent shadow-[0_0_20px_rgba(255,0,60,0.1)]'
                        }`}>
                        <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-lg ${result.status === 'success' ? 'bg-cyber-success/20' : 'bg-cyber-accent/20'}`}>
                                {result.status === 'success' ? <Activity size={24} /> : <AlertTriangle size={24} />}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-lg uppercase tracking-wide mb-1">
                                    {result.status === 'success' ? 'ANALYSIS COMPLETE' : 'PROTOCOL FAILURE'}
                                </h4>
                                <p className="opacity-90 mb-4">{result.message}</p>

                                {result.transactions_processed && (
                                    <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/10">
                                        <div className="text-center p-3 bg-black/20 rounded-lg">
                                            <p className="text-xs text-cyber-text-secondary uppercase tracking-wider mb-1">Processed</p>
                                            <p className="text-xl font-mono font-bold text-white">{result.transactions_processed}</p>
                                        </div>
                                        <div className="text-center p-3 bg-black/20 rounded-lg">
                                            <p className="text-xs text-cyber-text-secondary uppercase tracking-wider mb-1">Threats</p>
                                            <p className="text-xl font-mono font-bold text-cyber-accent">{result.fraud_detected}</p>
                                        </div>
                                        <div className="text-center p-3 bg-black/20 rounded-lg">
                                            <p className="text-xs text-cyber-text-secondary uppercase tracking-wider mb-1">Latency</p>
                                            <p className="text-xl font-mono font-bold text-cyber-primary">{result.duration_seconds}s</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {running && (
                    <div className="mt-8 text-center">
                        <p className="text-cyber-accent animate-pulse font-mono text-sm uppercase tracking-widest">
                            Scanning transaction patterns...
                        </p>
                        <div className="w-64 h-1 bg-gray-800 rounded-full mx-auto mt-4 overflow-hidden">
                            <div className="h-full bg-cyber-accent animate-progress"></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

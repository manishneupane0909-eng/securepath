// src/components/AuditLog/AuditLogView.js - Audit log component
import React from 'react';
import { FileText, RefreshCw, Clock, User, Activity } from 'lucide-react';
import { useAuditLogs } from '../../hooks/useAuditLogs';

export default function AuditLogView() {
    const { logs, loading, error, refresh } = useAuditLogs();

    return (
        <div className="glass-panel overflow-hidden">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyber-secondary/20 rounded-lg border border-cyber-secondary/30">
                        <FileText className="text-cyber-secondary" size={20} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white tracking-wide">SYSTEM ACTIVITY LOG</h3>
                        <p className="text-xs text-cyber-text-secondary uppercase tracking-wider">{logs.length} RECORDS INDEXED</p>
                    </div>
                </div>

                <button
                    onClick={refresh}
                    className="cyber-button flex items-center gap-2"
                >
                    {loading ? <RefreshCw className="animate-spin" size={16} /> : <RefreshCw size={16} />}
                    {loading ? 'SYNCING...' : 'REFRESH LOG'}
                </button>
            </div>

            {loading && logs.length === 0 && (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-secondary shadow-[0_0_15px_#7000FF]"></div>
                </div>
            )}

            {error && (
                <div className="p-8 text-center">
                    <div className="inline-block p-4 rounded-full bg-red-500/10 border border-red-500/30 mb-4">
                        <Activity className="text-red-500" size={32} />
                    </div>
                    <p className="text-red-400 font-medium">System Error: {error}</p>
                </div>
            )}

            {!loading && !error && logs.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-black/20 border-b border-white/10">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-cyber-text-secondary uppercase tracking-wider">Timestamp</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-cyber-text-secondary uppercase tracking-wider">Action</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-cyber-text-secondary uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-cyber-text-secondary uppercase tracking-wider">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {logs.map((log, i) => (
                                <tr key={i} className="hover:bg-white/5 transition duration-200 group">
                                    <td className="px-6 py-4 text-sm font-mono text-cyber-text-muted group-hover:text-cyber-primary transition-colors">
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} />
                                            {log.timestamp}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyber-secondary/10 text-cyber-secondary border border-cyber-secondary/30 uppercase tracking-wide">
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-white font-medium">
                                        <div className="flex items-center gap-2">
                                            <User size={14} className="text-cyber-text-secondary" />
                                            {log.user || 'SYSTEM'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-cyber-text-secondary">{log.details}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {!loading && !error && logs.length === 0 && (
                <div className="p-12 text-center">
                    <FileText className="mx-auto text-cyber-text-muted mb-4 opacity-50" size={48} />
                    <p className="text-cyber-text-secondary text-lg">No audit records found</p>
                    <p className="text-cyber-text-muted text-sm mt-2">Upload a file to generate the first log entry</p>
                </div>
            )}
        </div>
    );
}

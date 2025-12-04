
import React from 'react';
import {
    Activity, Clock, AlertTriangle, DollarSign, TrendingUp,
    CheckCircle, XCircle, RefreshCw
} from 'lucide-react';

export default function DashboardView({ stats, transactions, loading, onRefresh }) {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-primary shadow-neon-cyan"></div>
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="text-center py-12 glass-panel">
                <Activity size={48} className="mx-auto text-cyber-text-muted mb-4" />
                <p className="text-cyber-text-secondary">No data available. Upload transactions to get started.</p>
            </div>
        );
    }

    const statCards = [
        { label: 'Total Transactions', value: stats.total_transactions, icon: Activity, color: 'text-blue-400', border: 'border-blue-500/30', shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]' },
        { label: 'Pending Review', value: stats.pending_review, icon: Clock, color: 'text-yellow-400', border: 'border-yellow-500/30', shadow: 'shadow-[0_0_15px_rgba(234,179,8,0.3)]' },
        { label: 'Fraud Detected', value: stats.fraud_detected, icon: AlertTriangle, color: 'text-cyber-accent', border: 'border-cyber-accent/30', shadow: 'shadow-neon-pink' },
        { label: 'Total Amount', value: `$${stats.total_amount.toLocaleString()}`, icon: DollarSign, color: 'text-cyber-success', border: 'border-cyber-success/30', shadow: 'shadow-[0_0_15px_rgba(0,255,148,0.3)]' },
    ];

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {statCards.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className={`glass-panel p-6 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 ${stat.border} ${stat.shadow}`}>
                            <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>

                            <div className="flex items-center justify-between mb-4 relative z-10">
                                <div className={`p-3 bg-white/5 rounded-lg border border-white/10`}>
                                    <Icon className={stat.color} size={24} />
                                </div>
                                <TrendingUp className="text-cyber-success" size={20} />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-1 tracking-tight">{stat.value}</h3>
                            <p className="text-sm text-cyber-text-secondary font-medium uppercase tracking-wide">{stat.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Recent Transactions Table */}
            <div className="glass-panel overflow-hidden">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
                        <Activity size={18} className="text-cyber-primary" />
                        RECENT TRANSACTIONS
                    </h3>
                    <button
                        onClick={onRefresh}
                        className="cyber-button flex items-center gap-2"
                    >
                        <RefreshCw size={16} />
                        Refresh
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-black/20 border-b border-white/10">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-cyber-text-secondary uppercase tracking-wider">ID</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-cyber-text-secondary uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-cyber-text-secondary uppercase tracking-wider">Merchant</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-cyber-text-secondary uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-cyber-text-secondary uppercase tracking-wider">Risk Score</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-cyber-text-secondary uppercase tracking-wider">Fraud</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {transactions.map((txn, i) => (
                                <tr key={i} className="hover:bg-white/5 transition duration-200 group">
                                    <td className="px-6 py-4 text-sm font-mono text-cyber-primary/80 group-hover:text-cyber-primary transition-colors">
                                        {txn.transaction_id}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-white tracking-wide">${txn.amount}</td>
                                    <td className="px-6 py-4 text-sm text-cyber-text-primary">{txn.merchant}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full border ${txn.status === 'approved' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                                            txn.status === 'rejected' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                                                'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                                            }`}>
                                            {txn.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-mono">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${txn.fraud_score > 0.5 ? 'bg-cyber-accent shadow-neon-pink' : 'bg-cyber-success shadow-[0_0_5px_#00FF94]'}`}
                                                    style={{ width: `${txn.fraud_score * 100}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-cyber-text-secondary">{(txn.fraud_score * 100).toFixed(0)}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {txn.is_fraud ?
                                            <XCircle className="text-cyber-accent animate-pulse" size={20} /> :
                                            <CheckCircle className="text-cyber-success" size={20} />
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

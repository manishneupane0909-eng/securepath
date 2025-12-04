
import React from 'react';
import { NAV_ITEMS, ROUTES } from '../../config/constants';
import {
    Shield, LayoutDashboard, Upload, Droplets,
    AlertTriangle, FileText, FileBarChart
} from 'lucide-react';

const ICON_MAP = {
    [ROUTES.DASHBOARD]: LayoutDashboard,
    [ROUTES.UPLOAD]: Upload,
    [ROUTES.CLEANSING]: Droplets,
    [ROUTES.RISK_SCORING]: AlertTriangle,
    [ROUTES.AUDIT_LOG]: FileText,
    [ROUTES.REPORTS]: FileBarChart,
};

export default function Sidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) {
    return (
        <aside
            className={`
                fixed left-4 top-4 bottom-4 z-50 
                ${sidebarOpen ? 'w-72' : 'w-20'} 
                glass-panel transition-all duration-300 ease-in-out
                flex flex-col overflow-hidden
            `}
        >
            {/* Logo Area */}
            <div className="p-6 flex items-center gap-3 border-b border-white/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-cyber-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 p-2 bg-cyber-primary/10 rounded-lg border border-cyber-primary/30 shadow-neon-cyan">
                    <Shield className="text-cyber-primary animate-pulse-slow" size={24} />
                </div>

                <div className={`transition-all duration-300 ${!sidebarOpen && 'opacity-0 w-0 overflow-hidden'}`}>
                    <h1 className="text-xl font-bold text-white tracking-wider">
                        SECURE<span className="text-cyber-primary">PATH</span>
                    </h1>
                    <p className="text-xs text-cyber-text-secondary tracking-widest uppercase">Fraud Detection</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto custom-scrollbar">
                {NAV_ITEMS.map((item) => {
                    const Icon = ICON_MAP[item.id] || Shield;
                    const isActive = activeTab === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`
                                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group relative overflow-hidden
                                ${isActive
                                    ? 'text-cyber-primary bg-cyber-primary/10 border border-cyber-primary/30 shadow-neon-cyan'
                                    : 'text-cyber-text-secondary hover:text-white hover:bg-white/5 border border-transparent'
                                }
                            `}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyber-primary shadow-[0_0_10px_#00F0FF]"></div>
                            )}

                            <Icon
                                size={20}
                                className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                            />

                            <span className={`font-medium tracking-wide transition-all duration-300 ${!sidebarOpen && 'opacity-0 w-0 overflow-hidden'}`}>
                                {item.label}
                            </span>

                            {isActive && sidebarOpen && (
                                <div className="absolute right-2 w-2 h-2 rounded-full bg-cyber-primary shadow-[0_0_5px_#00F0FF] animate-pulse"></div>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Footer / Toggle */}
            <div className="p-4 border-t border-white/10">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="w-full py-2 px-4 rounded-lg bg-white/5 hover:bg-white/10 text-cyber-text-muted text-xs uppercase tracking-widest border border-white/5 hover:border-white/20 transition-all"
                >
                    {sidebarOpen ? '<< Collapse Panel' : '>>'}
                </button>
            </div>
        </aside>
    );
}

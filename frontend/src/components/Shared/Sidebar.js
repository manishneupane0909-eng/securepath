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
    // Force include Data Cleansing - always show it
    const navItems = React.useMemo(() => {
        // Start with NAV_ITEMS from constants
        let items = Array.isArray(NAV_ITEMS) ? [...NAV_ITEMS] : [];
        
        // Always ensure Data Cleansing is present at position 2 (after Upload)
        const cleansingItem = { id: ROUTES.CLEANSING, label: 'Data Cleansing', color: 'cyan' };
        const hasCleansing = items.some(item => item.id === ROUTES.CLEANSING || item.id === 'cleansing');
        
        if (!hasCleansing) {
            // Insert after Upload (index 1)
            items.splice(2, 0, cleansingItem);
        } else {
            // Make sure it's in the right position
            const cleansingIndex = items.findIndex(item => item.id === ROUTES.CLEANSING || item.id === 'cleansing');
            if (cleansingIndex !== 2 && cleansingIndex !== -1) {
                // Remove and re-insert at correct position
                items.splice(cleansingIndex, 1);
                items.splice(2, 0, cleansingItem);
            }
        }
        
        return items;
    }, []);
    
    // Debug: Log to console
    React.useEffect(() => {
        console.log('=== SIDEBAR DEBUG ===');
        console.log('NAV_ITEMS from constants:', NAV_ITEMS);
        console.log('NAV_ITEMS type:', typeof NAV_ITEMS, 'isArray:', Array.isArray(NAV_ITEMS));
        console.log('ROUTES.CLEANSING:', ROUTES.CLEANSING);
        console.log('Processed navItems:', navItems);
        console.log('navItems length:', navItems.length);
        console.log('Has cleansing?', navItems.some(item => item.id === ROUTES.CLEANSING || item.id === 'cleansing'));
        console.log('===================');
    }, [navItems]);
    
    return (
        <aside
            className={`
                fixed left-4 top-4 bottom-4 z-50 
                ${sidebarOpen ? 'w-72' : 'w-20'} 
                glass-panel transition-all duration-300 ease-in-out
                flex flex-col overflow-hidden
            `}
        >
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

            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto custom-scrollbar">
                {navItems && navItems.length > 0 ? navItems.map((item) => {
                    const Icon = ICON_MAP[item.id] || Shield;
                    const isActive = activeTab === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`
                                w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 group relative overflow-hidden
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
                }) : (
                    <div className="text-cyber-text-secondary text-sm p-4">No navigation items found</div>
                )}
            </nav>

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

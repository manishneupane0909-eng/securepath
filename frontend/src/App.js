import React, { useState, useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Sidebar from './components/Shared/Sidebar';
import DashboardView from './components/Dashboard/DashboardView';
import UploadView from './components/Upload/UploadView';
import RiskScoringView from './components/RiskScoring/RiskScoringView';
import AuditLogView from './components/AuditLog/AuditLogView';
import ReportsView from './components/Reports/ReportsView';
import Profile from './components/Profile';
import ProfileSetup from './components/ProfileSetup';
import { useDashboardData } from './hooks/useDashboardData';
import { NAV_ITEMS, ROUTES } from './config/constants';




export default function SecurePathDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [profileComplete, setProfileComplete] = useState(false);
    const { stats, transactions, loading, refresh } = useDashboardData();

    useEffect(() => {
        const completed = localStorage.getItem('profileCompleted') === 'true';
        setProfileComplete(completed);
    }, []);

    const handleProfileComplete = () => {
        setProfileComplete(true);
        localStorage.setItem('profileCompleted', 'true');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <DashboardView stats={stats} transactions={transactions} loading={loading} onRefresh={refresh} />;
            case 'upload':
                return <UploadView onSuccess={refresh} />;
            case 'risk-scoring':
                return <RiskScoringView onComplete={refresh} />;
            case 'audit-log':
                return <AuditLogView />;
            case 'reports':
                return <ReportsView />;
            case 'profile':
                return <Profile role="user" />;
            default:
                return <DashboardView stats={stats} transactions={transactions} loading={loading} onRefresh={refresh} />;
        }
    };

    const currentNav = NAV_ITEMS.find(i => i.id === activeTab);

    return (
        <ErrorBoundary>
            {!profileComplete && (
                <ProfileSetup onComplete={handleProfileComplete} />
            )}

            <div className="flex min-h-screen bg-cyber-dark text-cyber-text-primary selection:bg-cyber-primary selection:text-black">
                <Sidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                {/* Main Content - Adjusted margin for floating sidebar */}
                <main
                    className={`
                        flex-1 transition-all duration-300 ease-in-out
                        ${sidebarOpen ? 'ml-80' : 'ml-28'} 
                        mr-4 my-4
                        h-[calc(100vh-2rem)] overflow-y-auto custom-scrollbar rounded-xl
                    `}
                >
                    {/* Top Bar - Glass Effect */}
                    <header className="glass-panel mb-6 p-6 sticky top-4 z-40 flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                                {currentNav?.label || 'Dashboard'}
                                <span className="text-sm font-normal text-cyber-text-muted px-3 py-1 rounded-full border border-white/10 bg-black/20">
                                    v2.0.0
                                </span>
                            </h2>
                            <p className="text-cyber-text-secondary mt-1">Real-time fraud detection system</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-success/10 border border-cyber-success/20">
                                <div className="w-2 h-2 bg-cyber-success rounded-full animate-pulse shadow-[0_0_10px_#00FF94]"></div>
                                <span className="text-sm font-bold text-cyber-success tracking-wide">SYSTEM ONLINE</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyber-primary to-cyber-secondary p-[2px]">
                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-bold text-sm">
                                    AD
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Content Area */}
                    <div className="animate-float">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </ErrorBoundary>
    );
}

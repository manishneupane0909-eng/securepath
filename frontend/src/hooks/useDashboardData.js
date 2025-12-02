// src/hooks/useDashboardData.js - Custom hook for dashboard data
import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';

export const useDashboardData = () => {
    const [stats, setStats] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadDashboardData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const [statsData, transData] = await Promise.all([
                apiService.getStats(),
                apiService.getTransactions(1, 10),
            ]);

            setStats(statsData);
            setTransactions(transData.transactions || []);
        } catch (err) {
            console.error('Error loading dashboard:', err);
            setError(err.message);
            setStats(null);
            setTransactions([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadDashboardData();
    }, [loadDashboardData]);

    return {
        stats,
        transactions,
        loading,
        error,
        refresh: loadDashboardData,
    };
};

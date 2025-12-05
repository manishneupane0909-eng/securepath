import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';

export const useAuditLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLogs = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await apiService.getAuditLogs(1, 20);
            setLogs(response.logs || []);
        } catch (err) {
            console.error('Failed to fetch audit logs:', err);
            setError(err.message || 'Failed to load audit logs');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    return {
        logs,
        loading,
        error,
        refresh: fetchLogs,
    };
};

// src/config/constants.js - Application constants
export const API_CONFIG = {
    BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api',
    AUTH_TOKEN: process.env.REACT_APP_API_TOKEN || 'root',
    TIMEOUT: 30000, // 30 seconds
};

export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
};

export const STATUS_COLORS = {
    approved: 'green',
    rejected: 'red',
    pending: 'yellow',
};

export const ROUTES = {
    DASHBOARD: 'dashboard',
    UPLOAD: 'upload',
    CLEANSING: 'cleansing',
    RISK_SCORING: 'risk-scoring',
    AUDIT_LOG: 'audit-log',
    REPORTS: 'reports',
};

export const NAV_ITEMS = [
    { id: ROUTES.DASHBOARD, label: 'Dashboard', color: 'blue' },
    { id: ROUTES.UPLOAD, label: 'Upload', color: 'green' },
    { id: ROUTES.RISK_SCORING, label: 'Risk Scoring', color: 'orange' },
    { id: ROUTES.AUDIT_LOG, label: 'Audit Log', color: 'purple' },
    { id: ROUTES.REPORTS, label: 'Report Export', color: 'indigo' },
];

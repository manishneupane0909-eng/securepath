import { API_CONFIG } from '../config/constants';
import authService from './authService';

class APIError extends Error {
    constructor(message, status, data) {
        super(message);
        this.name = 'APIError';
        this.status = status;
        this.data = data;
    }
}

const apiCall = async (endpoint, options = {}) => {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;

    // Get access token from localStorage (fallback) or use httpOnly cookies
    const accessToken = authService.getAccessToken();

    const config = {
        ...options,
        credentials: 'include', // Important for httpOnly cookies
        headers: {
            'Content-Type': 'application/json',
            ...(accessToken && { 'Authorization': `Bearer ${accessToken}` }),
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            let errorData = {};
            try {
                errorData = await response.json();
            } catch (e) {
                throw new APIError(
                    `Server Error (${response.status}): Failed to parse JSON response.`,
                    response.status,
                    {}
                );
            }

            const errorMessage = errorData.error || errorData.detail || `Server responded with status ${response.status}`;
            throw new APIError(errorMessage, response.status, errorData);
        }

        return response.json();
    } catch (error) {
        if (error instanceof APIError) {
            throw error;
        }
        throw new APIError(error.message || 'Network error occurred', 0, {});
    }
};

export const apiService = {
    getStats: () => apiCall('/dashboard/stats'),

    getTransactions: (page = 1, pageSize = 10, statusFilter = null) => {
        const params = new URLSearchParams({ page, page_size: pageSize });
        if (statusFilter) params.append('status_filter', statusFilter);
        return apiCall(`/dashboard/transactions?${params}`);
    },

    getAuditLogs: (page = 1, pageSize = 20) => {
        const params = new URLSearchParams({ page, page_size: pageSize });
        return apiCall(`/audit-log?${params}`);
    },

    detectFraud: () => apiCall('/detect-fraud', { method: 'POST' }),
    uploadFile: (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const accessToken = authService.getAccessToken();
        return fetch(`${API_CONFIG.BASE_URL}/upload`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                ...(accessToken && { 'Authorization': `Bearer ${accessToken}` }),
            },
            body: formData,
        }).then(async (response) => {
            if (!response.ok) {
                let errorData = {};
                try {
                    errorData = await response.json();
                } catch (e) {
                    throw new APIError(
                        `Server Error (${response.status}): Could not parse error response.`,
                        response.status,
                        {}
                    );
                }
                const errorMessage = errorData.error || errorData.detail || `Server responded with status ${response.status}`;
                throw new APIError(errorMessage, response.status, errorData);
            }
            return response.json();
        });
    },

    async getExportUrl(type) {
        // Return URL without token - authentication will be handled via httpOnly cookies
        // The backend will check for the access_token cookie automatically
        return `${API_CONFIG.BASE_URL}/export/${type}`;
    },

    async createLinkToken() {
        return apiCall('/plaid/create_link_token', { method: 'POST' });
    },

    async exchangePublicToken(public_token) {
        return apiCall('/plaid/exchange_public_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ public_token }),
        });
    },

    async getPlaidTransactions(accessToken) {
        return apiCall(`/plaid/transactions?access_token=${accessToken}`);
    },

    async testEndpoint(endpoint, method = 'GET') {
        return apiCall(endpoint, { method });
    },

    getCleansingStats: () => apiCall('/cleansing/stats'),
    cleanseData: () => apiCall('/cleansing/run', { method: 'POST' }),
};

export default apiService;


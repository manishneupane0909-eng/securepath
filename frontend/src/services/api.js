import { API_CONFIG } from '../config/constants';

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

    const config = {
        ...options,
        headers: {
            'Authorization': `Bearer ${API_CONFIG.AUTH_TOKEN}`,
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

        return fetch(`${API_CONFIG.BASE_URL}/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_CONFIG.AUTH_TOKEN}`,
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
        return `${API_CONFIG.BASE_URL}/export/${type}?token=${API_CONFIG.AUTH_TOKEN}`;
    },

    async createLinkToken() {
        return apiCall('/plaid/link-token');
    },

    async exchangePublicToken(public_token) {
        return apiCall('/plaid/exchange-token', {
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
};

export default apiService;


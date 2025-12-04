
import React, { useState } from 'react';
import { Shield, Loader } from 'lucide-react';
import apiService from '../../services/api';

export default function ReportsView() {
    const [downloading, setDownloading] = useState(null);

    const downloadReport = async (type) => {
        setDownloading(type);
        await new Promise(resolve => setTimeout(resolve, 500));

        const url = apiService.getExportUrl(type);
        window.open(url, '_blank');

        setTimeout(() => setDownloading(null), 2000);
    };

    return (
        <div className="max-w-4xl">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <Shield className="text-indigo-600 mb-4 mx-auto" size={48} />
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Export Reports</h3>
                <p className="text-center text-gray-600 mb-6">
                    Generate and download comprehensive transaction reports.
                </p>

                <div className="space-y-4">
                    <button
                        onClick={() => downloadReport('csv')}
                        disabled={downloading !== null}
                        className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 transition font-medium flex items-center justify-center gap-2"
                    >
                        {downloading === 'csv' ? (
                            <>
                                <Loader className="animate-spin" size={20} />
                                Generating CSV...
                            </>
                        ) : (
                            'Download CSV Report'
                        )}
                    </button>

                    <button
                        onClick={() => downloadReport('pdf')}
                        disabled={downloading !== null}
                        className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 transition font-medium flex items-center justify-center gap-2"
                    >
                        {downloading === 'pdf' ? (
                            <>
                                <Loader className="animate-spin" size={20} />
                                Generating PDF...
                            </>
                        ) : (
                            'Download PDF Report'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

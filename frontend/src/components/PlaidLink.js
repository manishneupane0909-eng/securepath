import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import apiService from '../services/api';
import { Loader, CheckCircle, AlertCircle, Shield } from 'lucide-react';

export default function PlaidLink({ onSuccess }) {
  const [token, setToken] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    const initLink = async () => {
      try {
        const data = await apiService.createLinkToken();
        setToken(data.link_token);
        setStatus("ready");
      } catch (err) {
        console.error("Failed to create link token:", err);
        setError("Failed to initialize Plaid. Using cached mode.");
        setStatus("error");
      }
    };
    initLink();
  }, []);

  const { open, ready } = usePlaidLink({
    token,
    onSuccess: async (public_token) => {
      setStatus("loading");
      try {
        const data = await apiService.exchangePublicToken(public_token);
        // After exchange, fetch transactions
        await apiService.getPlaidTransactions(data.access_token);
        setStatus("success");
        if (onSuccess) onSuccess();
      } catch (err) {
        setError(err.message);
        setStatus("error");
      }
    },
    onExit: () => {
      if (status !== "success") setStatus("ready");
    },
  });

  if (status === "loading" && !token) {
    return (
      <div className="flex items-center justify-center gap-2 text-cyber-text-secondary py-4">
        <Loader className="animate-spin text-cyber-secondary" size={20} />
        <span className="text-sm font-mono tracking-wide">INITIALIZING SECURE LINK...</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      {status === "success" ? (
        <div className="p-4 bg-cyber-success/10 border border-cyber-success/30 rounded-lg flex items-center gap-3 text-cyber-success">
          <CheckCircle size={24} />
          <div>
            <p className="font-bold tracking-wide">CONNECTION ESTABLISHED</p>
            <p className="text-sm opacity-80">Transactions synchronized.</p>
          </div>
        </div>
      ) : (
        <button
          onClick={() => open()}
          disabled={!ready || status === "loading"}
          className={`
            w-full py-4 rounded-lg font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-lg flex items-center justify-center gap-3
            ${!ready || status === "loading"
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
              : 'bg-cyber-secondary text-white hover:bg-purple-600 hover:shadow-neon-pink border border-purple-500'
            }
          `}
        >
          {status === "loading" ? <Loader className="animate-spin" size={20} /> : <Shield size={20} />}
          {status === "loading" ? 'CONNECTING...' : 'CONNECT BANK ACCOUNT'}
        </button>
      )}

      {error && (
        <div className="mt-4 p-4 bg-cyber-warning/10 border border-cyber-warning/30 text-cyber-warning rounded-lg flex items-start gap-3 text-left">
          <AlertCircle size={20} className="mt-1 flex-shrink-0" />
          <div>
            <p className="font-bold text-sm tracking-wide">CONNECTION WARNING</p>
            <p className="text-xs opacity-80 mt-1">{error}</p>
            <p className="text-[10px] mt-2 font-mono opacity-60 uppercase border-t border-cyber-warning/20 pt-2">
              System will use cached data if available (Graceful Degradation).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
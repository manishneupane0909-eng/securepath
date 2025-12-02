import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initialAlerts = [
  { id: 1, level: 'critical', msg: "⚠️ Flagged unusual transaction from London (3m ago)", details: "Transaction #30729: $220 withdrawal at London ATM flagged due to location mismatch." },
  { id: 2, level: 'warning', msg: "🚨 Phishing attempt detected (10m ago)", details: "Suspicious email with link received on your inbox. Blocked automatically." },
  { id: 3, level: 'info', msg: "🔒 Password changed (25m ago)", details: "Your account password was changed from a new device. If this wasn’t you, please contact support immediately." }
];

const levelColor = {
  critical: "#ffb4ad",
  warning: "#fff3b2",
  info: "#caf7e3"
};

export default function LiveAlerts() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [expanded, setExpanded] = useState(null);

  const dismiss = id => setAlerts(alerts.filter(a => a.id !== id));

  return (
    <section style={{
      margin: "2em auto", maxWidth: 500, background: "#f7fafc",
      borderRadius: 18, boxShadow: "0 4px 18px #ccd3de40", padding: "2em 1em"
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2em' }}>Live Alerts Feed</h2>
      <ul style={{
        listStyle: "none", padding: 0, margin: 0, display: "block", minHeight: "85px"
      }}>
        <AnimatePresence>
        {alerts.map(alert => (
          <motion.li
            key={alert.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: .2, x: 90, transition:{duration:.22} }}
            style={{
              background: levelColor[alert.level] || "#fff",
              marginBottom: "1.25em",
              borderRadius: "9px",
              boxShadow: "0 2px 8px #c3e",
              padding: "1em 1.5em",
              fontWeight: 500,
              color: "#2e4b6c",
              display: "flex",
              alignItems: "center",
              position: "relative",
              cursor: "pointer"
            }}
            onClick={() => setExpanded(expanded === alert.id ? null : alert.id)}
          >
            <span>{alert.msg}</span>
            <button
              onClick={e => { e.stopPropagation(); dismiss(alert.id); }}
              style={{
                position: "absolute", right: 16, top: 15, border: "none",
                background: "#e4e9ef", color: "#555", borderRadius: 7,
                fontWeight: "bold", cursor: "pointer", padding: "0.22em 0.7em"
              }}
              title="Dismiss"
            >×</button>
            {expanded === alert.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  fontSize: "0.97em",
                  marginTop: "1em",
                  background: "#f6f8fb",
                  borderRadius: "6px",
                  padding: "0.7em 1em"
                }}
              >
                {alert.details}
              </motion.div>
            )}
          </motion.li>
        ))}
        </AnimatePresence>
      </ul>
      {alerts.length === 0 && <div style={{textAlign:"center",color:"#999"}}>No active alerts 🎉</div>}
    </section>
  );
}

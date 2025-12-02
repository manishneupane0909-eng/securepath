import React from "react";
import { motion } from "framer-motion";
import "./Alerts.css";

function Alerts({ role }) {
  if(role==="admin") {
    return (
      <section className="alerts">
        <h2>Fraud Alerts (Admin)</h2>
        <div className="alert danger">🚩 2 new flagged accounts today</div>
        <div className="alert">Bank-wide phishing alert issued</div>
      </section>
    )
  }
  return (
    <motion.section className="alerts" initial={{ scale:0.8, opacity:0}} animate={{scale:1, opacity:1}}>
      <h2>Alerts Center</h2>
      <div className="alert danger">🚩 Suspicious activity detected (2025-10-22)</div>
      <div className="alert warning">🛡️ Login from new device</div>
    </motion.section>
  )
}
export default Alerts;

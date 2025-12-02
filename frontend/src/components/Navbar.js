import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ setLoggedIn }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <nav style={{
      width: "100%",
      background: "var(--nav-bg)",
      color: "var(--txt)",
      padding: "0.7em 2.2em",
      boxSizing: "border-box",
      boxShadow: "0 2px 14px #cddbe849"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: "1100px",
        margin: "0 auto"
      }}>
        <div style={{ fontSize: "2.2rem", fontWeight: 700, letterSpacing: "2px" }}>
          SecurePath
        </div>
        <ul style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5em",
          listStyle: "none",
          margin: 0,
          padding: 0
        }}>
          <li><Link to="/" style={{ fontSize: "1.1em", color: "#233", textDecoration: "none", fontWeight: 600 }}>Dashboard</Link></li>
          <li><Link to="/about" style={{ fontSize: "1.1em", color: "#233", textDecoration: "none", fontWeight: 600 }}>About</Link></li>
          <li style={{ position: "relative" }}>
            <button
              onClick={() => setShowMore(m => !m)}
              style={{
                background: "#ffd600", color: "#232c3d", border: "none",
                borderRadius: "9px", padding: "0.4em 1.4em", cursor: "pointer",
                fontWeight: 700, fontSize: "1.1em", boxShadow: "0 1px 2px #e1eae7"
              }}
            >
              More ▼
            </button>
            {showMore && (
              <div style={{
                position: "absolute", top: "115%", left: 0,
                background: "#fff", borderRadius: "10px",
                boxShadow: "0 4px 20px #b0b0d548",
                display: "flex", flexDirection: "column",
                minWidth: "170px", zIndex: 99
              }}>
                <Link to="/live-alerts" onClick={() => setShowMore(false)} style={dropdownStyle}>Live Alerts</Link>
                <Link to="/risk-breakdown" onClick={() => setShowMore(false)} style={dropdownStyle}>Risk Breakdown</Link>
                <Link to="/news" onClick={() => setShowMore(false)} style={dropdownStyle}>News</Link>
                <Link to="/self-assessment" onClick={() => setShowMore(false)} style={dropdownStyle}>Self-Assessment</Link>
                <Link to="/faq" onClick={() => setShowMore(false)} style={dropdownStyle}>FAQ</Link>
              </div>
            )}
          </li>
          <li>
            <button
              onClick={() => setLoggedIn(false)}
              style={{
                background: "#3e95cd",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "0.45em 1.2em",
                marginLeft: "0.8em",
                fontWeight: 700,
                fontSize: "1.13em",
                boxShadow: "0 1.5px 4px #b4daeb92",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const dropdownStyle = {
  padding: "0.85em 1.1em",
  color: "#2c3c4d",
  textDecoration: "none",
  fontWeight: 500,
  fontSize: "1.06em",
  borderBottom: "1px solid #f1f1f1",
  transition: "background 0.14s",
  borderRadius: 0
};

export default Navbar;

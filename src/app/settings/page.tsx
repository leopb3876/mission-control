"use client";

import { useState, useEffect } from "react";
import { Settings, Bell, BellOff } from "lucide-react";

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("notificationsEnabled");
    if (saved !== null) {
      setNotificationsEnabled(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("notificationsEnabled", JSON.stringify(notificationsEnabled));
  }, [notificationsEnabled]);

  return (
    <div style={{ marginLeft: "180px", minHeight: "100vh", background: "var(--background)", color: "var(--text-primary)" }}>
      <header style={{ height: "56px", background: "var(--card)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "sticky", top: 0 }}>
        <span style={{ fontWeight: 600 }}>Mission Control</span>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--text-secondary)" }}>
            <div style={{ width: "8px", height: "8px", background: "#22d3ee", borderRadius: "50%" }} />
            Mori online
          </div>
          <div style={{ width: "32px", height: "32px", background: "#22d3ee", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "bold" }}>L</div>
        </div>
      </header>

      <div style={{ padding: "24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Settings size={28} style={{ color: "#a855f7" }} />
            Settings
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>Manage your preferences</p>
        </div>

        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px", maxWidth: "500px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: "4px" }}>Notifications</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                Receive alerts and updates
              </p>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: notificationsEnabled ? "#22d3ee" : "var(--background)",
                border: notificationsEnabled ? "none" : "1px solid var(--border)",
                padding: "10px 16px",
                borderRadius: "8px",
                cursor: "pointer",
                color: notificationsEnabled ? "#0a0a0f" : "var(--text-primary)",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              {notificationsEnabled ? <Bell size={18} /> : <BellOff size={18} />}
              {notificationsEnabled ? "On" : "Off"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

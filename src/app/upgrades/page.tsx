"use client";

import { useState, useEffect } from "react";
import { Rocket, Check, Key, Eye, EyeOff, ShoppingCart, CreditCard } from "lucide-react";

type ApiKey = {
  service: string;
  key: string;
  connected: boolean;
};

export default function Upgrades() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [showKey, setShowKey] = useState<string | null>(null);
  const [newKey, setNewKey] = useState("");
  const [selectedService, setSelectedService] = useState("shopify");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("apiKeys");
    if (saved) {
      setApiKeys(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("apiKeys", JSON.stringify(apiKeys));
  }, [apiKeys]);

  const saveApiKey = () => {
    if (!newKey.trim()) return;
    const existing = apiKeys.find(a => a.service === selectedService);
    if (existing) {
      setApiKeys(apiKeys.map(a => a.service === selectedService ? { ...a, key: newKey } : a));
    } else {
      setApiKeys([...apiKeys, { service: selectedService, key: newKey, connected: true }]);
    }
    setNewKey("");
  };

  const removeApiKey = (service: string) => {
    setApiKeys(apiKeys.filter(a => a.service !== service));
  };

  const isConnected = (service: string) => apiKeys.some(a => a.service === service && a.connected);

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
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
          <Rocket size={24} style={{ color: "#ec4899" }} />
          Upgrades
        </h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>Connect integrations & APIs</p>

        {/* API Connections */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Key size={20} style={{ color: "#22d3ee" }} />
            API Connections
          </h2>
          
          {/* Add API Key Form */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "8px", padding: "12px", color: "var(--text-primary)", fontSize: "14px" }}
            >
              <option value="shopify">Shopify</option>
              <option value="stripe">Stripe</option>
            </select>
            <input
              type={showKey === selectedService ? "text" : "password"}
              placeholder={selectedService === "shopify" ? "shpat_xxxxx..." : "sk_live_xxxxx..."}
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              style={{ flex: 1, minWidth: "200px", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "8px", padding: "12px", color: "var(--text-primary)", fontSize: "14px" }}
            />
            <button
              onClick={() => setShowKey(showKey === selectedService ? null : selectedService)}
              style={{ padding: "12px", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "8px", color: "var(--text-secondary)", cursor: "pointer" }}
            >
              {showKey === selectedService ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            <button
              onClick={saveApiKey}
              style={{ display: "flex", alignItems: "center", gap: "8px", background: "#22d3ee", color: "#0a0a0f", border: "none", borderRadius: "8px", padding: "12px 20px", fontWeight: 600, cursor: "pointer" }}
            >
              <Check size={18} />
              Connect
            </button>
          </div>

          {/* Connected APIs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {apiKeys.map((api) => (
              <div key={api.service} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "var(--background)", borderRadius: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {api.service === "shopify" && <ShoppingCart size={20} style={{ color: "#10b981" }} />}
                  {api.service === "stripe" && <CreditCard size={20} style={{ color: "#a855f7" }} />}
                  <div>
                    <div style={{ fontWeight: 600, textTransform: "capitalize" }}>{api.service}</div>
                    <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                      {api.key.substring(0, 10)}...{api.key.substring(api.key.length - 4)}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#10b981", display: "flex", alignItems: "center", gap: "4px" }}>
                    <Check size={14} /> Connected
                  </span>
                  <button
                    onClick={() => removeApiKey(api.service)}
                    style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "12px" }}
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            ))}
            {apiKeys.length === 0 && (
              <div style={{ textAlign: "center", padding: "24px", color: "var(--text-secondary)" }}>
                No APIs connected yet. Add your API keys above.
              </div>
            )}
          </div>
        </div>

        {/* Skills Section */}
        <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>Installed Skills</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px", marginBottom: "32px" }}>
          {[
            { name: "gog", description: "Google Workspace CLI (Gmail, Calendar, Drive)" },
            { name: "summarize", description: "Summarize URLs, PDFs, YouTube videos" },
            { name: "weather", description: "Weather forecasts" },
          ].map((skill) => (
            <div key={skill.name} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <Check size={16} style={{ color: "#10b981" }} />
                <span style={{ fontWeight: 600 }}>{skill.name}</span>
              </div>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

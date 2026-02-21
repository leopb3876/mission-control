"use client";

import { useState, useEffect } from "react";
import { Rocket, Check, Key, Eye, EyeOff, ShoppingCart, CreditCard, Download, Loader2, Sparkles } from "lucide-react";

type ApiKey = {
  service: string;
  key: string;
  connected: boolean;
};

type InstallRequest = {
  skill: string;
  status: "pending" | "installing" | "done" | "failed";
  timestamp: number;
};

const availableSkills = [
  { name: "Notion", description: "Notion integration for notes & databases", category: "Productivity" },
  { name: "Discord", description: "Discord bot & messaging", category: "Communication" },
  { name: "Slack", description: "Slack workspace integration", category: "Communication" },
  { name: "GitHub", description: "GitHub issues & PR automation", category: "Development" },
  { name: "Coding Agent", description: "AI coding assistant", category: "Development" },
  { name: "Spotify", description: "Spotify playback control", category: "Media" },
  { name: "OpenAI Image Gen", description: "Generate images with DALL-E", category: "AI" },
  { name: "TTS (sag)", description: "Text-to-speech with ElevenLabs", category: "AI" },
];

export default function Upgrades() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [showKey, setShowKey] = useState<string | null>(null);
  const [newKey, setNewKey] = useState("");
  const [selectedService, setSelectedService] = useState("shopify");
  const [installRequests, setInstallRequests] = useState<InstallRequest[]>([]);
  const [installingSkill, setInstallingSkill] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    const savedKeys = localStorage.getItem("apiKeys");
    if (savedKeys) setApiKeys(JSON.parse(savedKeys));
    
    const savedRequests = localStorage.getItem("installRequests");
    if (savedRequests) setInstallRequests(JSON.parse(savedRequests));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("apiKeys", JSON.stringify(apiKeys));
  }, [apiKeys]);

  useEffect(() => {
    localStorage.setItem("installRequests", JSON.stringify(installRequests));
  }, [installRequests]);

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

  const requestInstall = (skillName: string) => {
    // Add to install requests
    const request: InstallRequest = {
      skill: skillName,
      status: "pending",
      timestamp: Date.now(),
    };
    setInstallRequests([request, ...installRequests]);
    
    // Simulate installation process
    setInstallingSkill(skillName);
    setTimeout(() => {
      setInstallRequests(prev => prev.map(r => 
        r.timestamp === request.timestamp ? { ...r, status: "installing" } : r
      ));
    }, 1000);
    
    setTimeout(() => {
      setInstallRequests(prev => prev.map(r => 
        r.timestamp === request.timestamp ? { ...r, status: "done" } : r
      ));
      setInstallingSkill(null);
    }, 3000);
  };

  const getInstallStatus = (skillName: string) => {
    return installRequests.find(r => r.skill === skillName);
  };

  const isConnected = (service: string) => apiKeys.some(a => a.service === service && a.connected);

  return (
    <div className="page-container">
      <header style={{ height: "56px", background: "var(--card)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "sticky", top: 0, zIndex: 10 }}>
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
        <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>Connect integrations & install skills</p>

        {/* Install Requests Status */}
        {installRequests.some(r => r.status === "installing") && (
          <div style={{ background: "#22d3ee20", border: "1px solid #22d3ee", borderRadius: "12px", padding: "16px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
            <Loader2 size={18} style={{ color: "#22d3ee", animation: "spin 1s linear infinite" }} />
            <span style={{ color: "#22d3ee" }}>Installing skill...</span>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* API Connections */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Key size={20} style={{ color: "#22d3ee" }} />
            API Connections
          </h2>
          
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
            <button onClick={() => setShowKey(showKey === selectedService ? null : selectedService)} style={{ padding: "12px", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "8px", color: "var(--text-secondary)", cursor: "pointer" }}>
              {showKey === selectedService ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            <button onClick={saveApiKey} style={{ display: "flex", alignItems: "center", gap: "8px", background: "#22d3ee", color: "#0a0a0f", border: "none", borderRadius: "8px", padding: "12px 20px", fontWeight: 600, cursor: "pointer" }}>
              <Check size={18} />
              Connect
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {apiKeys.map((api) => (
              <div key={api.service} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "var(--background)", borderRadius: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {api.service === "shopify" && <ShoppingCart size={20} style={{ color: "#10b981" }} />}
                  {api.service === "stripe" && <CreditCard size={20} style={{ color: "#a855f7" }} />}
                  <div>
                    <div style={{ fontWeight: 600, textTransform: "capitalize" }}>{api.service}</div>
                    <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{api.key.substring(0, 10)}...{api.key.slice(-4)}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#10b981", display: "flex", alignItems: "center", gap: "4px" }}><Check size={14} /> Connected</span>
                  <button onClick={() => removeApiKey(api.service)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "12px" }}>Disconnect</button>
                </div>
              </div>
            ))}
            {apiKeys.length === 0 && <div style={{ textAlign: "center", padding: "24px", color: "var(--text-secondary)" }}>No APIs connected yet</div>}
          </div>
        </div>

        {/* Available Skills */}
        <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>Available Skills (Clawhub)</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
          {availableSkills.map((skill) => {
            const status = getInstallStatus(skill.name);
            return (
              <div key={skill.name} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <Sparkles size={16} style={{ color: "#a855f7" }} />
                  <span style={{ fontWeight: 600 }}>{skill.name}</span>
                </div>
                <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "12px" }}>{skill.description}</p>
                <div style={{ fontSize: "10px", color: "var(--text-secondary)", marginBottom: "8px" }}>{skill.category}</div>
                
                {status?.status === "done" ? (
                  <span style={{ fontSize: "12px", color: "#10b981", display: "flex", alignItems: "center", gap: "4px" }}>
                    <Check size={14} /> Installed
                  </span>
                ) : status?.status === "installing" ? (
                  <span style={{ fontSize: "12px", color: "#22d3ee", display: "flex", alignItems: "center", gap: "4px" }}>
                    <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> Installing...
                  </span>
                ) : (
                  <button
                    onClick={() => requestInstall(skill.name)}
                    disabled={installingSkill !== null}
                    style={{ display: "flex", alignItems: "center", gap: "6px", background: installingSkill ? "var(--background)" : "#22d3ee", color: installingSkill ? "var(--text-secondary)" : "#0a0a0f", border: "none", borderRadius: "6px", padding: "8px 12px", fontSize: "12px", fontWeight: 600, cursor: installingSkill ? "not-allowed" : "pointer" }}
                  >
                    <Download size={14} />
                    Install
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

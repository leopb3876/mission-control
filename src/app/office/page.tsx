"use client";

import { useState } from "react";
import { Monitor, Coffee, Code } from "lucide-react";

type Agent = {
  id: string;
  name: string;
  role: string;
  status: "working" | "idle" | "break" | "offline";
  currentTask?: string;
};

const initialAgents: Agent[] = [];

export default function OfficePage() {
  const [agents] = useState<Agent[]>(initialAgents);

  const statusConfig: Record<string, { color: string; label: string }> = {
    working: { color: "#10b981", label: "Working" },
    idle: { color: "#f59e0b", label: "Idle" },
    break: { color: "#3b82f6", label: "Break" },
    offline: { color: "#6b7280", label: "Offline" },
  };

  return (
    <div style={{ marginLeft: "80px", minHeight: "100vh", background: "#0a0a0f", color: "white" }}>
      {/* Header */}
      <header style={{ height: "56px", background: "#121218", borderBottom: "1px solid #1f1f2e", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "sticky", top: 0 }}>
        <span style={{ fontWeight: 600 }}>Mission Control</span>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#9ca3af" }}>
            <div style={{ width: "8px", height: "8px", background: "#22d3ee", borderRadius: "50%" }} />
            Mori online
          </div>
          <div style={{ width: "32px", height: "32px", background: "linear-gradient(to bottom right, #22d3ee, #a855f7)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "bold" }}>
            L
          </div>
        </div>
      </header>

      <div style={{ padding: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
          <Monitor size={24} style={{ color: "#a855f7" }} />
          Office
        </h1>
        <p style={{ color: "#9ca3af", marginBottom: "32px" }}>Monitor your agents in real-time</p>

        {/* Office View */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
          {/* Mori */}
          <div style={{ background: "#121218", border: "1px solid #1f1f2e", borderRadius: "12px", padding: "20px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: "60px", height: "60px", background: "linear-gradient(to bottom left, #22d3ee20, transparent)", borderRadius: "50%" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ width: "48px", height: "48px", background: "linear-gradient(to bottom right, #22d3ee, #10b981)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>🌿</div>
              <div>
                <div style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                  Mori
                  <Code size={14} style={{ color: "#22d3ee" }} />
                </div>
                <div style={{ fontSize: "12px", color: "#9ca3af" }}>AI Assistant</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981" }} />
              <span style={{ fontSize: "12px", color: "#10b981" }}>Working</span>
            </div>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>Current: Waiting for input</div>
          </div>

          {/* Leo (User) */}
          <div style={{ background: "#121218", border: "1px solid #1f1f2e", borderRadius: "12px", padding: "20px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: "60px", height: "60px", background: "linear-gradient(to bottom left, #a855f720, transparent)", borderRadius: "50%" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ width: "48px", height: "48px", background: "linear-gradient(to bottom right, #a855f7, #ec4899)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "bold" }}>L</div>
              <div>
                <div style={{ fontWeight: 600 }}>Leo</div>
                <div style={{ fontSize: "12px", color: "#9ca3af" }}>Owner</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22d3ee" }} />
              <span style={{ fontSize: "12px", color: "#22d3ee" }}>Online</span>
            </div>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>Using Mission Control</div>
          </div>
        </div>
      </div>
    </div>
  );
}
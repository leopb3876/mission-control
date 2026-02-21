"use client";

import { useState, useEffect } from "react";
import { Monitor, Coffee, Code } from "lucide-react";

type Agent = {
  id: string;
  name: string;
  role: string;
  status: "working" | "idle" | "break" | "offline";
  emoji: string;
  color: string;
};

const agents: Agent[] = [
  { id: "mori", name: "Mori", role: "AI Assistant", status: "working", emoji: "🌿", color: "linear-gradient(135deg, #22d3ee, #10b981)" },
  { id: "leo", name: "Leo", role: "Owner", status: "working", emoji: "👤", color: "linear-gradient(135deg, #a855f7, #ec4899)" },
];

export default function OfficePage() {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const statusConfig: Record<string, { color: string; label: string; animation: string }> = {
    working: { color: "#10b981", label: "Working", animation: "pulse" },
    idle: { color: "#f59e0b", label: "Idle", animation: "bounce" },
    break: { color: "#3b82f6", label: "Break", animation: "wave" },
    offline: { color: "#6b7280", label: "Offline", animation: "none" },
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
        <p style={{ color: "#9ca3af", marginBottom: "24px" }}>Monitor your team in real-time</p>

        {/* Animated Office Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
          gap: "20px",
          position: "relative"
        }}>
          {/* Office Background Effect */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at 50% 50%, #22d3ee08 0%, transparent 50%)",
            pointerEvents: "none",
          }} />

          {agents.map((agent) => {
            const status = statusConfig[agent.status];
            return (
              <div 
                key={agent.id}
                style={{ 
                  background: "#121218", 
                  border: "1px solid #1f1f2e", 
                  borderRadius: "16px", 
                  padding: "24px", 
                  position: "relative",
                  overflow: "hidden",
                  animation: "fadeIn 0.5s ease-out",
                }}
              >
                {/* Glow Effect */}
                <div style={{
                  position: "absolute",
                  top: "-50%",
                  right: "-50%",
                  width: "100%",
                  height: "100%",
                  background: agent.color.replace("135deg", "").replace(",", "").replace(")", ""),
                  opacity: 0.1,
                  borderRadius: "50%",
                  filter: "blur(40px)",
                }} />

                {/* Agent Header */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px", position: "relative" }}>
                  {/* Animated Avatar */}
                  <div style={{
                    width: "64px",
                    height: "64px",
                    background: agent.color,
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "32px",
                    boxShadow: `0 0 20px ${status.color}40`,
                    animation: agent.status === "working" ? "typing 1s ease-in-out infinite" : "bounce 2s ease-in-out infinite",
                  }}>
                    {agent.emoji}
                  </div>
                  
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
                      {agent.name}
                      <Code size={14} style={{ color: status.color }} />
                    </div>
                    <div style={{ fontSize: "12px", color: "#9ca3af" }}>{agent.role}</div>
                  </div>
                </div>

                {/* Status Indicator */}
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "8px", 
                  marginBottom: "12px",
                  padding: "8px 12px",
                  background: "#0a0a0f",
                  borderRadius: "8px",
                }}>
                  <div style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: status.color,
                    boxShadow: `0 0 10px ${status.color}`,
                    animation: "pulse 2s ease-in-out infinite",
                  }} />
                  <span style={{ fontSize: "13px", color: status.color, fontWeight: 500 }}>{status.label}</span>
                </div>

                {/* Activity Bar */}
                {agent.status === "working" && (
                  <div style={{ marginTop: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#6b7280", marginBottom: "6px" }}>
                      <span>Activity</span>
                      <span>Active now</span>
                    </div>
                    <div style={{ 
                      height: "4px", 
                      background: "#1f1f2e", 
                      borderRadius: "2px", 
                      overflow: "hidden" 
                    }}>
                      <div style={{
                        height: "100%",
                        width: "70%",
                        background: `linear-gradient(90deg, ${status.color}, ${status.color}80)`,
                        borderRadius: "2px",
                        animation: "slideRight 2s ease-in-out infinite",
                      }} />
                    </div>
                  </div>
                )}

                {/* Current Task */}
                <div style={{ 
                  marginTop: "16px", 
                  padding: "12px", 
                  background: "#0a0a0f", 
                  borderRadius: "8px",
                  borderLeft: `3px solid ${status.color}`,
                }}>
                  <div style={{ fontSize: "10px", color: "#6b7280", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Current Task
                  </div>
                  <div style={{ fontSize: "13px", color: "#9ca3af" }}>
                    {agent.id === "mori" ? "Waiting for input..." : "Managing Mission Control"}
                  </div>
                </div>

                {/* Time */}
                <div style={{ 
                  position: "absolute", 
                  bottom: "12px", 
                  right: "16px", 
                  fontSize: "10px", 
                  color: "#6b7280" 
                }}>
                  {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            );
          })}
        </div>

        {/* CSS Animations */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.1); }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          @keyframes typing {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes slideRight {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes wave {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-10deg); }
            75% { transform: rotate(10deg); }
          }
        `}</style>
      </div>
    </div>
  );
}
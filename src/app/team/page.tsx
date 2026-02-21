"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bot, Circle } from "lucide-react";

type Agent = {
  id: string;
  name: string;
  role: string;
  status: "active" | "idle";
  description: string;
  avatar: string;
  color: string;
};

export default function TeamPage() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: "mori",
      name: "Mori",
      role: "AI Assistant",
      status: "active",
      description: "Your personal AI assistant - handles research, tasks, reminders, and more",
      avatar: "🌿",
      color: "#00D4FF",
    },
    {
      id: "terry",
      name: "Terry",
      role: "Coding Agent",
      status: "idle",
      description: "Handles all coding tasks using MiniMax M2.5 - builds apps, fixes bugs, and manages your projects",
      avatar: "💻",
      color: "#A855F7",
    },
  ]);

  return (
    <div style={{ marginLeft: "180px", minHeight: "100vh", background: "var(--background)", color: "var(--text-primary)" }}>
      <header style={{ height: "56px", background: "rgba(30, 30, 48, 0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "sticky", top: 0, zIndex: 10 }}>
        <span style={{ fontWeight: 600 }}>Mission Control</span>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--text-secondary)" }}>
            <div style={{ width: "8px", height: "8px", background: "#22d3ee", borderRadius: "50%" }} />
            Mori online
          </div>
          <div style={{ width: "32px", height: "32px", background: "linear-gradient(135deg, #22d3ee, #a855f7)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "bold", color: "white" }}>L</div>
        </div>
      </header>

      <div style={{ padding: "32px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "8px", letterSpacing: "-0.5px" }}>
          Team
        </h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "32px", fontSize: "15px" }}>Your AI assistants</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "20px" }}>
          {agents.map((agent) => (
            <div 
              key={agent.id} 
              style={{ 
                background: "rgba(30, 30, 48, 0.6)", 
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.08)", 
                borderRadius: "20px", 
                padding: "24px",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.3)";
                e.currentTarget.style.borderColor = agent.color + "40";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                <div 
                  style={{ 
                    width: "56px", 
                    height: "56px", 
                    background: `linear-gradient(135deg, ${agent.color}, ${agent.color}80)`,
                    borderRadius: "16px", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    fontSize: "28px",
                    boxShadow: `0 8px 20px ${agent.color}30`,
                  }}
                >
                  {agent.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: "18px", marginBottom: "2px", display: "flex", alignItems: "center", gap: "8px" }}>
                    {agent.name}
                    <Bot size={14} style={{ color: agent.color, opacity: 0.7 }} />
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{agent.role}</div>
                </div>
                <div 
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "6px",
                    padding: "6px 12px",
                    background: agent.status === "active" ? `${agent.color}15` : "rgba(255, 255, 255, 0.05)",
                    borderRadius: "20px",
                    border: `1px solid ${agent.status === "active" ? agent.color + "30" : "rgba(255, 255, 255, 0.1)"}`,
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <Circle 
                      size={8} 
                      fill={agent.status === "active" ? agent.color : "#6b7280"} 
                      color={agent.status === "active" ? agent.color : "#6b7280"}
                      style={agent.status === "active" ? { animation: "pulse 2s infinite" } : {}}
                    />
                  </div>
                  <span style={{ 
                    fontSize: "12px", 
                    color: agent.status === "active" ? agent.color : "#6b7280", 
                    fontWeight: 500,
                    letterSpacing: "0.5px"
                  }}>
                    {agent.status === "active" ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
              <p style={{ 
                fontSize: "14px", 
                color: "var(--text-secondary)", 
                lineHeight: "1.5",
                marginBottom: "16px" 
              }}>
                {agent.description}
              </p>
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "8px",
                paddingTop: "16px",
                borderTop: "1px solid rgba(255, 255, 255, 0.06)"
              }}>
                <div style={{ 
                  width: "32px", 
                  height: "32px", 
                  background: "rgba(255, 255, 255, 0.08)", 
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                </div>
                <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                  {agent.status === "active" ? "Active now" : "Last active 13:04"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

"use client";

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, Bot, RefreshCw } from "lucide-react";

type Agent = {
  id: string;
  name: string;
  role: string;
  status: "active" | "idle";
  description: string;
  avatar: string;
  lastActive?: string;
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
      lastActive: "Just now",
    },
    {
      id: "terry",
      name: "Terry",
      role: "Coding Agent",
      status: "idle",
      description: "Handles all coding tasks using MiniMax M2.5 - builds apps, fixes bugs, and manages your projects",
      avatar: "💻",
      lastActive: "13:04 UTC",
    },
  ]);

  // Simulate real-time status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => {
        if (agent.id === "terry" && agent.status === "active") {
          return { ...agent, lastActive: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + " UTC" };
        }
        return agent;
      }));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const toggleStatus = (id: string) => {
    setAgents(prev => prev.map(agent => 
      agent.id === id 
        ? { ...agent, status: agent.status === "active" ? "idle" : "active", lastActive: "Just now" }
        : agent
    ));
  };

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
          <Users size={24} style={{ color: "#22d3ee" }} />
          Team
        </h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "32px" }}>Your agents & assistants</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
          {agents.map((agent) => (
            <div key={agent.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
                <div style={{ width: "48px", height: "48px", background: "#22d3ee", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
                  {agent.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
                    {agent.name}
                    <Bot size={14} style={{ color: "#22d3ee" }} />
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{agent.role}</div>
                </div>
              </div>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "12px" }}>{agent.description}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: agent.status === "active" ? "#10b981" : "#f59e0b" }} />
                  <span style={{ fontSize: "12px", color: agent.status === "active" ? "#10b981" : "#f59e0b", fontWeight: 500 }}>
                    {agent.status === "active" ? "● Active" : "○ Idle"}
                  </span>
                </div>
                <button 
                  onClick={() => toggleStatus(agent.id)}
                  style={{ display: "flex", alignItems: "center", gap: "4px", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "6px", padding: "6px 10px", fontSize: "11px", color: "var(--text-secondary)", cursor: "pointer" }}
                >
                  <RefreshCw size={12} />
                  Toggle
                </button>
              </div>
              {agent.lastActive && (
                <div style={{ fontSize: "10px", color: "var(--text-secondary)", marginTop: "8px" }}>
                  Last active: {agent.lastActive}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

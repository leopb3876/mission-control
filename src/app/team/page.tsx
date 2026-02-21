import Link from "next/link";
import { Users, Bot } from "lucide-react";

const agents = [
  {
    id: "mori",
    name: "Mori",
    role: "AI Assistant",
    status: "active",
    description: "Your personal AI assistant - handles research, tasks, reminders, and more",
    avatar: "🌿",
  },
];

export default function TeamPage() {
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
          <div style={{ width: "32px", height: "32px", background: "#22d3ee", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "bold" }}>
            L
          </div>
        </div>
      </header>

      <div style={{ padding: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
          <Users size={24} style={{ color: "#22d3ee" }} />
          Team
        </h1>
        <p style={{ color: "#9ca3af", marginBottom: "32px" }}>Your agents & assistants</p>

        {/* Agents Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
          {agents.map((agent) => (
            <div key={agent.id} style={{ background: "#121218", border: "1px solid #1f1f2e", borderRadius: "12px", padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
                <div style={{ width: "48px", height: "48px", background: "#22d3ee", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
                  {agent.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
                    {agent.name}
                    <Bot size={14} style={{ color: "#22d3ee" }} />
                  </div>
                  <div style={{ fontSize: "12px", color: "#9ca3af" }}>{agent.role}</div>
                </div>
              </div>
              <p style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "12px" }}>{agent.description}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: agent.status === "active" ? "#10b981" : "#f59e0b" }} />
                <span style={{ fontSize: "12px", color: "#9ca3af", textTransform: "capitalize" }}>{agent.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Add agents through Mori in chat */}
      </div>
    </div>
  );
}
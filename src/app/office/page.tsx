"use client";

import { useState, useEffect } from "react";

type Agent = {
  id: string;
  name: string;
  emoji: string;
  status: "working" | "idle";
  x: number;
  y: number;
  targetX: number;
  targetY: number;
};

export default function OfficePage() {
  const [agents, setAgents] = useState<Agent[]>([
    { id: "mori", name: "Mori", emoji: "🌿", status: "working", x: 200, y: 250, targetX: 200, targetY: 250 },
    { id: "leo", name: "Leo", emoji: "👤", status: "idle", x: 400, y: 300, targetX: 400, targetY: 300 },
  ]);

  // Simulate random movement for idle agents
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => {
        if (agent.status === "idle") {
          // Random walk
          return {
            ...agent,
            targetX: Math.random() * 500 + 100,
            targetY: Math.random() * 300 + 100,
          };
        }
        return agent;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Smooth movement
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => {
        if (agent.x !== agent.targetX || agent.y !== agent.targetY) {
          const dx = agent.targetX - agent.x;
          const dy = agent.targetY - agent.y;
          return {
            ...agent,
            x: agent.x + dx * 0.1,
            y: agent.y + dy * 0.1,
          };
        }
        return agent;
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ marginLeft: "80px", minHeight: "100vh", background: "#0a0a0f", color: "white" }}>
      {/* Header */}
      <header style={{ height: "56px", background: "#121218", borderBottom: "1px solid #1f1f2e", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "sticky", top: 0, zIndex: 10 }}>
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

      {/* Office View */}
      <div style={{ padding: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>Office</h1>
        <p style={{ color: "#9ca3af", marginBottom: "24px" }}>Your virtual office</p>

        {/* Office Floor */}
        <div style={{
          width: "100%",
          height: "500px",
          background: "linear-gradient(180deg, #121218 0%, #0a0a0f 100%)",
          borderRadius: "16px",
          border: "1px solid #1f1f2e",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Floor Pattern */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(#1f1f2e 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            opacity: 0.5,
          }} />

          {/* Desk 1 - Mori */}
          <div style={{
            position: "absolute",
            left: "150px",
            top: "200px",
            width: "120px",
            height: "60px",
            background: "linear-gradient(180deg, #1f1f2e, #2a2a4e)",
            borderRadius: "8px",
            border: "1px solid #3a3a5e",
          }}>
            {/* Monitor */}
            <div style={{
              position: "absolute",
              top: "-30px",
              left: "30px",
              width: "60px",
              height: "35px",
              background: "#0a0a0f",
              borderRadius: "4px",
              border: "2px solid #3a3a5e",
            }}>
              <div style={{
                position: "absolute",
                inset: "3px",
                background: agent => agents.find(a => a.id === "mori")?.status === "working" ? "#22d3ee" : "#1f1f2e",
                borderRadius: "2px",
                transition: "background 0.3s",
              }} />
            </div>
            {/* Monitor Stand */}
            <div style={{
              position: "absolute",
              top: "5px",
              left: "50px",
              width: "20px",
              height: "10px",
              background: "#3a3a5e",
              borderRadius: "2px",
            }} />
          </div>

          {/* Desk 2 */}
          <div style={{
            position: "absolute",
            left: "350px",
            top: "200px",
            width: "120px",
            height: "60px",
            background: "linear-gradient(180deg, #1f1f2e, #2a2a4e)",
            borderRadius: "8px",
            border: "1px solid #3a3a5e",
          }}>
            <div style={{
              position: "absolute",
              top: "-30px",
              left: "30px",
              width: "60px",
              height: "35px",
              background: "#0a0a0f",
              borderRadius: "4px",
              border: "2px solid #3a3a5e",
            }}>
              <div style={{
                position: "absolute",
                inset: "3px",
                background: "#1f1f2e",
                borderRadius: "2px",
              }} />
            </div>
            <div style={{
              position: "absolute",
              top: "5px",
              left: "50px",
              width: "20px",
              height: "10px",
              background: "#3a3a5e",
              borderRadius: "2px",
            }} />
          </div>

          {/* Plants / Decor */}
          <div style={{ position: "absolute", left: "50px", top: "100px", fontSize: "32px" }}>🌴</div>
          <div style={{ position: "absolute", right: "50px", bottom: "50px", fontSize: "32px" }}>🪴</div>
          <div style={{ position: "absolute", right: "150px", top: "50px", fontSize: "24px" }}>🖼️</div>

          {/* Agents */}
          {agents.map((agent) => (
            <div
              key={agent.id}
              style={{
                position: "absolute",
                left: agent.x,
                top: agent.y,
                transition: "left 0.1s, top 0.1s",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Agent Character */}
              <div style={{
                width: "48px",
                height: "48px",
                background: agent.id === "mori" 
                  ? "linear-gradient(135deg, #22d3ee, #10b981)" 
                  : "linear-gradient(135deg, #a855f7, #ec4899)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                boxShadow: agent.status === "working" 
                  ? "0 0 20px rgba(34, 211, 238, 0.5)" 
                  : "0 0 10px rgba(168, 85, 247, 0.3)",
                animation: agent.status === "idle" ? "bounce 2s ease-in-out infinite" : "float 1s ease-in-out infinite",
              }}>
                {agent.emoji}
              </div>

              {/* Name Tag */}
              <div style={{
                marginTop: "4px",
                padding: "2px 8px",
                background: "#121218",
                borderRadius: "4px",
                fontSize: "10px",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}>
                {agent.name}
              </div>

              {/* Status */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                marginTop: "2px",
              }}>
                <div style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: agent.status === "working" ? "#10b981" : "#f59e0b",
                }} />
                <span style={{ fontSize: "8px", color: "#9ca3af" }}>
                  {agent.status === "working" ? "Working" : "Idle"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: "24px", marginTop: "16px", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#10b981" }} />
            <span style={{ fontSize: "12px", color: "#9ca3af" }}>Working</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#f59e0b" }} />
            <span style={{ fontSize: "12px", color: "#9ca3af" }}>Idle</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
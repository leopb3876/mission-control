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
    { id: "mori", name: "Mori", emoji: "🌿", status: "working", x: 220, y: 280, targetX: 220, targetY: 280 },
    { id: "leo", name: "Leo", emoji: "👤", status: "idle", x: 420, y: 320, targetX: 420, targetY: 320 },
  ]);

  // Simulate random movement for idle agents
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => {
        if (agent.status === "idle") {
          return {
            ...agent,
            targetX: Math.random() * 300 + 150,
            targetY: Math.random() * 200 + 150,
          };
        }
        return agent;
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Smooth movement
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => {
        if (Math.abs(agent.x - agent.targetX) > 1 || Math.abs(agent.y - agent.targetY) > 1) {
          const dx = agent.targetX - agent.x;
          const dy = agent.targetY - agent.y;
          return {
            ...agent,
            x: agent.x + dx * 0.08,
            y: agent.y + dy * 0.08,
          };
        }
        return agent;
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ marginLeft: "80px", minHeight: "100vh", background: "#0a0a0f", color: "white", display: "flex", flexDirection: "column", alignItems: "center", padding: "24px" }}>
      {/* Header */}
      <header style={{ height: "56px", background: "#121218", borderBottom: "1px solid #1f1f2e", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "sticky", top: 0, zIndex: 10, width: "100%", maxWidth: "700px", borderRadius: "12px" }}>
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

      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginTop: "16px", marginBottom: "8px" }}>Office</h1>
      <p style={{ color: "#9ca3af", marginBottom: "16px" }}>Your virtual workspace</p>

      {/* Office Room - Centered Square */}
      <div style={{
        width: "600px",
        height: "500px",
        position: "relative",
        borderRadius: "8px",
        overflow: "hidden",
        border: "4px solid #3a3a5e",
      }}>
        {/* Sky/Wall Background */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, #87ceeb 0%, #b0e0e6 60%)",
        }} />

        {/* Window */}
        <div style={{
          position: "absolute",
          top: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "120px",
          height: "80px",
          background: "#1a1a2e",
          border: "6px solid #5c4033",
          borderRadius: "4px",
        }}>
          {/* Window panes */}
          <div style={{ display: "flex", height: "100%" }}>
            <div style={{ flex: 1, borderRight: "3px solid #5c4033", background: "linear-gradient(135deg, #87ceeb, #add8e6)" }} />
            <div style={{ flex: 1, background: "linear-gradient(135deg, #87ceeb, #add8e6)" }} />
          </div>
          {/* Sun */}
          <div style={{ position: "absolute", top: "10px", right: "15px", width: "20px", height: "20px", background: "#ffd700", borderRadius: "50%", boxShadow: "0 0 20px #ffd700" }} />
        </div>

        {/* Floor - Wood Pattern */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "160px",
          background: "repeating-linear-gradient(90deg, #8b7355 0px, #8b7355 40px, #9c8465 40px, #9c8465 80px)",
        }}>
          {/* Floor highlight */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 0%, #6b5344 100%)", opacity: 0.3 }} />
        </div>

        {/* Baseboard */}
        <div style={{
          position: "absolute",
          bottom: "160px",
          left: 0,
          right: 0,
          height: "12px",
          background: "#5c4033",
        }} />

        {/* Plant on Left */}
        <div style={{ position: "absolute", bottom: "160px", left: "30px" }}>
          {/* Pot */}
          <div style={{ width: "40px", height: "35px", background: "#cd853f", borderRadius: "0 0 8px 8px", marginTop: "-20px" }}>
            <div style={{ width: "46px", height: "8px", background: "#8b4513", borderRadius: "4px", marginTop: "-4px", marginLeft: "-3px" }} />
          </div>
          {/* Leaves */}
          <div style={{ fontSize: "40px", position: "relative", top: "-50px", left: "-5px" }}>🌿</div>
        </div>

        {/* Water Cooler on Right */}
        <div style={{ position: "absolute", bottom: "160px", right: "40px" }}>
          <div style={{ width: "35px", height: "70px", background: "#4a90d9", borderRadius: "4px", position: "relative" }}>
            {/* Bottle */}
            <div style={{ width: "30px", height: "25px", background: "rgba(100, 180, 255, 0.7)", borderRadius: "4px 4px 0 0", position: "absolute", top: "-20px", left: "2px" }} />
            {/* Dispenser */}
            <div style={{ width: "8px", height: "8px", background: "#2c5aa0", borderRadius: "50%", position: "absolute", bottom: "15px", left: "13px" }} />
          </div>
          <div style={{ width: "40px", height: "8px", background: "#3a70b0", borderRadius: "0 0 4px 4px", marginTop: "-2px" }} />
        </div>

        {/* Desk 1 - Mori */}
        <div style={{ position: "absolute", bottom: "140px", left: "150px" }}>
          {/* Desk */}
          <div style={{ width: "100px", height: "45px", background: "#8b4513", borderRadius: "4px" }}>
            <div style={{ position: "absolute", top: "45px", left: "10px", width: "10px", height: "25px", background: "#5c4033" }} />
            <div style={{ position: "absolute", top: "45px", right: "10px", width: "10px", height: "25px", background: "#5c4033" }} />
          </div>
          {/* Monitor */}
          <div style={{ position: "absolute", bottom: "70px", left: "20px", width: "60px", height: "45px", background: "#1a1a2e", borderRadius: "4px", border: "3px solid #3a3a5e" }}>
            <div style={{ 
              position: "absolute", 
              inset: "4px", 
              background: agents.find(a => a.id === "mori")?.status === "working" ? "#22d3ee" : "#0f0f1a",
              borderRadius: "2px",
              transition: "background 0.3s",
            }} />
          </div>
          {/* Monitor Stand */}
          <div style={{ position: "absolute", bottom: "45px", left: "40px", width: "20px", height: "15px", background: "#3a3a5e" }} />
        </div>

        {/* Desk 2 */}
        <div style={{ position: "absolute", bottom: "140px", right: "150px" }}>
          <div style={{ width: "100px", height: "45px", background: "#8b4513", borderRadius: "4px" }}>
            <div style={{ position: "absolute", top: "45px", left: "10px", width: "10px", height: "25px", background: "#5c4033" }} />
            <div style={{ position: "absolute", top: "45px", right: "10px", width: "10px", height: "25px", background: "#5c4033" }} />
          </div>
          <div style={{ position: "absolute", bottom: "70px", left: "20px", width: "60px", height: "45px", background: "#1a1a2e", borderRadius: "4px", border: "3px solid #3a3a5e" }}>
            <div style={{ position: "absolute", inset: "4px", background: "#0f0f1a", borderRadius: "2px" }} />
          </div>
          <div style={{ position: "absolute", bottom: "45px", left: "40px", width: "20px", height: "15px", background: "#3a3a5e" }} />
        </div>

        {/* Wall Decor */}
        <div style={{ position: "absolute", top: "40px", left: "20px", fontSize: "28px" }}>🖼️</div>
        <div style={{ position: "absolute", top: "45px", right: "80px", fontSize: "24px" }}>🕐</div>

        {/* Agents */}
        {agents.map((agent) => (
          <div
            key={agent.id}
            style={{
              position: "absolute",
              left: agent.x,
              top: agent.y,
              transition: "left 0.05s, top 0.05s",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              zIndex: 5,
            }}
          >
            {/* Pixel Art Character */}
            <div style={{
              width: "36px",
              height: "36px",
              background: agent.id === "mori" 
                ? "linear-gradient(135deg, #22d3ee, #10b981)" 
                : "linear-gradient(135deg, #a855f7, #ec4899)",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              imageRendering: "pixelated",
              boxShadow: agent.status === "working" 
                ? "0 0 15px rgba(34, 211, 238, 0.6)" 
                : "0 0 8px rgba(168, 85, 247, 0.4)",
              animation: agent.status === "idle" ? "walk 0.5s steps(2) infinite" : "bounce 1s ease-in-out infinite",
            }}>
              {agent.emoji}
            </div>

            {/* Name Tag */}
            <div style={{
              marginTop: "2px",
              padding: "1px 6px",
              background: "#1a1a2e",
              borderRadius: "3px",
              fontSize: "8px",
              fontWeight: 700,
              whiteSpace: "nowrap",
              letterSpacing: "0.5px",
            }}>
              {agent.name}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: "24px", marginTop: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: "#10b981" }} />
          <span style={{ fontSize: "12px", color: "#9ca3af" }}>Working</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: "#f59e0b" }} />
          <span style={{ fontSize: "12px", color: "#9ca3af" }}>Idle</span>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes walk {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
}
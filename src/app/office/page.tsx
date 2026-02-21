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
  color: string;
};

type Activity = {
  id: number;
  agent: string;
  action: string;
  time: string;
};

export default function OfficePage() {
  const [agents, setAgents] = useState<Agent[]>([
    { id: "mori", name: "Mori", emoji: "🌿", status: "working", x: 160, y: 280, targetX: 160, targetY: 280, color: "#22d3ee" },
    { id: "leo", name: "Leo", emoji: "👤", status: "idle", x: 340, y: 300, targetX: 340, targetY: 300, color: "#a855f7" },
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, agent: "Mori", action: "Processing request...", time: "now" },
    { id: 2, agent: "System", action: "All systems operational", time: "1m ago" },
  ]);

  // Generate desk positions based on agents
  const deskPositions = agents.map((agent, i) => ({
    id: agent.id,
    x: 100 + i * 200,
    y: 220,
    color: agent.color,
  }));

  // Simulate random movement for idle agents
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => {
        if (agent.status === "idle") {
          return {
            ...agent,
            targetX: Math.random() * 300 + 100,
            targetY: Math.random() * 200 + 150,
          };
        }
        return agent;
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Add random activities
  useEffect(() => {
    const actions = [
      { agent: "Mori", action: "Researching..." },
      { agent: "Mori", action: "Processing data..." },
      { agent: "Mori", action: "Waiting for input..." },
      { agent: "Leo", action: "Viewing dashboard" },
    ];
    
    const interval = setInterval(() => {
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      setActivities(prev => [
        { id: Date.now(), agent: randomAction.agent, action: randomAction.action, time: "now" },
        ...prev.slice(0, 4)
      ]);
    }, 5000);

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
    <div style={{ marginLeft: "80px", minHeight: "100vh", background: "#0a0a0f", color: "white", padding: "24px", display: "flex", gap: "24px" }}>
      {/* Header */}
      <header style={{ height: "56px", background: "#121218", borderBottom: "1px solid #1f1f2e", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "sticky", top: 0, zIndex: 10, borderRadius: "12px", marginBottom: "16px", width: "100%" }}>
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

      <div style={{ display: "flex", gap: "24px", width: "100%" }}>
        {/* Office Room - Top Down Pixel Art */}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>Office</h1>
          <p style={{ color: "#9ca3af", marginBottom: "16px" }}>Your virtual workspace</p>

          {/* Office Room - Top Down Pixel Art - Fills available space */}
        <div style={{ 
            flex: 1, 
            height: "450px",
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
            border: "4px solid #2d2d44",
            imageRendering: "pixelated",
          }}>
            {/* Floor - Pixel Art Tile */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: `
                linear-gradient(90deg, #3d3d5c 1px, transparent 1px),
                linear-gradient(#3d3d5c 1px, transparent 1px),
                #2a2a40
              `,
              backgroundSize: "16px 16px",
            }} />

            {/* Plant - Pixel Art */}
            <div style={{ position: "absolute", bottom: "80px", left: "30px" }}>
              {/* Pot */}
              <div style={{ 
                width: "24px", 
                height: "16px", 
                background: "#cd853f",
                clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)"
              }} />
              {/* Leaves - pixelated */}
              <div style={{ 
                position: "absolute", 
                bottom: "12px", 
                left: "-8px",
                fontSize: "28px", 
                imageRendering: "pixelated",
                filter: "saturate(0.8)"
              }}>🌿</div>
            </div>

            {/* Water Cooler - Pixel Art */}
            <div style={{ position: "absolute", bottom: "80px", right: "40px" }}>
              <div style={{ 
                width: "20px", 
                height: "50px", 
                background: "#4a90d9",
                imageRendering: "pixelated"
              }} />
              <div style={{ 
                width: "24px", 
                height: "8px", 
                background: "#3a70b0",
                marginTop: "-2px"
              }} />
            </div>

            {/* Desks with Monitors - Generated for each agent */}
            {deskPositions.map((desk, i) => (
              <div key={desk.id} style={{ position: "absolute", bottom: "120px", left: `${desk.x}px` }}>
                {/* Desk */}
                <div style={{ 
                  width: "80px", 
                  height: "40px", 
                  background: "#5c4033",
                  imageRendering: "pixelated"
                }}>
                  {/* Monitor */}
                  <div style={{ 
                    position: "absolute", 
                    top: "-25px", 
                    left: "20px",
                    width: "40px", 
                    height: "28px", 
                    background: "#1a1a2e",
                    border: "2px solid #3a3a5e"
                  }}>
                    <div style={{ 
                      position: "absolute", 
                      inset: "2px", 
                      background: agents[i]?.status === "working" ? desk.color : "#0f0f1a",
                      transition: "background 0.3s"
                    }} />
                  </div>
                  {/* Stand */}
                  <div style={{ 
                    position: "absolute", 
                    top: "3px", 
                    left: "32px",
                    width: "16px", 
                    height: "8px", 
                    background: "#3a3a5e"
                  }} />
                </div>
              </div>
            ))}

            {/* Wall/Top Border */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "60px",
              background: "linear-gradient(180deg, #1a1a2e 0%, #2a2a40 100%)",
            }}>
              {/* Window */}
              <div style={{
                position: "absolute",
                top: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80px",
                height: "40px",
                background: "#87ceeb",
                border: "3px solid #5c4033",
              }}>
                <div style={{ 
                  position: "absolute", 
                  top: "50%", 
                  left: 0, 
                  right: 0, 
                  height: "2px", 
                  background: "#5c4033" 
                }} />
                <div style={{ 
                  position: "absolute", 
                  top: 0, 
                  bottom: 0, 
                  left: "50%", 
                  width: "2px", 
                  background: "#5c4033" 
                }} />
              </div>
            </div>

            {/* Agents - Pixel Characters */}
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
                {/* Pixel Character */}
                <div style={{
                  width: "32px",
                  height: "32px",
                  background: agent.color,
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  imageRendering: "pixelated",
                  boxShadow: agent.status === "working" 
                    ? `0 0 12px ${agent.color}` 
                    : "none",
                  animation: agent.status === "idle" ? "walk 0.4s steps(2) infinite" : "bounce 0.8s ease-in-out infinite",
                }}>
                  {agent.emoji}
                </div>
                
                {/* Name Tag - Pixel Style */}
                <div style={{
                  marginTop: "2px",
                  padding: "2px 6px",
                  background: "#1a1a2e",
                  borderRadius: "2px",
                  fontSize: "7px",
                  fontWeight: 700,
                  fontFamily: "monospace",
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
              <div style={{ width: "12px", height: "12px", background: "#10b981", borderRadius: "2px" }} />
              <span style={{ fontSize: "12px", color: "#9ca3af" }}>Working</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "12px", height: "12px", background: "#f59e0b", borderRadius: "2px" }} />
              <span style={{ fontSize: "12px", color: "#9ca3af" }}>Idle</span>
            </div>
          </div>
        </div>

        {/* Live Activity Sidebar */}
        <div style={{ width: "260px", background: "#121218", borderRadius: "12px", border: "1px solid #1f1f2e", padding: "16px", height: "fit-content" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", animation: "pulse 2s infinite" }} />
            Live Activity
          </h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {activities.map((activity, index) => (
              <div 
                key={activity.id}
                style={{
                  padding: "12px",
                  background: "#0a0a0f",
                  borderRadius: "8px",
                  borderLeft: `3px solid ${activity.agent === "Mori" ? "#22d3ee" : activity.agent === "Leo" ? "#a855f7" : "#10b981"}`,
                  animation: index === 0 ? "slideIn 0.3s ease-out" : "none",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: activity.agent === "Mori" ? "#22d3ee" : "#a855f7" }}>
                    {activity.agent}
                  </span>
                  <span style={{ fontSize: "10px", color: "#6b7280" }}>{activity.time}</span>
                </div>
                <p style={{ fontSize: "11px", color: "#9ca3af" }}>{activity.action}</p>
              </div>
            ))}
          </div>

          {/* System Status */}
          <div style={{ marginTop: "20px", padding: "12px", background: "#10b98110", borderRadius: "8px", border: "1px solid #10b98130" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#10b981" }}>● System</span>
            </div>
            <p style={{ fontSize: "10px", color: "#9ca3af" }}>All services operational</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes walk {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
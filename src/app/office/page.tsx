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

type Activity = {
  id: number;
  agent: string;
  action: string;
  time: string;
};

export default function OfficePage() {
  const [agents, setAgents] = useState<Agent[]>([
    { id: "mori", name: "Mori", emoji: "🌿", status: "working", x: 180, y: 260, targetX: 180, targetY: 260 },
    { id: "leo", name: "Leo", emoji: "👤", status: "idle", x: 350, y: 280, targetX: 350, targetY: 280 },
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, agent: "Mori", action: "Processing request...", time: "now" },
    { id: 2, agent: "System", action: "All systems operational", time: "1m ago" },
  ]);

  // Simulate random movement for idle agents
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => {
        if (agent.status === "idle") {
          return {
            ...agent,
            targetX: Math.random() * 250 + 120,
            targetY: Math.random() * 180 + 140,
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
        {/* Office Room - Rectangle */}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>Office</h1>
          <p style={{ color: "#9ca3af", marginBottom: "16px" }}>Your virtual workspace</p>

          <div style={{
            width: "100%",
            maxWidth: "700px",
            height: "420px",
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
              top: "25px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "140px",
              height: "90px",
              background: "#1a1a2e",
              border: "6px solid #5c4033",
              borderRadius: "4px",
            }}>
              <div style={{ display: "flex", height: "100%" }}>
                <div style={{ flex: 1, borderRight: "3px solid #5c4033", background: "linear-gradient(135deg, #87ceeb, #add8e6)" }} />
                <div style={{ flex: 1, background: "linear-gradient(135deg, #87ceeb, #add8e6)" }} />
              </div>
              <div style={{ position: "absolute", top: "8px", right: "12px", width: "22px", height: "22px", background: "#ffd700", borderRadius: "50%", boxShadow: "0 0 25px #ffd700" }} />
            </div>

            {/* Floor - Wood Pattern */}
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "140px",
              background: "repeating-linear-gradient(90deg, #8b7355 0px, #8b7355 50px, #9c8465 50px, #9c8465 100px)",
            }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 0%, #6b5344 100%)", opacity: 0.3 }} />
            </div>

            {/* Baseboard */}
            <div style={{
              position: "absolute",
              bottom: "140px",
              left: 0,
              right: 0,
              height: "12px",
              background: "#5c4033",
            }} />

            {/* Plant on Left */}
            <div style={{ position: "absolute", bottom: "140px", left: "40px" }}>
              <div style={{ width: "45px", height: "40px", background: "#cd853f", borderRadius: "0 0 10px 10px", marginTop: "-25px" }}>
                <div style={{ width: "52px", height: "10px", background: "#8b4513", borderRadius: "5px", marginTop: "-5px", marginLeft: "-4px" }} />
              </div>
              <div style={{ fontSize: "45px", position: "relative", top: "-60px", left: "-5px" }}>🌿</div>
            </div>

            {/* Water Cooler on Right */}
            <div style={{ position: "absolute", bottom: "140px", right: "50px" }}>
              <div style={{ width: "40px", height: "80px", background: "#4a90d9", borderRadius: "6px", position: "relative" }}>
                <div style={{ width: "34px", height: "30px", background: "rgba(100, 180, 255, 0.7)", borderRadius: "6px 6px 0 0", position: "absolute", top: "-25px", left: "3px" }} />
                <div style={{ width: "10px", height: "10px", background: "#2c5aa0", borderRadius: "50%", position: "absolute", bottom: "18px", left: "15px" }} />
              </div>
              <div style={{ width: "45px", height: "10px", background: "#3a70b0", borderRadius: "0 0 6px 6px", marginTop: "-3px" }} />
            </div>

            {/* Desk 1 - Mori */}
            <div style={{ position: "absolute", bottom: "115px", left: "120px" }}>
              <div style={{ width: "110px", height: "50px", background: "#8b4513", borderRadius: "4px" }}>
                <div style={{ position: "absolute", top: "50px", left: "12px", width: "12px", height: "30px", background: "#5c4033" }} />
                <div style={{ position: "absolute", top: "50px", right: "12px", width: "12px", height: "30px", background: "#5c4033" }} />
              </div>
              <div style={{ position: "absolute", bottom: "80px", left: "25px", width: "65px", height: "50px", background: "#1a1a2e", borderRadius: "4px", border: "3px solid #3a3a5e" }}>
                <div style={{ 
                  position: "absolute", 
                  inset: "4px", 
                  background: agents.find(a => a.id === "mori")?.status === "working" ? "#22d3ee" : "#0f0f1a",
                  borderRadius: "2px",
                  transition: "background 0.3s",
                }} />
              </div>
              <div style={{ position: "absolute", bottom: "50px", left: "48px", width: "22px", height: "18px", background: "#3a3a5e" }} />
            </div>

            {/* Desk 2 */}
            <div style={{ position: "absolute", bottom: "115px", right: "120px" }}>
              <div style={{ width: "110px", height: "50px", background: "#8b4513", borderRadius: "4px" }}>
                <div style={{ position: "absolute", top: "50px", left: "12px", width: "12px", height: "30px", background: "#5c4033" }} />
                <div style={{ position: "absolute", top: "50px", right: "12px", width: "12px", height: "30px", background: "#5c4033" }} />
              </div>
              <div style={{ position: "absolute", bottom: "80px", left: "25px", width: "65px", height: "50px", background: "#1a1a2e", borderRadius: "4px", border: "3px solid #3a3a5e" }}>
                <div style={{ position: "absolute", inset: "4px", background: "#0f0f1a", borderRadius: "2px" }} />
              </div>
              <div style={{ position: "absolute", bottom: "50px", left: "48px", width: "22px", height: "18px", background: "#3a3a5e" }} />
            </div>

            {/* Wall Decor */}
            <div style={{ position: "absolute", top: "35px", left: "25px", fontSize: "32px" }}>🖼️</div>
            <div style={{ position: "absolute", top: "40px", right: "100px", fontSize: "28px" }}>🕐</div>

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
                <div style={{
                  width: "38px",
                  height: "38px",
                  background: agent.id === "mori" 
                    ? "linear-gradient(135deg, #22d3ee, #10b981)" 
                    : "linear-gradient(135deg, #a855f7, #ec4899)",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  boxShadow: agent.status === "working" 
                    ? "0 0 15px rgba(34, 211, 238, 0.6)" 
                    : "0 0 8px rgba(168, 85, 247, 0.4)",
                  animation: agent.status === "idle" ? "walk 0.5s steps(2) infinite" : "bounce 1s ease-in-out infinite",
                }}>
                  {agent.emoji}
                </div>
                <div style={{
                  marginTop: "2px",
                  padding: "1px 6px",
                  background: "#1a1a2e",
                  borderRadius: "3px",
                  fontSize: "8px",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
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
          50% { transform: translateY(-4px); }
        }
        @keyframes walk {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
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
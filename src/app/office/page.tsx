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

// Pixel art sprite data (simple 8x8 pixel characters)
const createPixelCharacter = (color: string) => (
  <svg width="32" height="32" viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
    <rect x="2" y="0" width="4" height="1" fill={color} />
    <rect x="1" y="1" width="6" height="1" fill={color} />
    <rect x="1" y="2" width="2" height="2" fill={color} />
    <rect x="5" y="2" height="2" width="2" fill={color} />
    <rect x="2" y="3" width="4" height="3" fill={color} />
    <rect x="1" y="4" width="6" height="3" fill={color} />
    <rect x="1" y="6" width="2" height="2" fill={color} />
    <rect x="5" y="6" width="2" height="2" fill={color} />
  </svg>
);

export default function OfficePage() {
  const [agents, setAgents] = useState<Agent[]>([
    { id: "mori", name: "Mori", emoji: "🌿", status: "working", x: 140, y: 300, targetX: 140, targetY: 300, color: "#22d3ee" },
    { id: "leo", name: "Leo", emoji: "👤", status: "idle", x: 380, y: 320, targetX: 380, targetY: 320, color: "#a855f7" },
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, agent: "Mori", action: "Processing request...", time: "now" },
    { id: 2, agent: "System", action: "All systems operational", time: "1m ago" },
  ]);

  // Generate desk positions based on agents
  const deskPositions = agents.map((agent, i) => ({
    id: agent.id,
    x: 80 + i * 220,
    y: 240,
    color: agent.color,
  }));

  // Simulate random movement for idle agents
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => {
        if (agent.status === "idle") {
          return {
            ...agent,
            targetX: Math.random() * 350 + 80,
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
    <div style={{ marginLeft: "80px", height: "100vh", background: "#0a0a0f", color: "white", padding: "24px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <header style={{ height: "56px", background: "#121218", borderBottom: "1px solid #1f1f2e", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", borderRadius: "12px", flexShrink: 0 }}>
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

      {/* Main Content */}
      <div style={{ display: "flex", gap: "24px", flex: 1, overflow: "hidden", marginTop: "16px" }}>
        {/* Office - fills remaining space */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px", flexShrink: 0 }}>Office</h1>
          <p style={{ color: "#9ca3af", marginBottom: "16px", flexShrink: 0 }}>Your virtual workspace</p>

          <div style={{
            flex: 1,
            position: "relative",
            borderRadius: "0px",
            overflow: "hidden",
            border: "4px solid #1a1a2e",
            imageRendering: "pixelated",
          }}>
            {/* Floor - Checkerboard Pixel Pattern */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: `
                repeating-linear-gradient(0deg, #2a2a40 0px, #2a2a40 16px, #1f1f35 16px, #1f1f35 32px),
                repeating-linear-gradient(90deg, #2a2a40 0px, #2a2a40 16px, #1f1f35 16px, #1f1f35 32px)
              `,
              backgroundSize: "32px 32px",
            }} />

            {/* Top Wall */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "50px",
              background: "#1a1a2e",
              borderBottom: "4px solid #0f0f1a",
            }}>
              {/* Pixel Window */}
              <div style={{
                position: "absolute",
                top: "8px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80px",
                height: "34px",
                background: "#5c9ed9",
                border: "4px solid #3d2817",
                imageRendering: "pixelated",
              }}>
                {/* Window cross */}
                <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "4px", background: "#3d2817", transform: "translateY(-50%)" }} />
                <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "4px", background: "#3d2817", transform: "translateX(-50%)" }} />
                {/* Sun pixel */}
                <div style={{ position: "absolute", top: "4px", right: "6px", width: "8px", height: "8px", background: "#ffd700", boxShadow: "0 0 8px #ffd700" }} />
              </div>
            </div>

            {/* Baseboard */}
            <div style={{
              position: "absolute",
              bottom: "80px",
              left: 0,
              right: 0,
              height: "8px",
              background: "#3d2817",
            }} />

            {/* Plant - Pixel Art */}
            <div style={{ position: "absolute", bottom: "84px", left: "24px" }}>
              {/* Pot */}
              <div style={{ 
                width: "28px", 
                height: "16px", 
                background: "#cd853f",
                clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)",
              }} />
              {/* Leaves - pixel blocks */}
              <div style={{ 
                position: "absolute", 
                bottom: "12px", 
                left: "-4px",
                fontSize: "24px", 
                imageRendering: "pixelated",
                filter: "saturate(0.7) contrast(1.2)",
              }}>🌿</div>
            </div>

            {/* Water Cooler - Pixel Art */}
            <div style={{ position: "absolute", bottom: "84px", right: "32px" }}>
              <div style={{ 
                width: "24px", 
                height: "48px", 
                background: "#4a90d9",
                imageRendering: "pixelated",
              }} />
              <div style={{ 
                width: "28px", 
                height: "6px", 
                background: "#3a70b0",
                marginTop: "-2px"
              }} />
            </div>

            {/* Pixel Art Desks */}
            {deskPositions.map((desk) => (
              <div key={desk.id} style={{ position: "absolute", bottom: "100px", left: `${desk.x}px` }}>
                {/* Desk top */}
                <div style={{ 
                  width: "72px", 
                  height: "8px", 
                  background: "#5c4033",
                  imageRendering: "pixelated"
                }} />
                {/* Desk front */}
                <div style={{ 
                  width: "72px", 
                  height: "24px", 
                  background: "#4a332a",
                  marginTop: "2px"
                }} />
                {/* Monitor */}
                <div style={{ 
                  position: "absolute", 
                  bottom: "40px", 
                  left: "16px",
                  width: "40px", 
                  height: "28px", 
                  background: "#1a1a2e",
                  border: "3px solid #2a2a40"
                }}>
                  <div style={{ 
                    position: "absolute", 
                    inset: "3px", 
                    background: deskPositions.find(d => d.id === desk.id)?.color || "#22d3ee",
                    transition: "background 0.3s"
                  }} />
                </div>
                {/* Stand */}
                <div style={{ 
                  position: "absolute", 
                  bottom: "32px", 
                  left: "28px",
                  width: "16px", 
                  height: "8px", 
                  background: "#2a2a40"
                }} />
              </div>
            ))}

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
                {/* Pixel Character Sprite */}
                <svg width="32" height="32" viewBox="0 0 8 8" style={{ imageRendering: "pixelated", filter: agent.status === "working" ? `drop-shadow(0 0 6px ${agent.color})` : "none" }}>
                  {/* Head */}
                  <rect x="2" y="0" width="4" height="2" fill={agent.color} />
                  {/* Eyes */}
                  <rect x="1" y="2" width="2" height="2" fill={agent.color} />
                  <rect x="5" y="2" width="2" height="2" fill={agent.color} />
                  {/* Body */}
                  <rect x="2" y="3" width="4" height="3" fill={agent.color} />
                  {/* Legs */}
                  <rect x="1" y="6" width="2" height="2" fill={agent.color} />
                  <rect x="5" y="6" width="2" height="2" fill={agent.color} />
                </svg>
                
                {/* Name Tag - Pixel Style */}
                <div style={{
                  marginTop: "2px",
                  padding: "2px 6px",
                  background: "#1a1a2e",
                  fontSize: "7px",
                  fontWeight: 700,
                  fontFamily: "monospace",
                  letterSpacing: "0.5px",
                  border: "1px solid #2a2a40",
                }}>
                  {agent.name}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: "24px", marginTop: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "12px", height: "12px", background: "#22d3ee" }} />
              <span style={{ fontSize: "12px", color: "#9ca3af" }}>Working</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "12px", height: "12px", background: "#a855f7" }} />
              <span style={{ fontSize: "12px", color: "#9ca3af" }}>Idle</span>
            </div>
          </div>
        </div>

        {/* Live Activity Sidebar - stretches to bottom */}
        <div style={{ width: "260px", background: "#121218", border: "1px solid #1f1f2e", padding: "16px", display: "flex", flexDirection: "column" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "8px", height: "8px", background: "#10b981" }} />
            Live Activity
          </h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {activities.map((activity, index) => (
              <div 
                key={activity.id}
                style={{
                  padding: "12px",
                  background: "#0a0a0f",
                  borderLeft: `3px solid ${activity.agent === "Mori" ? "#22d3ee" : activity.agent === "Leo" ? "#a855f7" : "#10b981"}`,
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
          <div style={{ marginTop: "20px", padding: "12px", background: "#0a0a0f", border: "1px solid #10b98130" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#10b981" }}>● System</span>
            <p style={{ fontSize: "10px", color: "#9ca3af", marginTop: "4px" }}>All services operational</p>
          </div>
        </div>
      </div>
    </div>
  );
}
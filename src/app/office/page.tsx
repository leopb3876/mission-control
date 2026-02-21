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
    <div style={{ marginLeft: "180px", height: "100vh", background: "#151520", color: "white", padding: "24px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <header style={{ height: "56px", background: "#1e1e30", borderBottom: "1px solid #1f1f2e", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", borderRadius: "12px", flexShrink: 0 }}>
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

            {/* BIG Plant - Pixel Art */}
            <div style={{ position: "absolute", bottom: "84px", left: "20px" }}>
              {/* Big Pot */}
              <div style={{ 
                width: "52px", 
                height: "36px", 
                background: "#cd853f",
                border: "4px solid #8b5a2b",
              }} />
              {/* Big Leaves */}
              <div style={{ 
                position: "absolute", 
                bottom: "30px", 
                left: "-12px",
                fontSize: "64px", 
                imageRendering: "pixelated",
                filter: "saturate(0.8) contrast(1.2)",
              }}>🌿</div>
              <div style={{ 
                position: "absolute", 
                bottom: "45px", 
                left: "25px",
                fontSize: "36px", 
                imageRendering: "pixelated",
                filter: "saturate(0.8)",
              }}>🌱</div>
            </div>

            {/* BIG Water Cooler - Pixel Art */}
            <div style={{ position: "absolute", bottom: "84px", right: "28px" }}>
              {/* Bottle */}
              <div style={{ 
                width: "48px", 
                height: "52px", 
                background: "rgba(100, 180, 255, 0.7)",
                borderRadius: "4px",
                margin: "auto" 
              }} />
              {/* Main Body */}
              <div style={{ 
                width: "56px", 
                height: "72px", 
                background: "#4a90d9",
                border: "4px solid #2c5aa0",
              }} />
              {/* Dispenser */}
              <div style={{ 
                position: "absolute",
                bottom: "60px",
                right: "4px",
                width: "48px", 
                height: "10px", 
                background: "#2c5aa0",
              }} />
            </div>

            {/* BIG Pixel Art Desks */}
            {deskPositions.map((desk) => (
              <div key={desk.id} style={{ position: "absolute", bottom: "90px", left: `${desk.x - 10}px` }}>
                {/* Desk top */}
                <div style={{ 
                  width: "110px", 
                  height: "16px", 
                  background: "#6b4423",
                  border: "4px solid #4a2f17",
                  imageRendering: "pixelated"
                }} />
                {/* Desk legs */}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px", padding: "0 12px" }}>
                  <div style={{ width: "16px", height: "36px", background: "#4a2f17" }} />
                  <div style={{ width: "16px", height: "36px", background: "#4a2f17" }} />
                </div>
                {/* BIG Monitor */}
                <div style={{ 
                  position: "absolute", 
                  bottom: "60px", 
                  left: "20px",
                  width: "70px", 
                  height: "52px", 
                  background: "#1a1a2e",
                  border: "5px solid #2a2a40"
                }}>
                  <div style={{ 
                    position: "absolute", 
                    inset: "5px", 
                    background: deskPositions.find(d => d.id === desk.id)?.color || "#22d3ee",
                    transition: "background 0.3s"
                  }} />
                </div>
                {/* Stand */}
                <div style={{ 
                  position: "absolute", 
                  bottom: "36px", 
                  left: "35px",
                  width: "30px", 
                  height: "16px", 
                  background: "#2a2a40"
                }} />
                {/* Keyboard */}
                <div style={{ 
                  position: "absolute", 
                  bottom: "50px", 
                  left: "30px",
                  width: "50px", 
                  height: "12px", 
                  background: "#3a3a5e",
                  border: "2px solid #2a2a40"
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
                {/* BIG Pixel Character Sprite */}
                <svg width="52" height="56" viewBox="0 0 13 14" style={{ imageRendering: "pixelated", filter: agent.status === "working" ? `drop-shadow(0 0 8px ${agent.color})` : "none" }}>
                  {/* Hair */}
                  <rect x="3" y="0" width="7" height="2" fill={agent.color} />
                  <rect x="2" y="1" width="9" height="1" fill={agent.color} />
                  {/* Face */}
                  <rect x="3" y="2" width="7" height="4" fill="#f4d03f" />
                  {/* Eyes */}
                  <rect x="4" y="3" width="2" height="2" fill="#1a1a2e" />
                  <rect x="8" y="3" width="2" height="2" fill="#1a1a2e" />
                  {/* Body */}
                  <rect x="2" y="6" width="9" height="4" fill={agent.color} opacity={0.9} />
                  {/* Arms */}
                  <rect x="0" y="6" width="2" height="3" fill={agent.color} opacity={0.7} />
                  <rect x="11" y="6" width="2" height="3" fill={agent.color} opacity={0.7} />
                  {/* Legs */}
                  <rect x="3" y="10" width="3" height="3" fill="#4a4a6a" />
                  <rect x="7" y="10" width="3" height="3" fill="#4a4a6a" />
                  {/* Shoes */}
                  <rect x="2" y="12" width="4" height="2" fill="#2a2a40" />
                  <rect x="7" y="12" width="4" height="2" fill="#2a2a40" />
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
                {/* Speech Bubble */}
                <div style={{
                  position: "absolute",
                  top: "-45px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#fff",
                  color: "#1a1a2e",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "9px",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  zIndex: 10,
                }}>
                  {agent.status === "working" ? "💻 Working..." : "🛋️ Idle"}
                  <div style={{
                    position: "absolute",
                    bottom: "-6px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderTop: "6px solid #fff",
                  }} />
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
        <div style={{ width: "260px", background: "#1e1e30", border: "1px solid #2a2a4e", padding: "16px", display: "flex", flexDirection: "column" }}>
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
                  background: "#151520",
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
          <div style={{ marginTop: "20px", padding: "12px", background: "#151520", border: "1px solid #10b98130" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#10b981" }}>● System</span>
            <p style={{ fontSize: "10px", color: "#9ca3af", marginTop: "4px" }}>All services operational</p>
          </div>
        </div>
      </div>
    </div>
  );
}
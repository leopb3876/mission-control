import Link from "next/link";
import { Brain, Search, Tag } from "lucide-react";

const memories = [
  {
    id: "1",
    title: "Mission Control Launched",
    content: "Built and deployed the Mission Control dashboard app for Leo",
    category: "project",
    date: "Feb 21, 2026",
  },
  {
    id: "2",
    title: "AI Supplement Research",
    content: "Researched supplement subscription market - €89-129/month pricing, 60-70% margin",
    category: "business",
    date: "Feb 19, 2026",
  },
];

export default function MemoryPage() {
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
          <Brain size={24} style={{ color: "#a855f7" }} />
          Memory
        </h1>
        <p style={{ color: "#9ca3af", marginBottom: "24px" }}>Your long-term memory store</p>

        {/* Search */}
        <div style={{ position: "relative", maxWidth: "400px", marginBottom: "24px" }}>
          <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: "#6b7280" }} />
          <input
            type="text"
            placeholder="Search memories..."
            style={{ 
              width: "100%", 
              background: "#121218", 
              border: "1px solid #1f1f2e", 
              borderRadius: "10px", 
              padding: "10px 12px 10px 40px", 
              fontSize: "14px", 
              color: "white",
              outline: "none"
            }}
          />
        </div>

        {/* Memories */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
          {memories.map((memory) => (
            <div key={memory.id} style={{ background: "#121218", border: "1px solid #1f1f2e", borderRadius: "12px", padding: "20px" }}>
              <h3 style={{ fontWeight: 600, marginBottom: "8px" }}>{memory.title}</h3>
              <p style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "12px" }}>{memory.content}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "11px", color: "#6b7280" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Tag size={12} />
                  {memory.category}
                </span>
                <span>{memory.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
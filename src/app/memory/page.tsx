"use client";

import { useState, useEffect } from "react";
import { Brain, Plus, Trash2, Search } from "lucide-react";

type Memory = {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
};

export default function MemoryPage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("general");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("memories");
    if (saved) {
      setMemories(JSON.parse(saved));
    } else {
      // Default memories
      setMemories([
        { id: "1", title: "Mission Control Launched", content: "Built and deployed the Mission Control dashboard app for Leo", category: "project", date: "Feb 21, 2026" },
        { id: "2", title: "AI Supplement Research", content: "Researched supplement subscription market - €89-129/month pricing, 60-70% margin", category: "business", date: "Feb 19, 2026" },
      ]);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("memories", JSON.stringify(memories));
  }, [memories]);

  const addMemory = () => {
    if (!newTitle || !newContent) return;
    const memory: Memory = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      category: newCategory,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    setMemories([memory, ...memories]);
    setNewTitle("");
    setNewContent("");
  };

  const deleteMemory = (id: string) => {
    setMemories(memories.filter(m => m.id !== id));
  };

  const filteredMemories = memories.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = ["general", "project", "business", "idea", "note"];
  const categoryColors: Record<string, string> = {
    general: "#6b7280",
    project: "#22d3ee",
    business: "#10b981",
    idea: "#a855f7",
    note: "#f59e0b",
  };

  return (
    <div className="page-container">
      <header style={{ height: "56px", background: "var(--card)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "sticky", top: 0, zIndex: 10 }}>
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
          <Brain size={24} style={{ color: "#a855f7" }} />
          Memory
        </h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>Your persistent memory (saved locally)</p>

        {/* Add Memory */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
          <h3 style={{ fontWeight: 600, marginBottom: "16px" }}>Add Memory</h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <input
              type="text"
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{ flex: 1, minWidth: "200px", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "8px", padding: "12px", color: "var(--text-primary)", fontSize: "14px" }}
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "8px", padding: "12px", color: "var(--text-primary)", fontSize: "14px" }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button
              onClick={addMemory}
              style={{ display: "flex", alignItems: "center", gap: "8px", background: "#22d3ee", color: "#0a0a0f", border: "none", borderRadius: "8px", padding: "12px 20px", fontWeight: 600, cursor: "pointer" }}
            >
              <Plus size={18} />
              Add
            </button>
          </div>
          <textarea
            placeholder="Content..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            style={{ width: "100%", marginTop: "12px", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "8px", padding: "12px", color: "var(--text-primary)", fontSize: "14px", minHeight: "80px", resize: "vertical" }}
          />
        </div>

        {/* Search */}
        <div style={{ position: "relative", maxWidth: "400px", marginBottom: "24px" }}>
          <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "18px", height: "18px", color: "#6b7280" }} />
          <input
            type="text"
            placeholder="Search memories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "100%", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "12px 12px 12px 44px", fontSize: "14px", color: "var(--text-primary)", outline: "none" }}
          />
        </div>

        {/* Memories List */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
          {filteredMemories.map((memory) => (
            <div key={memory.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "8px" }}>
                <span style={{ fontSize: "10px", background: `${categoryColors[memory.category]}20`, color: categoryColors[memory.category], padding: "3px 8px", borderRadius: "4px", textTransform: "capitalize" }}>
                  {memory.category}
                </span>
                <button onClick={() => deleteMemory(memory.id)} style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer" }}>
                  <Trash2 size={14} />
                </button>
              </div>
              <h3 style={{ fontWeight: 600, marginBottom: "8px" }}>{memory.title}</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "12px" }}>{memory.content}</p>
              <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{memory.date}</div>
            </div>
          ))}
        </div>

        {filteredMemories.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
            No memories yet. Add your first one above!
          </div>
        )}
      </div>
    </div>
  );
}

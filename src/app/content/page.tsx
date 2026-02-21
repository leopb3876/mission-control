"use client";

import { useState, useEffect } from "react";
import { FileText, Youtube, Instagram, Send, Plus, Trash2, Calendar, Clock } from "lucide-react";

type ContentItem = {
  id: string;
  title: string;
  platform: "youtube" | "instagram" | "tiktok";
  stage: "idea" | "script" | "filming" | "editing" | "scheduled" | "published";
  description: string;
  scheduledDate?: string;
  scheduledTime?: string;
};

const stages = [
  { id: "idea", label: "Idea", color: "#6b7280" },
  { id: "script", label: "Script", color: "#22d3ee" },
  { id: "filming", label: "Filming", color: "#f59e0b" },
  { id: "editing", label: "Editing", color: "#ec4899" },
  { id: "scheduled", label: "Scheduled", color: "#a855f7" },
  { id: "published", label: "Published", color: "#10b981" },
];

export default function ContentPage() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPlatform, setNewPlatform] = useState<"youtube" | "instagram" | "tiktok">("youtube");
  const [newDescription, setNewDescription] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("content");
    if (saved) {
      setContent(JSON.parse(saved));
    } else {
      setContent([
        { id: "1", title: "TikTok Shop Tutorial", platform: "youtube", stage: "script", description: "How to set up TikTok Shop" },
        { id: "2", title: "Supplement Launch Post", platform: "instagram", stage: "scheduled", description: "Announcement post", scheduledDate: "2026-02-25", scheduledTime: "10:00" },
        { id: "3", title: "Morning Routine Vlog", platform: "tiktok", stage: "idea", description: "Daily routine content" },
      ]);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("content", JSON.stringify(content));
  }, [content]);

  const addContent = () => {
    if (!newTitle.trim()) return;
    const newItem: ContentItem = {
      id: Date.now().toString(),
      title: newTitle,
      platform: newPlatform,
      stage: "idea",
      description: newDescription,
      scheduledDate: newDate || undefined,
      scheduledTime: newTime || undefined,
    };
    setContent([...content, newItem]);
    setNewTitle("");
    setNewDescription("");
    setNewDate("");
    setNewTime("");
    setShowAddForm(false);
  };

  const deleteContent = (id: string) => {
    setContent(content.filter(c => c.id !== id));
  };

  const moveStage = (id: string, direction: "next" | "prev") => {
    setContent(content.map(item => {
      if (item.id === id) {
        const currentIndex = stages.findIndex(s => s.id === item.stage);
        const newIndex = direction === "next" ? Math.min(currentIndex + 1, stages.length - 1) : Math.max(currentIndex - 1, 0);
        const newStage = stages[newIndex].id as ContentItem["stage"];
        
        // Auto-set to scheduled if date/time is provided and moving to scheduled
        if (newStage === "scheduled" && (item.scheduledDate || item.scheduledTime)) {
          return { ...item, stage: newStage };
        }
        return { ...item, stage: newStage };
      }
      return item;
    }));
  };

  const platformIcons: Record<string, any> = {
    youtube: Youtube,
    instagram: Instagram,
    tiktok: Send,
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
              <FileText size={28} style={{ color: "#a855f7" }} />
              Content Pipeline
            </h1>
            <p style={{ color: "var(--text-secondary)" }}>Track & schedule content</p>
          </div>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            style={{ display: "flex", alignItems: "center", gap: "8px", background: "#22d3ee", color: "#0a0a0f", border: "none", padding: "12px 20px", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}
          >
            <Plus size={18} />
            Add Content
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
            <h3 style={{ fontWeight: 600, marginBottom: "16px" }}>New Content</h3>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "12px" }}>
              <input
                type="text"
                placeholder="Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                style={{ flex: 1, minWidth: "200px", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "8px", padding: "12px", color: "var(--text-primary)", fontSize: "14px" }}
              />
              <select
                value={newPlatform}
                onChange={(e) => setNewPlatform(e.target.value as "youtube" | "instagram" | "tiktok")}
                style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "8px", padding: "12px", color: "var(--text-primary)", fontSize: "14px" }}
              >
                <option value="youtube">YouTube</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              style={{ width: "100%", marginBottom: "12px", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "8px", padding: "12px", color: "var(--text-primary)", fontSize: "14px" }}
            />
            <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Calendar size={16} style={{ color: "var(--text-secondary)" }} />
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "8px", padding: "10px", color: "var(--text-primary)", fontSize: "14px" }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Clock size={16} style={{ color: "var(--text-secondary)" }} />
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "8px", padding: "10px", color: "var(--text-primary)", fontSize: "14px" }}
                />
              </div>
              <button
                onClick={addContent}
                style={{ marginLeft: "auto", background: "#22d3ee", color: "#0a0a0f", border: "none", borderRadius: "8px", padding: "12px 24px", fontWeight: 600, cursor: "pointer" }}
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Pipeline */}
        <div style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "16px" }}>
          {stages.map((stage) => {
            const stageContent = content.filter(c => c.stage === stage.id);
            return (
              <div key={stage.id} style={{ minWidth: "260px", flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: stage.color }} />
                  <span style={{ fontWeight: 600, fontSize: "15px" }}>{stage.label}</span>
                  <span style={{ fontSize: "12px", background: "var(--card)", padding: "2px 10px", borderRadius: "6px", color: "var(--text-secondary)" }}>{stageContent.length}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {stageContent.map((item) => {
                    const PlatformIcon = platformIcons[item.platform];
                    return (
                      <div key={item.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                          {item.platform === "youtube" && <Youtube size={16} style={{ color: "#ef4444" }} />}
                          {item.platform === "instagram" && <Instagram size={16} style={{ color: "#ec4899" }} />}
                          {item.platform === "tiktok" && <Send size={16} style={{ color: "#22d3ee" }} />}
                          <span style={{ fontSize: "11px", color: "var(--text-secondary)", textTransform: "capitalize" }}>{item.platform}</span>
                          <button onClick={() => deleteContent(item.id)} style={{ marginLeft: "auto", background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer" }}>
                            <Trash2 size={12} />
                          </button>
                        </div>
                        <h3 style={{ fontWeight: 600, marginBottom: "6px", fontSize: "14px" }}>{item.title}</h3>
                        <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "12px" }}>{item.description}</p>
                        
                        {/* Scheduled time */}
                        {(item.scheduledDate || item.scheduledTime) && (
                          <div style={{ display: "flex", gap: "8px", fontSize: "10px", color: "#a855f7", marginBottom: "12px" }}>
                            <Calendar size={10} />
                            {item.scheduledDate} {item.scheduledTime}
                          </div>
                        )}
                        
                        <div style={{ display: "flex", gap: "6px" }}>
                          <button onClick={() => moveStage(item.id, "prev")} disabled={stage.id === "idea"} style={{ flex: 1, padding: "6px", background: stage.id === "idea" ? "var(--background)" : "var(--background)", border: "1px solid var(--border)", borderRadius: "6px", color: stage.id === "idea" ? "var(--text-secondary)" : "var(--text-primary)", cursor: stage.id === "idea" ? "not-allowed" : "pointer", fontSize: "12px" }}>◀</button>
                          <button onClick={() => moveStage(item.id, "next")} disabled={stage.id === "published"} style={{ flex: 1, padding: "6px", background: stage.id === "published" ? "var(--background)" : "#22d3ee", border: "none", borderRadius: "6px", color: stage.id === "published" ? "var(--text-secondary)" : "#0a0a0f", fontWeight: 600, cursor: stage.id === "published" ? "not-allowed" : "pointer", fontSize: "12px" }}>
                            {stage.id === "published" ? "Done" : "▶ Advance"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  {stageContent.length === 0 && (
                    <div style={{ background: "var(--background)", border: "2px dashed var(--border)", borderRadius: "12px", padding: "24px", textAlign: "center", color: "var(--text-secondary)", fontSize: "12px" }}>
                      No content
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

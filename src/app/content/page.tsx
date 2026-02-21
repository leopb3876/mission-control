"use client";

import { useState } from "react";
import { FileText, Youtube, Instagram, Send, Plus, ArrowRight, ChevronRight } from "lucide-react";

type ContentItem = {
  id: string;
  title: string;
  platform: "youtube" | "instagram" | "tiktok";
  stage: "idea" | "script" | "filming" | "editing" | "scheduled" | "published";
  description: string;
};

const initialContent: ContentItem[] = [
  { id: "1", title: "TikTok Shop Tutorial", platform: "youtube", stage: "script", description: "How to set up TikTok Shop" },
  { id: "2", title: "Supplement Launch Post", platform: "instagram", stage: "scheduled", description: "Announcement post" },
  { id: "3", title: "Morning Routine Vlog", platform: "tiktok", stage: "idea", description: "Daily routine content" },
];

const stages = [
  { id: "idea", label: "Idea", color: "#6b7280" },
  { id: "script", label: "Script", color: "#22d3ee" },
  { id: "filming", label: "Filming", color: "#f59e0b" },
  { id: "editing", label: "Editing", color: "#ec4899" },
  { id: "scheduled", label: "Scheduled", color: "#a855f7" },
  { id: "published", label: "Published", color: "#10b981" },
];

export default function ContentPage() {
  const [content, setContent] = useState<ContentItem[]>(initialContent);

  const moveStage = (id: string, direction: "next" | "prev") => {
    setContent(content.map(item => {
      if (item.id === id) {
        const currentIndex = stages.findIndex(s => s.id === item.stage);
        const newIndex = direction === "next" ? Math.min(currentIndex + 1, stages.length - 1) : Math.max(currentIndex - 1, 0);
        return { ...item, stage: stages[newIndex].id as ContentItem["stage"] };
      }
      return item;
    }));
  };

  return (
    <div style={{ marginLeft: "80px", minHeight: "100vh", background: "#0a0a0f", color: "white" }}>
      <header style={{ height: "56px", background: "#121218", borderBottom: "1px solid #1f1f2e", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "sticky", top: 0 }}>
        <span style={{ fontWeight: 600 }}>Mission Control</span>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#9ca3af" }}>
            <div style={{ width: "8px", height: "8px", background: "#22d3ee", borderRadius: "50%" }} />
            Mori online
          </div>
          <div style={{ width: "32px", height: "32px", background: "linear-gradient(to bottom right, #22d3ee, #a855f7)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "bold" }}>L</div>
        </div>
      </header>

      <div style={{ padding: "24px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
          <FileText size={28} style={{ color: "#a855f7" }} />
          Content Pipeline
        </h1>
        <p style={{ color: "#9ca3af", marginBottom: "24px" }}>Track content from idea to published</p>

        <div style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "16px" }}>
          {stages.map((stage) => {
            const stageContent = content.filter(c => c.stage === stage.id);
            return (
              <div key={stage.id} style={{ minWidth: "260px", flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: stage.color }} />
                  <span style={{ fontWeight: 600, fontSize: "15px" }}>{stage.label}</span>
                  <span style={{ fontSize: "12px", background: "#121218", padding: "2px 10px", borderRadius: "6px", color: "#9ca3af" }}>{stageContent.length}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {stageContent.map((item) => (
                    <div key={item.id} style={{ background: "#121218", border: "1px solid #1f1f2e", borderRadius: "12px", padding: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                        {item.platform === "youtube" && <Youtube size={16} style={{ color: "#ef4444" }} />}
                        {item.platform === "instagram" && <Instagram size={16} style={{ color: "#ec4899" }} />}
                        {item.platform === "tiktok" && <Send size={16} style={{ color: "#22d3ee" }} />}
                        <span style={{ fontSize: "11px", color: "#6b7280", textTransform: "capitalize" }}>{item.platform}</span>
                      </div>
                      <h3 style={{ fontWeight: 600, marginBottom: "6px", fontSize: "14px" }}>{item.title}</h3>
                      <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "12px" }}>{item.description}</p>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={() => moveStage(item.id, "prev")} disabled={stage.id === "idea"} style={{ flex: 1, padding: "6px", background: stage.id === "idea" ? "#1f1f2e" : "#1f1f2e", border: "1px solid #3a3a5e", borderRadius: "6px", color: stage.id === "idea" ? "#4a4a6a" : "#9ca3af", cursor: stage.id === "idea" ? "not-allowed" : "pointer", fontSize: "12px" }}>◀</button>
                        <button onClick={() => moveStage(item.id, "next")} disabled={stage.id === "published"} style={{ flex: 1, padding: "6px", background: stage.id === "published" ? "#1f1f2e" : "#22d3ee", border: "none", borderRadius: "6px", color: stage.id === "published" ? "#4a4a6a" : "#0a0a0f", fontWeight: 600, cursor: stage.id === "published" ? "not-allowed" : "pointer", fontSize: "12px" }}>▶ {stage.id === "published" ? "Done" : "Advance"}</button>
                      </div>
                    </div>
                  ))}
                  {stageContent.length === 0 && (
                    <div style={{ background: "#0a0a0f", border: "2px dashed #1f1f2e", borderRadius: "12px", padding: "24px", textAlign: "center", color: "#4a4a6a", fontSize: "12px" }}>
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

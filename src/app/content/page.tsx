import Link from "next/link";
import { FileText, Youtube, Instagram, Send, Plus } from "lucide-react";

const content = [
  { id: "1", title: "TikTok Shop Tutorial", platform: "youtube", stage: "idea" },
  { id: "2", title: "Supplement Launch Post", platform: "instagram", stage: "scheduled" },
];

const stages = ["idea", "script", "filming", "editing", "scheduled", "published"];

export default function ContentPage() {
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
          <FileText size={24} style={{ color: "#a855f7" }} />
          Content
        </h1>
        <p style={{ color: "#9ca3af", marginBottom: "24px" }}>Manage your content pipeline</p>

        {/* Content Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px", marginBottom: "24px" }}>
          {content.map((item) => (
            <div key={item.id} style={{ background: "#121218", border: "1px solid #1f1f2e", borderRadius: "12px", padding: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                {item.platform === "youtube" && <Youtube size={16} style={{ color: "#ef4444" }} />}
                {item.platform === "instagram" && <Instagram size={16} style={{ color: "#ec4899" }} />}
                <span style={{ fontSize: "11px", color: "#6b7280", textTransform: "capitalize" }}>{item.platform}</span>
              </div>
              <h3 style={{ fontWeight: 500, marginBottom: "8px" }}>{item.title}</h3>
              <span style={{ fontSize: "11px", background: "#1f1f2e", padding: "4px 8px", borderRadius: "4px", color: "#9ca3af", textTransform: "capitalize" }}>
                {item.stage}
              </span>
            </div>
          ))}
        </div>

        <button style={{ display: "flex", alignItems: "center", gap: "6px", background: "transparent", border: "1px dashed #22d3ee", color: "#22d3ee", padding: "12px 24px", borderRadius: "8px", cursor: "pointer" }}>
          <Plus size={16} />
          Add Content
        </button>
      </div>
    </div>
  );
}
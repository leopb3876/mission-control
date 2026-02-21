import Link from "next/link";
import { Rocket, Check, Download, Sparkles } from "lucide-react";

const installedSkills = [
  { name: "gog", description: "Google Workspace CLI (Gmail, Calendar, Drive)", installed: true },
  { name: "summarize", description: "Summarize URLs, PDFs, YouTube videos", installed: true },
  { name: "weather", description: "Weather forecasts (no API key needed)", installed: true },
  { name: "healthcheck", description: "Security audits & system health", installed: true },
  { name: "skill-creator", description: "Create & update AgentSkills", installed: true },
  { name: "Ecommerce", description: "Build & operate online stores", installed: true },
  { name: "Product", description: "Product strategy & launch tools", installed: true },
  { name: "SEO", description: "Search optimization & audits", installed: true },
  { name: "Social Media Scheduler", description: "Plan & organize social content", installed: true },
];

const availableSkills = [
  { name: "Notion", description: "Notion integration for notes & databases", category: "Productivity" },
  { name: "Discord", description: "Discord bot & messaging", category: "Communication" },
  { name: "Slack", description: "Slack workspace integration", category: "Communication" },
  { name: "GitHub", description: "GitHub issues & PR automation", category: "Development" },
  { name: "Coding Agent", description: "AI coding assistant", category: "Development" },
  { name: "Spotify", description: "Spotify playback control", category: "Media" },
  { name: "OpenAI Image Gen", description: "Generate images with DALL-E", category: "AI" },
  { name: "TTS (sag)", description: "Text-to-speech with ElevenLabs", category: "AI" },
  { name: "Calendar", description: "Calendar management", category: "Productivity" },
  { name: "Obsidian", description: "Obsidian vault integration", category: "Productivity" },
];

export default function Upgrades() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "white", marginLeft: "80px" }}>
      {/* Header */}
      <header style={{ height: "56px", background: "#121218", borderBottom: "1px solid #1f1f2e", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "sticky", top: 0 }}>
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

      <div style={{ padding: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
          <Rocket size={24} style={{ color: "#ec4899" }} />
          Upgrades
        </h1>
        <p style={{ color: "#9ca3af", marginBottom: "32px" }}>Extend your Mission Control with skills & capabilities</p>

        {/* Installed Skills */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Check size={20} style={{ color: "#10b981" }} />
            Installed Skills
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
            {installedSkills.map((skill) => (
              <div key={skill.name} style={{ background: "#121218", border: "1px solid #1f1f2e", borderRadius: "12px", padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontWeight: 600, color: "#22d3ee" }}>{skill.name}</span>
                  <Check size={16} style={{ color: "#10b981" }} />
                </div>
                <p style={{ fontSize: "12px", color: "#9ca3af" }}>{skill.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Available Skills */}
        <div>
          <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Sparkles size={20} style={{ color: "#a855f7" }} />
            Available to Install
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
            {availableSkills.map((skill) => (
              <div key={skill.name} style={{ background: "#121218", border: "1px solid #1f1f2e", borderRadius: "12px", padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontWeight: 600 }}>{skill.name}</span>
                  <span style={{ fontSize: "10px", background: "#1f1f2e", padding: "2px 8px", borderRadius: "4px", color: "#9ca3af" }}>{skill.category}</span>
                </div>
                <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "12px" }}>{skill.description}</p>
                <button style={{ display: "flex", alignItems: "center", gap: "4px", background: "transparent", border: "1px solid #22d3ee", color: "#22d3ee", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}>
                  <Download size={12} />
                  Install
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Clawhub */}
        <div style={{ marginTop: "40px", background: "#121218", border: "1px solid #1f1f2e", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>🔗 Clawhub</h2>
          <p style={{ color: "#9ca3af", fontSize: "14px", marginBottom: "16px" }}>
            Discover more skills at <a href="https://clawhub.com" target="_blank" style={{ color: "#22d3ee" }}>clawhub.com</a> — the marketplace for OpenClaw skills
          </p>
          <a href="https://clawhub.com" target="_blank" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#22d3ee", color: "#0a0a0f", padding: "10px 20px", borderRadius: "8px", fontWeight: 600, textDecoration: "none" }}>
            Browse Clawhub
          </a>
        </div>
      </div>
    </div>
  );
}
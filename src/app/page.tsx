import "./globals.css";
import Link from "next/link";
import { LayoutDashboard, CheckSquare, FileText, Calendar, Brain, Users, Building2, TrendingUp, Rocket } from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/content", label: "Content", icon: FileText },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/memory", label: "Memory", icon: Brain },
  { href: "/team", label: "Team", icon: Users },
  { href: "/office", label: "Office", icon: Building2 },
  { href: "/profits", label: "Profits", icon: TrendingUp },
  { href: "/upgrades", label: "Upgrades", icon: Rocket },
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "white", display: "flex" }}>
      {/* Sidebar */}
      <aside style={{ width: "64px", background: "#121218", borderRight: "1px solid #1f1f2e", padding: "12px", display: "flex", flexDirection: "column", position: "fixed", height: "100vh" }}>
        <div style={{ width: "40px", height: "40px", background: "linear-gradient(to bottom right, #22d3ee, #0891b2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
          <span style={{ fontSize: "20px" }}>⚡</span>
        </div>
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                title={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px",
                  borderRadius: "10px",
                  color: "#6b7280",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
              >
                <Icon size={20} />
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", marginLeft: "64px" }}>
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

        {/* Content */}
        <div style={{ flex: 1, padding: "24px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>Welcome back</h1>
          <p style={{ color: "#9ca3af", marginBottom: "24px" }}>Here&apos;s what&apos;s happening with your projects</p>

          {/* Quick Links */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px", marginBottom: "24px" }}>
            {[
              { label: "Tasks", color: "#22d3ee", href: "/tasks" },
              { label: "Content", color: "#a855f7", href: "/content" },
              { label: "Calendar", color: "#f59e0b", href: "/calendar" },
              { label: "Profits", color: "#10b981", href: "/profits" },
              { label: "Upgrades", color: "#ec4899", href: "/upgrades" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  background: `linear-gradient(to bottom right, ${item.color}20, ${item.color}05)`,
                  border: `1px solid ${item.color}30`,
                  borderRadius: "12px",
                  padding: "16px",
                  color: item.color,
                  textDecoration: "none",
                  display: "block",
                }}
              >
                <div style={{ fontWeight: 600, fontSize: "14px" }}>{item.label}</div>
              </Link>
            ))}
          </div>

          {/* Recent Activity */}
          <div style={{ background: "#121218", border: "1px solid #1f1f2e", borderRadius: "12px", padding: "24px" }}>
            <h2 style={{ fontWeight: 600, marginBottom: "16px" }}>Recent Activity</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22d3ee" }} />
                <span style={{ fontSize: "14px", color: "#9ca3af" }}>Mission Control deployed</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981" }} />
                <span style={{ fontSize: "14px", color: "#9ca3af" }}>Research complete: 37 ideas</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#a855f7" }} />
                <span style={{ fontSize: "14px", color: "#9ca3af" }}>Tavily API installed</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
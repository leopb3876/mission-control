import { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { LayoutDashboard, CheckSquare, FileText, Calendar, Brain, Users, TrendingUp, Rocket } from "lucide-react";

export const metadata: Metadata = {
  title: "Mission Control",
  description: "Your personal operating system",
};

const SIDEBAR_WIDTH = 180;

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/content", label: "Content", icon: FileText },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/memory", label: "Memory", icon: Brain },
  { href: "/team", label: "Team", icon: Users },
  { href: "/profits", label: "Profits", icon: TrendingUp },
  { href: "/upgrades", label: "Upgrades", icon: Rocket },
];

function Sidebar() {
  return (
    <aside style={{ width: `${SIDEBAR_WIDTH}px`, background: "#1a1a2e", borderRight: "1px solid #2a2a4e", padding: "16px", display: "flex", flexDirection: "column", position: "fixed", left: 0, top: 0, height: "100vh" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px", padding: "0 8px" }}>
        <div style={{ width: "40px", height: "40px", background: "#22d3ee", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: "20px" }}>⚡</span>
        </div>
        <span style={{ fontSize: "18px", fontWeight: "bold", color: "white" }}>Mission Control</span>
      </div>
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 16px",
                borderRadius: "10px",
                color: "#9ca3af",
                textDecoration: "none",
                transition: "all 0.2s",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#151520", color: "white", minHeight: "100vh" }}>
        <Sidebar />
        {children}
      </body>
    </html>
  );
}

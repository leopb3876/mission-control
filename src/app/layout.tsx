import { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { LayoutDashboard, CheckSquare, FileText, Calendar, Brain, Users, Building2, TrendingUp, Rocket } from "lucide-react";

export const metadata: Metadata = {
  title: "Mission Control",
  description: "Your personal operating system",
};

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

function Sidebar() {
  return (
    <aside style={{ width: "64px", background: "#121218", borderLeft: "1px solid #1f1f2e", padding: "12px", display: "flex", flexDirection: "column", position: "fixed", right: 0, top: 0, height: "100vh" }}>
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
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0a0a0f", color: "white", minHeight: "100vh" }}>
        {children}
        <Sidebar />
      </body>
    </html>
  );
}
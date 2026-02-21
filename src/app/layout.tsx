import { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { LayoutDashboard, CheckSquare, FileText, Calendar, Brain, Users, TrendingUp, Rocket, Clock, Settings } from "lucide-react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

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
  { href: "/time", label: "Time", icon: Clock },
  { href: "/profits", label: "Profits", icon: TrendingUp },
  { href: "/upgrades", label: "Upgrades", icon: Rocket },
  { href: "/settings", label: "Settings", icon: Settings },
];

function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sidebar-desktop" style={{ width: `${SIDEBAR_WIDTH}px`, background: "var(--card)", borderRight: "1px solid var(--border)", padding: "16px", display: "flex", flexDirection: "column", position: "fixed", left: 0, top: 0, height: "100vh", zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px", padding: "0 8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", background: "var(--primary)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "20px" }}>⚡</span>
            </div>
            <span style={{ fontSize: "18px", fontWeight: "bold", color: "var(--text-primary)" }}>Mission</span>
          </div>
          <ThemeToggle />
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
                  color: "var(--text-secondary)",
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

      {/* Mobile Bottom Nav */}
      <nav className="mobile-nav" style={{ display: "none" }}>
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.label} href={item.href}>
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.add('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body style={{ margin: 0, background: "var(--background)", color: "var(--text-primary)", minHeight: "100vh" }}>
        <ThemeProvider>
          <Sidebar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

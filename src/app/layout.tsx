"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  CheckSquare,
  FileText,
  Calendar,
  Brain,
  Users,
  Building2,
  TrendingUp,
  Zap,
  Rocket,
} from "lucide-react";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0f] text-white antialiased">
        <div className="min-h-screen">
          {/* Sidebar */}
          <aside className="fixed left-0 top-0 h-full w-16 bg-[#121218] border-r border-[#1f1f2e] flex flex-col z-50">
            <div className="p-3 border-b border-[#1f1f2e]">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
            </div>
            <nav className="flex-1 py-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-center p-3 mx-2 rounded-xl mb-1 transition-all text-gray-500 hover:bg-[#1f1f2e] hover:text-gray-300"
                    title={item.label}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="ml-16">
            {/* Header */}
            <header className="h-14 bg-[#121218] border-b border-[#1f1f2e] flex items-center justify-between px-6 sticky top-0 z-40">
              <h1 className="text-base font-semibold">Mission Control</h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="text-xs text-gray-400">Mori online</span>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
                  L
                </div>
              </div>
            </header>

            {/* Page Content */}
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
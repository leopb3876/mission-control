"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Moon,
  Sun,
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
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-[#0a0a0f] dark:bg-[#0a0a0f] bg-white transition-colors duration-300">
        {/* Sidebar - Icons Only, Always Visible */}
        <aside className="fixed left-0 top-0 h-full w-16 bg-[#121218] dark:bg-[#121218] border-r border-[#1f1f2e] dark:border-[#1f1f2e] flex flex-col z-50">
          {/* Logo */}
          <div className="p-3 border-b border-[#1f1f2e]">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 py-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-center p-3 mx-2 rounded-xl mb-1 transition-all ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-400"
                      : "text-gray-500 hover:bg-[#1f1f2e] hover:text-gray-300"
                  }`}
                  title={item.label}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
          </nav>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center justify-center p-3 mx-2 mb-2 text-gray-500 hover:bg-[#1f1f2e] hover:text-gray-300 rounded-xl transition-all"
            title={darkMode ? "Light Mode" : "Dark Mode"}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </aside>

        {/* Main Content */}
        <main className="ml-16 transition-all duration-300">
          {/* Header */}
          <header className="h-14 bg-[#121218] dark:bg-[#121218] border-b border-[#1f1f2e] flex items-center justify-between px-6 sticky top-0 z-40">
            <h1 className="text-base font-semibold text-white dark:text-white text-gray-900">
              {navItems.find((n) => n.href === pathname)?.label || "Dashboard"}
            </h1>
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
    </div>
  );
}
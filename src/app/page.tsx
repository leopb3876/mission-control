"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckSquare,
  FileText,
  Calendar,
  Brain,
  TrendingUp,
  Rocket,
} from "lucide-react";

export default function Home() {
  const quickLinks = [
    { href: "/tasks", label: "Tasks", icon: CheckSquare, color: "cyan" },
    { href: "/content", label: "Content", icon: FileText, color: "purple" },
    { href: "/calendar", label: "Calendar", icon: Calendar, color: "amber" },
    { href: "/profits", label: "Profits", icon: TrendingUp, color: "emerald" },
    { href: "/upgrades", label: "Upgrades", icon: Rocket, color: "pink" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
        <p className="text-gray-400">Here's what's happening with your projects</p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          const colors: Record<string, string> = {
            cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-400",
            purple: "from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-400",
            amber: "from-amber-500/20 to-amber-500/5 border-amber-500/30 text-amber-400",
            emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-400",
            pink: "from-pink-500/20 to-pink-500/5 border-pink-500/30 text-pink-400",
          };
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`bg-gradient-to-br ${colors[link.color]} border rounded-xl p-4 hover:scale-[1.02] transition-transform`}
            >
              <Icon className="w-5 h-5 mb-2" />
              <div className="font-medium text-sm">{link.label}</div>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-[#121218] border border-[#1f1f2e] rounded-xl p-6">
        <h2 className="font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-sm text-gray-400">Mission Control deployed</span>
            <span className="text-xs text-gray-600 ml-auto">Just now</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-sm text-gray-400">Research complete: 37 ideas</span>
            <span className="text-xs text-gray-600 ml-auto">Today</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <span className="text-sm text-gray-400">Tavily API installed</span>
            <span className="text-xs text-gray-600 ml-auto">Today</span>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="mt-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-6">
        <h3 className="font-semibold mb-2">🚀 Getting Started</h3>
        <p className="text-sm text-gray-400 mb-4">Here are some things you can do:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <a href="/tasks" className="text-cyan-400 hover:underline">→ Create your first task</a>
          <a href="/content" className="text-cyan-400 hover:underline">→ Add content to pipeline</a>
          <a href="/upgrades" className="text-cyan-400 hover:underline">→ Check out upgrades</a>
          <a href="/team" className="text-cyan-400 hover:underline">→ Create an agent</a>
        </div>
      </div>
    </div>
  );
}
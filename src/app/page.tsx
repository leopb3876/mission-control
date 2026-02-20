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
  ChevronLeft,
  ChevronRight,
  Zap,
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
];

export default function Home() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`${collapsed ? "w-16" : "w-60"} bg-card border-r border-border flex flex-col transition-all duration-300 fixed h-full z-50`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">Mission Control</span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 mx-auto bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-gray-400 hover:bg-border hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-3 border-t border-border text-gray-400 hover:text-white transition-colors flex items-center justify-center"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${collapsed ? "ml-16" : "ml-60"} transition-all duration-300`}>
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
          <h1 className="text-xl font-semibold">
            {navItems.find((n) => n.href === pathname)?.label || "Dashboard"}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-dot" />
              <span className="text-sm text-gray-400">Mori is online</span>
            </div>
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-sm font-bold">
              L
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              label="Active Tasks"
              value="12"
              sublabel="3 urgent"
              color="primary"
            />
            <StatCard
              label="Content in Pipeline"
              value="8"
              sublabel="2 scheduled"
              color="secondary"
            />
            <StatCard
              label="This Month Revenue"
              value="$2,450"
              sublabel="+12% vs last"
              color="success"
            />
            <StatCard
              label="Active Ventures"
              value="3"
              sublabel="Research, Discord, SaaS"
              color="warning"
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Tasks */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent Tasks</h2>
                <Link href="/tasks" className="text-primary text-sm hover:underline">
                  View all
                </Link>
              </div>
              <div className="space-y-3">
                <TaskPreview
                  title="Research TikTok Shop products"
                  assignee="mori"
                  status="in_progress"
                  priority="high"
                />
                <TaskPreview
                  title="Build landing page"
                  assignee="leo"
                  status="todo"
                  priority="medium"
                />
                <TaskPreview
                  title="Set up Discord monetization"
                  assignee="mori"
                  status="done"
                  priority="low"
                />
              </div>
            </div>

            {/* Content Pipeline */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Content Pipeline</h2>
                <Link href="/content" className="text-primary text-sm hover:underline">
                  View all
                </Link>
              </div>
              <div className="space-y-3">
                <ContentPreview
                  title="How to Start a Discord Community"
                  stage="script"
                  platform="youtube"
                />
                <ContentPreview
                  title="Best AI Tools for Students"
                  stage="editing"
                  platform="tiktok"
                />
                <ContentPreview
                  title="Weekly Crypto Trends"
                  stage="scheduled"
                  platform="newsletter"
                />
              </div>
            </div>
          </div>

          {/* Upcoming */}
          <div className="mt-6 card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Upcoming Events</h2>
              <Link href="/calendar" className="text-primary text-sm hover:underline">
                View calendar
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <EventCard
                title="Research Cron"
                time="Tomorrow, 10:30 AM"
                type="cron"
                color="secondary"
              />
              <EventCard
                title="Content Review: Discord Video"
                time="Tomorrow, 2:00 PM"
                type="content"
                color="primary"
              />
              <EventCard
                title="Weekly Trend Report"
                time="Monday, 9:00 AM"
                type="task"
                color="warning"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  sublabel,
  color,
}: {
  label: string;
  value: string;
  sublabel: string;
  color: "primary" | "secondary" | "success" | "warning";
}) {
  const colors = {
    primary: "text-primary",
    secondary: "text-secondary",
    success: "text-success",
    warning: "text-warning",
  };
  return (
    <div className="card p-4">
      <div className="text-sm text-gray-400 mb-1">{label}</div>
      <div className={`text-2xl font-bold ${colors[color]}`}>{value}</div>
      <div className="text-xs text-gray-500">{sublabel}</div>
    </div>
  );
}

function TaskPreview({
  title,
  assignee,
  status,
  priority,
}: {
  title: string;
  assignee: string;
  status: string;
  priority: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-background rounded-lg">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${
          status === "done" ? "bg-success" : status === "in_progress" ? "bg-primary" : "bg-gray-500"
        }`} />
        <span className="text-sm truncate max-w-[180px]">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs px-2 py-0.5 rounded status-${status.replace("_", "-")}`}>
          {status.replace("_", " ")}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded priority-${priority}`}>
          {assignee}
        </span>
      </div>
    </div>
  );
}

function ContentPreview({
  title,
  stage,
  platform,
}: {
  title: string;
  stage: string;
  platform: string;
}) {
  return (
    <div className={`flex items-center justify-between p-3 bg-background rounded-lg stage-${stage}`}>
      <div className="flex items-center gap-3">
        <span className="text-xs uppercase px-2 py-0.5 bg-card rounded">{platform}</span>
        <span className="text-sm truncate max-w-[160px]">{title}</span>
      </div>
      <span className="text-xs text-gray-400 capitalize">{stage.replace("_", " ")}</span>
    </div>
  );
}

function EventCard({
  title,
  time,
  type,
  color,
}: {
  title: string;
  time: string;
  type: string;
  color: string;
}) {
  const colors = {
    primary: "border-primary/30 bg-primary/5",
    secondary: "border-secondary/30 bg-secondary/5",
    success: "border-success/30 bg-success/5",
    warning: "border-warning/30 bg-warning/5",
  };
  return (
    <div className={`p-4 rounded-lg border ${colors[color as keyof typeof colors]}`}>
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-gray-400 mt-1">{time}</div>
      <div className="text-xs text-gray-500 mt-1 capitalize">{type}</div>
    </div>
  );
}

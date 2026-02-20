"use client";

import { useState } from "react";
import {
  Monitor,
  Activity,
  Clock,
  Zap,
  Coffee,
  Code,
  PenTool,
  Search,
} from "lucide-react";

type WorkspaceAgent = {
  id: string;
  name: string;
  role: string;
  status: "working" | "idle" | "break" | "offline";
  currentTask?: string;
  lastActivity?: string;
  activityLog: { time: string; action: string }[];
};

const initialWorkspaces: WorkspaceAgent[] = [
  {
    id: "1",
    name: "Mori",
    role: "General",
    status: "working",
    currentTask: "Researching dropshipping products",
    lastActivity: "2 mins ago",
    activityLog: [
      { time: "10:28 AM", action: "Updated task: Research TikTok Shop" },
      { time: "10:25 AM", action: "Completed research: Discord monetization" },
      { time: "10:20 AM", action: "Started task: Product research" },
    ],
  },
  {
    id: "2",
    name: "Research Agent",
    role: "Researcher",
    status: "working",
    currentTask: "Analyzing TikTok Shop trends",
    lastActivity: "5 mins ago",
    activityLog: [
      { time: "10:25 AM", action: "Searching for trending products" },
      { time: "10:15 AM", action: "Compiling market data" },
    ],
  },
  {
    id: "3",
    name: "Content Writer",
    role: "Writer",
    status: "idle",
    lastActivity: "1 hour ago",
    activityLog: [
      { time: "9:30 AM", action: "Completed script for Discord video" },
    ],
  },
  {
    id: "4",
    name: "Developer",
    role: "Developer",
    status: "working",
    currentTask: "Building Mission Control app",
    lastActivity: "1 min ago",
    activityLog: [
      { time: "10:28 AM", action: "Writing Calendar component" },
      { time: "10:20 AM", action: "Created Tasks page" },
      { time: "10:10 AM", action: "Set up NextJS project" },
    ],
  },
  {
    id: "5",
    name: "Designer",
    role: "Designer",
    status: "break",
    lastActivity: "30 mins ago",
    activityLog: [
      { time: "9:45 AM", action: "Created thumbnail for YouTube" },
    ],
  },
  {
    id: "6",
    name: "System",
    role: "Automation",
    status: "working",
    currentTask: "Running scheduled tasks",
    lastActivity: "1 min ago",
    activityLog: [
      { time: "10:30 AM", action: "Heartbeat check completed" },
      { time: "9:00 AM", action: "Morning research completed" },
    ],
  },
];

const statusConfig = {
  working: { color: "bg-success", label: "Working", icon: Activity },
  idle: { color: "bg-warning", label: "Idle", icon: Coffee },
  break: { color: "bg-blue-400", label: "On Break", icon: Coffee },
  offline: { color: "bg-gray-500", label: "Offline", icon: Monitor },
};

export default function OfficePage() {
  const [workspaces] = useState<WorkspaceAgent[]>(initialWorkspaces);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Office View</h1>
            <p className="text-gray-400 text-sm mt-1">
              Real-time view of all agents at work
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-success" />
              <span className="text-sm">{workspaces.filter((w) => w.status === "working").length} working</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-sm">Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Office Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.map((workspace) => {
            const StatusIcon = statusConfig[workspace.status].icon;
            return (
              <div
                key={workspace.id}
                className="card overflow-hidden"
              >
                {/* Workspace Header */}
                <div className="p-4 border-b border-border bg-gradient-to-r from-card to-background">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                          <span className="text-lg font-bold">{workspace.name.charAt(0)}</span>
                        </div>
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
                            statusConfig[workspace.status].color
                          }`}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{workspace.name}</h3>
                        <span className="text-xs text-gray-400">{workspace.role}</span>
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${
                        statusConfig[workspace.status].color
                      } bg-opacity-20 ${statusConfig[workspace.status].color.replace("bg-", "text-")}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {statusConfig[workspace.status].label}
                    </div>
                  </div>
                </div>

                {/* Current Task */}
                <div className="p-4">
                  {workspace.currentTask ? (
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 mb-1">Current Task</div>
                      <div className="text-sm font-medium flex items-start gap-2">
                        <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {workspace.currentTask}
                      </div>
                    </div>
                  ) : (
                    <div className="mb-4 text-sm text-gray-500 italic">
                      No active task
                    </div>
                  )}

                  <div className="text-xs text-gray-500 mb-2">
                    Last activity: {workspace.lastActivity}
                  </div>

                  {/* Activity Log */}
                  <div className="border-t border-border pt-3">
                    <div className="text-xs text-gray-500 mb-2">Recent Activity</div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {workspace.activityLog.map((log, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                          <Clock className="w-3 h-3 text-gray-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-400">{log.time}</span>
                          <span className="text-gray-300">{log.action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="px-4 py-2 bg-background flex items-center justify-between text-xs">
                  <span className="text-gray-500">Workspace #{workspace.id}</span>
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        workspace.status === "working"
                          ? "bg-success animate-pulse"
                          : workspace.status === "idle"
                          ? "bg-warning"
                          : workspace.status === "break"
                          ? "bg-blue-400"
                          : "bg-gray-500"
                      }`}
                    />
                    <span className="text-gray-500 capitalize">{workspace.status}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          <div className="card p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-success" />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {workspaces.filter((w) => w.status === "working").length}
              </div>
              <div className="text-xs text-gray-400">Working</div>
            </div>
          </div>
          <div className="card p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
              <Coffee className="w-5 h-5 text-warning" />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {workspaces.filter((w) => w.status === "idle").length}
              </div>
              <div className="text-xs text-gray-400">Idle</div>
            </div>
          </div>
          <div className="card p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-400/20 rounded-lg flex items-center justify-center">
              <Coffee className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {workspaces.filter((w) => w.status === "break").length}
              </div>
              <div className="text-xs text-gray-400">On Break</div>
            </div>
          </div>
          <div className="card p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-500/20 rounded-lg flex items-center justify-center">
              <Monitor className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {workspaces.filter((w) => w.status === "offline").length}
              </div>
              <div className="text-xs text-gray-400">Offline</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

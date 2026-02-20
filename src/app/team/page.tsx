"use client";

import { useState } from "react";
import {
  Plus,
  User,
  Code,
  PenTool,
  Palette,
  Search,
  MoreHorizontal,
  Activity,
  Clock,
  Zap,
} from "lucide-react";

type Agent = {
  id: string;
  name: string;
  role: "developer" | "writer" | "designer" | "researcher" | "manager" | "general";
  status: "active" | "idle" | "working" | "offline";
  description: string;
  capabilities: string[];
  currentTask?: string;
  avatar?: string;
};

const initialAgents: Agent[] = [
  {
    id: "1",
    name: "Mori",
    role: "general",
    status: "active",
    description: "Primary AI assistant. Handles research, automation, business planning, and general tasks.",
    capabilities: [
      "Research",
      "Automation",
      "Business Planning",
      "Web Search",
      "Memory Management",
    ],
    currentTask: "Researching dropshipping products",
  },
  {
    id: "2",
    name: "Research Agent",
    role: "researcher",
    status: "working",
    description: "Dedicated research agent for deep dives into business ideas and market analysis.",
    capabilities: ["Market Research", "Competitor Analysis", "Data Collection", "Trend Analysis"],
    currentTask: "Analyzing TikTok Shop trends",
  },
  {
    id: "3",
    name: "Content Writer",
    role: "writer",
    status: "idle",
    description: "Specialized in creating scripts, blog posts, and newsletter content.",
    capabilities: ["Script Writing", "Blog Posts", "Newsletters", "Copywriting"],
  },
  {
    id: "4",
    name: "Developer",
    role: "developer",
    status: "active",
    description: "Handles code-related tasks and technical implementation.",
    capabilities: ["Web Development", "API Integration", "Automation Scripts", "No-Code Builds"],
  },
  {
    id: "5",
    name: "Designer",
    role: "designer",
    status: "offline",
    description: "Creates thumbnails, visuals, and design assets.",
    capabilities: ["Thumbnail Design", "Visual Assets", "Brand Design", "Canva Templates"],
  },
];

const roleIcons = {
  developer: Code,
  writer: PenTool,
  designer: Palette,
  researcher: Search,
  manager: User,
  general: User,
};

const roleColors = {
  developer: "text-green-400 bg-green-400/10",
  writer: "text-blue-400 bg-blue-400/10",
  designer: "text-pink-400 bg-pink-400/10",
  researcher: "text-purple-400 bg-purple-400/10",
  manager: "text-yellow-400 bg-yellow-400/10",
  general: "text-cyan-400 bg-cyan-400/10",
};

const statusColors = {
  active: "bg-success",
  idle: "bg-warning",
  working: "bg-primary animate-pulse",
  offline: "bg-gray-500",
};

export default function TeamPage() {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [filterRole, setFilterRole] = useState<string>("all");

  const filteredAgents = agents.filter(
    (agent) => filterRole === "all" || agent.role === filterRole
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Team Structure</h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage agents and their responsibilities
            </p>
          </div>
          <button className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
            Add Agent
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterRole("all")}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              filterRole === "all"
                ? "bg-primary text-black"
                : "bg-background text-gray-400 hover:text-white"
            }`}
          >
            All
          </button>
          {Object.keys(roleIcons).map((role) => (
            <button
              key={role}
              onClick={() => setFilterRole(role)}
              className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-colors ${
                filterRole === role
                  ? "bg-primary text-black"
                  : "bg-background text-gray-400 hover:text-white"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Team Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => {
            const RoleIcon = roleIcons[agent.role];
            return (
              <div key={agent.id} className="card p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-lg font-bold">
                      {agent.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{agent.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded ${roleColors[agent.role]}`}>
                        {agent.role}
                      </span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-white">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm text-gray-400 mb-4">{agent.description}</p>

                {/* Status */}
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-2 h-2 rounded-full ${statusColors[agent.status]}`} />
                  <span className="text-sm capitalize">{agent.status}</span>
                  {agent.currentTask && (
                    <span className="text-xs text-gray-500 ml-auto truncate max-w-[120px]">
                      {agent.currentTask}
                    </span>
                  )}
                </div>

                {/* Capabilities */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {agent.capabilities.map((cap) => (
                    <span
                      key={cap}
                     -xs px-2 py-0. className="text5 bg-background rounded text-gray-400"
                    >
                      {cap}
                    </span>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-border">
                  <button className="flex-1 text-xs py-1.5 bg-background rounded hover:bg-border transition-colors">
                    View Tasks
                  </button>
                  <button className="flex-1 text-xs py-1.5 bg-background rounded hover:bg-border transition-colors">
                    Send Message
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-primary">{agents.length}</div>
            <div className="text-sm text-gray-400">Total Agents</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-success">
              {agents.filter((a) => a.status === "active" || a.status === "working").length}
            </div>
            <div className="text-sm text-gray-400">Active</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-warning">
              {agents.filter((a) => a.status === "working").length}
            </div>
            <div className="text-sm text-gray-400">Working</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-gray-400">
              {agents.filter((a) => a.status === "idle").length}
            </div>
            <div className="text-sm text-gray-400">Idle</div>
          </div>
        </div>
      </div>
    </div>
  );
}

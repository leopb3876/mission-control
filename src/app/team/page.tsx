"use client";

import { useState } from "react";
import { Plus, Code, PenTool, Palette, Search, User } from "lucide-react";

type Agent = {
  id: string;
  name: string;
  role: string;
  status: "active" | "idle" | "offline";
  description: string;
};

const initialAgents: Agent[] = [];

const roleIcons: Record<string, any> = {
  developer: Code,
  writer: PenTool,
  designer: Palette,
  researcher: Search,
  general: User,
};

export default function TeamPage() {
  const [agents] = useState<Agent[]>(initialAgents);

  const statusColors = {
    active: "bg-emerald-400",
    idle: "bg-amber-400",
    offline: "bg-gray-500",
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Team</h1>
          <p className="text-gray-400">Manage your agents</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black rounded-lg font-medium hover:bg-cyan-400 transition-colors">
          <Plus className="w-4 h-4" />
          Add Agent
        </button>
      </div>

      {agents.length === 0 ? (
        <div className="bg-[#121218] border border-[#1f1f2e] rounded-2xl p-12 text-center">
          <div className="w-20 h-20 bg-[#1f1f2e] rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <User className="w-10 h-10 text-gray-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No Agents Yet</h2>
          <p className="text-gray-400 mb-6">Create agents to help you with tasks</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => {
            const RoleIcon = roleIcons[agent.role] || User;
            return (
              <div key={agent.id} className="bg-[#121218] border border-[#1f1f2e] rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-lg font-bold">
                    {agent.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{agent.name}</h3>
                    <span className="text-xs text-gray-400 capitalize">{agent.role}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-4">{agent.description}</p>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${statusColors[agent.status]}`} />
                  <span className="text-xs capitalize text-gray-400">{agent.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
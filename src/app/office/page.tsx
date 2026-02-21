"use client";

import { useState } from "react";
import { Plus, Monitor, Coffee, Code, PenTool, Search, Clock } from "lucide-react";

type Agent = {
  id: string;
  name: string;
  role: string;
  status: "working" | "idle" | "break" | "offline";
  currentTask?: string;
};

const initialAgents: Agent[] = [];

export default function OfficePage() {
  const [agents] = useState<Agent[]>(initialAgents
  </div>
);

  const statusConfig = {
    working: { color: "bg-emerald-400", label: "Working", icon: Code },
    idle: { color: "bg-amber-400", label: "Idle", icon: Coffee },
    break: { color: "bg-blue-400", label: "Break", icon: Coffee },
    offline: { color: "bg-gray-500", label: "Offline", icon: Monitor },
  };

  <div style={{ marginLeft: "80px" }}>
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Office</h1>
        <p className="text-gray-400">Real-time view of all agents</p>
      </div>

      {agents.length === 0 ? (
        <div className="bg-[#121218] border border-[#1f1f2e] rounded-2xl p-12 text-center">
          <div className="w-20 h-20 bg-[#1f1f2e] rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Users className="w-10 h-10 text-gray-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No Agents Yet</h2>
          <p className="text-gray-400 mb-6">Create agents in the Team section to see them working here</p>
          <button className="px-4 py-2 bg-cyan-500 text-black rounded-lg font-medium hover:bg-cyan-400 transition-colors">
            <a href="/team">Create Agent</a>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <div key={agent.id} className="bg-[#121218] border border-[#1f1f2e] rounded-2xl overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center relative">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-2xl font-bold">
                  {agent.name.charAt(0)}
                </div>
                <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${statusConfig[agent.status].color} animate-pulse`} />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{agent.name}</h3>
                <p className="text-sm text-gray-400">{agent.role}</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${statusConfig[agent.status].color}`} />
                  <span className="text-xs text-gray-400">{statusConfig[agent.status].label}</span>
                </div>
                {agent.currentTask && (
                  <p className="text-xs text-gray-500 mt-2">{agent.currentTask}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        <div className="bg-[#121218] border border-[#1f1f2e] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">{agents.filter(a => a.status === "working").length}</div>
          <div className="text-xs text-gray-500">Working</div>
        </div>
        <div className="bg-[#121218] border border-[#1f1f2e] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-amber-400">{agents.filter(a => a.status === "idle").length}</div>
          <div className="text-xs text-gray-500">Idle</div>
        </div>
        <div className="bg-[#121218] border border-[#1f1f2e] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{agents.filter(a => a.status === "break").length}</div>
          <div className="text-xs text-gray-500">On Break</div>
        </div>
        <div className="bg-[#121218] border border-[#1f1f2e] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-400">{agents.filter(a => a.status === "offline").length}</div>
          <div className="text-xs text-gray-500">Offline</div>
        </div>
      </div>
    </div>
  
  </div>
);
}

function Users({ className }: { className?: string }) {
  <div style={{ marginLeft: "80px" }}>
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  
  </div>
);
}
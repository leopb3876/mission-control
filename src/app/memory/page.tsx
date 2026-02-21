"use client";

import { useState } from "react";
import { Plus, Search, Brain, Tag } from "lucide-react";

type Memory = {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
};

const initialMemories: Memory[] = [];

export default function MemoryPage() {
  const [memories, setMemories] = useState<Memory[]>(initialMemories);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMemories = memories.filter((m) =>
    searchQuery === "" ||
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Memory</h1>
          <p className="text-gray-400">Your long-term memory store</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black rounded-lg font-medium hover:bg-cyan-400 transition-colors">
          <Plus className="w-4 h-4" />
          Add Memory
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search memories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#121218] border border-[#1f1f2e] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500/50 text-white placeholder-gray-500"
        />
      </div>

      {memories.length === 0 ? (
        <div className="bg-[#121218] border border-[#1f1f2e] rounded-2xl p-12 text-center">
          <div className="w-20 h-20 bg-[#1f1f2e] rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Brain className="w-10 h-10 text-gray-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No Memories Yet</h2>
          <p className="text-gray-400">Memories will appear here as you work with Mori</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMemories.map((memory) => (
            <div key={memory.id} className="bg-[#121218] border border-[#1f1f2e] rounded-xl p-5">
              <h3 className="font-semibold mb-2">{memory.title}</h3>
              <p className="text-sm text-gray-400 mb-3">{memory.content}</p>
              <div className="flex items-center gap-2">
                <Tag className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-500 capitalize">{memory.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
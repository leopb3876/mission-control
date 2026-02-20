"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Brain,
  MessageSquare,
  Lightbulb,
  Star,
  Folder,
  Tag,
  X,
} from "lucide-react";

type Memory = {
  id: string;
  title: string;
  content: string;
  category: "conversation" | "decision" | "fact" | "preference" | "project" | "other";
  importance: "low" | "medium" | "high" | "critical";
  tags: string[];
  createdAt: string;
};

const initialMemories: Memory[] = [
  {
    id: "1",
    title: "Leo's Business Goals",
    content: "Leo wants to build a profitable business for Babson College application. Priority: Making money. Interests: Football, stocks, crypto, gaming.",
    category: "preference",
    importance: "critical",
    tags: ["leo", "goals", "babson"],
    createdAt: "2026-02-18",
  },
  {
    id: "2",
    title: "Supplement Business Research",
    content: "AI Curated supplement subscription: Target €89-129/month, COGS €35-45, 60-70% margin. Competitors: Care/of, Seed, Ritual, Bioniq ($15M funding). Market 2025: ~$16B, 2030: $31B+.",
    category: "project",
    importance: "high",
    tags: ["supplements", "business", "research"],
    createdAt: "2026-02-19",
  },
  {
    id: "3",
    title: "Top Business Ideas Selected",
    content: "Selected: 1) No-Code SaaS (best for Babson), 2) Discord Server (fastest to revenue), 3) Notion/Canva Templates (easiest to start), 4) TikTok Shop (viral potential).",
    category: "decision",
    importance: "high",
    tags: ["business", "ideas", "babson"],
    createdAt: "2026-02-20",
  },
  {
    id: "4",
    title: "Research Cron Scheduled",
    content: "Research cron set up to run at 10:30 AM daily. Focus: Dropshipping, SaaS, Supplements, Print on Demand. Prioritizes online businesses only.",
    category: "fact",
    importance: "medium",
    tags: ["system", "automation", "research"],
    createdAt: "2026-02-20",
  },
  {
    id: "5",
    title: "Tavily API Installed",
    content: "Tavily search skill installed alongside Brave. API key: tvly-dev-*. Used for better research capabilities.",
    category: "fact",
    importance: "medium",
    tags: ["system", "tools", "research"],
    createdAt: "2026-02-20",
  },
  {
    id: "6",
    title: "Mori's Identity",
    content: "Name: Mori. Vibe: Competent, direct, occasionally dry. Emoji: 🌿. Created to help Leo with business, research, and automation.",
    category: "fact",
    importance: "high",
    tags: ["mori", "identity"],
    createdAt: "2026-02-18",
  },
];

const categoryIcons = {
  conversation: MessageSquare,
  decision: Star,
  fact: Brain,
  preference: Lightbulb,
  project: Folder,
  other: Tag,
};

const categoryColors = {
  conversation: "text-blue-400 bg-blue-400/10",
  decision: "text-yellow-400 bg-yellow-400/10",
  fact: "text-gray-400 bg-gray-400/10",
  preference: "text-pink-400 bg-pink-400/10",
  project: "text-purple-400 bg-purple-400/10",
  other: "text-gray-400 bg-gray-400/10",
};

const importanceColors = {
  low: "text-gray-500",
  medium: "text-blue-400",
  high: "text-yellow-400",
  critical: "text-red-400",
};

export default function MemoryPage() {
  const [memories, setMemories] = useState<Memory[]>(initialMemories);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  const filteredMemories = memories.filter((memory) => {
    const matchesSearch =
      searchQuery === "" ||
      memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory === "all" || memory.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const allTags = Array.from(new Set(memories.flatMap((m) => m.tags)));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" />
              Memory
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Search and manage stored memories
            </p>
          </div>
          <button className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
            Add Memory
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-xl">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search memories, conversations, decisions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mt-4 overflow-x-auto pb-2">
          <button
            onClick={() => setFilterCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
              filterCategory === "all"
                ? "bg-primary text-black"
                : "bg-background text-gray-400 hover:text-white"
            }`}
          >
            All
          </button>
          {Object.keys(categoryIcons).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap capitalize transition-colors ${
                filterCategory === cat
                  ? "bg-primary text-black"
                  : "bg-background text-gray-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Memory List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredMemories.length === 0 ? (
              <div className="card p-8 text-center">
                <Brain className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No memories found</p>
              </div>
            ) : (
              filteredMemories.map((memory) => {
                const CategoryIcon = categoryIcons[memory.category];
                return (
                  <div
                    key={memory.id}
                    onClick={() => setSelectedMemory(memory)}
                    className="card p-4 cursor-pointer hover:border-primary/50"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`p-1.5 rounded-lg ${
                            categoryColors[memory.category]
                          }`}
                        >
                          <CategoryIcon className="w-4 h-4" />
                        </span>
                        <span className={`text-xs ${importanceColors[memory.importance]}`}>
                          {memory.importance}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{memory.createdAt}</span>
                    </div>
                    <h3 className="font-semibold mb-1">{memory.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{memory.content}</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {memory.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-background rounded text-gray-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Sidebar - Tag Cloud & Stats */}
          <div className="space-y-4">
            {/* Stats */}
            <div className="card p-4">
              <h3 className="font-semibold mb-3">Statistics</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Memories</span>
                  <span>{memories.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Critical</span>
                  <span className="text-red-400">
                    {memories.filter((m) => m.importance === "critical").length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">High Priority</span>
                  <span className="text-yellow-400">
                    {memories.filter((m) => m.importance === "high").length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Tags</span>
                  <span>{allTags.length}</span>
                </div>
              </div>
            </div>

            {/* Tag Cloud */}
            <div className="card p-4">
              <h3 className="font-semibold mb-3">Tag Cloud</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="text-xs px-2 py-1 bg-background rounded hover:bg-border transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="card p-4">
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="space-y-2">
                {Object.entries(categoryIcons).map(([cat, Icon]) => (
                  <div
                    key={cat}
                    className="flex items-center justify-between text-sm cursor-pointer hover:text-primary transition-colors"
                    onClick={() => setFilterCategory(cat)}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-gray-400" />
                      <span className="capitalize">{cat}</span>
                    </div>
                    <span className="text-gray-500">
                      {memories.filter((m) => m.category === cat).length}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedMemory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-2xl">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = categoryIcons[selectedMemory.category];
                    return (
                      <span className={`p-2 rounded-lg ${categoryColors[selectedMemory.category]}`}>
                        <Icon className="w-5 h-5" />
                      </span>
                    );
                  })()}
                  <div>
                    <h2 className="text-xl font-bold">{selectedMemory.title}</h2>
                    <p className="text-sm text-gray-400">
                      {selectedMemory.category} • {selectedMemory.importance} •{" "}
                      {selectedMemory.createdAt}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMemory(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-300 leading-relaxed">{selectedMemory.content}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedMemory.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-background rounded text-gray-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

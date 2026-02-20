"use client";

import { useState } from "react";
import {
  Plus,
  ChevronRight,
  Youtube,
  Instagram,
  FileText,
  Edit3,
  Image,
  Video,
  CheckCircle,
  Calendar,
  MoreHorizontal,
} from "lucide-react";

type ContentItem = {
  id: string;
  title: string;
  platform: "youtube" | "tiktok" | "instagram" | "newsletter" | "blog";
  stage: "idea" | "script" | "thumbnail" | "filming" | "editing" | "review" | "scheduled" | "published";
  idea?: string;
  script?: string;
  thumbnailUrl?: string;
  scheduledDate?: string;
  publishedDate?: string;
  tags: string[];
};

const stages = [
  { id: "idea", label: "Idea", icon: Plus },
  { id: "script", label: "Script", icon: FileText },
  { id: "thumbnail", label: "Thumbnail", icon: Image },
  { id: "filming", label: "Filming", icon: Video },
  { id: "editing", label: "Editing", icon: Edit3 },
  { id: "review", label: "Review", icon: CheckCircle },
  { id: "scheduled", label: "Scheduled", icon: Calendar },
  { id: "published", label: "Published", icon: CheckCircle },
];

const initialContent: ContentItem[] = [
  {
    id: "1",
    title: "How to Start a Discord Community",
    platform: "youtube",
    stage: "script",
    idea: "Tutorial on building a paid Discord server from scratch",
    script: "# Introduction\n\nWelcome to this tutorial...",
    tags: ["tutorial", "discord"],
  },
  {
    id: "2",
    title: "Best AI Tools for Students",
    platform: "tiktok",
    stage: "editing",
    idea: "Quick tips on AI tools that help with studying",
    tags: ["ai", "education"],
  },
  {
    id: "3",
    title: "Weekly Crypto Trends",
    platform: "newsletter",
    stage: "scheduled",
    idea: "Analysis of this week's crypto market movements",
    scheduledDate: "2026-02-22",
    tags: ["crypto", "weekly"],
  },
  {
    id: "4",
    title: "Morning Routine Vlog",
    platform: "instagram",
    stage: "filming",
    tags: ["vlog", "lifestyle"],
  },
  {
    id: "5",
    title: "SaaS Pricing Strategies",
    platform: "youtube",
    stage: "idea",
    idea: "How to price your SaaS product for maximum revenue",
    tags: ["saas", "business"],
  },
  {
    id: "6",
    title: "Supplement Brand Update",
    platform: "blog",
    stage: "published",
    publishedDate: "2026-02-15",
    tags: ["supplements", "business"],
  },
];

const platformIcons = {
  youtube: Youtube,
  tiktok: Instagram,
  instagram: Instagram,
  newsletter: FileText,
  blog: FileText,
};

export default function ContentPage() {
  const [content, setContent] = useState<ContentItem[]>(initialContent);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  const getStageIndex = (stage: string) => stages.findIndex((s) => s.id === stage);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Content Pipeline</h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage content from idea to publication
            </p>
          </div>
          <button className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
            New Content
          </button>
        </div>
      </div>

      {/* Pipeline */}
      <div className="p-6 overflow-x-auto">
        <div className="flex gap-2 min-w-max pb-4">
          {stages.map((stage, index) => {
            const StageIcon = stage.icon;
            const itemsInStage = content.filter((c) => c.stage === stage.id);
            return (
              <div key={stage.id} className="w-48 flex-shrink-0">
                {/* Stage Header */}
                <div className="flex items-center gap-2 mb-3 px-2">
                  <StageIcon className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-sm">{stage.label}</span>
                  <span className="text-xs text-gray-500 bg-background px-1.5 py-0.5 rounded">
                    {itemsInStage.length}
                  </span>
                </div>

                {/* Stage Items */}
                <div className="space-y-2">
                  {itemsInStage.map((item) => {
                    const PlatformIcon = platformIcons[item.platform];
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className="card p-3 cursor-pointer hover:border-primary/50"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <PlatformIcon className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-400 capitalize">
                            {item.platform}
                          </span>
                        </div>
                        <h4 className="text-sm font-medium truncate">{item.title}</h4>
                        {item.scheduledDate && (
                          <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                            <Calendar className="w-3 h-3" />
                            {item.scheduledDate}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Connector */}
                {index < stages.length - 1 && (
                  <div className="flex justify-center my-2">
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Panel */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    {(() => {
                      const Icon = platformIcons[selectedItem.platform];
                      return <Icon className="w-5 h-5 text-primary" />;
                    })()}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedItem.title}</h2>
                    <p className="text-sm text-gray-400 capitalize">
                      {selectedItem.platform} • {selectedItem.stage.replace("_", " ")}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Stage Progress */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Stage</label>
                <select
                  value={selectedItem.stage}
                  onChange={(e) => {
                    setContent(
                      content.map((c) =>
                        c.id === selectedItem.id
                          ? { ...c, stage: e.target.value as ContentItem["stage"] }
                          : c
                      )
                    );
                    setSelectedItem({
                      ...selectedItem,
                      stage: e.target.value as ContentItem["stage"],
                    });
                  }}
                  className="w-full bg-background border border-border rounded-lg px-4 py-2"
                >
                  {stages.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Idea */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Idea</label>
                <textarea
                  value={selectedItem.idea || ""}
                  onChange={(e) => {
                    setContent(
                      content.map((c) =>
                        c.id === selectedItem.id ? { ...c, idea: e.target.value } : c
                      )
                    );
                    setSelectedItem({ ...selectedItem, idea: e.target.value });
                  }}
                  placeholder="What's this content about?"
                  className="w-full bg-background border border-border rounded-lg px-4 py-2 h-24 resize-none"
                />
              </div>

              {/* Script */}
              {["script", "editing", "review", "scheduled", "published"].includes(
                selectedItem.stage
              ) && (
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Script</label>
                  <textarea
                    value={selectedItem.script || ""}
                    onChange={(e) => {
                      setContent(
                        content.map((c) =>
                          c.id === selectedItem.id ? { ...c, script: e.target.value } : c
                        )
                      );
                      setSelectedItem({ ...selectedItem, script: e.target.value });
                    }}
                    placeholder="Write your script here..."
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 h-48 resize-none font-mono text-sm"
                  />
                </div>
              )}

              {/* Thumbnail */}
              {["thumbnail", "filming", "editing", "review", "scheduled", "published"].includes(
                selectedItem.stage
              ) && (
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Thumbnail</label>
                  <input
                    type="text"
                    value={selectedItem.thumbnailUrl || ""}
                    onChange={(e) => {
                      setContent(
                        content.map((c) =>
                          c.id === selectedItem.id
                            ? { ...c, thumbnailUrl: e.target.value }
                            : c
                        )
                      );
                      setSelectedItem({ ...selectedItem, thumbnailUrl: e.target.value });
                    }}
                    placeholder="Image URL for thumbnail"
                    className="w-full bg-background border border-border rounded-lg px-4 py-2"
                  />
                </div>
              )}

              {/* Scheduled Date */}
              {["scheduled", "published"].includes(selectedItem.stage) && (
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    {selectedItem.stage === "published" ? "Published" : "Scheduled"} Date
                  </label>
                  <input
                    type="date"
                    value={selectedItem.scheduledDate || selectedItem.publishedDate || ""}
                    onChange={(e) => {
                      setContent(
                        content.map((c) =>
                          c.id === selectedItem.id
                            ? {
                                ...c,
                                scheduledDate:
                                  selectedItem.stage === "scheduled"
                                    ? e.target.value
                                    : c.scheduledDate,
                                publishedDate:
                                  selectedItem.stage === "published"
                                    ? e.target.value
                                    : c.publishedDate,
                              }
                            : c
                        )
                      );
                    }}
                    className="w-full bg-background border border-border rounded-lg px-4 py-2"
                  />
                </div>
              )}

              {/* Tags */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-background rounded text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                  <button className="text-xs px-2 py-1 border border-dashed border-gray-600 rounded text-gray-400 hover:border-gray-400">
                    + Add tag
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

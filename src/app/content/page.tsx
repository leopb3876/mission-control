"use client";

import { useState } from "react";
import { Plus, FileText, Calendar, MoreHorizontal, Youtube, Instagram, Send } from "lucide-react";

type ContentItem = {
  id: string;
  title: string;
  platform: "youtube" | "tiktok" | "instagram" | "newsletter";
  stage: "idea" | "script" | "thumbnail" | "filming" | "editing" | "scheduled" | "published";
};

const stages = ["idea", "script", "thumbnail", "filming", "editing", "scheduled", "published"];
const platforms = ["youtube", "tiktok", "instagram", "newsletter"];

const platformIcons: Record<string, any> = {
  youtube: Youtube,
  tiktok: Instagram,
  instagram: Instagram,
  newsletter: Send,
};

export default function ContentPage() {
  const [content, setContent] = useState<ContentItem[]>([]);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Content</h1>
          <p className="text-gray-400">Manage your content pipeline</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black rounded-lg font-medium hover:bg-cyan-400 transition-colors">
          <Plus className="w-4 h-4" />
          Add Content
        </button>
      </div>

      {content.length === 0 ? (
        <div className="bg-[#121218] border border-[#1f1f2e] rounded-2xl p-12 text-center">
          <div className="w-20 h-20 bg-[#1f1f2e] rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <FileText className="w-10 h-10 text-gray-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No Content Yet</h2>
          <p className="text-gray-400">Add your first piece of content to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.map((item) => {
            const PlatformIcon = platformIcons[item.platform];
            return (
              <div key={item.id} className="bg-[#121218] border border-[#1f1f2e] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <PlatformIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-500 capitalize">{item.platform}</span>
                </div>
                <h3 className="font-medium mb-2">{item.title}</h3>
                <span className="text-xs px-2 py-1 bg-[#1f1f2e] rounded text-gray-400 capitalize">{item.stage}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
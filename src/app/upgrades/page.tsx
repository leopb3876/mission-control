"use client";

import { Rocket, Check, Clock, Zap, Brain, TrendingUp, Sparkles } from "lucide-react";

const upgrades = [
  {
    id: "1",
    name: "Memory Expansion",
    description: "Store 10x more memories with priority search",
    icon: Brain,
    price: "Free",
    status: "available",
    features: ["Unlimited memory storage", "Priority search results", "Auto-categorization"],
  },
  {
    id: "2",
    name: "Research Pro",
    description: "AI-powered deep research with sources",
    icon: Zap,
    price: "€9/mo",
    status: "available",
    features: ["Deep research mode", "Source citations", "Competitor analysis"],
  },
  {
    id: "3",
    name: "Analytics Dashboard",
    description: "Advanced revenue and growth analytics",
    icon: TrendingUp,
    price: "€19/mo",
    status: "coming_soon",
    features: ["Revenue charts", "Growth projections", "Export reports"],
  },
  {
    id: "4",
    name: "Content Automator",
    description: "Auto-generate scripts and thumbnails",
    icon: Sparkles,
    price: "€29/mo",
    status: "coming_soon",
    features: ["AI script writing", "Auto thumbnails", "Scheduling"],
  },
];

export default function UpgradesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Upgrades</h1>
        <p className="text-gray-400">Enhance Mori's capabilities</p>
      </div>

      {/* Current Plan */}
      <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Rocket className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 font-medium">Free Plan</span>
            </div>
            <p className="text-sm text-gray-400">Basic capabilities</p>
          </div>
          <button className="px-4 py-2 bg-cyan-500 text-black rounded-lg font-medium hover:bg-cyan-400 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>

      {/* Upgrades Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {upgrades.map((upgrade) => {
          const Icon = upgrade.icon;
          return (
            <div
              key={upgrade.id}
              className={`bg-[#121218] border ${
                upgrade.status === "available"
                  ? "border-[#1f1f2e] hover:border-cyan-500/50"
                  : "border-[#1f1f2e] opacity-60"
              } rounded-2xl p-5 transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1f1f2e] rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{upgrade.name}</h3>
                    <p className="text-xs text-gray-400">{upgrade.description}</p>
                  </div>
                </div>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    upgrade.status === "available"
                      ? "bg-cyan-500/20 text-cyan-400"
                      : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {upgrade.status === "available" ? upgrade.price : "Coming Soon"}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {upgrade.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                    <Check className="w-4 h-4 text-cyan-400" />
                    {feature}
                  </div>
                ))}
              </div>

              <button
                disabled={upgrade.status !== "available"}
                className={`w-full py-2 rounded-lg font-medium transition-colors ${
                  upgrade.status === "available"
                    ? "bg-[#1f1f2e] hover:bg-cyan-500 hover:text-black"
                    : "bg-[#1f1f2e] text-gray-500 cursor-not-allowed"
                }`}
              >
                {upgrade.status === "available" ? (
                  <span className="flex items-center justify-center gap-2">
                    <Rocket className="w-4 h-4" />
                    Get Upgrade
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4" />
                    Coming Soon
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
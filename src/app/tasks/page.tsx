"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";

type Task = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "review" | "done";
  priority: "low" | "medium" | "high" | "urgent";
  tags: string[];
  progress: number;
};

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Research TikTok Shop products",
    description: "Find winning products for dropshipping",
    status: "in_progress",
    priority: "high",
    tags: ["research", "dropshipping"],
    progress: 60,
  },
  {
    id: "2",
    title: "Build landing page",
    description: "Create initial landing page for the business",
    status: "todo",
    priority: "medium",
    tags: ["website"],
    progress: 0,
  },
  {
    id: "3",
    title: "Set up Discord monetization",
    description: "Configure server subscriptions and tiers",
    status: "done",
    priority: "low",
    tags: ["discord"],
    progress: 100,
  },
  {
    id: "4",
    title: "Contact supplement suppliers",
    description: "Reach out to Alibaba manufacturers",
    status: "todo",
    priority: "high",
    tags: ["supplements", "suppliers"],
    progress: 0,
  },
];

const columns = [
  { id: "todo", label: "To Do", color: "#6b7280" },
  { id: "in_progress", label: "In Progress", color: "#22d3ee" },
  { id: "review", label: "Review", color: "#f59e0b" },
  { id: "done", label: "Done", color: "#10b981" },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const filteredTasks = tasks.filter((task) =>
    searchQuery === "" ||
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDrop = (status: string) => {
    if (draggedTask) {
      setTasks(tasks.map((t) =>
        t.id === draggedTask ? { 
          ...t, 
          status: status as Task["status"],
          progress: status === "done" ? 100 : t.progress
        } : t
      ));
      setDraggedTask(null);
    }
  };

  const priorityColors: Record<string, string> = {
    low: "#10b981",
    medium: "#22d3ee",
    high: "#f59e0b",
    urgent: "#ef4444",
  };

  // Calculate overall progress
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "done").length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div style={{ marginLeft: "80px", minHeight: "100vh", background: "#0a0a0f", color: "white" }}>
      {/* Header */}
      <header style={{ height: "56px", background: "#121218", borderBottom: "1px solid #1f1f2e", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "sticky", top: 0 }}>
        <span style={{ fontWeight: 600 }}>Mission Control</span>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#9ca3af" }}>
            <div style={{ width: "8px", height: "8px", background: "#22d3ee", borderRadius: "50%" }} />
            Mori online
          </div>
          <div style={{ width: "32px", height: "32px", background: "linear-gradient(to bottom right, #22d3ee, #a855f7)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "bold" }}>
            L
          </div>
        </div>
      </header>

      <div style={{ padding: "24px" }}>
        {/* Title & Progress */}
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>Tasks</h1>
          <p style={{ color: "#9ca3af", marginBottom: "16px" }}>Track and manage your tasks</p>
          
          {/* Overall Progress Bar */}
          <div style={{ background: "#1f1f2e", borderRadius: "8px", padding: "16px", marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "14px", fontWeight: 600 }}>Overall Progress</span>
              <span style={{ fontSize: "14px", color: "#22d3ee" }}>{progressPercent}%</span>
            </div>
            <div style={{ height: "8px", background: "#0a0a0f", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ 
                height: "100%", 
                width: `${progressPercent}%`, 
                background: "linear-gradient(90deg, #22d3ee, #10b981)",
                borderRadius: "4px",
                transition: "width 0.3s ease"
              }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "12px", color: "#9ca3af" }}>
              <span>{completedTasks} completed</span>
              <span>{totalTasks - completedTasks} remaining</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div style={{ position: "relative", maxWidth: "400px", marginBottom: "24px" }}>
          <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: "#6b7280" }} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: "100%", 
              background: "#121218", 
              border: "1px solid #1f1f2e", 
              borderRadius: "10px", 
              padding: "10px 12px 10px 40px", 
              fontSize: "14px", 
              color: "white",
              outline: "none"
            }}
          />
        </div>

        {/* Kanban Board */}
        <div style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "16px" }}>
          {columns.map((column) => (
            <div
              key={column.id}
              style={{ minWidth: "260px", flexShrink: 0 }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(column.id)}
            >
              {/* Column Header */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: column.color }} />
                <span style={{ fontWeight: 500, fontSize: "14px" }}>{column.label}</span>
                <span style={{ fontSize: "11px", background: "#121218", padding: "2px 8px", borderRadius: "4px", color: "#9ca3af" }}>
                  {filteredTasks.filter((t) => t.status === column.id).length}
                </span>
              </div>

              {/* Tasks */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {filteredTasks.filter((t) => t.status === column.id).map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => setDraggedTask(task.id)}
                    style={{ 
                      background: "#121218", 
                      border: "1px solid #1f1f2e", 
                      borderRadius: "10px", 
                      padding: "12px",
                      cursor: "grab"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "8px" }}>
                      <span style={{ fontWeight: 500, fontSize: "14px" }}>{task.title}</span>
                    </div>
                    <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "8px" }}>{task.description}</p>
                    
                    {/* Individual Task Progress Bar */}
                    <div style={{ marginBottom: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                        <span style={{ fontSize: "10px", color: "#6b7280" }}>Progress</span>
                        <span style={{ fontSize: "10px", color: task.progress === 100 ? "#10b981" : "#22d3ee" }}>{task.progress}%</span>
                      </div>
                      <div style={{ height: "4px", background: "#0a0a0f", borderRadius: "2px", overflow: "hidden" }}>
                        <div style={{ 
                          height: "100%", 
                          width: `${task.progress}%`, 
                          background: task.progress === 100 ? "#10b981" : "#22d3ee",
                          borderRadius: "2px",
                          transition: "width 0.3s ease"
                        }} />
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "6px" }}>
                      <span style={{ 
                        fontSize: "10px", 
                        background: `${priorityColors[task.priority]}20`, 
                        color: priorityColors[task.priority],
                        padding: "2px 6px", 
                        borderRadius: "4px",
                        textTransform: "capitalize"
                      }}>
                        {task.priority}
                      </span>
                      {task.tags.map((tag) => (
                        <span key={tag} style={{ 
                          fontSize: "10px", 
                          background: "#1f1f2e", 
                          color: "#6b7280",
                          padding: "2px 6px", 
                          borderRadius: "4px"
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import {
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  ArrowRight,
} from "lucide-react";

type Task = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "review" | "done";
  priority: "low" | "medium" | "high" | "urgent";
  assignee: "leo" | "mori";
  dueDate?: string;
  tags: string[];
};

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Research TikTok Shop products",
    description: "Find winning products for dropshipping",
    status: "in_progress",
    priority: "high",
    assignee: "mori",
    dueDate: "2026-02-21",
    tags: ["research", "dropshipping"],
  },
  {
    id: "2",
    title: "Build landing page",
    description: "Create initial landing page for the business",
    status: "todo",
    priority: "medium",
    assignee: "leo",
    dueDate: "2026-02-25",
    tags: ["website", "priority"],
  },
  {
    id: "3",
    title: "Set up Discord monetization",
    description: "Configure server subscriptions and tiers",
    status: "done",
    priority: "low",
    assignee: "mori",
    tags: ["discord"],
  },
  {
    id: "4",
    title: "Write supplement brand business plan",
    description: "Complete the full business plan for supplements",
    status: "todo",
    priority: "high",
    assignee: "mori",
    dueDate: "2026-02-22",
    tags: ["business", "supplements"],
  },
  {
    id: "5",
    title: "Create Notion template for tasks",
    description: "Build a productivity template to sell",
    status: "review",
    priority: "medium",
    assignee: "mori",
    tags: ["digital-product"],
  },
  {
    id: "6",
    title: "Film intro video for YouTube",
    description: "Record and edit the first YouTube video",
    status: "todo",
    priority: "urgent",
    assignee: "leo",
    tags: ["content", "youtube"],
  },
];

const columns = [
  { id: "todo", label: "To Do", color: "bg-gray-500" },
  { id: "in_progress", label: "In Progress", color: "bg-primary" },
  { id: "review", label: "Review", color: "bg-warning" },
  { id: "done", label: "Done", color: "bg-success" },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filterAssignee, setFilterAssignee] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const filteredTasks = tasks.filter((task) => {
    if (filterAssignee !== "all" && task.assignee !== filterAssignee) return false;
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: string) => {
    if (draggedTask) {
      setTasks(
        tasks.map((t) =>
          t.id === draggedTask ? { ...t, status: status as Task["status"] } : t
        )
      );
      setDraggedTask(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Tasks Board</h1>
            <p className="text-gray-400 text-sm mt-1">
              Track all tasks and manage assignments
            </p>
          </div>
          <button className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <select
            value={filterAssignee}
            onChange={(e) => setFilterAssignee(e.target.value)}
            className="bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
          >
            <option value="all">All Assignees</option>
            <option value="leo">Leo</option>
            <option value="mori">Mori</option>
          </select>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="p-6 overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {columns.map((column) => (
            <div
              key={column.id}
              className="w-80 flex-shrink-0"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.id)}
            >
              {/* Column Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-3 h-3 rounded-full ${column.color}`} />
                <h3 className="font-semibold">{column.label}</h3>
                <span className="text-xs text-gray-500 bg-background px-2 py-0.5 rounded">
                  {filteredTasks.filter((t) => t.status === column.id).length}
                </span>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                {filteredTasks
                  .filter((task) => task.status === column.id)
                  .map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => handleDragStart(task.id)}
                      className="card p-4 cursor-grab active:cursor-grabbing hover:border-primary/50"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className={`text-xs px-2 py-0.5 rounded priority-${task.priority}`}>
                          {task.priority}
                        </span>
                        <button className="text-gray-400 hover:text-white">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                      <h4 className="font-medium mb-1">{task.title}</h4>
                      <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                        {task.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 capitalize">
                          {task.assignee}
                        </span>
                        {task.dueDate && (
                          <span className="text-xs text-gray-400">{task.dueDate}</span>
                        )}
                      </div>
                      {task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {task.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-0.5 bg-background rounded text-gray-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
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

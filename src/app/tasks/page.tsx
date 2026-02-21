"use client";

import { useState } from "react";
import { Plus, Search, MoreHorizontal } from "lucide-react";

type Task = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "review" | "done";
  priority: "low" | "medium" | "high" | "urgent";
  tags: string[];
};

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Research TikTok Shop products",
    description: "Find winning products for dropshipping",
    status: "in_progress",
    priority: "high",
    tags: ["research", "dropshipping"],
  },
  {
    id: "2",
    title: "Build landing page",
    description: "Create initial landing page for the business",
    status: "todo",
    priority: "medium",
    tags: ["website"],
  },
  {
    id: "3",
    title: "Set up Discord monetization",
    description: "Configure server subscriptions and tiers",
    status: "done",
    priority: "low",
    tags: ["discord"],
  },
];

const columns = [
  { id: "todo", label: "To Do", color: "bg-gray-500" },
  { id: "in_progress", label: "In Progress", color: "bg-cyan-400" },
  { id: "review", label: "Review", color: "bg-amber-500" },
  { id: "done", label: "Done", color: "bg-emerald-500" },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks
  </div>
);
  const [searchQuery, setSearchQuery] = useState(""
  </div>
);
  const [draggedTask, setDraggedTask] = useState<string | null>(null
  </div>
);

  const filteredTasks = tasks.filter((task) =>
    searchQuery === "" ||
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  
  </div>
);

  const handleDrop = (status: string) => {
    if (draggedTask) {
      setTasks(tasks.map((t) =>
        t.id === draggedTask ? { ...t, status: status as Task["status"] } : t
      )
  </div>
);
      setDraggedTask(null
  </div>
);
    }
  };

  const priorityColors = {
    low: "bg-emerald-500/20 text-emerald-400",
    medium: "bg-cyan-500/20 text-cyan-400",
    high: "bg-amber-500/20 text-amber-400",
    urgent: "bg-red-500/20 text-red-400",
  };

  const statusColors = {
    todo: "bg-gray-500/20 text-gray-400",
    in_progress: "bg-cyan-500/20 text-cyan-400",
    review: "bg-amber-500/20 text-amber-400",
    done: "bg-emerald-500/20 text-emerald-400",
  };

  <div style={{ marginLeft: "80px" }}>
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Tasks</h1>
        <p className="text-gray-400">Track and manage your tasks</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#121218] border border-[#1f1f2e] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500/50 text-white placeholder-gray-500"
        />
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex-shrink-0 w-72"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(column.id)}
          >
            {/* Column Header */}
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2 h-2 rounded-full ${column.color}`} />
              <h3 className="font-medium text-sm text-gray-300">{column.label}</h3>
              <span className="text-xs text-gray-500 bg-[#121218] px-2 py-0.5 rounded">
                {filteredTasks.filter((t) => t.status === column.id).length}
              </span>
            </div>

            {/* Tasks */}
            <div className="space-y-2">
              {filteredTasks
                .filter((task) => task.status === column.id)
                .map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => setDraggedTask(task.id)}
                    className="bg-[#121218] border border-[#1f1f2e] rounded-xl p-4 cursor-grab active:cursor-grabbing hover:border-cyan-500/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${priorityColors[task.priority]}`}>
                        {task.priority}
                      </span>
                      <button className="text-gray-500 hover:text-white">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                    <h4 className="font-medium mb-1 text-sm">{task.title}</h4>
                    <p className="text-xs text-gray-500 line-clamp-2">{task.description}</p>
                    {task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {task.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 bg-[#0a0a0f] rounded text-gray-500">
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
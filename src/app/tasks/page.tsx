"use client";

import { useState } from "react";
import { Plus, Search, Trash2 } from "lucide-react";

type Task = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high" | "urgent";
  tags: string[];
  progress: number;
};

const initialTasks: Task[] = [];

const columns = [
  { id: "todo", label: "To Do", color: "#6b7280" },
  { id: "in_progress", label: "In Progress", color: "#22d3ee" },
  { id: "done", label: "Done", color: "#10b981" },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<"low" | "medium" | "high" | "urgent">("medium");

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: "",
      status: "todo",
      priority: newTaskPriority,
      tags: [],
      progress: 0,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const moveTask = (taskId: string, newStatus: Task["status"]) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, status: newStatus, progress: newStatus === "done" ? 100 : t.progress } : t
    ));
  };

  const updateProgress = (taskId: string, progress: number) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, progress } : t
    ));
  };

  const filteredTasks = tasks.filter((task) =>
    searchQuery === "" ||
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const priorityColors: Record<string, string> = {
    low: "#10b981",
    medium: "#22d3ee",
    high: "#f59e0b",
    urgent: "#ef4444",
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "done").length;
  const inProgressTasks = tasks.filter(t => t.status === "in_progress").length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="page-container">
      <header style={{ height: "56px", background: "#1e1e30", borderBottom: "1px solid #1f1f2e", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "sticky", top: 0, zIndex: 10 }}>
        <span style={{ fontWeight: 600 }}>Mission Control</span>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#9ca3af" }}>
            <div style={{ width: "8px", height: "8px", background: "#22d3ee", borderRadius: "50%" }} />
            Mori online
          </div>
          <div style={{ width: "32px", height: "32px", background: "#22d3ee", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "bold" }}>L</div>
        </div>
      </header>

      <div style={{ padding: "24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px" }}>Tasks</h1>
          <p style={{ color: "#9ca3af", marginBottom: "16px" }}>Manage your tasks</p>
          
          {/* Add New Task */}
          <div style={{ background: "#1e1e30", border: "1px solid #2a2a4e", borderRadius: "12px", padding: "16px", marginBottom: "24px" }}>
            <div style={{ display: "flex", gap: "12px" }}>
              <input
                type="text"
                placeholder="Add a new task..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTask()}
                style={{ flex: 1, background: "#151520", border: "1px solid #2a2a4e", borderRadius: "8px", padding: "12px", color: "white", fontSize: "14px", outline: "none" }}
              />
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value as Task["priority"])}
                style={{ background: "#151520", border: "1px solid #2a2a4e", borderRadius: "8px", padding: "12px", color: "white", fontSize: "14px", outline: "none" }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
              <button
                onClick={addTask}
                style={{ display: "flex", alignItems: "center", gap: "8px", background: "#22d3ee", color: "#0a0a0f", border: "none", borderRadius: "8px", padding: "12px 20px", fontWeight: 600, cursor: "pointer" }}
              >
                <Plus size={18} />
                Add
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div style={{ background: "#1f1f2e", borderRadius: "8px", padding: "16px", marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "14px", fontWeight: 600 }}>Progress</span>
              <span style={{ fontSize: "14px", color: "#22d3ee" }}>{progressPercent}%</span>
            </div>
            <div style={{ height: "10px", background: "#151520", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progressPercent}%`, background: "#22d3ee", borderRadius: "4px", transition: "width 0.3s ease" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "12px", color: "#9ca3af" }}>
              <span>{inProgressTasks} in progress</span>
              <span>{completedTasks} done</span>
              <span>{tasks.filter(t => t.status === "todo").length} to do</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div style={{ position: "relative", maxWidth: "400px", marginBottom: "24px" }}>
          <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "18px", height: "18px", color: "#6b7280" }} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "100%", background: "#1e1e30", border: "1px solid #2a2a4e", borderRadius: "12px", padding: "12px 12px 12px 44px", fontSize: "14px", color: "white", outline: "none" }}
          />
        </div>

        {/* Kanban Board */}
        <div className="kanban-board" style={{ display: "flex", gap: "20px", overflowX: "auto", paddingBottom: "16px" }}>
          {columns.map((column) => {
            const columnTasks = filteredTasks.filter(t => t.status === column.id);
            return (
              <div key={column.id} className="kanban-column" style={{ minWidth: "320px", flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: column.color }} />
                  <span style={{ fontWeight: 600, fontSize: "16px" }}>{column.label}</span>
                  <span style={{ fontSize: "12px", background: "#1e1e30", padding: "4px 10px", borderRadius: "6px", color: "#9ca3af" }}>{columnTasks.length}</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {columnTasks.map((task) => (
                    <div key={task.id} style={{ background: "#1e1e30", border: "1px solid #2a2a4e", borderRadius: "12px", padding: "16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "8px" }}>
                        <span style={{ fontWeight: 600, fontSize: "15px" }}>{task.title}</span>
                        <button onClick={() => deleteTask(task.id)} style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", padding: "4px" }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                      
                      {/* Progress Slider */}
                      {column.id !== "todo" && (
                        <div style={{ marginBottom: "12px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                            <span style={{ fontSize: "10px", color: "#6b7280" }}>Progress</span>
                            <span style={{ fontSize: "10px", color: "#22d3ee" }}>{task.progress}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={task.progress}
                            onChange={(e) => updateProgress(task.id, parseInt(e.target.value))}
                            style={{ width: "100%", accentColor: "#22d3ee" }}
                          />
                        </div>
                      )}

                      <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
                        <span style={{ fontSize: "10px", background: `${priorityColors[task.priority]}20`, color: priorityColors[task.priority], padding: "3px 8px", borderRadius: "4px", textTransform: "capitalize" }}>
                          {task.priority}
                        </span>
                      </div>

                      {/* Move Buttons */}
                      <div style={{ display: "flex", gap: "6px" }}>
                        {column.id === "todo" && (
                          <button onClick={() => moveTask(task.id, "in_progress")} style={{ flex: 1, padding: "8px", background: "#22d3ee", color: "#0a0a0f", border: "none", borderRadius: "6px", fontWeight: 600, fontSize: "12px", cursor: "pointer" }}>
                            Start →
                          </button>
                        )}
                        {column.id === "in_progress" && (
                          <>
                            <button onClick={() => moveTask(task.id, "todo")} style={{ flex: 1, padding: "8px", background: "#1f1f2e", color: "#9ca3af", border: "none", borderRadius: "6px", fontWeight: 600, fontSize: "12px", cursor: "pointer" }}>
                              ← Back
                            </button>
                            <button onClick={() => moveTask(task.id, "done")} style={{ flex: 1, padding: "8px", background: "#10b981", color: "#0a0a0f", border: "none", borderRadius: "6px", fontWeight: 600, fontSize: "12px", cursor: "pointer" }}>
                              Done ✓
                            </button>
                          </>
                        )}
                        {column.id === "done" && (
                          <button onClick={() => moveTask(task.id, "in_progress")} style={{ flex: 1, padding: "8px", background: "#22d3ee", color: "#0a0a0f", border: "none", borderRadius: "6px", fontWeight: 600, fontSize: "12px", cursor: "pointer" }}>
                            Reopen →
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {columnTasks.length === 0 && (
                    <div style={{ background: "#151520", border: "2px dashed #1f1f2e", borderRadius: "12px", padding: "32px", textAlign: "center", color: "#4a4a6a", fontSize: "13px" }}>
                      No tasks
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

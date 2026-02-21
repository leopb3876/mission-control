"use client";

import { useState, useEffect } from "react";
import { Clock, Plus, Trash2, TrendingUp } from "lucide-react";

type TimeEntry = {
  id: string;
  date: string;
  hours: number;
  activity: string;
  notes: string;
};

export default function TimeTrackingPage() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [newDate, setNewDate] = useState(new Date().toISOString().split("T")[0]);
  const [newHours, setNewHours] = useState("");
  const [newActivity, setNewActivity] = useState("");
  const [newNotes, setNewNotes] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("timeEntries");
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("timeEntries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    if (!newHours || !newActivity) return;
    const entry: TimeEntry = {
      id: Date.now().toString(),
      date: newDate,
      hours: parseFloat(newHours),
      activity: newActivity,
      notes: newNotes,
    };
    setEntries([entry, ...entries]);
    setNewHours("");
    setNewActivity("");
    setNewNotes("");
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  const totalHours = entries.reduce((sum, e) => sum + e.hours, 0);
  const thisWeek = entries.filter(e => {
    const entryDate = new Date(e.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return entryDate >= weekAgo;
  }).reduce((sum, e) => sum + e.hours, 0);

  return (
    <div style={{ marginLeft: "180px", minHeight: "100vh", background: "var(--background)", color: "var(--text-primary)" }}>
      <header style={{ height: "56px", background: "var(--card)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "sticky", top: 0 }}>
        <span style={{ fontWeight: 600 }}>Mission Control</span>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--text-secondary)" }}>
            <div style={{ width: "8px", height: "8px", background: "#22d3ee", borderRadius: "50%" }} />
            Mori online
          </div>
          <div style={{ width: "32px", height: "32px", background: "#22d3ee", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "bold" }}>L</div>
        </div>
      </header>

      <div style={{ padding: "24px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
          <Clock size={28} style={{ color: "#22d3ee" }} />
          Time Tracking
        </h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>Log hours worked on your business (for Babson application)</p>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px" }}>
            <div style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "8px" }}>Total Hours</div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#22d3ee" }}>{totalHours.toFixed(1)}</div>
          </div>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px" }}>
            <div style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "8px" }}>This Week</div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#10b981" }}>{thisWeek.toFixed(1)}</div>
          </div>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px" }}>
            <div style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "8px" }}>Sessions</div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#a855f7" }}>{entries.length}</div>
          </div>
        </div>

        {/* Add Entry */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
          <h3 style={{ fontWeight: 600, marginBottom: "16px" }}>Log Time</h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "8px", padding: "12px", color: "var(--text-primary)", fontSize: "14px" }}
            />
            <input
              type="number"
              placeholder="Hours"
              value={newHours}
              onChange={(e) => setNewHours(e.target.value)}
              step="0.5"
              min="0"
              style={{ width: "100px", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "8px", padding: "12px", color: "var(--text-primary)", fontSize: "14px" }}
            />
            <input
              type="text"
              placeholder="Activity (e.g., Coding, Research, Marketing)"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              style={{ flex: 1, minWidth: "200px", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "8px", padding: "12px", color: "var(--text-primary)", fontSize: "14px" }}
            />
            <input
              type="text"
              placeholder="Notes (optional)"
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              style={{ flex: 1, minWidth: "150px", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "8px", padding: "12px", color: "var(--text-primary)", fontSize: "14px" }}
            />
            <button
              onClick={addEntry}
              style={{ display: "flex", alignItems: "center", gap: "8px", background: "#22d3ee", color: "#0a0a0f", border: "none", borderRadius: "8px", padding: "12px 20px", fontWeight: 600, cursor: "pointer" }}
            >
              <Plus size={18} />
              Log
            </button>
          </div>
        </div>

        {/* Entries List */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "24px" }}>
          <h3 style={{ fontWeight: 600, marginBottom: "16px" }}>Recent Entries</h3>
          {entries.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
              No time logged yet. Add your first entry above!
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {entries.slice(0, 20).map((entry) => (
                <div key={entry.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px", background: "var(--background)", borderRadius: "8px" }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: "14px" }}>{entry.activity}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{entry.date} {entry.notes && `• ${entry.notes}`}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ fontWeight: 600, fontSize: "16px", color: "#22d3ee" }}>{entry.hours}h</div>
                    <button onClick={() => deleteEntry(entry.id)} style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer" }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

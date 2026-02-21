"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 21));

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  return (
    <div style={{ marginLeft: "180px", minHeight: "100vh", background: "#151520", color: "white" }}>
      {/* Header */}
      <header style={{ height: "56px", background: "#1e1e30", borderBottom: "1px solid #1f1f2e", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "sticky", top: 0 }}>
        <span style={{ fontWeight: 600 }}>Mission Control</span>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#9ca3af" }}>
            <div style={{ width: "8px", height: "8px", background: "#22d3ee", borderRadius: "50%" }} />
            Mori online
          </div>
          <div style={{ width: "32px", height: "32px", background: "#22d3ee", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "bold" }}>
            L
          </div>
        </div>
      </header>

      <div style={{ padding: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
          <CalendarIcon size={24} style={{ color: "#f59e0b" }} />
          Calendar
        </h1>
        <p style={{ color: "#9ca3af", marginBottom: "24px" }}>Scheduled tasks and events</p>

        {/* Calendar */}
        <div style={{ background: "#1e1e30", border: "1px solid #2a2a4e", borderRadius: "12px", overflow: "hidden" }}>
          {/* Month Nav */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", borderBottom: "1px solid #1f1f2e" }}>
            <button onClick={prevMonth} style={{ background: "none", border: "none", color: "#9ca3af", cursor: "pointer", padding: "8px" }}>
              <ChevronLeft size={20} />
            </button>
            <h2 style={{ fontWeight: 600 }}>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
            <button onClick={nextMonth} style={{ background: "none", border: "none", color: "#9ca3af", cursor: "pointer", padding: "8px" }}>
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Days Header */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: "1px solid #1f1f2e" }}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} style={{ padding: "12px", textAlign: "center", fontSize: "12px", color: "#6b7280", fontWeight: 500 }}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} style={{ padding: "12px", minHeight: "80px", background: "#151520" }} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === 21 && currentDate.getMonth() === 1;
              return (
                <div key={day} style={{ padding: "12px", minHeight: "80px", borderTop: "1px solid #1f1f2e", borderRight: "1px solid #1f1f2e", background: isToday ? "#22d3ee10" : "transparent" }}>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: isToday ? "#22d3ee" : "#9ca3af" }}>{day}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
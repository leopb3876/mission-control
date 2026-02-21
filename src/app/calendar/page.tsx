"use client";

import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 21));

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Calendar</h1>
          <p className="text-gray-400">Scheduled tasks and events</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black rounded-lg font-medium hover:bg-cyan-400 transition-colors">
          <Plus className="w-4 h-4" />
          Add Event
        </button>
      </div>

      {/* Calendar */}
      <div className="bg-[#121218] border border-[#1f1f2e] rounded-xl overflow-hidden">
        {/* Month Nav */}
        <div className="flex items-center justify-between p-4 border-b border-[#1f1f2e]">
          <button onClick={prevMonth} className="p-2 hover:bg-[#1f1f2e] rounded-lg">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="font-semibold">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
          <button onClick={nextMonth} className="p-2 hover:bg-[#1f1f2e] rounded-lg">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-[#1f1f2e]">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-3 text-center text-xs text-gray-500 font-medium">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="p-3 min-h-[100px] bg-[#0a0a0f]" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isToday = day === 21 && currentDate.getMonth() === 1;
            return (
              <div key={day} className={`p-3 min-h-[100px] border-t border-r border-[#1f1f2e] ${isToday ? 'bg-cyan-500/10' : ''}`}>
                <div className={`text-sm font-medium ${isToday ? 'text-cyan-400' : 'text-gray-400'}`}>{day}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
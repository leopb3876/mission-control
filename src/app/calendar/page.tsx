"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Zap,
  FileText,
  Calendar as CalendarIcon,
  Bell,
} from "lucide-react";

type Event = {
  id: string;
  title: string;
  type: "task" | "cron" | "content" | "meeting" | "reminder";
  startTime: string;
  endTime?: string;
  recurrence?: "daily" | "weekly" | "monthly";
  source?: string;
};

const initialEvents: Event[] = [
  {
    id: "1",
    title: "Research Cron - Business Ideas",
    type: "cron",
    startTime: "2026-02-21T10:30:00",
    recurrence: "daily",
    source: "research cron",
  },
  {
    id: "2",
    title: "Content Review: Discord Video",
    type: "content",
    startTime: "2026-02-21T14:00:00",
  },
  {
    id: "3",
    title: "Weekly Trend Report",
    type: "cron",
    startTime: "2026-02-23T09:00:00",
    recurrence: "weekly",
    source: "weekly monitoring",
  },
  {
    id: "4",
    title: "Heartbeat Check",
    type: "cron",
    startTime: "2026-02-21T21:00:00",
    recurrence: "daily",
    source: "system",
  },
  {
    id: "5",
    title: "YouTube Upload",
    type: "content",
    startTime: "2026-02-22T12:00:00",
  },
  {
    id: "6",
    title: "Newsletter Send",
    type: "content",
    startTime: "2026-02-24T08:00:00",
    recurrence: "weekly",
    source: "content pipeline",
  },
  {
    id: "7",
    title: "Babson Application Review",
    type: "task",
    startTime: "2026-02-25T15:00:00",
  },
];

const typeColors = {
  task: { bg: "bg-warning/20", border: "border-warning", text: "text-warning" },
  cron: { bg: "bg-secondary/20", border: "border-secondary", text: "text-secondary" },
  content: { bg: "bg-primary/20", border: "border-primary", text: "text-primary" },
  meeting: { bg: "bg-success/20", border: "border-success", text: "text-success" },
  reminder: { bg: "bg-error/20", border: "border-error", text: "text-error" },
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 21)); // Feb 2026
  const [view, setView] = useState<"month" | "list">("month");

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const getEventsForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return initialEvents.filter((e) => e.startTime.startsWith(dateStr));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Calendar</h1>
            <p className="text-gray-400 text-sm mt-1">
              Scheduled tasks, cron jobs, and content
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView(view === "month" ? "list" : "month")}
              className="flex items-center gap-2 bg-background border border-border px-4 py-2 rounded-lg text-sm hover:border-primary transition-colors"
            >
              {view === "month" ? <Clock className="w-4 h-4" /> : <CalendarIcon className="w-4 h-4" />}
              {view === "month" ? "List View" : "Calendar View"}
            </button>
            <button className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              <Plus className="w-4 h-4" />
              Add Event
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {view === "month" ? (
          <>
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-card rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-card rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-px bg-border rounded-xl overflow-hidden">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="bg-card p-3 text-center text-sm font-medium text-gray-400"
                >
                  {day}
                </div>
              ))}

              {/* Empty cells for first week */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="bg-background p-3 min-h-[120px]" />
              ))}

              {/* Days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const events = getEventsForDay(day);
                const isToday =
                  day === 21 &&
                  currentDate.getMonth() === 1 &&
                  currentDate.getFullYear() === 2026;

                return (
                  <div
                    key={day}
                    className={`bg-card p-2 min-h-[120px] ${isToday ? "ring-2 ring-primary" : ""}`}
                  >
                    <div
                      className={`text-sm font-medium mb-1 ${
                        isToday ? "text-primary" : "text-gray-400"
                      }`}
                    >
                      {day}
                    </div>
                    <div className="space-y-1">
                      {events.slice(0, 3).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded truncate ${
                            typeColors[event.type].bg
                          } ${typeColors[event.type].text}`}
                          title={event.title}
                        >
                          {formatTime(event.startTime)} {event.title}
                        </div>
                      ))}
                      {events.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{events.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* List View */
          <div className="space-y-4">
            {["Upcoming", "Recurring", "Past"].map((section) => (
              <div key={section} className="card p-5">
                <h3 className="font-semibold mb-4">{section}</h3>
                <div className="space-y-3">
                  {initialEvents
                    .filter((e) => (section === "Past" ? new Date(e.startTime) < new Date() : true))
                    .slice(0, 5)
                    .map((event) => (
                      <div
                        key={event.id}
                        className={`flex items-center justify-between p-3 rounded-lg ${typeColors[event.type].bg} border-l-4 ${typeColors[event.type].border}`}
                      >
                        <div className="flex items-center gap-3">
                          {event.type === "cron" && <Zap className="w-4 h-4 text-secondary" />}
                          {event.type === "content" && <FileText className="w-4 h-4 text-primary" />}
                          {event.type === "task" && <Bell className="w-4 h-4 text-warning" />}
                          <div>
                            <div className="font-medium">{event.title}</div>
                            <div className="text-xs text-gray-400">
                              {new Date(event.startTime).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                              {event.recurrence && ` • ${event.recurrence}`}
                            </div>
                          </div>
                        </div>
                        {event.source && (
                          <span className="text-xs text-gray-500">{event.source}</span>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

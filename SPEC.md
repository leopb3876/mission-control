# Mission Control - Specification Document

## Project Overview

**Project Name:** Mission Control
**Type:** Web Application (NextJS + Convex)
**Core Functionality:** AI-powered operational dashboard for managing Leo's businesses, content, agents, and memory
**Target Users:** Leo (human) + Mori (AI agent)

---

## Architecture

### Tech Stack
- **Frontend:** NextJS 14 (App Router), React, TypeScript
- **Database:** Convex (real-time, reactive)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State:** Convex hooks + React Context

### Directory Structure
```
mission-control/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── tasks/
│   │   └── page.tsx
│   ├── content/
│   │   └── page.tsx
│   ├── calendar/
│   │   └── page.tsx
│   ├── memory/
│   │   └── page.tsx
│   ├── team/
│   │   └── page.tsx
│   ├── office/
│   │   └── page.tsx
│   └── profits/
│       └── page.tsx
├── components/
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   ├── TaskCard.tsx
│   ├── ContentCard.tsx
│   ├── AgentCard.tsx
│   └── ...
├── convex/
│   ├── schema.ts
│   ├── tasks.ts
│   ├── content.ts
│   ├── memory.ts
│   ├── agents.ts
│   ├── profits.ts
│   └── calendar.ts
├── lib/
│   └── utils.ts
└── public/
```

---

## Module Specifications

### 1. Tasks Board

**Purpose:** Track all tasks with assignees and status

**Data Model:**
```typescript
type Task = {
  _id: Id<"tasks">
  title: string
  description: string
  status: "todo" | "in_progress" | "review" | "done"
  priority: "low" | "medium" | "high" | "urgent"
  assignee: "leo" | "mori" | "subagent"
  dueDate?: number
  tags: string[]
  createdAt: number
  updatedAt: number
}
```

**Features:**
- Kanban board view (Todo → In Progress → Review → Done)
- Filter by assignee
- Filter by priority
- Create/edit/delete tasks
- Drag-and-drop between columns
- Real-time updates

---

### 2. Content Pipeline

**Purpose:** Full content workflow management

**Data Model:**
```typescript
type ContentItem = {
  _id: Id<"content">
  title: string
  platform: "youtube" | "tiktok" | "instagram" | "newsletter" | "blog" | "other"
  stage: "idea" | "script" | "thumbnail" | "filming" | "editing" | "review" | "scheduled" | "published"
  idea: string
  script?: string
  thumbnailUrl?: string
  scheduledDate?: number
  publishedDate?: number
  views?: number
  status: "active" | "archived"
  tags: string[]
  createdAt: number
  updatedAt: number
}
```

**Features:**
- Pipeline view (horizontal stages)
- Click to expand/edit details
- Script editor with markdown
- Thumbnail image upload/URL
- Publishing schedule integration
- Analytics tracking

---

### 3. Calendar

**Purpose:** Display all scheduled tasks and cron jobs

**Data Model:**
```typescript
type CalendarEvent = {
  _id: Id<"calendar">
  title: string
  description: string
  type: "task" | "cron" | "content" | "meeting" | "reminder"
  startTime: number
  endTime?: number
  recurrence?: "daily" | "weekly" | "monthly"
  source?: string // e.g., "research cron", "heartbeat"
  status: "scheduled" | "completed" | "cancelled"
  color: string
}
```

**Features:**
- Monthly calendar view
- Color-coded event types
- List view option
- Sync with tasks
- Cron job visualization

---

### 4. Memory Screen

**Purpose:** Searchable long-term memory interface

**Data Model:**
```typescript
type Memory = {
  _id: Id<"memory">
  title: string
  content: string
  category: "conversation" | "decision" | "fact" | "preference" | "project" | "other"
  tags: string[]
  importance: "low" | "medium" | "high" | "critical"
  source?: string // conversation id or file
  createdAt: number
  updatedAt: number
}
```

**Features:**
- Search bar with instant results
- Category filters
- Tag cloud
- Full-text search
- Add/edit memories
- Import from conversation transcripts
- Relevance scoring

---

### 5. Team Structure

**Purpose:** Display agents and their roles

**Data Model:**
```typescript
type Agent = {
  _id: Id<"agents">
  name: string
  role: "developer" | "writer" | "designer" | "researcher" | "manager" | "general"
  status: "active" | "idle" | "working" | "offline"
  description: string
  capabilities: string[]
  currentTask?: string
  avatar?: string
  createdAt: number
  updatedAt: number
}
```

**Features:**
- Agent cards with roles
- Status indicators
- Capability tags
- Current task display
- Add new agents
- Edit agent details

---

### 6. Office View

**Purpose:** Visual workspace showing agents

**Features:**
- Grid of "workspaces"
- Each workspace has:
  - Agent avatar
  - Name
  - Current status (animated dots)
  - Active task
  - Activity timeline
- Real-time status updates
- Visual "working" animations

---

### 7. Profits Screen

**Purpose:** Revenue and expense tracking

**Data Model:**
```typescript
type Venture = {
  _id: Id<"ventures">
  name: string
  description: string
  type: "business" | "project" | "investment" | "other"
  status: "active" | "paused" | "archived"
  color: string
  createdAt: number
}

type Transaction = {
  _id: Id<"transactions">
  ventureId: Id<"ventures">
  type: "income" | "expense"
  amount: number
  currency: "USD" | "EUR" | "GBP"
  description: string
  category: string
  date: number
  createdAt: number
}
```

**Features:**
- Venture cards/tabs
- Income/expense breakdown
- Profit/loss calculation
- Monthly charts
- Category breakdown
- Add new ventures
- Link to tasks/projects

---

## UI/UX Design

### Color Scheme
- **Background:** #0a0a0f (near black)
- **Card Background:** #1a1a2e
- **Border:** #2a2a4e
- **Primary:** #00d4ff (cyan)
- **Secondary:** #7c3aed (purple)
- **Success:** #10b981 (green)
- **Warning:** #f59e0b (amber)
- **Error:** #ef4444 (red)
- **Text Primary:** #ffffff
- **Text Secondary:** #9ca3af

### Layout
- **Sidebar:** Fixed left, 240px width, collapsible to 64px
- **Header:** Fixed top, 64px height
- **Content:** Scrollable, max-width 1400px centered
- **Responsive:** Mobile-friendly with hamburger menu

### Components
- Consistent card styling (rounded-xl, border, hover effects)
- Status badges with colors
- Smooth transitions (200ms)
- Loading skeletons
- Empty states

---

## Acceptance Criteria

### Tasks Board
- [ ] Can create new task with title, description, assignee, priority
- [ ] Tasks display in correct columns by status
- [ ] Can drag tasks between columns
- [ ] Can filter by assignee
- [ ] Real-time updates visible

### Content Pipeline
- [ ] Can create new content item
- [ ] Items display in pipeline stages
- [ ] Can edit script and thumbnail
- [ ] Can change stage
- [ ] Shows scheduled dates

### Calendar
- [ ] Monthly view displays correctly
- [ ] Events show on correct dates
- [ ] Can create new events
- [ ] Cron jobs appear from system

### Memory
- [ ] Search returns relevant results
- [ ] Can add new memory
- [ ] Categories filter correctly
- [ ] Shows creation date

### Team
- [ ] Agents display with status
- [ ] Can add new agent
- [ ] Status indicators work

### Office
- [ ] Grid displays agents
- [ ] Status animations work
- [ ] Current task shows

### Profits
- [ ] Ventures display in tabs
- [ ] Can add income/expense
- [ ] Calculations are correct
- [ ] Charts display

---

## Future Extensibility

The system is designed to be modular:
- New modules can be added as new folders
- Each module follows same pattern (page.tsx + components)
- Convex schema can be extended
- UI components are reusable

Potential future modules:
- Ad Performance Tracker
- Inventory Management
- Customer CRM
- Analytics Dashboard

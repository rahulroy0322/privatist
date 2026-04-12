# Todos Page Implementation Plan

## Overview
Build the main todos page with full Todoist-style layout as specified in the PRD. This page will be the core of the Privatist application, featuring a collapsible sidebar, task list with drag & drop, quick add bar, and comprehensive task management.

## Current State Analysis
- **Existing routes**: `/todos` route exists but only shows placeholder content
- **Database schema**: Simple Dexie schema with `tasks` and `settings` tables (needs extension)
- **UI components**: Only basic shadcn components (button, card, dropdown-menu) are available
- **State management**: Settings store exists; task store needs to be created
- **Styling**: Tailwind CSS 4+ with shadcn theme variables configured

## Required Dependencies to Install

Note already done

### 1. Additional shadcn/ui Components
Run these commands to generate missing shadcn components:

```bash
# Core form components
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add checkbox
npx shadcn@latest add switch

# Layout components
npx shadcn@latest add dialog
npx shadcn@latest add popover
npx shadcn@latest add select
npx shadcn@latest add badge
npx shadcn@latest add separator
npx shadcn@latest add scroll-area
npx shadcn@latest add calendar

# Navigation components
npx shadcn@latest add command
npx shadcn@latest add dropdown-menu (already exists)
npx shadcn@latest add tooltip
npx shadcn@latest add toast
```

### 2. Drag & Drop Library
```bash
pnpm add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

### 3. Date Handling
```bash
pnpm add date-fns
# Future: pnpm add chrono-node @timelang/parse (for NLP Phase 2)
```

### 4. Icons (already installed)
- `@remixicon/react` is already available

## Database Schema Extension

### Current Schema (version 1)
```typescript
tasks: '++id, title, priority, dueDate, completed'
settings: 'key'
```

### Extended Schema (version 2)
Update `src/lib/db.ts` to include:

```typescript
this.version(2).stores({
  tasks: '++id, title, priority, dueDate, completed, projectId, createdAt',
  settings: 'key',
  projects: '++id, name, color, order',
  labels: '++id, name, color',
  syncQueue: '++id, operation, table, timestamp'
})
```

### Type Definitions Update
Update `src/lib/types.ts` with comprehensive types matching PRD schema:

```typescript
type TaskType = {
  id?: number
  title: string
  description?: string
  priority: 1 | 2 | 3 | 4
  dueDate?: number | null
  completed: boolean
  projectId?: string | null
  labelIds: string[]
  parentId?: string | null
  order: number
  createdAt: number
  updatedAt: number
  completedAt?: number | null
  syncedAt?: number | null
}

type ProjectType = {
  id?: number
  name: string
  color: string
  order: number
  isArchived: boolean
  createdAt: number
  updatedAt: number
}

type LabelType = {
  id?: number
  name: string
  color: string
  createdAt: number
}

type SyncQueueItemType = {
  id?: number
  operation: 'CREATE' | 'UPDATE' | 'DELETE'
  table: 'todos' | 'projects' | 'labels'
  payload: object
  timestamp: number
  retryCount: number
}
```

## Component Structure to Create

### Task Components (`src/components/tasks/`)
1. **`task-item.tsx`** - Individual task card with:
   - Circle checkbox with priority border
   - Title with completion styling
   - Due date badge
   - Project/label badges
   - Hover actions (edit, delete, move)
   - Drag handle

2. **`task-list.tsx`** - Container for task items with:
   - Section headers (Today, Tomorrow, Upcoming, No Date)
   - Empty states
   - Drag & drop context

3. **`priority-badge.tsx`** - Visual priority indicator mapping:
   - P1: `destructive` color
   - P2: `primary/80` (orange hue)
   - P3: `primary` color
   - P4: `muted` color

4. **`quick-add-bar.tsx`** - Bottom bar for quick task input:
   - `bg-card`, `border-t border-border`, shadow
   - Input with placeholder
   - Plus button

5. **`task-modal.tsx`** - Full task edit/create dialog:
   - Title input with NLP token highlighting (Phase 2 placeholder)
   - Description textarea
   - Due date calendar with quick chips
   - Priority selector
   - Project combobox
   - Label multi-select

### Layout Components (`src/components/layout/`)
1. **`sidebar.tsx`** - Collapsible left sidebar:
   - `bg-card`, `border-r border-border`
   - Project list
   - Label filters
   - View filters (Today, Upcoming, Completed)

2. **`app-header.tsx`** - Top header:
   - `border-b border-border`
   - Search/command palette trigger
   - Theme toggle
   - Sync status indicator

3. **`command-palette.tsx`** - Cmd+K command palette:
   - Search tasks
   - Quick actions
   - Navigation

## State Management

### Task Store (`src/stores/todo-store.ts`)
Zustand store with:
- Task CRUD operations (create, read, update, delete)
- Filtering and sorting
- Bulk operations
- Optimistic updates with sync queue

### UI Store (`src/stores/ui-store.ts`)
- Modal states (task modal, settings modal)
- Selection state (multi-select)
- Sidebar collapsed state
- Active filter/view

## Implementation Steps

### Phase 1: Foundation
1. Install missing dependencies (shadcn components, dnd-kit, date-fns)
2. Update database schema and types
3. Create basic task store with CRUD operations
4. Create core task components (task-item, task-list, priority-badge)

### Phase 2: Layout
1. Create sidebar component with project/label navigation
2. Create app header with search and theme toggle
3. Implement main todos page layout with responsive grid
4. Add quick add bar at bottom

### Phase 3: Features
1. Implement task modal for create/edit
2. Add drag & drop reordering
3. Implement filters (Today, Upcoming, Completed)
4. Add search functionality
5. Implement keyboard shortcuts

### Phase 4: Polish
1. Add empty states and loading skeletons
2. Implement sync status indicator
3. Add toast notifications for actions
4. Test offline functionality
5. Optimize performance

## Styling Guidelines (from PRD)

### Color System
- Use ONLY shadcn theme CSS variables
- NO hardcoded hex colors
- Priority mapping:
  - Critical (P1): `destructive` color
  - Alert (P2): `primary` base color
  - Elevated (P3): `primary` base color
  - Standby (P4): `muted` or `secondary`

### Component Styling
- Task items: `bg-card`, `border-border`
- Hover states: `hover:bg-accent`, `hover:text-accent-foreground`
- Focus rings: `focus-visible:ring-2 focus-visible:ring-ring`
- Transitions: `transition-colors duration-200`

## Keyboard Shortcuts to Implement
- `N` - New task (opens modal)
- `A` - Add task at bottom of current list
- `/` or `Cmd+K` - Command palette
- `Q` - Quick add (focus bottom bar)
- `Space` - Toggle complete selected task
- `E` - Edit selected task
- `1/2/3/4` - Set priority p1-p4
- `T` - Add due date today
- `D` - Open date picker
- `?` - Show keyboard shortcuts modal

## Testing Checklist
- [ ] Tasks can be created, edited, completed, deleted
- [ ] Drag & drop reordering works
- [ ] Filters correctly show relevant tasks
- [ ] Search finds tasks by title
- [ ] Keyboard shortcuts work
- [ ] Works offline (no network errors)
- [ ] Responsive design on mobile/tablet
- [ ] Dark/light theme switching
- [ ] Empty states display properly

## Files to Create/Modify

### New Files
```
src/components/tasks/
  ├── task-item.tsx
  ├── task-list.tsx
  ├── priority-badge.tsx
  ├── quick-add-bar.tsx
  └── task-modal.tsx

src/components/layout/
  ├── sidebar.tsx
  ├── app-header.tsx
  └── command-palette.tsx

src/stores/
  ├── todo-store.ts
  └── ui-store.ts

src/hooks/
  ├── use-tasks.ts
  └── use-keyboard-shortcuts.ts
```

### Modified Files
```
src/lib/db.ts              # Schema extension
src/lib/types.ts           # Type definitions
src/routes/todos.tsx       # Main page implementation
src/styles.css             # Additional CSS variables if needed
```

## Next Steps
1. Review this plan and provide feedback
2. Install the listed dependencies
3. Switch to Code mode to begin implementation
4. Follow the phased approach for systematic development

## Notes
- All components must follow shadcn/ui styling conventions
- Use Tailwind utility classes with theme variables
- Maintain TypeScript strict typing
- Add TODO comments for NLP Phase 2 features as specified in PRD
- Ensure accessibility (ARIA labels, keyboard navigation)
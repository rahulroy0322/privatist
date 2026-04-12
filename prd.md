## Product Overview
- **Name**: Privatist
- **Tagline**: Your tasks, your device, your choice to sync
- **Core Philosophy**: Works 100% offline by default. Cloud sync is strictly opt-in. Natural task input like Todoist (future phase).

## Target Users
- Privacy-conscious individuals
- Users in low-connectivity environments
- People who want control over their data
- Power users who love keyboard-driven input

## Tech Stack (MUST USE EXACTLY)
- **Build Tool**: Vite 8
- **Framework**: React 19 with TypeScript
- **State Management**: Zustand
- **Local Database**: Dexie.js (IndexedDB wrapper)
- **Sync Engine**: TanStack Query + custom background sync
- **PWA**: vite-plugin-pwa with Workbox
- **UI Library**: shadcn/ui (MANDATORY - all components from here)
- **Styling**: Tailwind CSS 4+
- **Forms**: React Hook Form + Zod
- **Date Handling**: date-fns + (future: chrono-node @timelang/parse for NLP)
- **Icons**: Lucide React
- **Drag & Drop**: @dnd-kit/core + @dnd-kit/sortable

## Color System (shadcn/ui - NO HARDCODED COLORS)

Use only shadcn/ui's theme system via CSS variables. All colors reference `hsl()` variables from the design system.

**Base Theme Variables** (from shadcn init):
- `--background`: Page background
- `--foreground`: Primary text
- `--card`: Task items, modals
- `--card-foreground`: Text on cards
- `--popover`: Dropdowns, menus
- `--popover-foreground`: Text on popovers
- `--primary`: Buttons, active states, accents
- `--primary-foreground`: Text on primary
- `--secondary`: Secondary buttons, badges
- `--secondary-foreground`: Text on secondary
- `--muted`: Subtle backgrounds
- `--muted-foreground`: Secondary text, placeholders
- `--accent`: Hover states, highlights
- `--accent-foreground`: Text on accent
- `--destructive`: Delete actions, errors
- `--destructive-foreground`: Text on destructive
- `--border`: Dividers, outlines
- `--input`: Form field backgrounds
- `--ring`: Focus rings

**Priority System** (map to shadcn semantic colors):
- Critical (Highest): `destructive` color (Universal sci-fi urgency. Clear severity.)
- Alert (High): `primary` base color (Active attention required.)               |
- Elevated (Medium): `primary` base color (Heightened state. Above normal.)  
- Standby (Low/None): `muted` or `secondary` (Default state. Ready when needed.)

**Implementation Rule**: 
- NEVER use hex codes like `#FF7066` in components
- ALWAYS use Tailwind classes: `bg-primary`, `text-muted-foreground`, `border-border`, `ring-ring`
- Theme customization happens in `globals.css` CSS variables only
- Support Light/Dark/System via `class` strategy

## Required Pages & Features

### 1. Welcome/Onboarding Page
- Clean, minimal design using `bg-background`, `text-foreground`
- Value proposition: "Works offline. Sync only if you want."
- Two paths: "Start Offline" or "Enable Sync"
- If "Enable Sync": simple form for endpoint URL + auth token
- Store preference in Dexie settings table
- No account required to start
- Demo: 3 sample tasks pre-loaded to show functionality

### 2. List Page (Main View - Todoist-Style)
- **Layout**: 
  - Collapsible left sidebar (projects, labels, filters) - `bg-card`, `border-r border-border`
  - Main content: Today | Upcoming | Project view | Label view - `bg-background`
  - Quick Add bar at bottom - `bg-card`, `border-t border-border`, shadow
- **Task Items**:
  - Circle checkbox - `rounded-full border-2 border-muted-foreground`, completed: `bg-primary border-primary`
  - Title - `text-foreground`, completed: `text-muted-foreground line-through`
  - Priority left border - `border-l-4` with priority color mapping
  - Due date - `text-muted-foreground text-sm`
  - Badges (project, labels) - `bg-secondary text-secondary-foreground` or `bg-accent text-accent-foreground`
  - Hover reveals actions - `hover:bg-accent` transition
  - Drag handle - `text-muted-foreground hover:text-foreground`
- **Sections**:
  - Today (overdue + today)
  - Tomorrow  
  - Upcoming (grouped by date)
  - No Date (bottom)
  - Section headers - `text-muted-foreground uppercase text-xs font-semibold tracking-wider`
- **Filters**: All | Today | Upcoming | Completed | [Custom Projects] | [Labels]
  - Active filter - `bg-primary text-primary-foreground`
  - Inactive - `text-muted-foreground hover:text-foreground hover:bg-accent`
- **Search**: Real-time filter, `Cmd+K` opens command palette
- **Bulk Actions**: Select multiple, `bg-accent` highlight on selected
- **Empty States**: `text-muted-foreground`, `bg-muted` illustration area
- **Offline Indicator**: `text-muted-foreground` cloud-slash icon
- **Sync Status**: `text-muted-foreground text-xs` - "Synced just now" | "Syncing..." | "Offline"

### 3. New/Update Task Modal (Quick Add / Full Edit)
- **Quick Add Bar** (bottom of list):
  - `bg-card`, `border border-border`, `shadow-lg`
  - Input placeholder - `text-muted-foreground`
  - Plus button - `bg-primary text-primary-foreground`
  
- **Full Task Modal** (Dialog from shadcn):
  - **Title Input**: `bg-background`, `text-foreground`, focus: `ring-ring`
    - Placeholder: "Task name" - `text-muted-foreground`
    - // TODO: NLP Phase 2 - Add inline token highlighting with `data-parsed` attributes
  - **Description**: Textarea, `bg-background`, `border-input`, expandable
  - **Due Date**: 
    - Calendar popover - `bg-popover`, `text-popover-foreground`
    - Quick chips: "Today", "Tomorrow", "Next weekend" - `bg-secondary hover:bg-accent`
  - **Priority**: 
    - 4-level visual selector using semantic colors
    - P1: `bg-destructive text-destructive-foreground`
    - P2: `bg-primary/80 text-primary-foreground` (orange hue in theme)
    - P3: `bg-primary text-primary-foreground`
    - P4: `bg-muted text-muted-foreground`
  - **Project**: Combobox - `bg-popover`, `border-border`
  - **Labels**: Multi-select chips - `bg-accent text-accent-foreground`
  - **Subtasks**: Nested list, `border-l-2 border-border pl-4`
- **Actions**:
  - Primary: "Add task" - `bg-primary text-primary-foreground hover:bg-primary/90`
  - Secondary: "Cancel" - `bg-secondary text-secondary-foreground`
  - Destructive: "Delete" - `bg-destructive text-destructive-foreground` (edit mode only)

### 4. Settings Page
- **Sync Section**: `bg-card`, `border border-border`, `rounded-lg`
  - Toggle: `data-[state=checked]:bg-primary`
  - Status text: `text-muted-foreground`
- **Storage Section**:
  - Progress bar: `bg-muted` track, `bg-primary` fill
  - Danger actions: `text-destructive`, `hover:bg-destructive/10`
- **Appearance**:
  - Theme toggle: Light/Dark/System - `bg-secondary`
  - Density: Compact/Comfortable - affects `space-y-*` and `p-*` classes
  - Accent color: // TODO: Generate CSS variable overrides for primary hue

## Future Roadmap (DO NOT IMPLEMENT YET)

### Phase 2: Natural Language Parsing (Post-MVP)
**Status**: Architecture-ready, implementation blocked pending explicit approval

When user types in title input, auto-extract:
| Pattern | Extracts To | Example |
|---------|-----------|---------|
| `tomorrow`, `next Monday`, `in 3 days` | Due date | "Call mom tomorrow" → Due: tomorrow |
| `every day`, `every week` | Recurring pattern | "Standup every day" → Recurring daily |
| `#projectname` | Project assignment | "Fix bug #work" → Project: work |
| `@label` | Labels | "Buy milk @shopping" → Label: shopping |
| `p1`, `p2`, `p3`, `p4` | Priority | "Urgent p1" → Priority: 1 |

**Technical Prep**:
- Title input uses controlled component with regex detection
- Highlight detected tokens inline using `bg-accent/30` spans
- Store raw title + parsed metadata separately
- Library ready: `chrono-node` for dates, custom regex for rest
- **Current code**: Add `// TODO: NLP Phase 2` comments where parsing will hook in

### Phase 3: Advanced Features
- Recurring tasks (RRule integration)
- Reminders/notifications (Push API)
- Task comments/attachments
- Collaboration (shared projects)
- Karma/productivity stats

## UI/UX Requirements (shadcn/ui - Theme-Compliant)

**Components** (all from shadcn - use exact styling):
- `button` - variants: `default` (primary), `secondary`, `destructive`, `ghost`, `outline`, `link`
- `input` / `textarea` - `bg-background`, `border-input`, `ring-ring` focus
- `dialog` - `bg-card`, `border-border`, `shadow-lg`
- `dropdown-menu` - `bg-popover`, `text-popover-foreground`
- `checkbox` - `border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground`
- `calendar` / `popover` - `bg-popover`, `text-popover-foreground`
- `badge` - variants: `default`, `secondary`, `destructive`, `outline`
- `select` / `combobox` - `bg-popover`, `border-input`
- `separator` - `bg-border`
- `skeleton` - `bg-muted`
- `toast` / `sonner` - `bg-card`, `text-card-foreground`, `border-border`
- `tooltip` - `bg-primary`, `text-primary-foreground`
- `scroll-area` - `bg-transparent`, custom scrollbar `bg-muted`
- `command` / `cmdk` - `bg-popover`, `text-popover-foreground`
- `accordion` - `border-border`
- `collapsible` - animations via `data-[state=open]`
- `context-menu` - `bg-popover`, `text-popover-foreground`
- `switch` (for toggles) - `data-[state=checked]:bg-primary`

**Styling Rules**:
- NO hardcoded colors: `red-500`, `blue-600`, `#FF7066` are FORBIDDEN
- USE theme tokens: `primary`, `secondary`, `muted`, `accent`, `destructive`, `card`, `popover`, `border`, `input`, `ring`, `foreground`, `background`
- Transitions: `transition-colors duration-200`
- Focus: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`
- Hover: `hover:bg-accent hover:text-accent-foreground`
- Disabled: `disabled:pointer-events-none disabled:opacity-50`

## Data Architecture

### Dexie Schema (React 19 + Dexie 4 compatible)
```typescript
Database: TodoDB (version 1)

Table: settings
- key: string (primary)
- value: any
// Keys: 'syncConfig', 'theme', 'density', 'defaultView'

Table: projects
- id: string (UUID, primary)
- name: string
- color: string (HSL string matching theme, e.g., "hsl(220 70% 50%)")
- parentId: string | null (for nested projects - future)
- order: number
- isArchived: boolean
- createdAt: number
- updatedAt: number

Table: labels
- id: string (UUID, primary)
- name: string
- color: string (HSL string)
- createdAt: number

Table: todos
- id: string (UUID, primary)
- title: string (raw user input)
- titleParsed: string | null (clean title without NLP tokens - Phase 2)
- description: string (markdown)
- completed: boolean
- priority: 1 | 2 | 3 | 4
- dueDate: number | null (timestamp, end of day)
- dueTime: number | null (timestamp, optional - Phase 2)
- projectId: string | null (foreign key → projects)
- labelIds: string[] (array of label IDs)
- parentId: string | null (self-reference for subtasks)
- order: number (within parent/section)
- isRecurring: boolean (Phase 2)
- recurringRule: string | null (RRule string - Phase 2)
- createdAt: number
- updatedAt: number
- completedAt: number | null
- syncedAt: number | null (null = local only)

Table: syncQueue
- id: auto-increment
- operation: 'CREATE' | 'UPDATE' | 'DELETE'
- table: 'todos' | 'projects' | 'labels'
- payload: object
- timestamp: number
- retryCount: number
```

### Sync Behavior
- **Default**: Zero network requests. App functions fully offline.
- **When sync enabled**:
  1. All mutations write to `syncQueue` immediately
  2. Zustand state updates optimistically
  3. Workbox BackgroundSync processes queue when online
  4. Periodic sync (every 15 min if app open) pulls remote changes
  5. On app open (if online): check for remote updates
- **Conflict resolution**: `updatedAt` timestamp wins (last-write-wins)
- **Offline indicator**: Cloud icon with slash when queue has unsynced items

## PWA Requirements (Vite 7 + React 19)

- **vite-plugin-pwa** v0.21+
- **Manifest 3.0**: 
  - `display_override`: ["window-controls-overlay", "standalone"]
  - Shortcuts for "Add task", "Today", "Inbox"
  - Screenshots for install prompt
- **Service Worker**:
  - Precache static assets (CacheFirst for images/fonts)
  - NetworkFirst for API calls with BackgroundSyncPlugin
  - `periodic-background-sync` for hourly sync (if enabled)
- **Install**: Custom install button (not browser default) - `bg-primary text-primary-foreground`
- **Storage**: 
  - Request persistent storage on first task creation
  - Show storage quota warning at 80% usage - `text-destructive`

## Keyboard Shortcuts (Todoist-Compatible)

| Key | Action |
|-----|--------|
| N | New task (opens modal) |
| A | Add task at bottom of current list |
| / or Cmd+K | Command palette (search, jump) |
| Q | Quick add (focus bottom bar) |
| Space | Toggle complete selected task |
| E | Edit selected task |
| # | Quick assign project (future: inline) |
| @ | Quick assign label (future: inline) |
| 1/2/3/4 | Set priority p1-p4 |
| T | Add due date today |
| T then T | Add due date tomorrow |
| D | Open date picker |
| P | Move to project |
| L | Add label |
| ? | Show keyboard shortcuts modal |
| Esc | Close modal/cancel |

## Performance Targets (React 19 Optimizations)

- First paint: < 1s on 4G
- TTI: < 2s (React 19 compiler optimizations)
- 60fps drag-and-drop (10k+ tasks)
- Search: < 30ms for 50k tasks (Dexie indexes)
- Bundle: < 120KB initial (React 19 + tree-shaking)

## React 19 Specific Features

- **Compiler**: Enable React Compiler for automatic memoization
- **Actions**: Use `useActionState` for form submissions
- **Document Metadata**: Native `<title>`, `<meta>` in components
- **Asset Loading**: `preload` for critical fonts/icons
- **Ref cleanup**: Callback refs for measurements

## Security & Privacy

- All data local by default
- Optional: `libsodium-wrappers` for client-side encryption before sync
- No telemetry without consent
- Export: Unencrypted JSON (user owns data)
- Import: Validate schema, sanitize HTML in descriptions

## Code Markers for Future NLP Phase

Add these TODOs in generated code:
```typescript
// TODO: NLP Phase 2 - Hook chrono-node here for date parsing
// TODO: NLP Phase 2 - Extract #project tokens from title
// TODO: NLP Phase 2 - Extract @label tokens from title  
// TODO: NLP Phase 2 - Extract p1/p2/p3/p4 tokens
// TODO: NLP Phase 2 - Inline highlighting using bg-accent/30 spans
// TODO: NLP Phase 2 - Recurring pattern detection
// TODO: Theme Phase 2 - Allow primary hue customization in settings
```

## File Structure

```
src/
├── components/
│   ├── ui/                    # shadcn components (auto-generated)
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── ... (all shadcn)
│   ├── tasks/
│   │   ├── task-item.tsx      # Uses bg-card, border-border
│   │   ├── task-list.tsx      # Uses space-y-*, bg-background
│   │   ├── task-checkbox.tsx  # Custom styled checkbox
│   │   ├── priority-badge.tsx # Maps to destructive/primary/muted
│   │   ├── quick-add-bar.tsx  # bg-card, border-t border-border
│   │   └── task-modal.tsx     # Dialog with form
│   ├── layout/
│   │   ├── sidebar.tsx        # bg-card, border-r border-border
│   │   ├── app-header.tsx     # border-b border-border
│   │   └── command-palette.tsx # cmdk implementation
│   └── settings/
│       ├── sync-settings.tsx
│       ├── appearance-settings.tsx
│       └── storage-settings.tsx
├── hooks/
│   ├── use-tasks.ts
│   ├── use-projects.ts
│   ├── use-sync.ts
│   └── use-theme.ts           # shadcn theme provider
├── lib/
│   ├── db.ts                  # Dexie setup
│   ├── sync-engine.ts         # Background sync
│   ├── mutations.ts           # All writes with syncQueue
│   ├── utils.ts               # cn() helper from shadcn
│   └── constants.ts           # Priority mappings
├── stores/
│   ├── todo-store.ts          # Zustand
│   ├── settings-store.ts      # Theme, sync config
│   └── ui-store.ts            # Modal states, selections
├── styles/
│   └── globals.css            # CSS variables (shadcn theme)
├── types/
│   └── index.ts               # TypeScript interfaces
├── workers/
│   └── sw.ts                  # Service worker
└── App.tsx
```

## Theme Configuration (globals.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}

// TODO: Phase 2 - Add accent hue customization via CSS variables
// Example: --primary-hue: 220; then use calc() in component colors
```

## Success Metrics

- [ ] App installs as PWA (standalone)
- [ ] Full functionality in airplane mode
- [ ] Zero data loss on browser crash
- [ ] Sync resumes automatically after offline period
- [ ] Sub-2s initial load on mobile 4G
- [ ] Todoist user feels familiar within 30 seconds
- [ ] Zero hardcoded hex colors in codebase (only CSS variables)

Generate complete PRD with user stories, technical architecture diagrams, component API specifications using shadcn/ui tokens, and implementation checklist.

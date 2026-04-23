# Comprehensive Testing Strategy for Privatist

## Project Overview
Privatist is a React-based todo application with:
- **Frontend**: React + TypeScript with TanStack Router
- **State Management**: Zustand stores + Dexie for IndexedDB
- **UI Components**: Shadcn UI components
- **Testing Levels Needed**: Unit, Integration, E2E

## Current Testing Status
No existing test setup detected. Need to establish complete testing infrastructure.

## Testing Infrastructure Setup

### 1. Test Framework Selection
- **Unit/Integration**: Vitest (already available via Vite)
- **Component Testing**: React Testing Library
- **E2E**: Playwright (recommended) or Cypress
- **Mocking**: Vitest built-in

### 2. Dependencies to Install
```json
{
  "devDependencies": {
    "vitest": "^2.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.4.2",
    "@testing-library/user-event": "^14.5.2",
    "@vitest/ui": "^2.0.0",
    "jsdom": "^24.0.0",
    "@playwright/test": "^1.40.0"
  }
}
```

### 3. Configuration Files
- `vitest.config.ts` - Vitest configuration
- `playwright.config.ts` - Playwright configuration
- Test setup files for global mocks

## Unit Testing Strategy

### A. Utility Functions (`src/lib/`)
1. **`date.ts`** - Date utility functions
   - Test `getTodayRange()` returns correct timestamps
   - Edge cases: timezone handling, daylight saving

2. **`utils.ts`** - Class name utility
   - Test `cn()` function merges class names correctly
   - Test with various input combinations

### B. Services (`src/services/`)
1. **`todo.ts`** - Todo CRUD operations
   - Mock Dexie database
   - Test `addTodo`, `updateTodo`, `toggleTodo`, `deleteTodo`
   - Error handling scenarios

2. **`project.ts`** - Project CRUD operations
   - Similar pattern to todo services
   - Test project creation with icons

### C. Schema Validation (`src/schema/`)
1. **`todo.ts`** - Zod schema validation
   - Test `createTodoSchema` validation
   - Test edge cases: empty title, invalid priority, date formats

### D. Hooks (`src/hooks/`)
1. **`use-theme.ts`** - Theme management
   - Mock Dexie query
   - Test theme state changes
   - Test default system theme

2. **`use-search-todos.ts`** - Search functionality
   - Test search filtering logic
   - Test case-insensitive matching
   - Test empty search query

3. **`use-mobile.ts`** - Mobile detection
   - Test window resize events
   - Test different screen sizes

### E. Stores (`src/stores/`)
1. **`todo-model.ts`** - Todo modal state
   - Test store initialization
   - Test `setTodotoEdit`, `openTodoModel`, `closeTodoModel`
   - Test state transitions

2. **`command-dialog-store.ts`** - Command dialog state
   - Test open/close functionality
   - Test keyboard shortcut integration

## Integration Testing Strategy

### A. Component Integration Tests
1. **Todo Components** (`src/components/todo/`)
   - `todo-item.tsx`: Test interactions (toggle, edit, delete)
   - `todo-list.tsx`: Test empty states, loading states
   - `todo-modal.tsx`: Test form submission
   - Mock services and stores

2. **Project Components** (`src/components/project/`)
   - `project-card.tsx`: Test click navigation, edit/delete handlers
   - `projects-grid.tsx`: Test grid layout with various data
   - `project-stats.tsx`: Test statistics calculation

3. **Form Components** (`src/components/form/`)
   - Test form validation
   - Test submission handling
   - Test error states

### B. Route Integration Tests
1. **Page Components** (`src/routes/`)
   - `today.tsx`: Test today's todo filtering
   - `inbox.tsx`: Test inbox/complete separation
   - `project/$id.tsx`: Test project-specific todo loading
   - Mock Dexie queries and test data loading

2. **Router Integration**
   - Test navigation between routes
   - Test route parameters
   - Test loading states

### C. Database Integration Tests
1. **Dexie Database** (`src/lib/db.ts`)
   - Test database schema initialization
   - Test CRUD operations with in-memory database
   - Test reactive queries with `useLiveQuery`

## Component Testing Strategy

### A. Pure UI Components (`src/components/ui/`)
1. **Basic Components**: Button, Input, Card, etc.
   - Test rendering with different props
   - Test accessibility attributes
   - Test event handlers

2. **Complex Components**: 
   - `accordion.tsx`: Test expand/collapse
   - `dropdown-menu.tsx`: Test keyboard navigation
   - `calendar.tsx`: Test date selection

### B. Business Logic Components
1. **`TodoItem` Component**
   ```typescript
   // Test scenarios:
   - Renders todo title and description
   - Toggle checkbox changes completion state
   - Edit button opens modal with correct todo
   - Delete button removes todo
   - Date display shows correct formatting
   - Priority badge shows correct color
   ```

2. **`ProjectCard` Component**
   ```typescript
   // Test scenarios:
   - Renders project name and icon
   - Click navigates to project page
   - Edit/delete buttons trigger callbacks
   - Stats show correct counts
   ```

## E2E Testing Strategy

### A. Critical User Journeys
1. **Todo Management Flow**
   - Create new todo
   - Edit existing todo
   - Mark todo as complete
   - Delete todo
   - Filter todos by date/project

2. **Project Management Flow**
   - Create new project
   - Edit project details
   - Delete project
   - View project-specific todos

3. **Navigation Flow**
   - Navigate between inbox, today, upcoming, overdue
   - Use sidebar navigation
   - Use command palette (Cmd+K)

### B. Playwright Test Structure
```typescript
// Example test structure
describe('Todo Management', () => {
  test('create and complete todo', async ({ page }) => {
    await page.goto('/')
    await page.click('button:has-text("Add Todo")')
    await page.fill('input[name="title"]', 'Test Todo')
    await page.click('button:has-text("Save")')
    await page.click('[data-testid="todo-checkbox"]')
    // Assert todo is completed
  })
})
```

### C. Test Data Management
- Use test database seed scripts
- Clean up after each test
- Isolate test data

## Test Organization Structure

**Organization**: All tests will be stored in a `tests/` folder at the project root (not inside `src/`). This keeps test files separate from source code.

```
tests/
├── unit/
│   ├── lib/
│   │   ├── date.test.ts
│   │   ├── db.test.ts
│   │   └── utils.test.ts
│   ├── services/
│   │   ├── todo.test.ts
│   │   └── project.test.ts
│   ├── hooks/
│   │   ├── use-theme.test.ts
│   │   ├── use-search-todos.test.ts
│   │   └── use-mobile.test.ts
│   ├── stores/
│   │   ├── todo-model.test.ts
│   │   └── command-dialog-store.test.ts
│   └── schema/
│       └── todo.test.ts
├── integration/
│   ├── components/
│   │   ├── todo/
│   │   │   ├── todo-item.test.tsx
│   │   │   ├── todo-list.test.tsx
│   │   │   └── todo-modal.test.tsx
│   │   ├── project/
│   │   │   ├── project-card.test.tsx
│   │   │   └── projects-grid.test.tsx
│   │   └── form/
│   │       └── form-components.test.tsx
│   ├── routes/
│   │   ├── today.test.tsx
│   │   ├── inbox.test.tsx
│   │   └── project-id.test.tsx
│   └── db/
│       └── dexie-integration.test.ts
├── e2e/
│   ├── fixtures/
│   │   ├── test-data.ts
│   │   └── db-seed.ts
│   └── playwright/
│       ├── tests/
│       │   ├── todo-management.spec.ts
│       │   ├── project-management.spec.ts
│       │   └── navigation.spec.ts
│       └── fixtures/
│           └── page-objects/
├── setup/
│   ├── vitest.setup.ts
│   ├── mocks/
│   │   ├── dexie.ts
│   │   ├── zustand.ts
│   │   └── browser-apis.ts
│   └── utils/
│       ├── test-utils.tsx
│       └── render-with-providers.tsx
└── reports/
    ├── coverage/
    └── e2e-results/
```

**Benefits of this structure:**
1. Clear separation between source and test code
2. Easy to locate tests by category (unit/integration/e2e)
3. Shared test utilities in `tests/setup/`
4. Test reports organized separately
5. Scales well as test suite grows

## Mocking Strategy

### A. Database Mocks
```typescript
// Mock Dexie database
vi.mock('@/lib/db', () => ({
  db: {
    todos: {
      toArray: vi.fn(),
      add: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      get: vi.fn(),
      where: vi.fn(() => ({
        between: vi.fn(() => ({
          toArray: vi.fn()
        }))
      }))
    }
  }
}))
```

### B. Store Mocks
```typescript
// Mock Zustand stores
vi.mock('@/stores/todo-model', () => ({
  useTodoModel: vi.fn(),
  setTodotoEdit: vi.fn(),
  openTodoModel: vi.fn()
}))
```

### C. Browser API Mocks
- Mock `window.matchMedia` for theme testing
- Mock `localStorage` for settings
- Mock `ResizeObserver` for layout components

## Test Coverage Goals

### Minimum Coverage Targets
- **Unit Tests**: 80% coverage for utilities, services, hooks
- **Component Tests**: 70% coverage for business logic components
- **Integration Tests**: Critical user flows covered
- **E2E Tests**: All main user journeys

### Coverage Reporting
- Use Vitest's built-in coverage with `@vitest/coverage-v8`
- Generate HTML reports
- Integrate with CI/CD

## CI/CD Integration

### GitHub Actions Workflow with TODO Warning
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      
      # TODO: Tests are not fully implemented yet
      # Remove this warning once test implementation is complete
      - name: Warning - Tests are TODO
        run: |
          echo "⚠️  WARNING: Test implementation is incomplete"
          echo "Currently running minimal test setup"
          echo "Full test suite implementation is pending"
          echo "See plans/testing-strategy.md for implementation details"
      
      - run: npm run test:unit
      - run: npm run test:integration
      - run: npm run test:e2e
```

### Test Scripts in package.json
```json
{
  "scripts": {
    "test": "vitest",
    "test:unit": "vitest run --dir src/__tests__/unit",
    "test:integration": "vitest run --dir src/__tests__/integration",
    "test:e2e": "playwright test",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  }
}
```

## Implementation Priority

### Phase 1: Foundation (Week 1)
1. Install testing dependencies
2. Configure Vitest and test environment
3. Write unit tests for utilities and services
4. Set up CI pipeline

### Phase 2: Component Testing (Week 2)
1. Write component tests for critical UI components
2. Test hooks and stores
3. Add integration tests for routes

### Phase 3: E2E & Advanced (Week 3)
1. Set up Playwright
2. Write E2E tests for critical flows
3. Add accessibility testing
4. Performance testing setup

### Phase 4: Maintenance & Optimization
1. Add snapshot testing
2. Visual regression testing
3. Load testing for critical paths
4. Continuous test optimization

## Risk Mitigation

### Common Challenges
1. **IndexedDB Testing**: Use Dexie's in-memory adapter
2. **Async State Updates**: Use `waitFor` and `act` properly
3. **Theme/UI Testing**: Mock CSS-in-JS and theme providers
4. **Router Testing**: Use TanStack Router testing utilities

### Solutions
- Create reusable test utilities
- Maintain consistent mocking patterns
- Use TypeScript for test safety
- Regular test maintenance and updates

## Success Metrics

1. **Test Reliability**: < 5% flaky tests
2. **Execution Speed**: Unit tests < 30s, E2E < 5min
3. **Coverage**: Meet minimum targets
4. **CI Pass Rate**: > 95% on main branch
5. **Bug Detection**: Tests catch regressions before production

## Next Steps

1. Review and approve this testing strategy
2. Begin Phase 1 implementation
3. Establish testing standards and patterns
4. Train team on testing practices
5. Integrate testing into development workflow
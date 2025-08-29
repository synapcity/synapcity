# Roadmap

> This roadmap outlines the near-term and mid-term direction for Synapcity.  
> Status is tracked via GitHub Issues & Milestones. Dates are targets and may shift as we learn.

---

## Phases

1. **Preview** (current)
   - Goal: Public demo & stable `main` with core flows.
2. **Open Beta**
   - Goal: Broader feedback, integrations, and hardening.
3. **1.0 GA**
   - Goal: Stability, performance, docs, and extension ecosystem.

---

## Now → Preview (Core Deliverables)

### 1) Editor & Notes

- [ ] Lexical tabbed editor (per-note tabs, independent content)
- [ ] Autosave with status indicators and local fallback
- [ ] Persistent nodes (comments, resources, connections) with sidebar triggers
- [ ] Slash command menu (insert blocks/actions)
- [ ] Basic import (Markdown / `.docx` → HTML)

**Acceptance:**  
User can create notes, open multiple tabs, type offline briefly, and see saves reflected with visual feedback. Nodes expose actionable sidebars.

---

### 2) Dashboards & Grid

- [ ] Resizable grid layout (per-dashboard, per-breakpoint persistence)
- [ ] Widget container & toolbar, minimal headers
- [ ] Add/remove/reorder widgets (no DnD for dashboard _cards_ yet)
- [ ] Skeleton loading for dynamically imported components

**Acceptance:**  
User can add widgets, resize/move them, and the layout persists across reloads.

---

### 3) State & Stores (Zustand)

- [ ] Generic entity store pattern (`createEntityStore`) for notes, dashboards, widgets
- [ ] Split slices for status, selection, hydration, soft delete, sorting
- [ ] Tabs store supporting multi-entity scope
- [ ] Stable selectors & hooks; minimal re-renders

**Acceptance:**  
Stores are modular, typed, and consistent across entities. Selectors are performant and tested.

---

### 4) Theming & Typography

- [ ] Scoped theme provider (global, dashboard, note)
- [ ] Semantic tokens (OKLCH) with light/dark inversion
- [ ] Per-scope font settings (family, size, line height) using CSS vars
- [ ] “Preview theme” hook (no separate ‘preview’ scope)

**Acceptance:**  
Users can set theme & font prefs at multiple scopes; changes apply instantly and persist.

---

### 5) Search

- [ ] Fuse.js-based search across notes/tabs/dashboards
- [ ] Scoped search (current tab / note / all)
- [ ] Debounced UI with result counts

**Acceptance:**  
User can search quickly with visible scope and accurate results.

---

### 6) User Panel & Sidebar

- [ ] Collapsible user panel shell (header shows greeting + weather/time)
- [ ] Per-section modules (overview/inbox/widgets/bookmarks/drafts) structure
- [ ] Sidebar state persisted (isPinned, isHidden, isFavorite)

**Acceptance:**  
User panel opens/closes smoothly; state persists; module structure ready for content.

---

### 7) Import/Export

- [ ] Docs import (`.docx`/`.html`) into note or new tab
- [ ] Basic export (Markdown or HTML) for notes

**Acceptance:**  
Users can import a doc and export the resulting note content without breaking styles.

---

### 8) Quality (MVP)

- [ ] Jest + RTL unit tests for stores & core components
- [ ] Storybook for UI primitives
- [ ] E2E smoke (Playwright) for editor + dashboard happy path
- [ ] Basic a11y checks (axe on core screens)

**Acceptance:**  
Automated tests run on CI, with green baseline and a11y issues triaged.

---

## Open Beta Targets

### Integrations & Persistence

- [ ] Supabase/Postgres persistence for notes, tabs, and preferences
- [ ] Google Docs / Notion import flows (via upload or API)
- [ ] Image/file attachments with uploads

### Collaboration

- [ ] Presence indicators
- [ ] Conflict-handling strategy (OT/CRDT exploration)
- [ ] Shared dashboards/notes (invite-based)

### Widgets

- [ ] Goals widget (progress, target dates, categories, streaks)
- [ ] Cycle widget (rotate saved items with autoplay)
- [ ] Weather widget (F/°C toggle, geolocation, alerts modal)
- [ ] Bookmarks widget (quick links, tags)

### Mobile & Offline

- [ ] Mobile-first responsive UI
- [ ] Deeper offline mode & sync queue

### Performance

- [ ] Profiling store selectors & editor operations
- [ ] Bundle trimming & route-level code splitting
- [ ] Memoization pass for hot paths

---

## 1.0 GA

### Stability & Docs

- [ ] Production incident playbook
- [ ] Architecture docs (state mgmt, theming, editor internals)
- [ ] Complete developer docs (packages, APIs, extension points)

### Extensibility

- [ ] Public plugin API for widgets & editor nodes
- [ ] Theme packs (export/import)
- [ ] Data import/export formats (stable)

### Security & Compliance

- [ ] Secrets policy
- [ ] Content security (sanitization, uploads)
- [ ] Privacy & data retention policy

---

## Issue Labels

Use these labels to triage and search:

- `area:editor` `area:dashboard` `area:widgets` `area:theming` `area:search` `area:sidebar`
- `type:bug` `type:feature` `type:task` `type:refactor` `type:perf` `type:docs`
- `good first issue` `help wanted` `needs design` `blocked` `discussion`

---

## Milestones

We track milestones by phase:

- **Preview**
  - Editor & Tabs
  - Dashboards & Widgets
  - Theming & Fonts
  - Search
  - Core QA & CI

- **Open Beta**
  - Integrations & Persistence
  - Collaboration
  - Mobile & Offline
  - Performance

- **1.0 GA**
  - Extensibility
  - Security & Policy
  - Docs & Site

---

## How We Work

- **`main`** is stable and mirrored publicly from our private monorepo.
- Feature work happens on private branches; when merged, `main` is mirrored.
- Public issues are welcome; we triage weekly and map them to milestones.
- We favor small, focused PRs with tests and Storybook updates when applicable.

---

## Changelog

Releases will be tracked in [`CHANGELOG.md`](./CHANGELOG.md) after Open Beta.  
For now, follow commit messages and milestones for progress.

---

## Community

- Discussions: _coming soon_
- Contact: <hsadoqi@gmail.com>

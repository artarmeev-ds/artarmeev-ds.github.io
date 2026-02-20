# Line-Item Editor — Design Rules Audit

> Generated: 2026-02-12
> Audited against: common-ux-writing.md, web-portal-ux-writing.md, web-portal-design-instructions.md
> Codebase: `line-item-editor-v2.3.html` (single-file HTML application)

---

## Summary

| Category                  | Count |
|---------------------------|-------|
| UX Writing Issues         | 22    |
| Design Instruction Issues | 14    |
| Missing Implementations   | 8     |
| Gaps in the Rules         | 11    |
| **Total**                 | **55** |

---

## UX Writing Issues

### W-01 — "Please" used in error messages

**Rule:** common-ux-writing.md § Avoid "Please" — "Get straight to the point. Use imperative verbs."

| # | File | Line | Current Text | Suggested Fix |
|---|------|------|-------------|---------------|
| 1 | line-item-editor-v2.3.html | 1999 | `'Please enter email and password'` | `'Enter email and password'` |
| 2 | line-item-editor-v2.3.html | 2105 | `'Session expired — please log in again'` | `'Session expired — log in again'` |
| 3 | line-item-editor-v2.3.html | 2238 | `'Please select a sketch from the list or enter an ID manually'` | `'Select a sketch from the list or enter an ID manually'` |

---

### W-02 — Modal titles use Title Case instead of sentence case

**Rule:** web-portal-ux-writing.md § Capitalization — "Sentence case for: Modal titles"

| # | File | Line | Current Text | Suggested Fix |
|---|------|------|-------------|---------------|
| 4 | line-item-editor-v2.3.html | 1806 | `Add Floor` | `Add floor` |
| 5 | line-item-editor-v2.3.html | 1821 | `Add Room` | `Add room` |
| 6 | line-item-editor-v2.3.html | 1844 | `Confirm Delete` | See W-03 below |
| 7 | line-item-editor-v2.3.html | 3358 | `'Add Floor'` (JS) | `'Add floor'` |
| 8 | line-item-editor-v2.3.html | 3368 | `'Edit Floor'` (JS) | `'Edit floor'` |
| 9 | line-item-editor-v2.3.html | 3420 | `'Add Room'` (JS) | `'Add room'` |
| 10 | line-item-editor-v2.3.html | 3444 | `'Edit Room'` (JS) | `'Edit room'` |

---

### W-03 — Delete confirmation modal does not follow decision modal pattern

**Rule:** web-portal-ux-writing.md § Confirmation Modals — Pattern: `[Action verb] + [object]?` as title, consequence as body, `[Cancel] | [Action verb]` buttons.

**Current (line 1841–1855):**
- Title: `Confirm Delete` (static, generic)
- Body: warning box + `Delete "First Floor"?`
- Buttons: Cancel | Delete

**Problem:** The title should be the question (e.g., `Delete "First Floor"?`), and the body should explain the consequence. Currently the question is in the body and the title is a generic label.

**Suggested fix:**
- Title: `Delete "[name]"?` (sentence case, with question mark)
- Body: `[N] room(s) will be deleted. [N] item(s) will move to Project.` (consequence with period)
- Buttons: Cancel | Delete

---

### W-04 — Button labels use Title Case instead of sentence case

**Rule:** web-portal-ux-writing.md § Capitalization — "Sentence case for: Button labels"

| # | File | Line | Current Text | Suggested Fix |
|---|------|------|-------------|---------------|
| 11 | line-item-editor-v2.3.html | 1668 | `🔐 Log In` | `🔐 Log in` |
| 12 | line-item-editor-v2.3.html | 1724 | `📋 Load Sample` | `📋 Load sample` |
| 13 | line-item-editor-v2.3.html | 1725 | `➕ Create New` | `➕ Create new` |
| 14 | line-item-editor-v2.3.html | 1746 | `🏢 Add Floor` | `🏢 Add floor` |
| 15 | line-item-editor-v2.3.html | 1747 | `🚪 Add Room` | `🚪 Add room` |
| 16 | line-item-editor-v2.3.html | 1760 | `➕ Add Line Item` | `➕ Add line item` |
| 17 | line-item-editor-v2.3.html | 1762 | `🗑️ Delete Selected` | `🗑️ Delete selected` |
| 18 | line-item-editor-v2.3.html | 1816 | `Add Floor` (modal submit) | `Add floor` |
| 19 | line-item-editor-v2.3.html | 1837 | `Add Room` (modal submit) | `Add room` |
| 20 | line-item-editor-v2.3.html | 3360 | `'Add Floor'` (JS) | `'Add floor'` |
| 21 | line-item-editor-v2.3.html | 3370 | `'Save'` | OK (single word) |
| 22 | line-item-editor-v2.3.html | 3422 | `'Add Room'` (JS) | `'Add room'` |

---

### W-05 — Header button labels lack action verbs

**Rule:** web-portal-ux-writing.md § Buttons — "Use action verbs. Match the verb to the action."

| # | File | Line | Current Text | Suggested Fix |
|---|------|------|-------------|---------------|
| 23 | line-item-editor-v2.3.html | 1640 | `📄 Verisk XML` | `📄 Export Verisk XML` |
| 24 | line-item-editor-v2.3.html | 1641 | `📦 JSON` | `📦 Export JSON` |

---

### W-06 — Toast messages don't follow `[Object] [past tense verb]` pattern

**Rule:** common-ux-writing.md § Toast Notifications — "Pattern: `[Object] [past tense verb]` — 2-3 words, no articles, no period"

| # | File | Line | Current Text | Problem | Suggested Fix |
|---|------|------|-------------|---------|---------------|
| 25 | line-item-editor-v2.3.html | 2652 | `'Exported XML'` | Verb first, not object | `'XML exported'` |
| 26 | line-item-editor-v2.3.html | 2697 | `'Exported JSON'` | Verb first, not object | `'JSON exported'` |
| 27 | line-item-editor-v2.3.html | 3100 | `'Deleted'` | Missing object | `'Items deleted'` or `'Selection deleted'` |
| 28 | line-item-editor-v2.3.html | 2843 | `'New document created'` | Has article ("New") | `'Document created'` |
| 29 | line-item-editor-v2.3.html | 2522 | `'Import failed: ' + err.message` | Verb first | `'File import failed'` + details |

---

### W-07 — Error/validation toasts used as instructions (wrong pattern)

**Rule:** common-ux-writing.md § Toast Notifications — Toasts are status confirmations. Instructions and validation messages should use inline patterns, not toasts.

| # | File | Line | Current Text | Problem |
|---|------|------|-------------|---------|
| 30 | line-item-editor-v2.3.html | 3377 | `showToast('Enter floor name', 'error')` | Instruction used as error toast; should be inline validation |
| 31 | line-item-editor-v2.3.html | 3455 | `showToast('Enter room name', 'error')` | Same |
| 32 | line-item-editor-v2.3.html | 3459 | `showToast('Select a floor', 'error')` | Same |
| 33 | line-item-editor-v2.3.html | 3426 | `showToast('Add a floor first', 'warning')` | Same |

---

### W-08 — Error messages don't consistently follow "What happened → Why → What to do" pattern

**Rule:** common-ux-writing.md § Error Messages — "Pattern: What happened → Why → What to do"

| # | File | Line | Current Text | Problem |
|---|------|------|-------------|---------|
| 34 | line-item-editor-v2.3.html | 2017 | `'Invalid email or password'` | Missing "what to do" |
| 35 | line-item-editor-v2.3.html | 2128 | `'Authentication failed'` | Vague — no detail or next step |
| 36 | line-item-editor-v2.3.html | 2289 | `'Server error generating line items'` | Missing "what to do" |
| 37 | line-item-editor-v2.3.html | 2303 | `'Invalid response format'` | Technical jargon for end user |
| 38 | line-item-editor-v2.3.html | 2313 | `'Unexpected error'` | Vague — rule says avoid "something went wrong" style messages |

**Good examples already in the code:**
- Line 2308: `'Cannot connect to local proxy'` + `'Make sure cors-proxy.js is running on port 8080'` — follows the pattern well.

---

### W-09 — "Sketch Order ID" uses forbidden term "Order"

**Rule:** common-ux-writing.md § Terminology — Use "request" not "order". Exception: "Order DocuSketch camera kit" per marketing.

| # | File | Line | Current Text | Suggested Fix |
|---|------|------|-------------|---------------|
| 39 | line-item-editor-v2.3.html | 1702 | `placeholder="Enter Sketch Order ID manually"` | `placeholder="Enter sketch ID"` |

*Note: If "Sketch Order" is a specific API entity name, this may be acceptable — but the placeholder is user-facing and should prefer the standard terminology.*

---

### W-10 — Browser `confirm()` used instead of styled modal dialogs

**Rule:** web-portal-ux-writing.md § Confirmation Modals and common-ux-writing.md § Modal Dialogs both define styled modal patterns for destructive actions.

| # | File | Line | Current Text |
|---|------|------|-------------|
| 40 | line-item-editor-v2.3.html | 2625 | `` confirm(`${errors} error(s). Export anyway?`) `` |
| 41 | line-item-editor-v2.3.html | 2657 | `` confirm(`${errors} error(s). Export anyway?`) `` |
| 42 | line-item-editor-v2.3.html | 3095 | `` confirm(`Delete ${selectedItems.size} item(s)?`) `` |

These should use the existing styled modal system for consistency.

---

### W-11 — Error display header says "⚠️ Error" for all errors

**Rule:** common-ux-writing.md § Error Messages — Title should be "[What happened]", not a generic "Error" label.

| # | File | Line | Current Text |
|---|------|------|-------------|
| 43 | line-item-editor-v2.3.html | 2228 | `'⚠️ Error'` (generic header for all showError calls) |

The error header should reflect the specific issue, e.g., "Authentication failed", "Connection error", etc.

---

## Design Instruction Issues

### D-01 — Wrong font family

**Rule:** web-portal-design-instructions.md § 2.2 Typography — "Primary: IBM Plex Sans, Weights: Regular (400), Medium (500)"

| # | File | Line | Current | Rule Specifies |
|---|------|------|---------|----------------|
| 1 | line-item-editor-v2.3.html | 8 | `DM Sans` (400/500/600/700) | `IBM Plex Sans` (400/500 only) |
| 2 | line-item-editor-v2.3.html | 47 | `font-family: 'DM Sans', ...` | `font-family: 'IBM Plex Sans', ...` |

Also uses font-weight 600 and 700 (bold) in many places, but the design system only provides Regular (400) and Medium (500).

---

### D-02 — Color tokens do not match the design system

**Rule:** web-portal-design-instructions.md § 2.1 Colors — All colors defined with specific hex values.

| Token Purpose | Design System Value | Line-Item-Editor Value | Line |
|---|---|---|---|
| Primary/accent | `$chartreuse` #e5df00 | `--accent` #e8d96c | 14 |
| Primary text | `$black` #1a1905 | `--text-primary` #3d3d35 | 18 |
| Secondary text | `$secondary-dark` #6f6d41 | `--text-secondary` #6b6b5f | 19 |
| Muted text | `$gray-darker` #87867f | `--text-muted` #9a9a8e | 20 |
| Page background | `$gray` #f4f3ea | `--bg-primary` #f7f5ef | 12 |
| Borders | `$gray-dark` #e2e0d3 | `--border` #e5e3dc | 21 |
| Success | `$green` #64b56e | `--success` #4a9d5b | 24 |
| Error/danger | `$red` #e92f2f | `--error` #d94141 | 23 |
| Warning | `$yellow` #dfbb3a | `--warning` #e6a23c | 26 |
| Info | `$blue` #549cd3 | `--info` #409eff | 28 |

Every color is different from the design system. The line-item-editor defines its own parallel color palette.

---

### D-03 — Button style `btn-secondary` does not exist in the design system

**Rule:** web-portal-design-instructions.md § 3.1 Buttons — Secondary actions use `btn-stroke` (white bg, gray border, black text).

| # | File | Line | Current | Rule Specifies |
|---|------|------|---------|----------------|
| 3 | line-item-editor-v2.3.html | 111–120 | `.btn-secondary` (custom) | `.btn-stroke` (white bg, gray border) |

The line-item-editor names its secondary button `btn-secondary`, not `btn-stroke`. The visual style is similar but not identical.

---

### D-04 — `btn-danger` style inverted from design system

**Rule:** web-portal-design-instructions.md § 3.1 Buttons — `btn-danger`: "White bg, gray border, red text"

| # | File | Line | Current | Rule Specifies |
|---|------|------|---------|----------------|
| 4 | line-item-editor-v2.3.html | 122–130 | Red bg (#d94141), white text | White bg, gray border, red text |

The destructive button has the opposite color scheme from the design system.

---

### D-05 — `btn-success` does not exist in the design system

**Rule:** web-portal-design-instructions.md § 3.1 Buttons — Only `btn-primary`, `btn-stroke`, `btn-danger`, `btn-secondary` are defined. "Don't: Invent new button styles."

| # | File | Line | Current |
|---|------|------|---------|
| 5 | line-item-editor-v2.3.html | 132–140 | `.btn-success` (green bg, white text) |
| 6 | line-item-editor-v2.3.html | 1707 | `class="btn btn-success"` (Load Line Items button) |

No `btn-success` variant exists in the design system.

---

### D-06 — Off-grid spacing values (not on 4px grid)

**Rule:** web-portal-design-instructions.md § 2.3 Spacing — "All spacing must be on the 4px grid" and "Don't: Use hardcoded pixel values or off-grid values (5px, 7px, 13px)"

| # | File | Line | Property | Value | Nearest Grid Value |
|---|------|------|----------|-------|---------------------|
| 7 | line-item-editor-v2.3.html | 65 | `padding` | `0 20px` | `0 24px` (6×4) |
| 8 | line-item-editor-v2.3.html | 89 | `gap` | `6px` | `4px` or `8px` |
| 9 | line-item-editor-v2.3.html | 90 | `padding` | `8px 14px` | `8px 12px` or `8px 16px` |
| 10 | line-item-editor-v2.3.html | 148 | `padding` | `5px 10px` | `4px 8px` or `4px 12px` |
| 11 | line-item-editor-v2.3.html | 344 | `padding` | `12px 20px` | `12px 24px` |
| 12 | line-item-editor-v2.3.html | 394 | `padding` | `16px 20px` | `16px 24px` |
| 13 | line-item-editor-v2.3.html | 730 | `gap` | `10px` | `8px` or `12px` |
| 14 | line-item-editor-v2.3.html | 787 | `gap` | `10px` | `8px` or `12px` |
| 15 | line-item-editor-v2.3.html | 851 | `padding` | `40px` | OK (10×4) |

Many more off-grid values exist throughout. The entire CSS uses custom hardcoded pixel values rather than a spacing scale.

---

### D-07 — Shadow values do not match design system

**Rule:** web-portal-design-instructions.md § 2.5 Shadows — Dropdowns: `0 1px 3px 0 rgba(0,0,0,0.2)`, Buttons/Cards: None.

| # | File | Line | Current | Rule Specifies |
|---|------|------|---------|----------------|
| 16 | line-item-editor-v2.3.html | 33 | `--shadow-sm: 0 1px 2px rgba(0,0,0,0.04)` | Not in design system |
| 17 | line-item-editor-v2.3.html | 34 | `--shadow: 0 2px 8px rgba(0,0,0,0.06)` | Cards: None |
| 18 | line-item-editor-v2.3.html | 35 | `--shadow-lg: 0 8px 24px rgba(0,0,0,0.1)` | Not in design system |
| 19 | line-item-editor-v2.3.html | 67 | Header uses `--shadow-sm` | Cards/headers: no shadow |
| 20 | line-item-editor-v2.3.html | 862 | Start cards use `--shadow` | Cards: no shadow |

---

### D-08 — Input border radius does not match design system

**Rule:** web-portal-design-instructions.md § 2.4 Borders & Radius — Input groups: 6px, Cards/modals/buttons: 8px.

| # | File | Line | Current | Rule Specifies |
|---|------|------|---------|----------------|
| 21 | line-item-editor-v2.3.html | 479 | `border-radius: 4px` (table inputs) | 6px for input groups |

---

### D-09 — Action button size does not match design system

**Rule:** web-portal-design-instructions.md § 3.1 Buttons (Action Buttons) — "Fixed 40x40px icon buttons for toolbars."

| # | File | Line | Current | Rule Specifies |
|---|------|------|---------|----------------|
| 22 | line-item-editor-v2.3.html | 557–558 | `width: 28px; height: 28px` | `40x40px` |
| 23 | line-item-editor-v2.3.html | 278–279 | `width: 20px; height: 20px` (tree actions) | `40x40px` |

---

### D-10 — Font sizes outside the type scale

**Rule:** web-portal-design-instructions.md § 2.2 Typography — Defined scale: 10px, 12px, 14px, 16px, 18px, 20px, 24px.

| # | File | Line | Current | Nearest in Scale |
|---|------|------|---------|------------------|
| 24 | line-item-editor-v2.3.html | 71 | Logo: `22px` | 20px or 24px |
| 25 | line-item-editor-v2.3.html | 93 | Button: `13px` | 12px or 14px |
| 26 | line-item-editor-v2.3.html | 149 | Btn-sm: `12px` | OK (in scale) |
| 27 | line-item-editor-v2.3.html | 404 | Table head: `13px` (from `.data-table`) | 12px or 14px |
| 28 | line-item-editor-v2.3.html | 479 | Table input: `13px` | 12px or 14px |
| 29 | line-item-editor-v2.3.html | 1046 | Sketch meta: `11px` | 10px or 12px |

`11px` and `13px` appear frequently but are not in the design system scale.

---

### D-11 — Emojis used as icons instead of SVG icon system

**Rule:** web-portal-design-instructions.md § 3.6 Icons — SVG icons with `fill-*` classes are the icon system. No guidance on emoji usage.

The entire line-item-editor uses Unicode emojis as icons: 📁, 🏢, 🚪, 📋, 🗑️, 📥, 📄, 📦, 🔐, ➕, ✓, 🌐, ⏳, 🔄, 📅, ⚠️, 📎, 💬, 🖼️, 🎬, 🗺️, 📷, ⬇️, 🏠, etc.

The design system specifies `<svg-icon>` components with `fill-secondary-dark` or `fill-black` classes.

---

### D-12 — Toast position differs from design system

**Rule:** web-portal-design-instructions.md § 3.8 Toasts — Uses ngx-toastr (position not explicitly stated but conventionally bottom-left in the portal).

| # | File | Line | Current |
|---|------|------|---------|
| 30 | line-item-editor-v2.3.html | 782–784 | `position: fixed; top: 70px; right: 20px;` (top-right) |

The toast is positioned top-right. Web portal toasts may have a different default position.

---

### D-13 — Page layout does not follow standard page container pattern

**Rule:** web-portal-design-instructions.md § 4.1 Page Layout — Standard: `pt-8 pb-6 px-4 px-lg-8` (32px top, 24px bottom, 16px/32px horizontal).

The line-item-editor uses a full-bleed layout with sidebar + main content area. There is no standard page container padding. The toolbar uses `padding: 12px 20px` and the table container uses `padding: 16px 20px`, neither matching the standard.

---

### D-14 — Form validation shown as toasts, not inline

**Rule:** web-portal-design-instructions.md § 4.6 Forms & Validation — `<span class="control-error">Error message</span>` below the field.

Modal forms (Add Floor, Add Room) show validation errors via `showToast()` instead of inline `control-error` messages beneath the input field.

---

## Missing Implementations

### M-01 — No ARIA attributes or accessibility labels

**Rule:** web-portal-design-instructions.md § 1.3 Accessibility — "Text contrast: Minimum 4.5:1... Non-text contrast: Minimum 3:1..."

The entire file contains zero `aria-*` attributes, `role` attributes, or `sr-only` screen reader text. Critical missing items:
- No `aria-label` on icon-only buttons (copy 📋, delete 🗑️, tree action buttons +, ✎, ×)
- No `role="dialog"` on modals
- No `aria-expanded` on collapsible sections
- No `role="alert"` on toast notifications
- No `role="tree"` / `role="treeitem"` on the sidebar tree view
- Table lacks `aria-sort` or column descriptions for screen readers

---

### M-02 — No empty state for the data table

**Rule:** web-portal-ux-writing.md § Empty States — Pattern: "What's missing + How to fix it" with action button.

When a new document is created with no line items, or when filtering to a room with no items, the table body is simply empty. There is no empty state message like:

```
No line items yet
Add your first line item to get started.
[Add line item]
```

---

### M-03 — Sketch list empty state missing "how to fix it"

**Rule:** web-portal-ux-writing.md § Empty States — Pattern: "What's missing + How to fix it"

| # | File | Line | Current |
|---|------|------|---------|
| 1 | line-item-editor-v2.3.html | 2153 | `'No instant sketches found'` |

Missing guidance on what to do (e.g., "Create a sketch in the mobile app to see it here.").

---

### M-04 — No loading skeleton/placeholder states

The only loading indicator is the button `.loading` spinner. When data is being fetched:
- Sketch list shows `"⏳ Loading sketches..."` (text only, no spinner component)
- No skeleton/placeholder state for the main table while line items load
- No loading state for the project info sidebar section

---

### M-05 — Required field indicators missing on modal form inputs

**Rule:** web-portal-design-instructions.md § 4.6 Forms & Validation and web-portal-ux-writing.md § Form Fields — "Required fields: Add `<span class="form-asterisk">*</span>` after label text"

Modal forms for Floor Name and Room Name are required fields (the code rejects empty values) but have no asterisk indicator. The "Parent Floor" select is also required but unmarked.

---

### M-06 — No help text on any form fields

**Rule:** web-portal-ux-writing.md § Form Fields § Help Text — "Use sentence case with period. Place below the input field."

No form field in the application uses `<span class="form-control-subtext">` or equivalent help text. Examples that would benefit:
- Authentication fields: "Use your DocuSketch° Web Portal credentials."
- Sketch ID field: "Found on the project details page in the Web Portal."
- Floor name: "e.g., First Floor, Basement"

---

### M-07 — No `form-asterisk` class defined

**Rule:** web-portal-design-instructions.md § 4.6 Forms — `<span class="form-asterisk">*</span>` pattern.

The `form-asterisk` class is not defined in the CSS. The table header uses `th.required::after { content: ' *'; color: var(--error); }` which is a different approach from the design system.

---

### M-08 — Upload zone has no error state for invalid file types

When a user drops an unsupported file, an error toast is shown, but the upload zone itself shows no visual error state. The design system defines error state borders (`$danger` color) for inputs.

---

## Gaps in the Rules

### G-01 — Standalone tools / micro-apps not addressed

The design rules assume all UI lives within the Angular-based web portal and uses its SCSS variables, component classes, and Bootstrap utilities. The line-item-editor is a self-contained single-file HTML application with its own design tokens. **The rules should clarify** whether standalone tools must use the exact same design tokens (by importing shared CSS/variables) or whether they can define their own palette as long as it is "visually consistent."

**Recommendation:** Add a section "Standalone Applications & Tools" that defines:
- Whether the portal's color palette must be used exactly (hex-identical) or approximately (same hue family)
- How to consume design tokens outside Angular (CSS custom properties export, standalone CSS file)
- Minimum conformance: which rules are mandatory vs. portal-specific

---

### G-02 — Tree view / hierarchical navigation not documented

The rules cover navigation menu items, breadcrumbs, and tables — but not hierarchical tree views with expand/collapse, nested levels, item counts, and hover actions. The line-item-editor's sidebar tree is a significant UI pattern with no design system guidance.

**Recommendation:** Add a tree view pattern to the Organisms section (§ 6) covering:
- Indentation levels, icon usage, active/selected states
- Hover action button patterns
- Item count badge positioning

---

### G-03 — Drag and drop interactions not documented

The line-item-editor supports drag-and-drop for row reordering and group reassignment. The design rules have no guidance on:
- Drag handle appearance
- Visual feedback during drag (opacity, placeholder row)
- Drop target highlighting
- Cursor states (grab/grabbing)

**Recommendation:** Add drag-and-drop patterns to § 8 (Workflows & Interaction Patterns).

---

### G-04 — Autocomplete / typeahead dropdowns not documented

The line-item-editor's core interaction pattern is autocomplete fields with context-aware filtering (CAT → SEL dependency). The design rules cover basic selects (`ng-select`) but not typeahead/autocomplete patterns.

**Recommendation:** Add an Autocomplete atom (§ 3) covering:
- Dropdown positioning and shadow
- Item format (code + description + metadata badge)
- Keyboard navigation
- Empty state / warning state messages within the dropdown
- Context-dependent filtering

---

### G-05 — Inline-editable data tables not documented

The rules don't address tables where cells are editable inputs. This creates ambiguity about:
- Input styling within table cells (compact vs. standard form inputs)
- Validation state display within cells (error/warning borders)
- Save behavior (on blur, on Enter, explicit save button?)

**Recommendation:** Add an inline-editable table pattern to § 6 (Organisms).

---

### G-06 — File import/export UI patterns not documented

The line-item-editor has:
- Drag-and-drop upload zone
- File type badges (.xml, .fif, .json)
- Export buttons in the header
- Import button

The design rules have no guidance on upload zones, file type indicators, or export action placement.

**Recommendation:** Add import/export patterns to § 8 (Workflows & Interaction Patterns).

---

### G-07 — Authentication / connection flow not documented

The start screen with multi-step authentication (email/password → sketch selection → load) is a complex card-based flow with no corresponding design pattern in the rules.

**Recommendation:** Add multi-step card flows to § 7 (Templates & Page Types).

---

### G-08 — Pagination controls not documented

The sketch list pagination (← Prev | Page X of Y | Next →) has no design system guidance for:
- Button styling and disabled states
- Page indicator format
- Placement and alignment

**Recommendation:** Add pagination patterns to § 6 (Organisms).

---

### G-09 — Emoji usage policy not defined

The line-item-editor uses emojis extensively as UI icons (📁, 🏢, 🚪, etc.). The design system specifies SVG icons with specific CSS classes. There is no rule about when (if ever) emojis are acceptable as an icon alternative — particularly in standalone tools that don't have access to the SVG icon library.

**Recommendation:** Add an emoji policy to § 3.6 (Icons):
- Whether emojis are acceptable as icon fallbacks in standalone tools
- If so, which contexts are appropriate (sidebar labels, tree items, buttons)
- Whether they should ever appear in the main portal

---

### G-10 — Collapsible table columns not documented

The Evidence column can be collapsed/expanded by clicking its header. This interaction pattern (column visibility toggle) is not covered by the design rules.

**Recommendation:** Add column toggle patterns to the table organism documentation (§ 6).

---

### G-11 — Browser native `confirm()` / `alert()` policy not defined

The code uses `confirm()` in three places. The rules define styled modal patterns for confirmations but don't explicitly state whether native browser dialogs are acceptable or forbidden.

**Recommendation:** Add to § 4 (Patterns & Rules): "Always use styled modal dialogs. Do not use browser-native `confirm()`, `alert()`, or `prompt()` dialogs — they cannot be styled, are inconsistent across browsers, and break the visual language."

---

## Recommended Priority

### Critical (should fix before release)

| ID | Issue | Reason |
|----|-------|--------|
| W-01 | Remove "Please" from 3 error messages | Direct violation of a core UX writing rule |
| W-02 | Fix modal title capitalization (6 instances) | Title Case → sentence case per web portal rules |
| W-04 | Fix button label capitalization (12 instances) | Title Case → sentence case per web portal rules |
| W-03 | Restructure delete confirmation modal | Does not follow the documented decision/confirmation modal pattern |
| M-01 | Add basic ARIA attributes | Accessibility is a non-negotiable requirement (§ 1.3) |
| M-05 | Add required field asterisks to modal forms | Users can't tell which fields are mandatory |

### Should Fix (important for consistency)

| ID | Issue | Reason |
|----|-------|--------|
| D-02 | Align color tokens with design system | Core design system conformance |
| D-01 | Switch font to IBM Plex Sans | Core design system conformance |
| D-03/D-04/D-05 | Fix button variant names and styles | Button system is a foundational element |
| W-06 | Fix 5 toast messages to `[Object] [past tense verb]` | Consistent notification pattern |
| W-08 | Improve error messages with actionable guidance | User experience during failures |
| W-10 | Replace `confirm()` with styled modals | Consistency with design system patterns |
| M-02 | Add empty state for data table | Required by empty state guidelines |
| M-06 | Add help text to key form fields | Supports user understanding |
| D-14 | Move form validation from toasts to inline errors | Follows the design system validation pattern |

### Nice to Have (polish)

| ID | Issue | Reason |
|----|-------|--------|
| D-06 | Align spacing to 4px grid | Many off-grid values; systematic cleanup |
| D-07 | Match shadow values | Low visual impact but technically non-conformant |
| D-10 | Align font sizes to type scale | 11px/13px not in scale; subtle difference |
| D-08 | Fix input border radius (4px → 6px) | Minor visual difference |
| D-09 | Increase action button sizes | May affect table density — evaluate tradeoff |
| D-11 | Replace emojis with SVG icons | Requires icon library access |
| W-05 | Add action verbs to header export buttons | Minor labeling improvement |
| W-09 | Change "Sketch Order ID" → "sketch ID" | Minor terminology alignment |
| M-03 | Improve sketch list empty state | Add guidance text |
| M-04 | Add loading skeleton states | UX polish |
| W-07 | Move validation instructions from toasts to inline | Better UX but lower priority |

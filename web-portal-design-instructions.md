# DocuSketch Web Portal — Design Instructions

> **Source of Truth:** The codebase is always the source of truth for design implementation — not Figma or any external design tool. Before adding any new style, search the codebase for an existing solution. Reuse existing CSS variables, classes, and components — never duplicate.

---

## 1. General Principles

### 1.1 Source of Truth

- The codebase defines the design system. Figma is a reference, not a spec.
- Before creating any new style, search for an existing solution in `src/styles/`.
- When Figma and code differ, follow the code.
- Reuse existing variables, mixins, and utility classes — never duplicate.

### 1.2 Consistency

- Every new page or component must visually match existing portal pages.
- When in doubt, find a similar element on an existing page and match its implementation exactly.
- Use the same class patterns found elsewhere in the codebase.

### 1.3 Accessibility

- **Text contrast:** Minimum 4.5:1 for normal text, 3:1 for large text (WCAG AA).
- **Non-text contrast:** Minimum 3:1 for icons, borders, and UI components.
- **Never use for text/icons on white:** `$eucalyptus` (#c0bc90), `$eucalyptus-light` (#e6e4d2), `$primary`/`$chartreuse` (#e5df00) — these are background/accent colors only.
- **For secondary text:** Use `$secondary-dark` (#6f6d41) or `.c-secondary-dark` class.
- **For icons on white:** Use `.fill-secondary-dark` or `.fill-black` classes.

---

## 2. Design Tokens

### 2.1 Colors

**File:** `src/styles/variables/_colors.scss`

#### Brand Colors

| Variable                               | Hex     | Usage                                     |
| -------------------------------------- | ------- | ----------------------------------------- |
| `$chartreuse` / `$primary`             | #e5df00 | Primary button backgrounds, brand accents |
| `$eucalyptus` / `$secondary`           | #c0bc90 | Secondary backgrounds, badges             |
| `$eucalyptus-dark` / `$secondary-dark` | #6f6d41 | Secondary text, muted labels, icon fills  |

#### Neutral Colors

| Variable       | Hex     | Usage                                |
| -------------- | ------- | ------------------------------------ |
| `$black`       | #1a1905 | Primary text, headings               |
| `$white`       | #ffffff | Backgrounds, text on dark            |
| `$gray`        | #f4f3ea | Hover backgrounds, light fills       |
| `$gray-dark`   | #e2e0d3 | Borders, dividers                    |
| `$gray-darker` | #87867f | Muted/disabled text, inactive status |

#### Semantic Colors

| Variable           | Hex     | Usage                      |
| ------------------ | ------- | -------------------------- |
| `$green`           | #64b56e | Success, active status     |
| `$red` / `$danger` | #e92f2f | Error, danger, destructive |
| `$yellow`          | #dfbb3a | Warning, pending status    |
| `$blue`            | #549cd3 | Info, in-progress status   |

#### Color Utility Classes

**File:** `src/styles/helpers/colors.scss`

```html
<!-- Text color -->
<span class="c-black">Primary text</span>
<span class="c-secondary-dark">Secondary text</span>

<!-- Background color -->
<div class="bc-gray">Light background</div>

<!-- Icon colors -->
<svg-icon class="fill-black" />
<svg-icon class="stroke-secondary-dark" />

<!-- Border color -->
<div class="border border-gray-dark">Bordered container</div>
```

### 2.2 Typography

**Files:** `src/styles/variables/_typography.scss`, `src/styles/core/typography.scss`

#### Font Family

- **Primary:** IBM Plex Sans
- **Weights:** Regular (400), Medium (500) — no bold available

#### Font Sizes

| Class           | Size | Usage                         |
| --------------- | ---- | ----------------------------- |
| `.text-xs`      | 10px | Micro labels                  |
| `.text-sm`      | 12px | Captions, helper text, badges |
| `.text-regular` | 14px | Body text (default)           |
| `.text-md`      | 16px | Emphasized body               |
| `.text-xl`      | 18px | Section headers               |
| `.text-xxl`     | 20px | Large headers                 |

#### Headings

| Element | Size | Line Height |
| ------- | ---- | ----------- |
| `h1`    | 24px | 29px        |
| `h2`    | 18px | 22px        |
| `h3`    | 16px | 19px        |
| `h4`    | 16px | 18px        |

#### Weight Utility

```html
<span class="f-w-500">Medium weight text</span>
```

### 2.3 Spacing

**File:** `src/styles/variables/_spacers.scss`

#### Base Unit

- `$spacer: 0.25rem` (4px)
- All spacing must be on the 4px grid

#### Spacing Scale

| Multiplier | Value | Class Example |
| ---------- | ----- | ------------- |
| 1          | 4px   | `mt-1`, `p-1` |
| 2          | 8px   | `mt-2`, `p-2` |
| 3          | 12px  | `mt-3`, `p-3` |
| 4          | 16px  | `mt-4`, `p-4` |
| 6          | 24px  | `mt-6`, `p-6` |
| 8          | 32px  | `mt-8`, `p-8` |

#### Common Patterns

```html
<!-- Page container -->
<div class="pt-8 pb-6 px-4 px-lg-8">
  <!-- Section spacing -->
  <section class="mt-6">
    <!-- Card padding -->
    <div class="p-4"></div>
  </section>
</div>
```

✅ **Do:** Use Bootstrap spacing utilities (`mt-4`, `p-6`)
❌ **Don't:** Use hardcoded pixel values or off-grid values (5px, 7px, 13px)

### 2.4 Borders & Radius

**File:** `src/styles/variables/_border-radius.scss`

#### Border Radius

| Value | Usage                            |
| ----- | -------------------------------- |
| 4px   | Badges, small elements           |
| 6px   | Input groups                     |
| 8px   | Cards, modals, buttons (default) |
| 12px  | Large modals                     |

#### Border Colors

| Variable      | Hex     | Usage               |
| ------------- | ------- | ------------------- |
| `$gray-dark`  | #e2e0d3 | Default borders     |
| `$eucalyptus` | #c0bc90 | Focus state borders |
| `$danger`     | #e92f2f | Error state borders |

#### Usage

```html
<!-- Standard bordered container -->
<div class="border border-gray-dark rounded">
  <!-- With specific radius -->
  <div class="border border-gray-dark border-radius-8"></div>
</div>
```

✅ **Do:** Always use `border border-gray-dark` together
❌ **Don't:** Use `border` alone (applies wrong color)

### 2.5 Shadows

Shadows are used sparingly — only on floating elements.

| Element       | Shadow                        |
| ------------- | ----------------------------- |
| Dropdowns     | `0 1px 3px 0 rgba(0,0,0,0.2)` |
| Select panels | `0 1px 3px 0 rgba(0,0,0,0.2)` |
| Buttons/Cards | None                          |

---

## 3. Atoms

### 3.1 Buttons

**Files:** `src/styles/partials/_buttons.scss`, `src/styles/variables/_colors.scss` (lines 169-276)

#### Primary Variants

| Class               | Appearance                        | Usage                                  |
| ------------------- | --------------------------------- | -------------------------------------- |
| `btn btn-primary`   | Yellow bg, black text             | Main CTA (Save, Submit, Search)        |
| `btn btn-stroke`    | White bg, gray border, black text | Secondary actions (Cancel, Edit, Back) |
| `btn btn-danger`    | White bg, gray border, red text   | Destructive actions (Delete, Disable)  |
| `btn btn-secondary` | Tan bg, black text                | Alternative secondary                  |

#### Size Modifiers

| Class       | Effect              |
| ----------- | ------------------- |
| `btn-sm`    | Small (24px height) |
| `btn-lg`    | Large (16px font)   |
| `btn-wide`  | 160px width         |
| `btn-large` | 200px width         |

#### Usage Examples

```html
<!-- Primary action -->
<button class="btn btn-primary btn-wide">Save</button>

<!-- Secondary action -->
<button class="btn btn-stroke">Cancel</button>

<!-- Destructive action -->
<button class="btn btn-danger">Delete</button>

<!-- Small button -->
<button class="btn btn-stroke btn-sm">Edit</button>
```

#### Modal Footer Pattern

```html
<div class="modal-footer">
  <button class="btn btn-stroke">Cancel</button>
  <button class="btn btn-primary">Save</button>
</div>

<!-- Destructive modal -->
<div class="modal-footer">
  <button class="btn btn-stroke">Cancel</button>
  <button class="btn btn-danger">Delete</button>
</div>
```

✅ **Do:** Use `btn-stroke` for Cancel, `btn-danger` for destructive
❌ **Don't:** Use Bootstrap's `btn-outline-*` classes

#### Action Buttons (Icon Buttons)

**File:** `src/styles/partials/_action-buttons.scss`

Fixed 40x40px icon buttons for toolbars.

```html
<button class="action-btn action-btn-default">
  <svg-icon src="assets/images/icons-new/icon-edit.svg" />
</button>
```

### 3.2 Text Fields & Inputs

**File:** `src/styles/partials/_forms.scss`

#### States

| State    | Border Color  | Background          |
| -------- | ------------- | ------------------- |
| Default  | `$gray-dark`  | white               |
| Focus    | `$eucalyptus` | white               |
| Hover    | `$gray-dark`  | `$gray`             |
| Error    | `$danger`     | white               |
| Disabled | `$gray-dark`  | white (opacity 0.4) |

#### Usage

```html
<div class="form-group">
  <label class="form-label">Email <span class="form-asterisk">*</span></label>
  <input type="email" class="form-control" formControlName="email" />
  <span class="control-error">Invalid email format</span>
</div>
```

#### Input with Icon

```html
<div class="form-control-icon-container">
  <svg-icon class="form-control-icon form-control-icon--left" src="..." />
  <input type="text" class="form-control" />
</div>
```

### 3.3 Checkboxes & Radios

**Files:** `src/styles/partials/_input-checkbox.scss`, `src/styles/partials/_input-radio.scss`

Custom styled, not browser defaults.

#### Checkbox

```html
<label class="checkbox">
  <input type="checkbox" class="checkbox-input" />
  <span class="checkbox-label">Option label</span>
</label>

<!-- With border variant -->
<label class="checkbox checkbox-with-border">
  <input type="checkbox" class="checkbox-input" />
  <span class="checkbox-label">Bordered option</span>
</label>
```

#### Radio

```html
<label class="radio">
  <input type="radio" class="radio-input" name="option" />
  <span class="radio-label">Option A</span>
</label>
```

### 3.4 Selects & Dropdowns

**File:** `src/styles/partials/_select.scss`

Uses ng-select with `.custom` class.

```html
<app-select [parentGroup]="form" [initialData]="options" controlName="selection" placeholder="Select an option" />
```

### 3.5 Badges & Status Indicators

**Files:** `src/styles/partials/_badge.scss`, `src/styles/helpers/colors.scss`

#### Base Badge

```html
<span class="badge">Label</span>
```

#### Status Badges

| Status    | Class               | Color         |
| --------- | ------------------- | ------------- |
| Active    | `status--active`    | Green #64b56e |
| Inactive  | `status--inactive`  | Grey #87867f  |
| Cancelled | `status--cancelled` | Grey #87867f  |
| Suspended | `status--suspended` | Grey #87867f  |

```html
<span class="badge status--active">Active</span> <span class="badge status--inactive">Inactive</span>
```

#### Dynamic Status (Angular)

```html
<span class="badge" [class]="'status--' + (status | lowercase)"> {{ statusLabel }} </span>
```

#### Other Status Maps

| Context   | Class Pattern                     | Example                       |
| --------- | --------------------------------- | ----------------------------- |
| Estimates | `estimate-order-status--{status}` | `estimate-order-status--done` |
| Payments  | `payment-status--{status}`        | `payment-status--paid`        |
| Reports   | `report-status--{status}`         | `report-status--in_progress`  |

✅ **Do:** Always use `.badge` + status class for status display
❌ **Don't:** Use plain colored text (`text-success`, `text-muted`)

### 3.6 Icons

**File:** `src/styles/partials/_icons.scss`

#### SVG Icons (Primary)

```html
<svg-icon src="assets/images/icons-new/icon-copy-small.svg" class="fill-secondary-dark" />
```

#### Sizes

| Class      | Size    |
| ---------- | ------- |
| `.icon`    | 24x24px |
| `.icon-sm` | 16x16px |

#### Color Classes

```html
<!-- Fill colors -->
<svg-icon class="fill-black" />
<svg-icon class="fill-secondary-dark" />

<!-- Stroke colors -->
<svg-icon class="stroke-black" />
```

✅ **Do:** Use `fill-secondary-dark` or `fill-black` for icons on white
❌ **Don't:** Use `fill-primary` (yellow) — insufficient contrast

### 3.7 Tooltips

**File:** `src/styles/partials/_tooltip.scss`

Uses ng-bootstrap tooltips.

```html
<button ngbTooltip="Tooltip text">Hover me</button>

<!-- With template -->
<svg-icon [ngbTooltip]="tooltipContent" />
<ng-template #tooltipContent> Multi-line tooltip<br />with line breaks </ng-template>
```

### 3.8 Toasts & Notifications

**File:** `src/app/shared/toastr/`

Uses ngx-toastr with custom styling.

| Type    | Color                       |
| ------- | --------------------------- |
| Success | Green background (#ebfac1)  |
| Warning | Yellow background (#fef2c3) |
| Error   | Red background (#ffd6bd)    |

```typescript
this.toastr.success('Changes saved');
this.toastr.error('Failed to update');
this.toastr.warning('Please verify');
```

---

## 4. Patterns & Rules

### 4.1 Page Layout

#### Standard List/Admin Page

```html
<div class="pt-8 pb-6 px-4 px-lg-8">
  <h2>Page Title</h2>
  <!-- content -->
</div>
```

- Top padding: 32px (`pt-8`)
- Bottom padding: 24px (`pb-6`)
- Horizontal: 16px mobile, 32px desktop (`px-4 px-lg-8`)

### 4.2 Section / Card Containers

```html
<div class="border border-gray-dark rounded p-4">
  <div class="section-header">Header</div>
  <div class="section-content mt-3">Content</div>
</div>
```

- Always use `border border-gray-dark` together
- Use `p-4` (16px) for equal padding on all sides
- Use `mt-3` on content for header-to-content spacing
- Border radius: `rounded` (8px)

✅ **Do:** Equal padding on all sides with `p-4`
❌ **Don't:** Different padding per side, margins on header that persist when content is hidden

### 4.3 Button Hierarchy & Placement

#### One Primary Per Context

Only one `btn-primary` per view/modal. All other actions use `btn-stroke`.

```html
<!-- Search page -->
<button class="btn btn-primary">Search</button>
<button class="btn btn-stroke">Clear filters</button>

<!-- Form -->
<button class="btn btn-stroke">Cancel</button>
<button class="btn btn-primary">Save</button>
```

#### Modal Footer Order

Left: Cancel/Back (safe action) → Right: Primary/Destructive action

```html
<div class="modal-footer">
  <button class="btn btn-stroke">Cancel</button>
  <button class="btn btn-primary">Confirm</button>
</div>
```

### 4.4 Status Display

Every status value must use a badge — never plain text.

```html
✅ <span class="badge status--active">Active</span> ❌ <span class="text-success">Active</span>
```

### 4.5 Collapsible Sections

- Toggle button remains visible in both expanded and collapsed states
- Button text toggles: "Show X" ↔ "Close X"
- Button position and style stay constant

```html
<button class="btn btn-stroke btn-sm" (click)="toggle()">{{ expanded ? 'Close Details' : 'Show Details' }}</button>
```

### 4.6 Forms & Validation

#### Form Group Structure

```html
<div class="form-group">
  <label class="form-label">Field <span class="form-asterisk">*</span></label>
  <input class="form-control" />
  <span class="control-error">Error message</span>
  <span class="form-control-subtext">Helper text</span>
</div>
```

#### Two-Column Layout

```html
<section class="form-2-col">
  <div class="form-group"><!-- Field 1 --></div>
  <div class="form-group"><!-- Field 2 --></div>
  <div class="form-group full-size"><!-- Full width --></div>
</section>
```

---

## 5. Common Mistakes to Avoid

| ❌ Don't                    | ✅ Do                          | Why                              |
| --------------------------- | ------------------------------ | -------------------------------- |
| `btn-outline-secondary`     | `btn-stroke`                   | Portal uses custom button system |
| `btn-outline-danger`        | `btn-danger`                   | Portal uses custom button system |
| `border` alone              | `border border-gray-dark`      | `border` alone uses wrong color  |
| `fill-primary` on icons     | `fill-secondary-dark`          | Yellow has no contrast on white  |
| `c-secondary` for text      | `c-secondary-dark`             | Beige has no contrast on white   |
| `text-success` for status   | `badge status--active`         | Status must use badge system     |
| Multiple `btn-primary`      | One primary, rest `btn-stroke` | Only one CTA per context         |
| `py-6` for page top         | `pt-8 pb-6`                    | Pages need 32px top padding      |
| 5px, 7px, 13px spacing      | 4px, 8px, 12px, 16px           | Must stay on 4px grid            |
| Inventing new button styles | Use existing variants          | Design system is fixed           |

---

## 6. Organisms (coming soon)

Reserved for complex component patterns (tables, cards with actions, filter bars).

---

## 7. Templates & Page Types (coming soon)

Reserved for full page layouts (list pages, detail pages, form pages, settings pages).

---

## 8. Workflows & Interaction Patterns (coming soon)

Reserved for multi-step flows, loading states, error handling patterns.

# DocuSketch Line Item Editor - Generation Specification v2.2

## Overview

Single-file HTML application for editing FIF XML line items with server API integration, featuring SOW database
autocomplete for CAT/SEL fields with context-aware suggestions and auto-fill capabilities.

---

## Design System

### Color Tokens

| Token          | Variable           | Value                  | Usage                                |
|----------------|--------------------|------------------------|--------------------------------------|
| Background     | `--bg-primary`     | #f7f5ef                | Page background (beige)              |
| Card           | `--bg-card`        | #ffffff                | Cards, modals, inputs                |
| Accent         | `--accent`         | #e8d96c                | Primary buttons, highlights (yellow) |
| Accent Hover   | `--accent-hover`   | #d4c55a                | Button hover state                   |
| Accent Light   | `--accent-light`   | rgba(232,217,108,0.15) | Focus rings, subtle highlights       |
| Text Primary   | `--text-primary`   | #3d3d35                | Main text                            |
| Text Secondary | `--text-secondary` | #6b6b5f                | Labels, descriptions                 |
| Text Muted     | `--text-muted`     | #9a9a8e                | Placeholders, hints                  |
| Border         | `--border`         | #e5e3dc                | Input borders, dividers              |
| Border Light   | `--border-light`   | #f0eee7                | Subtle separators                    |
| Error          | `--error`          | #d94141                | Error states                         |
| Error BG       | `--error-bg`       | #ffeaea                | Error backgrounds                    |
| Success        | `--success`        | #4a9d5b                | Success states, totals               |
| Success BG     | `--success-bg`     | #e8f5ea                | Success backgrounds                  |
| Warning        | `--warning`        | #e6a23c                | Warning states                       |
| Warning BG     | `--warning-bg`     | #fdf6ec                | Warning backgrounds                  |
| Info           | `--info`           | #409eff                | Info states, selection               |
| Info BG        | `--info-bg`        | #ecf5ff                | Info backgrounds                     |

### Spacing & Sizing

| Token               | Variable          | Value                      |
|---------------------|-------------------|----------------------------|
| Border Radius       | `--radius`        | 8px                        |
| Border Radius Large | `--radius-lg`     | 12px                       |
| Shadow Small        | `--shadow-sm`     | 0 1px 2px rgba(0,0,0,0.04) |
| Shadow              | `--shadow`        | 0 2px 8px rgba(0,0,0,0.06) |
| Shadow Large        | `--shadow-lg`     | 0 8px 24px rgba(0,0,0,0.1) |
| Header Height       | `--header-height` | 56px                       |
| Sidebar Width       | `--sidebar-width` | 260px                      |
| Transition          | `--transition`    | 0.15s ease                 |

### Typography

| Element   | Font           | Weight  | Size                    |
|-----------|----------------|---------|-------------------------|
| Body      | DM Sans        | 400     | 14px (line-height: 1.5) |
| Logo      | DM Sans        | 700     | 22px                    |
| Headings  | DM Sans        | 600     | varies                  |
| Code/Mono | JetBrains Mono | 400/500 | 12px                    |

---

## Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ Header (56px fixed)                                              │
│ ┌─────────────┬─────────────────────────────────────────────────┤
│ │ Logo        │                    Import | Verisk XML | JSON   │
│ │ DocuSketch° │                                                 │
├─┴─────────────┴─────────────────────────────────────────────────┤
│                                                                  │
│ ┌──────────────┬────────────────────────────────────────────────┤
│ │ Sidebar      │ Main Content                                   │
│ │ (260px)      │ ┌────────────────────────────────────────────┐ │
│ │              │ │ Toolbar                                    │ │
│ │ ┌──────────┐ │ │ +Add Item | Validate | Stats badges       │ │
│ │ │ Structure│ │ ├────────────────────────────────────────────┤ │
│ │ │ Actions  │ │ │                                            │ │
│ │ └──────────┘ │ │ Data Table (scrollable)                    │ │
│ │              │ │                                            │ │
│ │ Tree View    │ │ - Group Headers                            │ │
│ │ - All Items  │ │ - Line Item Rows                           │ │
│ │ - Project    │ │ - Editable cells with autocomplete         │ │
│ │   - Floor 1  │ │                                            │ │
│ │     - Room 1 │ │                                            │ │
│ │     - Room 2 │ │                                            │ │
│ │   - Floor 2  │ │                                            │ │
│ │              │ │                                            │ │
│ ├──────────────┤ └────────────────────────────────────────────┘ │
│ │ Total (RCV)  │                                                │
│ │ $X,XXX.XX    │                                                │
│ └──────────────┴────────────────────────────────────────────────┘
└─────────────────────────────────────────────────────────────────┘
```

---

## Start Screen (Before Data Loaded)

### Section 1: Server Connection Card

Three-step authentication flow with card UI:

**Step 1 - Authentication:**

```
┌─────────────────────────────────────────┐
│ 🌐 Connect to Server                    │
├─────────────────────────────────────────┤
│ Authentication Token (JWT)              │
│ ┌─────────────────────────────────────┐ │
│ │ eyJhbGciOiJSUzI1NiIsInR5cCI...     │ │ (monospace)
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ 🔐 Authenticate                     │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

**Step 2 - Select Sketch (shown after successful auth):**

```
┌─────────────────────────────────────────┐
│ ✓ Authenticated          Change Token   │ (green badge)
├─────────────────────────────────────────┤
│ ☐ Use Local Proxy (localhost:8080)      │
│                                         │
│ Select an Instant Sketch           [🔄] │
│ ┌─────────────────────────────────────┐ │
│ │ ○ Project Alpha                     │ │
│ │   abc123def456  📅 2024-01-15       │ │
│ ├─────────────────────────────────────┤ │
│ │ ● Water Damage - 123 Main St  ✓     │ │ (selected)
│ │   xyz789ghi012  📅 2024-01-14       │ │
│ ├─────────────────────────────────────┤ │
│ │ ○ Fire Restoration Project          │ │
│ │   mno345pqr678  📅 2024-01-13       │ │
│ └─────────────────────────────────────┘ │
│      [← Prev]  Page 1 of 5  [Next →]    │
│                                         │
│         ─── or enter ID manually ───    │
│ ┌─────────────────────────────────────┐ │
│ │ 698067f1d428f552df8fba34           │ │ (monospace)
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ 📥 Load Line Items                  │ │ (disabled until selection)
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

**Sketch List API:**

```javascript
Endpoint: GET / rest / v1 / instant - sketch
Parameters:
    -page
:
integer(0 - indexed)
- pageSize
:
integer(
default
10
)
Headers:
    -Authorization
:
Bearer
{
    token
}

Response:
{
    "type"
:
    "HTTP_OK",
        "details"
:
    {
        "items"
    :
        [
            {"id": "string", "name": "string", "created": 1770324115002}  // created is Unix timestamp (ms)
        ],
            "page"
    :
        0,
            "pageSize"
    :
        10,
            "totalItems"
    :
        0,
            "totalPages"
    :
        0
    }
}
```

**Project Info API (NEW in v2.2):**

```javascript
Endpoint: GET / rest / v1 / instant - sketch / {id}
Headers:
    -Authorization
:
Bearer
{
    token
}

Response:
{
    "id"
:
    "string",
        "userId"
:
    0,
        "created"
:
    "ISO datetime or timestamp",
        "modified"
:
    "ISO datetime or timestamp",
        "sketchData"
:
    {
        "apiVersion"
    :
        "string",
            "submittedAt"
    :
        "ISO datetime",
            "deviceInfo"
    :
        {
            "deviceId", "deviceModel", "osVersion", "appVersion", "buildNumber"
        }
    ,
        "project"
    :
        {
            "id", "name", "address", "claimNumber", "customerName", "lossDate",
                "dateCreated", "lastModified", "useProjectWaterClassification",
                "waterClass", "waterCategory",
                "floors"
        :
            [{"floorNumber", "numberOfRooms", "numberOf360Images", "urls": {...}}]
        }
    ,
        "calculatedMetrics"
    :
        {
            "totalChambers", "totalAffectedAreaSqFt", "floodCutLinearFeet",
                "wallMoistureAreaSqFt", "equipmentCounts"
        :
            {
                "dehumidifier", "airMover", "airScrubber"
            }
        }
    }
,
    "files"
:
    [{"id", "url", "type", "linkedToType", "linkedToId", "fileName", "createdAt"}]
}
```

**Line Items API:**

```javascript
Base
URL: https://sandbox.v2docusketch.com/sketch
    Endpoint: POST / rest / v1 / lineitems / generate / instant - sketch / {instantSketchId}
Headers:
    -Authorization
:
Bearer
{
    token
}
-Content - Type
:
application / json

Local
Proxy(optional)
:
http://localhost:8080/sketch
    -Checkbox
toggle(OFF
by
default)
-For
local
development
to
bypass
CORS
```

**Error Handling Messages:**
| HTTP Code | Message |
|-----------|---------|
| 401 | "Authentication failed - token invalid or expired" |
| 403 | "Access denied" |
| 404 | "Sketch not found - ID does not exist" |
| 500 | "Server error - problem generating line items" |
| Network | "Unable to reach server" / "CORS blocked" |

### Section 2: Local Files Card

```
┌─────────────────────────────────────────┐
│          ─── or work offline ───        │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │         📁                          │ │
│ │   Drop files here or click          │ │
│ │   .xml, .fif, .json                 │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────┐ ┌─────────────────┐ │
│ │ 📄 Load Sample  │ │ ✨ Create New   │ │
│ └─────────────────┘ └─────────────────┘ │
└─────────────────────────────────────────┘
```

---

## Sidebar Features

### Project Info Section (NEW in v2.2)

Collapsible section displaying project metadata, located above the Structure section.

**Display:**

- Expanded by default when data is available
- Shows "-" for empty/missing fields
- Collapsible via header click

**Data Groups:**

1. **Basic Info**: ID, Name, Address, Claim #, Customer, Loss Date, Created, Modified
2. **Water Classification**: Use Project Classification, Water Class, Water Category
3. **Calculated Metrics**: Chambers, Affected Area (SF), Flood Cut (LF), Wall Moisture (SF), Equipment counts
4. **Floors**: List with floor number, room count, 360° image count
5. **Device Info**: Device ID, Model, OS Version, App Version, Build
6. **Submission**: API Version, Submitted At, Record Created/Modified

**Files Subsection:**

- Collapsed by default
- Shows file count badge
- When expanded, displays each file with:
    - Icon (based on file type)
    - File name
    - Type, linked item type
    - Creation date
    - Download link (if URL available)

### Header Section

- Title: "📁 Structure"
- Action buttons: "🏢 Add Floor", "🚪 Add Room"

### Tree View

Hierarchical navigation with icons and item counts:

```
📋 All Items                    [12]
  🏠 Project Name               [2]
    🏢 First Floor              [6]      [+] [✎] [×]
      🚪 Living Room            [3]          [✎] [×]
      🚪 Kitchen                [3]          [✎] [×]
    🏢 Second Floor             [4]      [+] [✎] [×]
      🚪 Master Bedroom         [4]          [✎] [×]
```

**Tree Item States:**

- Default: Normal background
- Hover: `--bg-primary` background, shows action buttons
- Active/Selected: Yellow gradient highlight

**Hover Actions:**
| Button | Action | Available On |
|--------|--------|--------------|
| + | Add room to floor | Floors only |
| ✎ | Edit name | Floors, Rooms |
| × | Delete (with confirmation) | Floors, Rooms |

### Footer

- Label: "Total (RCV)"
- Value: Sum of all line item totals, formatted as currency
- Style: Large green text (`--success`)

---

## Table Columns

### Column Specifications

| Column   | Width  | Type         | Required | Notes                                |
|----------|--------|--------------|----------|--------------------------------------|
| Drag     | 30px   | Handle       | -        | ⋮⋮ reorder handle                    |
| ☑        | 30px   | Checkbox     | -        | Multi-select                         |
| #        | 40px   | Number       | -        | Row index (display only)             |
| ID       | 60px   | Text         | Yes      | Line item ID (e.g., LI1)             |
| CAT      | 75px   | Autocomplete | Yes*     | 3-letter category code               |
| SEL      | 95px   | Autocomplete | Yes*     | Selector code                        |
| Act      | 50px   | Autocomplete | No       | Activity code (+, -, &, R, C, P)     |
| Calc     | 65px   | Autocomplete | No       | Sketch calculation variable          |
| Qty      | 70px   | Number       | No       | Quantity (right-aligned, default: 1) |
| Unit     | 65px   | Dropdown     | No       | Unit of measure                      |
| Remove$  | 85px   | Number       | No       | Remove price (right-aligned)         |
| Replace$ | 85px   | Number       | No       | Replace price (right-aligned)        |
| Total    | 90px   | Calculated   | -        | (remove + replace) × qty, green      |
| Desc     | 150px+ | Text         | No       | Description (expandable)             |
| Evidence | 120px+ | Mixed        | No       | Collapsible column                   |
| Actions  | 60px   | Buttons      | -        | Copy 📋, Delete 🗑️                  |

### Group Headers

Colored badge rows separating groups:

| Group Type | Badge Color            | Format                 |
|------------|------------------------|------------------------|
| Project    | Yellow (`--accent`)    | `PROJECT` Project Name |
| Floor      | Blue (`--info-bg`)     | `FLOOR` Floor Name     |
| Room       | Green (`--success-bg`) | `ROOM` Room Name       |

Each shows: `[Badge] Name    X items · $XXX.XX`

---

## SOW Database Integration

### Database Structure

```javascript
const sowDatabase = {
    categories: {
        'WTR': {name: 'Water Extraction', selectors: ['PUMP', 'AIRMOV', 'DEHUM', 'INJECT', 'MOIST']},
        'DRY': {name: 'Drywall', selectors: ['DRY12', 'DRY58', 'DRYMR', 'PATCH', 'TAPE']},
        'PNT': {name: 'Painting', selectors: ['WALL', 'CEIL', 'TRIM', 'DOOR', 'PRIME']},
        'FCC': {name: 'Floor Covering - Carpet', selectors: ['CARPT', 'PAD', 'TACKL', 'SEAM', 'TRANS']},
        'SDG': {name: 'Siding', selectors: ['VINYL', 'WOOD', 'ALUM', 'FIBER', 'TRIM']},
        'CLN': {name: 'Cleaning', selectors: ['GENRL', 'HEPA', 'DEOD', 'SANI', 'WIPE']},
        'DMO': {name: 'Demolition', selectors: ['DEBAG', 'HAUL', 'LABOR', 'DUMP', 'SORT']},
        'CON': {name: 'Content Manipulation', selectors: ['LABOR', 'MVOUT', 'MVBCK', 'PACK', 'STORE']},
        'FLR': {name: 'Flooring', selectors: ['VINYL', 'TILE', 'HARDWD', 'LAMIN', 'GROUT']},
        'CAB': {name: 'Cabinets', selectors: ['BASE', 'WALL', 'VANTY', 'COUNTR', 'HDWR']}
    },
    selectors: {
        // Each selector includes: desc, unit, act (default activity)
        'PUMP': {desc: 'Water pump extraction', unit: 'HR', act: '+'},
        'AIRMOV': {desc: 'Air mover equipment', unit: 'DA', act: '+'},
        'DEHUM': {desc: 'Dehumidifier equipment', unit: 'DA', act: '+'},
        'INJECT': {desc: 'Wall injection drying', unit: 'LF', act: '+'},
        'MOIST': {desc: 'Moisture testing', unit: 'EA', act: '+'},
        'DRY12': {desc: '1/2" drywall', unit: 'SF', act: '&'},
        'DRY58': {desc: '5/8" drywall', unit: 'SF', act: '&'},
        'DRYMR': {desc: 'Mold resistant drywall', unit: 'SF', act: '&'},
        'PATCH': {desc: 'Drywall patch repair', unit: 'EA', act: 'R'},
        'TAPE': {desc: 'Tape and finish', unit: 'SF', act: '+'},
        'WALL': {desc: 'Wall painting', unit: 'SF', act: 'P'},
        'CEIL': {desc: 'Ceiling painting', unit: 'SF', act: 'P'},
        'TRIM': {desc: 'Trim painting', unit: 'LF', act: 'P'},
        'DOOR': {desc: 'Door painting', unit: 'EA', act: 'P'},
        'PRIME': {desc: 'Primer application', unit: 'SF', act: 'P'},
        'CARPT': {desc: 'Carpet installation', unit: 'SY', act: '&'},
        'PAD': {desc: 'Carpet padding', unit: 'SY', act: '&'},
        'TACKL': {desc: 'Tack strip', unit: 'LF', act: '&'},
        'SEAM': {desc: 'Carpet seaming', unit: 'LF', act: '+'},
        'TRANS': {desc: 'Transition strip', unit: 'LF', act: '+'},
        'VINYL': {desc: 'Vinyl material', unit: 'SF', act: '&'},
        'WOOD': {desc: 'Wood material', unit: 'SF', act: '&'},
        'ALUM': {desc: 'Aluminum material', unit: 'SF', act: '&'},
        'FIBER': {desc: 'Fiber cement material', unit: 'SF', act: '&'},
        'GENRL': {desc: 'General cleaning', unit: 'SF', act: 'C'},
        'HEPA': {desc: 'HEPA vacuum cleaning', unit: 'SF', act: 'C'},
        'DEOD': {desc: 'Deodorization treatment', unit: 'SF', act: 'C'},
        'SANI': {desc: 'Sanitization', unit: 'SF', act: 'C'},
        'WIPE': {desc: 'Wipe down surfaces', unit: 'SF', act: 'C'},
        'DEBAG': {desc: 'Debris bagging', unit: 'EA', act: '-'},
        'HAUL': {desc: 'Debris hauling', unit: 'CY', act: '-'},
        'LABOR': {desc: 'General labor', unit: 'HR', act: '+'},
        'DUMP': {desc: 'Dump fees', unit: 'EA', act: '+'},
        'SORT': {desc: 'Sort and stack', unit: 'HR', act: '+'},
        'MVOUT': {desc: 'Move out contents', unit: 'HR', act: '+'},
        'MVBCK': {desc: 'Move back contents', unit: 'HR', act: '+'},
        'PACK': {desc: 'Pack contents', unit: 'HR', act: '+'},
        'STORE': {desc: 'Storage fees', unit: 'MO', act: '+'},
        'TILE': {desc: 'Tile installation', unit: 'SF', act: '&'},
        'HARDWD': {desc: 'Hardwood flooring', unit: 'SF', act: '&'},
        'LAMIN': {desc: 'Laminate flooring', unit: 'SF', act: '&'},
        'GROUT': {desc: 'Grout installation', unit: 'SF', act: '+'},
        'BASE': {desc: 'Base cabinet', unit: 'LF', act: '&'},
        'VANTY': {desc: 'Vanity cabinet', unit: 'EA', act: '&'},
        'COUNTR': {desc: 'Countertop', unit: 'SF', act: '&'},
        'HDWR': {desc: 'Cabinet hardware', unit: 'EA', act: '+'}
    },
    actions: {
        '+': 'Add/Install',
        '-': 'Remove/Demolish',
        '&': 'Remove & Replace',
        'R': 'Repair',
        'C': 'Clean',
        'P': 'Paint'
    },
    calcs: ['W', 'WC', 'C', 'F', 'PF', 'PC', 'V', 'SY', 'EA', 'LF', 'HH', 'SH', 'LL', 'EW',
        'FLR_RMV', 'FLR_RPL', 'WOLF', 'WOP', 'WOSF', 'WOSFD', 'AREA'],
    units: ['SF', 'LF', 'EA', 'SQ', 'CY', 'HR', 'DA', 'MO', 'GAL', 'CF', 'SY']
};
```

---

## CAT Field Autocomplete Behavior

### Trigger

- On focus (click or tab into field)
- On typing (filters list)

### Display Format

```
┌────────────────────────────────────┐
│ WTR    Water Extraction            │
│ DRY    Drywall                     │
│ PNT    Painting                    │
│ FCC    Floor Covering - Carpet     │
│ ...                                │
└────────────────────────────────────┘
```

Format: `CODE` (bold mono) + `Full Category Name` (secondary text)

### Search Behavior

- Case-insensitive matching
- Searches both code AND name
- Example: typing "dry" matches "DRY - Drywall"
- Example: typing "paint" matches "PNT - Painting"

### Selection Behavior

1. Populates CAT field with 3-letter code only
2. **Side effect**: Clears SEL field if category changes (selectors are category-dependent)

### Keyboard Navigation

| Key    | Action                                                      |
|--------|-------------------------------------------------------------|
| ↓      | Move highlight down                                         |
| ↑      | Move highlight up                                           |
| Enter  | Select highlighted item OR save typed value if no selection |
| Escape | Close dropdown, blur field                                  |

### Save Behavior

- **Enter key**: Saves the current typed value (even if not from dropdown)
- **Click outside (blur)**: Saves the current typed value
- **Select from dropdown**: Saves the selected value and auto-fills related fields
- Values are saved immediately without confirmation

---

## SEL Field Autocomplete Behavior (Context-Aware)

### Trigger

- On focus or typing in SEL field

### Context Dependency

- **Filters selectors based on currently selected CAT**
- Only shows selectors that belong to the selected category

### No Category Selected State

When CAT is empty or invalid:

```
┌────────────────────────────────────┐
│ ⚠️ Select a category first        │
└────────────────────────────────────┘
```

- Orange warning icon with italic text
- No selectable items

### Valid Category State - Display Format

```
┌──────────────────────────────────────────┐
│ PUMP     Water pump extraction       HR  │
│ AIRMOV   Air mover equipment         DA  │
│ DEHUM    Dehumidifier equipment      DA  │
│ INJECT   Wall injection drying       LF  │
│ MOIST    Moisture testing            EA  │
└──────────────────────────────────────────┘
```

Format: `CODE` (bold mono) + `Description` (secondary) + `UNIT` (badge)

### Search Behavior

- Case-insensitive matching
- Searches both selector code AND description
- Example: In WTR category, typing "pump" matches "PUMP - Water pump extraction"

### Auto-Fill on Selection

When a selector is chosen, the following fields are automatically populated:

| Field       | Source          | Behavior                                    |
|-------------|-----------------|---------------------------------------------|
| SEL         | Selected code   | Always set                                  |
| Unit        | `selector.unit` | Overwrites current value                    |
| Activity    | `selector.act`  | Overwrites current value                    |
| Description | `selector.desc` | **Only if empty** - preserves existing text |

---

## Description Auto-Fill Behavior

### On SEL Selection

When a selector is chosen from the autocomplete:

- Description is **auto-filled only if the field is empty**
- If description already has content, it is NOT overwritten
- This preserves user's custom descriptions
- User can always edit description manually

### Rationale

- Faster workflow without interruptions
- Preserves custom descriptions that user has entered
- New line items get auto-filled descriptions automatically
- Confirmation only shown for destructive actions (deleting line items)

---

## Activity Code Reference

| Code | Display  | Meaning            | Default For             |
|------|----------|--------------------|-------------------------|
| +    | + Add    | Add/Install item   | Equipment, installation |
| -    | - Remove | Remove/Tear out    | Demolition, debris      |
| &    | & R&R    | Remove and Replace | Drywall, flooring       |
| R    | R Repair | Repair item        | Patches, fixes          |
| C    | C Clean  | Clean item         | Cleaning services       |
| P    | P Paint  | Paint item         | All painting            |

---

## Validation Rules

### Field Validation States

| Field  | Empty State            | Invalid State                          | Valid State |
|--------|------------------------|----------------------------------------|-------------|
| CAT    | **Error** (red border) | **Warning** (orange) - not in database | Normal      |
| SEL    | **Error** (red border) | **Warning** (orange) - not in category | Normal      |
| Act    | Normal (optional)      | **Warning** (orange) - not in presets  | Normal      |
| Calc   | Normal (optional)      | **Warning** (orange) - not in presets  | Normal      |
| Qty    | Normal (defaults to 1) | **Error** (non-numeric)                | Normal      |
| Unit   | Normal (optional)      | N/A (dropdown)                         | Normal      |
| Prices | Normal (defaults to 0) | **Error** (non-numeric)                | Normal      |

### Validation Timing

- **Instant edit**: Data model updates on every keystroke
- **Deferred validation**: Visual validation (red/orange borders) shows on blur or Enter
- **IMPORTANT (v2.2)**: Validation should ONLY change cell styling (colors/borders), never delete or modify data values

### Toolbar Stats Badges

```
[12 items] [⚠ 3 errors] [⚡ 2 warnings] [✓ 2 selected]
```

- Errors badge: Red background, only shown when count > 0
- Warnings badge: Orange background, only shown when count > 0
- Selected badge: Blue background, only shown when count > 0

---

## Data Structures

### Sketch Structure

```javascript
sketchStructure = {
    document: {
        id: "SKT1",           // Document ID
        minorVersion: "1",    // Version number
        label: "Project Name" // Display name
    },
    levels: [{
        id: "LVL1",
        floorElevation: "0",  // In millimeters
        label: "First Floor",
        rooms: [{
            id: "RM1",
            label: "Living Room",
            levelId: "LVL1",
            ceilingHeight: "2438",  // In millimeters (~8 ft)
            wallIDs: "",
            abbrevNum: 1
        }]
    }]
};
```

### Line Item Structure

```javascript
lineItem = {
    id: "LI1",                    // Unique identifier
    groupId: "RM1",               // Parent group (document, level, or room ID)
    cat: "WTR",                   // Category code
    sel: "PUMP",                  // Selector code
    act: "+",                     // Activity code
    calc: "F",                    // Calculation variable
    quantity: 4,                  // Numeric quantity
    unit: "HR",                   // Unit of measure
    removePrice: 0,               // Remove price per unit
    replacePrice: 45,             // Replace price per unit
    desc: "Water extraction",     // Description text
    evidence: "",                 // Evidence text/attachments (future)
    notes: [{                     // Internal notes
        internal: true,
        text: "Note content"
    }]
};
```

---

## Import/Export Formats

### JSON Format (API Response)

```json
{
  "type": "HTTP_OK",
  "details": {
    "sketchStructure": {
      "sketchDocument": {
        "id": "string",
        "name": "string",
        "levels": [
          {
            "id": "string",
            "name": "string",
            "sortOrder": 0,
            "rooms": [
              {
                "id": "string",
                "name": "string",
                "abbrevNum": 0,
                "ceilingHeight": "string",
                "wallIDs": "string"
              }
            ]
          }
        ]
      }
    },
    "lineItems": [
      {
        "id": "string",
        "groupId": "string",
        "cat": "string",
        "sel": "string",
        "act": "string",
        "calc": "string",
        "quantity": "string",
        "unit": "string",
        "removePrice": "string",
        "replacePrice": "string",
        "desc": "string",
        "evidence": "string",
        "notes": [
          {
            "internal": true,
            "text": "string"
          }
        ]
      }
    ]
  }
}
```

### XML Export (FIF Schema 1.16 - Verisk Format)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<SKETCH_FILES>
    <SKETCHDOCUMENT id="SKT1" minorVersion="1">
        <COORDINATE3 x="0" y="0" z="0"/>
        <SKETCHLEVEL id="LVL1" floorElevation="0" name="First Floor">
            <SKETCHROOM id="RM1" ceilingHeight="2438" wallIDs="">
                <SKETCHLABEL>
                    <SKETCHCDATACHILD><![CDATA[Living Room]]></SKETCHCDATACHILD>
                </SKETCHLABEL>
            </SKETCHROOM>
        </SKETCHLEVEL>
    </SKETCHDOCUMENT>
    <LINEITEMDETAIL>
        <LINEITEM id="LI1" groupId="RM1" cat="WTR" sel="PUMP" act="+"
                  quantity="4" unit="HR" removePrice="0" otherPrice="45"
                  desc="Water extraction">
            <NOTES>
                <NOTE internal="true">
                    <DATA><![CDATA[Note text here]]></DATA>
                </NOTE>
            </NOTES>
        </LINEITEM>
    </LINEITEMDETAIL>
</SKETCH_FILES>
```

**Note**: `replacePrice` maps to `otherPrice` attribute in XML.

---

## Modal Dialogs

### Add/Edit Floor Modal

```
┌─────────────────────────────────────┐
│ Add Floor                           │
├─────────────────────────────────────┤
│ Floor Name                          │
│ ┌─────────────────────────────────┐ │
│ │ Second Floor                    │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│              [Cancel] [Add Floor]   │
└─────────────────────────────────────┘
```

### Add/Edit Room Modal

```
┌─────────────────────────────────────┐
│ Add Room                            │
├─────────────────────────────────────┤
│ Room Name                           │
│ ┌─────────────────────────────────┐ │
│ │ Master Bedroom                  │ │
│ └─────────────────────────────────┘ │
│ Parent Floor                        │
│ ┌─────────────────────────────────┐ │
│ │ First Floor                   ▼ │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│              [Cancel] [Add Room]    │
└─────────────────────────────────────┘
```

### Delete Confirmation Modal

```
┌─────────────────────────────────────┐
│ Confirm Delete                      │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ ⚠️ Warning                      │ │
│ │ 2 room(s) will be deleted.     │ │
│ │ 5 item(s) will move to Project.│ │
│ └─────────────────────────────────┘ │
│                                     │
│ Delete "First Floor"?               │
├─────────────────────────────────────┤
│              [Cancel] [Delete]      │
└─────────────────────────────────────┘
```

---

## Toast Notifications

Position: Bottom-right corner, stacked vertically

| Type    | Style                    | Icon | Duration  |
|---------|--------------------------|------|-----------|
| Success | Green border/background  | ✓    | 4 seconds |
| Error   | Red border/background    | ⚠    | 4 seconds |
| Warning | Orange border/background | ⚡    | 4 seconds |

Example messages:

- "Item added" (success)
- "Floor deleted" (success)
- "3 error(s), 2 warning(s)" (error)
- "Add a floor first" (warning)

---

## Drag and Drop

### Row Reordering

- Drag handle: ⋮⋮ column
- Visual feedback: Dragged row becomes semi-transparent
- Drop targets: Other rows (highlighted with accent color)

### Group Reassignment

- Drop on group header to move item to that group
- Item's `groupId` updates to match target group

---

## Keyboard Shortcuts

### In Table Cells

| Key       | Action                                   |
|-----------|------------------------------------------|
| Enter     | Commit value, blur field                 |
| Escape    | Close autocomplete, revert changes, blur |
| Tab       | Move to next cell                        |
| Shift+Tab | Move to previous cell                    |

### In Autocomplete

| Key    | Action                  |
|--------|-------------------------|
| ↓      | Highlight next item     |
| ↑      | Highlight previous item |
| Enter  | Select highlighted item |
| Escape | Close dropdown          |

---

## Responsive Behavior

### Mobile (< 768px)

- Sidebar: Hidden by default, slides in from left
- Table: Horizontal scroll enabled
- Evidence column: Recommend collapsed state

### Evidence Column Toggle

- Click header to collapse/expand
- Collapsed state: 40px width, shows 📎 icon
- Expanded state: 120px+ width, shows content
- Description column expands when Evidence collapses

---

## Technical Requirements

### Single File Architecture

- All HTML, CSS, and JavaScript in one `.html` file
- No external dependencies (except Google Fonts CDN)
- Embedded SOW database as JavaScript object

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features
- CSS Custom Properties (variables)

### Performance Considerations

- Virtual scrolling not required for typical use (< 1000 items)
- Debounced re-renders on input
- Efficient DOM updates (innerHTML replacement)

---

## Sample Data

### Default Sample (Load Sample button)

```javascript
sketchStructure = {
    document: {id: 'SKT1', minorVersion: '1', label: 'Sample Water Damage Project'},
    levels: [
        {
            id: 'LVL1', floorElevation: '0', label: 'First Floor',
            rooms: [
                {id: 'RM1', label: 'Living Room', levelId: 'LVL1', ceilingHeight: '2438', wallIDs: ''},
                {id: 'RM2', label: 'Kitchen', levelId: 'LVL1', ceilingHeight: '2438', wallIDs: ''}
            ]
        },
        {
            id: 'LVL2', floorElevation: '3000', label: 'Second Floor',
            rooms: [
                {id: 'RM3', label: 'Master Bedroom', levelId: 'LVL2', ceilingHeight: '2438', wallIDs: ''}
            ]
        }
    ]
};

lineItems = [
    {
        id: 'LI1',
        groupId: 'RM1',
        cat: 'WTR',
        sel: 'PUMP',
        act: '+',
        calc: '',
        quantity: 4,
        unit: 'HR',
        removePrice: 0,
        replacePrice: 45,
        desc: 'Water extraction',
        notes: []
    },
    {
        id: 'LI2',
        groupId: 'RM1',
        cat: 'WTR',
        sel: 'DEHUM',
        act: '+',
        calc: '',
        quantity: 5,
        unit: 'DA',
        removePrice: 0,
        replacePrice: 65,
        desc: 'Dehumidifier rental',
        notes: []
    },
    {
        id: 'LI3',
        groupId: 'RM1',
        cat: 'FCC',
        sel: 'CARPT',
        act: '&',
        calc: 'F',
        quantity: 250,
        unit: 'SF',
        removePrice: 0.35,
        replacePrice: 4.5,
        desc: 'Remove and replace carpet',
        notes: []
    },
    {
        id: 'LI4',
        groupId: 'RM2',
        cat: 'DRY',
        sel: 'DRY12',
        act: '&',
        calc: 'W',
        quantity: 120,
        unit: 'SF',
        removePrice: 0.45,
        replacePrice: 2.25,
        desc: 'Remove and replace drywall',
        notes: []
    },
    {
        id: 'LI5',
        groupId: 'RM2',
        cat: 'PNT',
        sel: 'WALL',
        act: '+',
        calc: 'W',
        quantity: 120,
        unit: 'SF',
        removePrice: 0,
        replacePrice: 1.85,
        desc: 'Paint walls',
        notes: []
    },
    {
        id: 'LI6',
        groupId: 'RM3',
        cat: 'CLN',
        sel: 'HEPA',
        act: 'C',
        calc: 'F',
        quantity: 180,
        unit: 'SF',
        removePrice: 0,
        replacePrice: 0.75,
        desc: 'HEPA vacuum',
        notes: []
    },
    {
        id: 'LI7',
        groupId: 'SKT1',
        cat: 'DMO',
        sel: 'HAUL',
        act: '-',
        calc: '',
        quantity: 3,
        unit: 'CY',
        removePrice: 125,
        replacePrice: 0,
        desc: 'Debris hauling',
        notes: []
    }
];
```

---

## Key Features Summary

1. **Server Integration**
    - JWT authentication with session storage
    - **Paginated instant sketch list** with selection UI
    - Load line items from selected sketch or manual ID entry
    - Optional local proxy for CORS bypass

2. **Local File Support**
    - Drag-drop upload zone
    - Auto-detect JSON vs XML format
    - Sample data for testing

3. **SOW Database Autocomplete**
    - CAT field: Category selection with full names
    - SEL field: Context-aware selector filtering
    - Auto-fill: Unit, Activity, Description on SEL selection

4. **Description Auto-Fill**
    - Automatic fill on SEL selection **only if empty**
    - Preserves existing custom descriptions

5. **Structure Management**
    - Add/Edit/Delete floors and rooms
    - Hierarchical tree view navigation
    - Item count badges

6. **Table Editing**
    - Instant edit (data updates on keystroke)
    - Deferred validation (on blur/Enter)
    - Drag-drop reordering
    - Multi-select with bulk delete

7. **Export Options**
    - Verisk XML (FIF Schema 1.16)
    - JSON format

8. **UX Enhancements**
    - Collapsible Evidence column
    - Real-time totals
    - Toast notifications
    - Keyboard navigation

---

## Change Log

### v2.3 Changes (from v2.2)

1. **NEW FEATURE: Add keycloak authentication**
    - Instead of copying auth token, the user is now able to log in with his credentials
    - Implemented token refreshing
    - Added a logout button

2. **BUG FIX: Fixed drag and drop of line items between rooms**

### v2.2 Changes (from v2.1)

1. **CRITICAL BUG FIX: Mouse Selection Race Condition**
    - **Problem**: Selecting CAT or SEL values from autocomplete dropdown with mouse click did not persist the selected
      value. Value appeared briefly then was cleared or reverted.
    - **Root Cause**: Race condition between `selectACById` (triggered by `onmousedown`) and `handleFieldBlurById` (
      triggered by `blur`). The sequence was:
        1. User clicks autocomplete item → `selectACById` runs via `onmousedown`
        2. `selectACById` sets item values and calls `renderTable()`
        3. `renderTable()` destroys the DOM including the input element
        4. The old input's `blur` event still fires (after 200ms delay in `hideAC`)
        5. `handleFieldBlurById` then overwrites the autocomplete-selected value with the stale input value
    - **Solution**: Implemented `pendingACSelection` flag system:
        - New global variable `pendingACSelection` tracks when autocomplete selection is in progress
        - `selectACById` sets this flag with `itemId` and `field` before modifying data
        - `selectACById` defers `renderTable()` call using `setTimeout(..., 0)` to let current event loop complete
        - `handleFieldBlurById` checks if a pending selection exists for this field and skips overwriting if so
        - Flag is cleared after render completes

2. **NEW FEATURE: Instant Sketch List Selection**
    - After authentication, the app now fetches and displays a paginated list of available instant sketches
    - Users can click on a sketch to select it, which auto-populates the ID field
    - Pagination controls (Previous/Next) for navigating large lists
    - Refresh button to reload the sketch list
    - Manual ID input still available as fallback option
    - Load button is disabled until a sketch is selected or ID is entered
    - API endpoint: `GET /rest/v1/instant-sketch?page={page}&pageSize={pageSize}`

3. **NEW FEATURE: Project Info Preview**
    - When loading line items, app first fetches project details via `GET /rest/v1/instant-sketch/{id}`
    - If fetch fails, shows warning but continues to load line items (non-blocking)
    - Project info displayed in collapsible "Project Info" section in sidebar (above Structure)
    - Displays all available project metadata with "-" for empty fields:
        - Basic Info (ID, name, address, claim #, customer, dates)
        - Water Classification (class, category)
        - Calculated Metrics (chambers, affected area, flood cut, wall moisture, equipment)
        - Floor details (room counts, 360° images)
        - Device info (model, OS, app version)
        - Submission info (API version, timestamps)
    - Files subsection (collapsed by default):
        - Shows file count badge
        - Expandable list with file details and download links
    - Project Info section is expanded by default, persists in editor view

4. **Implementation Details for Sketch List**
   ```javascript
   // New state variables
   let sketchList = [];
   let currentPage = 0;
   let totalPages = 0;
   let totalItems = 0;
   let selectedSketchId = null;
   const PAGE_SIZE = 10;
   let projectInfo = null;
   
   // New functions
   fetchSketchList(page)    // Fetches sketches from API (handles { type, details } wrapper)
   renderSketchList()       // Renders the list UI
   goToPage(page)           // Pagination navigation
   selectSketch(sketchId)   // Handles sketch selection
   onManualIdInput()        // Handles manual ID entry
   updateLoadButton()       // Enables/disables load button
   renderProjectInfo()      // Renders project info in sidebar
   toggleProjectInfo()      // Toggles project info collapse
   toggleFilesSection()     // Toggles files section collapse
   formatValue/formatDate/formatNumber() // Formatting helpers
   
   // API response handling
   const responseData = await response.json();
   const data = responseData.details || responseData;  // Unwrap { type, details } structure
   ```

5. **Validation Behavior Clarification**
    - Validation (showing error/warning borders) should ONLY affect visual styling
    - Validation must NEVER delete, modify, or overwrite field values
    - This was not a code bug but is clarified in spec for future reference

### v2.1 Changes (from v2.0)

1. **Enhanced SOW Database**
    - Added default activity (`act`) to all selectors
    - Activities are contextually appropriate per work type

2. **CAT Field Improvements**
    - Clear SEL automatically when category changes
    - Display format: "CODE - Full Category Name"
    - Case-insensitive matching for database lookups

3. **SEL Field - Context-Aware Filtering**
    - Only show selectors belonging to selected category
    - "Select a category first" message when CAT empty
    - Display format: "CODE - Description (UNIT)"
    - Case-insensitive matching for database lookups

4. **Auto-Fill on SEL Selection**
    - Unit: Auto-fills from SOW database
    - Activity: Auto-fills from SOW database
    - Description: Auto-fills **only if empty** (preserves existing descriptions)

5. **Simplified UX**
    - All edits apply instantly without confirmation
    - Confirmation only for destructive actions (deleting items/floors/rooms)

6. **ID-Based Operations (Bug Fix)**
    - All table operations use item IDs instead of array indices
    - Prevents cross-row interference when editing multiple items
    - More robust against table re-renders
    - Functions: `updateItemById`, `selectACById`, `copyItemById`, `deleteItemById`, etc.

7. **Enter/Blur Save Fix**
    - Enter key now saves typed values even when no autocomplete item is highlighted
    - Blur (clicking outside) properly saves typed values
    - Deferred render prevents timing issues with event processing

### v2.0 Changes (from v1.0)

1. SOW Database Integration
2. Instant edit / deferred validation
3. Collapsible Evidence column
4. Dual pricing columns (Remove/Replace)

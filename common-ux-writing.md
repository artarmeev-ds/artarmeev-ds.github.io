# DocuSketch° Common UX Writing Guidelines

**Version 1.0 | February 2026**
**Scope:** All DocuSketch° platforms (Web Portal, Mobile App, 360° Player)

---

## About This File

This document contains UX writing rules that apply across ALL DocuSketch° platforms. Platform-specific rules live in their own files:

- **Web Portal:** `web-portal-ux-writing.md`
- **Mobile App:** `app-ux-writing.md`

When platform-specific rules conflict with this file, the platform-specific file takes precedence for that platform.

---

## Company Name

Always write **"DocuSketch°"** with the degree symbol (°).

---

## Terminology

### Required Terms

| ✅ Always Use | ❌ Never Use          | Notes                                                  |
| ------------- | --------------------- | ------------------------------------------------------ |
| sketch        | floor plan, floorplan | Exception: internal code/API references                |
| request       | order                 | Exception: "Order DocuSketch camera kit" per marketing |
| 360° image    | 360 image, panorama   | Always include degree symbol                           |

### Project vs 360° Tour

These are **not** interchangeable terms:

- A **project** is the top-level container for all property documentation (360° tours, sketches, estimates, reports, comments)
- A **360° tour** is a set of 360° images captured on-site, contained within a project

Use "project" when referring to the overall documentation job. Use "360° tour" when referring specifically to the captured 360° images and the interactive viewer experience.

| ✅ Correct               | ❌ Incorrect                               |
| ------------------------ | ------------------------------------------ |
| Open the project         | Open the tour (when meaning the whole job) |
| View the 360° tour       | View the tour (ambiguous)                  |
| Project contains 2 tours | Tour contains 2 tours                      |

### Product and Service Names

- **DocuSketch° DS1** or **DS1 camera** (for hardware)
- **Web Portal** (capitalize both words)
- **Sketch** — capitalize when referring to the DocuSketch Sketch product/service (not when used generically as a verb)
- **Estimate** — capitalize when referring to the DocuSketch Estimate product/service
- **Estimating service** — capitalize "Estimating" when referring to the service name
- **Location Services** (iOS permission, capitalized)
- **Settings** (iOS Settings app, capitalized)

**Examples:**

- ✅ "Request a Sketch for this project" (product)
- ✅ "Your Estimate is ready" (product)
- ✅ "The Estimating service includes detailed measurements" (service name)
- ❌ "request a sketch" (when referring to the product)

### System States and Actions

| User Situation                | State Language     | Action Language        | Example                |
| ----------------------------- | ------------------ | ---------------------- | ---------------------- |
| Data exists locally only      | "Non-uploaded"     | "Upload"               | "Upload changes"       |
| Data exists on server         | "Uploaded"         | —                      | "Project uploaded"     |
| Item in collection, removable | "In [collection]"  | "Remove from"          | "Remove from timeline" |
| Item can be destroyed         | "Exists"           | "Delete"               | "Delete comment"       |
| Container has no content      | "Empty"            | "Add"                  | "Add 360° image"       |
| Workflow incomplete           | "Unfinished"       | "Complete" or "Remove" | "3 unfinished rooms"   |
| Feature can be turned on/off  | "Enabled/Disabled" | "Enable/Disable"       | "Disable integration"  |

### Remove vs Delete vs Disable

| Term    | Meaning                                      | Example                 |
| ------- | -------------------------------------------- | ----------------------- |
| Remove  | Take out of context; item persists elsewhere | Remove from timeline    |
| Delete  | Permanently destroy                          | Delete comment          |
| Disable | Turn off; can be re-enabled                  | Disable PSA integration |

---

## No Contractions

Write the full form. This applies to ALL user-facing text.

| ❌ Don't Use | ✅ Use Instead |
| ------------ | -------------- |
| can't        | can not        |
| don't        | do not         |
| won't        | will not       |
| doesn't      | does not       |
| isn't        | is not         |
| couldn't     | could not      |
| wouldn't     | would not      |
| shouldn't    | should not     |

---

## Punctuation

**Standalone UI labels → no period**

- Modal titles, button labels, section headers, tab labels, toast notifications

**Flowing text → use periods**

- Modal body text (even one sentence), error descriptions, help text, info banners

---

## Avoid "Please"

Get straight to the point. Use imperative verbs.

| ❌ Avoid                   | ✅ Use Instead      |
| -------------------------- | ------------------- |
| Please select a project    | Select a project    |
| Please enter a valid email | Enter a valid email |
| Please try again           | Try again           |
| Please extend the tripod   | Extend the tripod   |

---

## Formatting

### Numbers

Use numerals for all counts: "3 projects", "20 files", "150 cameras"

**Exception — 360° images:** When a numeral would appear directly before "360°", drop "360°" and use just "images" for readability:

- ✅ "5 images" or "5 additional images"
- ❌ "5 360° images" (two numbers adjacent — hard to parse quickly)

When the count is not adjacent or the context requires specificity, keep the full term:

- ✅ "This room has 5 images, all in 360° format"
- ✅ "Upload 360° images" (no count, no conflict)

### Date and Time Format

| Format   | Example             | Usage                          |
| -------- | ------------------- | ------------------------------ |
| Full     | 12/18/2024, 4:54 PM | Timestamps, logs               |
| Short    | 12/18/24, 11:34 AM  | Tables, compact displays       |
| Readable | December 18 by 9 PM | Deadlines, human communication |

### Height Measurements

Use feet and inches with no space: 5'2"

### Slash Usage

No spacing around slashes: "Add photos/video", "State/Province"

### Pluralization

Use "(s)" when count is unknown: "project(s)", "sketch(es)", "file(s)"

### Oxford Comma

Use it: "plumbing fixtures, stairways, ceiling heights, and complex cabinets"

### Lists with Counts

Counts in parentheses: "Unpinned comments (2)"

---

## Toast Notifications

**Pattern:** `[Object] [past tense verb]` — 2-3 words, no articles, no period

✅ Examples:

- Project updated
- Comment deleted
- Sketch requested
- Email sent
- File uploaded
- Configuration saved

❌ Avoid:

- The project was updated
- A comment has been deleted
- Your changes have been saved

> **Note:** Web Portal allows slightly longer toasts (up to one line) when additional context helps. See `web-portal-ux-writing.md` for details.

---

## Modal Dialogs

### Decision Modals

User must choose between 2+ options.

**Pattern:**

```
[Question]?

[Why this matters — one sentence with period.]

[Option 1] | [Option 2]
```

**Button guidelines:**

- Use action verbs that match the question
- Avoid generic "Yes/No" or vague "OK/Cancel" for decision modals
- Place safer action on left, destructive action on right

### Information Modals

User must acknowledge, no real choice.

**Pattern:**

```
[What happened]

[What to do — one sentence with period.]

OK
```

---

## Error Messages

**Pattern:** What happened → Why → What to do

**General format:**

```
[What happened — as title/heading]

[Why it happened + what to do — as body text with period.]
```

**Keep it brief but actionable.** Avoid vague messages like "An error occurred" or "Something went wrong."

---

## Instructions

**Pattern:** Imperative verb + specific action

✅ Examples:

- "Extend the tripod fully and lock each section"
- "Turn on Location Services to allow DocuSketch° to determine your location"
- "Insert a compatible SD card to shoot"

❌ Avoid:

- "Please extend the tripod"
- "You should turn on Location Services"

**Add context when it helps:**

- "Consistent height ensures accurate documentation, measurements, and sketches"

---

## Common Mistakes to Avoid

**Too many words:**

- ❌ "Please feel free to contact our support team if you need any further assistance"
- ✅ "Contact support for assistance"

**Apologetic tone:**

- ❌ "Sorry, you cannot generate sketch"
- ✅ "You can not generate sketch for this request"

**Vague quantities:**

- ❌ "Remove some unfinished rooms"
- ✅ "Remove 3 unfinished rooms"

**Technical jargon:**

- ❌ "No valid SD card detected"
- ✅ "No SD card"

**Wrong terminology:**

- ❌ "Order floor plan"
- ✅ "Request sketch"

**Unnecessary exclamations:**

- ❌ "We are in CAT mode!"
- ✅ "CAT mode active"

---

## Document History

| Version | Date          | Author | Changes                                          |
| ------- | ------------- | ------ | ------------------------------------------------ |
| 1.0     | February 2026 | Tim    | Extracted from web-portal and app writing guides |

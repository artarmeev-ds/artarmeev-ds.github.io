# DocuSketch° Web Portal — UX Writing Guidelines

**Version 1.1 | February 2026**
**Platform:** Web Portal (desktop/laptop)
**Audience:** Project managers, company administrators, internal admins

> **Common rules:** This file covers Web Portal-specific writing rules only.
> For shared rules (terminology, punctuation, contractions, etc.), see [`common-ux-writing.md`](./common-ux-writing.md).

---

## Audience Context

The Web Portal serves **project managers and company administrators** who work from desktops and laptops. Unlike field technicians using the mobile app in challenging conditions, Web Portal users:

- Have large screens and time to read
- Manage projects, teams, estimates, reports, and integrations
- Need clear data tables, forms, confirmation dialogs, and settings pages
- Care about accuracy, traceability, and status visibility
- Can handle more detailed explanations than a 2-second mobile scan

This allows for slightly longer toast messages, more detailed modal explanations, and comprehensive help text — but clarity and concision remain paramount.

---

## Capitalization

**Title Case for:**

- Page headings (H1)
- Navigation menu items
- Breadcrumb labels

| ✅ Correct        | ❌ Incorrect      |
| ----------------- | ----------------- |
| Active Projects   | Active projects   |
| Company Settings  | company settings  |
| PSA Configuration | Psa configuration |

**Sentence case for everything else:**

- Modal titles
- Section headers within pages
- Field labels
- Button labels
- Toast messages
- Table column headers

| ✅ Correct          | ❌ Incorrect        |
| ------------------- | ------------------- |
| Delete project      | Delete Project      |
| Cancel subscription | Cancel Subscription |
| API Key             | Api key             |

> **Note:** This differs from the mobile app, which uses sentence case everywhere. The Web Portal uses title case specifically for page headings and navigation.

---

## Page Headings

Page headings use **Title Case** and should be concise (1-4 words).

**Current page headings:**

- Projects (Active Projects, Archived Projects)
- Estimates Without Tours
- Users, All Users
- Offices
- Company Settings
- Subscription
- Billing Reports
- Sketch Request Statistics
- Camera Management
- PSA Configuration
- Profile Settings

---

## Navigation Menu Items

All navigation items use **Title Case**:

**Primary Menu:**

- Projects
- Estimates Without Tours
- Users
- Offices
- Company (dropdown)
- Admin (dropdown)

**Company Dropdown:**

- Company Settings
- Subscription
- Billing Reports
- Order Camera

**Admin Dropdown:**

- All Users
- All Companies
- All Billing Reports
- Sketch Request Statistics
- Scope of Work Versions
- Camera Management
- PSA Configuration

---

## Table Column Headers

Use **sentence case** for table column headers. Keep headers short (1-3 words).

**Examples:**

- Name
- Email
- Status
- Created at
- Projects count
- Last activity

---

## Form Fields

### Labels

- Use sentence case
- No colon at end
- Required fields: Add `<span class="form-asterisk">*</span>` after label text

**Examples:**

```
First name *
Last name *
Email *
Phone number
Office name *
```

### Placeholders

- Use sentence case
- Provide helpful hints, not just field names
- For search fields: describe what can be searched

**Examples:**

```
Enter email address
Search by name, address, or ID
Select office
Enter API Key
```

### Validation Messages

**Pattern:** `[Field description] [problem]`

**Examples:**

```
Incorrect email format
Passwords do not match
This field is required
```

### Help Text

- Use sentence case with period
- Place below the input field
- Keep to 1-2 sentences

**Examples:**

```
Include unit/office number if applicable.
Limited to the past 65 days.
```

---

## Buttons

### Action Buttons

Use action verbs. Match the verb to the action.

| Action Type | Button Label              |
| ----------- | ------------------------- |
| Create      | Create, Add               |
| Update      | Save, Update, Apply       |
| Delete      | Delete, Remove            |
| Toggle      | Enable, Disable           |
| Navigate    | Back, Cancel, Close       |
| Submit      | Submit, Request, Generate |

**Examples:**

- Save
- Cancel
- Enable / Disable
- Delete
- Archive
- Request Estimate
- Generate Report

### Modal Buttons

- Use action verbs that match the modal title
- Avoid generic "Yes/No" or vague "OK/Cancel" for decision modals
- Place safer action on left, destructive action on right
- For information-only modals, "OK" is acceptable

**Button placement:**

```
[Cancel] [Delete]     ← Destructive action on right
[Cancel] [Save]       ← Primary action on right
[Back] [Next]         ← Multi-step flows
[OK]                  ← Information-only
```

---

## Toast Notifications

Follow the common toast pattern (`[Object] [past tense verb]`), but **Web Portal allows slightly longer toasts** (up to one line) when additional context helps.

**Acceptable longer format:**

```
Project archived and moved to Archived Projects
User invited and assigned to Chicago office
```

See `common-ux-writing.md` for the base toast pattern and examples.

---

## Modal Dialogs

### Decision Modals (user chooses between options)

**Pattern:**

```
[Action verb] + [object]?

[Why this matters — one sentence with period.]

[Safe action] | [Destructive action]
```

**Example:**

```
Disable PSA integration?

All linked PSA jobs will be unlinked for all company users.

[Cancel] [Disable]
```

### Confirmation Modals (irreversible actions)

**Pattern:**

```
[Action verb] + [object]?

[Consequence — one sentence with period.]

[Cancel] | [Action verb]
```

**Example:**

```
Delete project?

The project, its files and timelines will be deleted. This action can not be undone.

[Cancel] [Delete]
```

### Information Modals (user acknowledges)

**Pattern:**

```
[What happened]

[What to do — one sentence with period.]

[OK]
```

---

## Error Messages

**Pattern:** What happened → What to do

**General format:**

```
[What happened — as title/heading]

[Why it happened + what to do — as body text with period.]
```

**Toast error format:** Keep it brief but actionable.

| ✅ Good                                            | ❌ Avoid             |
| -------------------------------------------------- | -------------------- |
| Failed to load config                              | An error occurred    |
| Office can not be deleted: Projects still assigned | Something went wrong |

---

## Empty States

**Pattern:** What's missing + How to fix it

**Examples:**

```
You have no active projects yet

Create your first project to get started.

[Create Project]
```

```
No messages yet

Request your first estimate and wait until your sketch is ready.
```

---

## Status Labels and Badges

Use the established status vocabulary consistently:

| Status Type     | Labels                                                      |
| --------------- | ----------------------------------------------------------- |
| User status     | Active, Inactive, Requires Activation                       |
| Contract status | Active, Canceled, Suspended, No Contract                    |
| Payment status  | Paid, Charged, Charge Failure, Payment Failure, Written Off |
| Estimate status | Draft, Submitted, In Progress, Completed, Rejected          |
| Report status   | Draft, Generating, Ready, Failed                            |
| Sketch status   | Requested, In Progress, Done, Rejected                      |

---

## Settings and Configuration Pages

### Enable/Disable Toggles

| User Situation               | State Language            | Action Language      |
| ---------------------------- | ------------------------- | -------------------- |
| Feature can be turned on/off | Enabled / Disabled        | Enable / Disable     |
| Configuration active         | Configured / Active       | Update / Edit        |
| Integration connected        | Connected / Not connected | Connect / Disconnect |

### Inheritance Explanations

When settings cascade (Company → Office → User), explain the hierarchy:

```
Company-level settings apply to all offices and users unless overridden.
```

```
This setting is inherited from the company. To customize, enable override.
```

---

## Decision Tree

When writing UI text, follow this decision tree:

```
Is it a page heading or nav item?
├── Yes → Title Case, no period
└── No → Continue...

Is it a button label?
├── Yes → Sentence case, action verb, no period
└── No → Continue...

Is it a toast notification?
├── Yes → "[Object] [past tense verb]", no period, 2-4 words
└── No → Continue...

Is it a modal title?
├── Yes → Sentence case, action + object, question mark if asking
└── No → Continue...

Is it body/help text?
├── Yes → Sentence case, use periods, full sentences
└── No → Continue...

Is it a form label?
├── Yes → Sentence case, no colon, add asterisk if required
└── No → Continue...

Is it an error message?
├── Yes → Sentence case, explain what happened and what to do
└── No → Review common-ux-writing.md
```

---

## Before You Publish

Ask yourself:

1. ✅ Is every word necessary? (But remember: Web Portal users can read more than mobile)
2. ✅ Is this the correct case? (Title case for page headings/nav, sentence case elsewhere)
3. ✅ Correct terminology? (See `common-ux-writing.md`)
4. ✅ No contractions?
5. ✅ No "please"?
6. ✅ Matches existing patterns in the codebase?
7. ✅ Action verbs for buttons?
8. ✅ Past tense for toast notifications?

---

## Quick Reference Card

| Element       | Case          | Punctuation | Example                            |
| ------------- | ------------- | ----------- | ---------------------------------- |
| Page heading  | Title Case    | None        | Active Projects                    |
| Nav menu item | Title Case    | None        | Company Settings                   |
| Modal title   | Sentence case | ? if asking | Delete project?                    |
| Button        | Sentence case | None        | Save changes                       |
| Toast         | Sentence case | None        | Project saved                      |
| Form label    | Sentence case | None        | Email address                      |
| Error message | Sentence case | Period      | Email format is not valid.         |
| Help text     | Sentence case | Period      | Include unit number if applicable. |

---

## Document History

| Version | Date          | Author | Changes                                        |
| ------- | ------------- | ------ | ---------------------------------------------- |
| 1.0     | February 2026 | Tim    | Initial version                                |
| 1.1     | February 2026 | Tim    | Extracted common rules to common-ux-writing.md |

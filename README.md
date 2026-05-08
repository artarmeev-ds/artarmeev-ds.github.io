# Phoenix Design Proposals

Static GitHub Pages site presenting candidate design directions for the Phoenix portal (DocuSketch).

Live page: `index.html` — five proposals, each with side-by-side desktop and mobile iframes that scroll independently.

## Files

| File | Purpose |
|---|---|
| `index.html` | Main standalone page — 5 proposal sections, swatches, iframe pairs |
| `iframe-desktop.html` | Project Overview / Overview tab mock (desktop, 1024px+) |
| `iframe-mobile.html` | Project detail screen mock (mobile, 390px) — based on Figma `17327-52929` |
| `tokens.css` | Design tokens (mirrors `src/styles/tokens/_design-tokens.scss`) plus `body.proposal-N` overrides |

## How proposals work

Each iframe loads with `?p=N`. The iframe reads `p` from the query string and applies `body.proposal-N`, which scopes a subset of CSS variable overrides defined in `tokens.css`.

To add a 6th proposal:

1. Append a `body.proposal-6 { ... }` block to `tokens.css`
2. Add a `<section class="proposal" id="p6">` to `index.html` with `<iframe src="iframe-desktop.html?p=6">` and `<iframe src="iframe-mobile.html?p=6">`
3. Add the TOC link

## Current proposals

1. **Baseline** — current Phoenix tokens (olive/yellow)
2. **Warm terracotta palette** — coral accent
3. **Badge color system v2** — refined status colors, AA-compliant
4. **Layout density** — tighter spacing scale, larger card radii
5. **Typography scale** — bumped heading sizes, heavier medium weight

## Local dev

Open `index.html` directly, or:

```bash
python3 -m http.server 8000
# then http://localhost:8000
```

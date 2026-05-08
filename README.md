# Phoenix Design Proposals

Static GitHub Pages site presenting candidate design directions for the Phoenix portal (DocuSketch).

Live page: `index.html` — proposals with side-by-side desktop and mobile iframes that scroll independently.

## Files

| File | Purpose |
|---|---|
| `index.html` | Main standalone page — proposal sections with swatches and iframe pairs. White bg, full-width, design-tokens-aligned. |
| `iframe-desktop.html` | Project Overview / Overview tab mock (desktop, fluid full-width) |
| `iframe-mobile.html` | Project detail screen mock (mobile, 390px) — based on Figma `17327-52929` |
| `tokens.css` | Design tokens (mirrors `src/styles/tokens/_design-tokens.scss`) plus `body.proposal-N` overrides |

## How proposals work

Each iframe loads with `?p=N`. The iframe reads `p` from the query string and applies `body.proposal-N`, which scopes a subset of CSS variable overrides defined in `tokens.css`.

To add a new proposal:

1. Append a `body.proposal-N { ... }` block to `tokens.css`
2. Add a `<section class="proposal" id="pN">` to `index.html` with `<iframe src="iframe-desktop.html?p=N">` and `<iframe src="iframe-mobile.html?p=N">`

## Design alignment

The main page uses the same typography scale and design tokens as `docusketch-frontend`:

- IBM Plex Sans
- h1 24/28/500, h2 18/24/500, h3 16/20/500 (per `_typography-mixins.scss`)
- Body 14/18/400
- Token CSS vars (`--ds-color-*`, `--ds-radius-*`, etc.)

## Local dev

Open `index.html` directly, or:

```bash
python3 -m http.server 8000
# then http://localhost:8000
```

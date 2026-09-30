# CLAUDE.md

Guidance for working in this repository.

## What this is

This is the perlfoundation.org website, a [Hugo](https://gohugo.io/) static site
with its **own standalone layouts** under `layouts/` (no theme, no submodule).
See `README.md` for setup, the `Makefile` targets (`make serve` / `make build`),
the layout/template structure, the OpenGraph image, and QR code aliases.

## Working rules

- Templates style the *rendered Markdown* — page copy stays in `/content`, never
  hard-coded in a template.
- All styling lives in `static/css/custom.css` (dark theme; design tokens are the
  `:root` custom properties at the top of that file). Use those tokens rather
  than repeating raw hex values.
- Images live in `static/images/` (group per-page image sets in a subdirectory).
- Sponsor data is in `data/sponsors.yaml`, rendered by the
  `layouts/shortcodes/sponsors-by-level.html` shortcode.

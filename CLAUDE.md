# CLAUDE.md

Guidance for working in this repository.

## What this is

This is the perlfoundation.org website, a [Hugo](https://gohugo.io/) static site
with its **own standalone layouts** under `layouts/` (no theme, no submodule).
See `README.md` for setup, the `Makefile` targets (`make serve` / `make build`),
the layout/template structure, the OpenGraph image, and QR code aliases.

## Working rules

- Page copy stays in `/content` (Markdown body or front matter), never
  hard-coded in a template. Templates style the rendered Markdown. Fixed UI
  labels that are identical everywhere they appear ("Read more",
  "Appointed:", "Board seat sponsored by", "Companies:") are chrome and may
  live in the template.
- Repeated structured records belong in YAML, not in Markdown that a template
  parses apart: board members are the `members:` list in the front matter of
  `content/the-board.md` (format in `README.md`).
- All styling lives in `static/css/custom.css` (dark theme; design tokens are the
  `:root` custom properties at the top of that file). Use those tokens rather
  than repeating raw hex values.
- Images live in `static/images/` (group per-page image sets in a subdirectory).
- Sponsor data is in `data/sponsors.yaml`, rendered by the
  `layouts/shortcodes/sponsors-by-level.html` shortcode.
- JSON-LD structured data is one `@graph` per page, built in
  `layouts/partials/structured-data.html` (Organization + WebSite everywhere,
  plus a `Person` per board member from `layouts/partials/board-people.html`).
  Add new entities to that graph rather than emitting a separate
  `<script type="application/ld+json">` block.

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
  labels that read the same on every render are chrome and may live in the
  template (see each template's header comment).
- For a new page of repeated records, prefer a YAML list in front matter, as
  `content/the-board.md` does with `members:` (format in `README.md`).
  Templates that already slice rendered Markdown (`donate.html`,
  `committees.html`, `sponsorlevels.html`) follow the pattern described in
  their header comment.
- All styling lives in `static/css/custom.css` (dark theme; design tokens are the
  `:root` custom properties at the top of that file). Use those tokens rather
  than repeating raw hex values.
- Images live in `static/images/` (group per-page image sets in a subdirectory).
- Sponsor data is in `data/sponsors.yaml`, rendered by the
  `layouts/shortcodes/sponsors-by-level.html` shortcode.
- JSON-LD is one `@graph` per page, built in
  `layouts/partials/structured-data.html`. Add new entities to that graph
  rather than emitting a separate `<script type="application/ld+json">` block.

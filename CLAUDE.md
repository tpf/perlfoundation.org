# CLAUDE.md

Guidance for working in this repository.

## What this is

This is the perlfoundation.org website, a [Hugo](https://gohugo.io/) static
site. It ships its **own standalone layouts** under `layouts/` — there is no
theme and no git submodule. Requires Hugo **extended** (the version is pinned in
`.github/workflows/publish.yml`).

## Common tasks

A `Makefile` at the repo root provides the convenience targets:

- `make serve` — runs `hugo serve`. When the `tailscale` CLI is available it
  binds to the tailnet IP so the dev server is reachable from other machines on
  the tailnet; otherwise it serves on localhost. Hugo picks an open port
  automatically if the default is in use.
- `make build` — builds the static site into `public/`.

## Layout notes

- Pages live in `/content`. A page selects its template with `layout: '<name>'`
  in its front matter (→ `layouts/_default/<name>.html`); content with no
  `layout` falls back to `single.html`.
- Templates are self-contained: `layouts/_default/baseof.html` is the shell,
  `layouts/partials/` holds the shared header/footer/head, and all styling lives
  in `static/css/custom.css` (dark theme; design tokens are the `:root` custom
  properties at the top of that file). Templates style the *rendered Markdown* —
  page copy stays in `/content`, never hard-coded in a template.
- Images live in `static/images/` (group per-page image sets in a subdirectory).
- Sponsor data is in `data/sponsors.yaml`, rendered by the
  `layouts/shortcodes/sponsors-by-level.html` shortcode; sponsor styling lives
  in `static/css/custom.css`.

See `README.md` for more detail on site structure, the OpenGraph image, and QR
code aliases.

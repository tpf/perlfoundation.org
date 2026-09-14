# CLAUDE.md

Guidance for working in this repository.

## What this is

This is the perlfoundation.org website, a [Hugo](https://gohugo.io/) static
site using the [blowfish](https://github.com/nunocoracao/blowfish) theme, which
is vendored as a git submodule under `themes/blowfish`.

## Common tasks

A `Makefile` at the repo root provides the convenience targets:

- `make init` — ensures the blowfish theme submodule is checked out. Run this
  after cloning without `--recurse-submodules`, or if `themes/blowfish` is
  empty. It is idempotent.
- `make serve` — runs `hugo serve` (depends on `make init`). When the
  `tailscale` CLI is available it binds to the tailnet IP so the dev server is
  reachable from other machines on the tailnet; otherwise it serves on
  localhost. Hugo picks an open port automatically if the default is in use.

Prefer `make serve` over calling `hugo serve` directly, since it guarantees the
theme submodule is present first.

## Layout notes

- Pages live in `/content`.
- Images live in `static/images/` (group per-page image sets in a subdirectory).
- Sponsor data is in `data/sponsors.yaml`, rendered by the
  `layouts/shortcodes/sponsors-by-level.html` shortcode; sponsor styling lives
  in `static/css/custom.css`.

See `README.md` for more detail on site structure, the OpenGraph image, and QR
code aliases.

# Redesign review follow-ups (PR #26)

Tracking the findings from `/code-review-intense-flow` on the `redesign` branch
(diff `ed540d1..6debe6f`, review id 5360451214). Pass 1 (`c57b173`) landed the
safe fixes; Pass 2 (`59663cb`) landed the accessibility / keyboard-nav rework.
This file tracks what is **done** and what is **still open**.

## Done

### Critical (all, Pass 2)
- [x] Megamenu keyboard reachability — removed open-on-focus (WCAG 2.1.1)
- [x] JS-less nav fallback — top-level items are real `<a href>` links
- [x] Search modal focus race — `tabindex="-1"` panel focused synchronously
- [x] Escape/outside-click focus stranding — `closeMenu()` restores focus

### Important
- [x] `grants-committee.md` markup structure (Pass 1, wording unchanged)
- [x] `oklch()` tokens get sRGB fallbacks (Pass 1)
- [x] Hardcoded hex → `var(--…)` tokens (Pass 1)
- [x] Mobile menu touch targets 40 → 44px (Pass 1)
- [x] `<link rel="canonical">` added (Pass 1)
- [x] `CLAUDE.md` trimmed to pointer + unique rules (Pass 1)
- [x] Mobile menu Escape / outside-click / focus restore (Pass 2)

### Minor
- [x] Pagefind version single-sourced from `Makefile` (Pass 1)
- [x] `board.html` headshot guard instead of hard-panic (Pass 1)
- [x] Per-column `id` + per-item `aria-controls` (Pass 2)
- [x] Board toggle `parentNode.querySelector` rewritten (Pass 2)
- [x] `aria-haspopup` misuse removed (Pass 2)

## Open

### Important
- [x] **JSON-LD / structured data** — `layouts/partials/structured-data.html`
      emits an `Organization` + `WebSite` `@graph` on every page (SEO + GEO)
- [x] **Per-page meta description** — `head.html` derives a unique description
      from each page's rendered content; home / empty pages keep the site default
- [x] **E2e coverage** — Playwright suite under `tests/e2e/` covers mega-menu
      (keyboard reachability, focus-into-column, Escape/outside-click focus
      restore), search modal (synchronous focus, Pagefind load, Escape restore),
      board `<details>` toggle, and the mobile menu (toggle/Escape/outside-click
      + focus restore). Runs against a built site via `playwright.config.js`'s
      webServer; CI in `.github/workflows/e2e.yml`
- [x] ~~**Security headers**~~ — N/A: deployed on GitHub Pages, which can't set
      response headers. Closed as won't-fix (maintainer decision).
- [x] **Pagefind supply-chain** — pinned in `package.json` + `package-lock.json`
      (sha512 integrity); Makefile & CI now `npm ci` and run the local binary
      instead of `npx -y pagefind@…`

### Minor
- [ ] Site `title` defined twice with different values (`hugo.toml` vs `languages.en.toml`)
- [ ] Dead Blowfish param blocks in `params.toml`
- [ ] Missing `twitter:title` / `twitter:description`
- [ ] Missing favicon `<link>` tags
- [ ] No `noindex` escape hatch (front-matter opt-out)
- [ ] `header.html` hardcodes `"legal"` for third-level active-section detection
- [ ] No `prefers-reduced-motion` handling
- [ ] Scroll-lock via inline style rather than a CSS class
- [x] Unreferenced `index.json` full-content feed removed (dropped the `JSON`
      home output + the `index.json` template; Pagefind supplies search)
- [ ] No `robots.txt` / `llms.txt` — AI crawler policy *(maintainer decision)*

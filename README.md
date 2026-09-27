# Deploy locally

This is a [Hugo](https://gohugo.io/) site. It ships its own standalone layouts
under `layouts/` — there is **no theme and no git submodule**. Make sure you
have a recent version of `hugo` **extended** installed (CI pins the version in
`.github/workflows/publish.yml`).

```
git clone https://github.com/tpf/tprf-hugo-site
cd tprf-hugo-site
hugo serve
```

## Using the Makefile

A `Makefile` provides convenience targets:

- `make serve` — runs `hugo serve`. If the `tailscale` CLI is available it binds
  to your tailnet IP so the dev server is reachable from other machines on your
  tailnet; otherwise it serves on localhost. Hugo picks an open port
  automatically if the default is in use.
- `make build` — builds the static site into `public/`.

## Layouts

The site is fully self-contained. Templates live under `layouts/`:

- `layouts/_default/baseof.html` — the page shell (header/footer partials,
  `<head>`).
- `layouts/_default/<name>.html` — one template per page style. A content file
  selects its template with `layout: '<name>'` in its front matter (e.g.
  `board`, `committees`, `getinvolved`, `sponsorlevels`, `oursponsors`,
  `donate`, `legal`, `fund`, `events`). Content with no `layout` falls back to
  `single.html`.
- `layouts/partials/` — shared `header.html`, `footer.html`, `head.html`.
- `layouts/shortcodes/` — the sponsor shortcodes used by the sponsor pages.
- `static/css/custom.css` — all styling (dark theme, design tokens at `:root`).

# Site structure

## Page locations

Pages are stored in `/content` and can have the perce[ption of being in a subdirectory by setting the URL to have a subdirectory compoent.


### Image locations

Images should be stored in `static//images` however if there will be a collection of images for a page, a subdirectory should be made under images/ to group the images together.

### OpenGraph image

The site's OpenGraph image (`static/images/og-image.png`) is generated from the HTML template at `assets/social-card.html`. To regenerate it after making changes:

```
./bin/generate-og-image
```

This requires Playwright. If you haven't used it before, you may need to install the browser first:

```
npx playwright install chromium
```



## QR code aliases

To simplfy QR codes, create a short alias in the yaml header prefixed with `qr-`, for exxample:

```
url: '/fosdem/community-dinner.html'
aliases: '/qr-fd'
```

and link the QR code to this alias, which results in a much simpler QR.

Example QR generation:

```
qrencode -d 600 "https://perlfoundation.org/qr-fd" -o fosdem-community-dinner-qr.png
```

In this case, 600 dpi is used as the code might also be printed.




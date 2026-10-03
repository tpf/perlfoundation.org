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
- `layouts/partials/` — shared `header.html`, `footer.html`, `head.html`, and
  `structured-data.html` (the page's JSON-LD graph; `board-people.html` adds a
  schema.org `Person` per board member on the board page).
- `layouts/shortcodes/` — the sponsor shortcodes used by the sponsor pages.
- `static/css/custom.css` — all styling (dark theme, design tokens at `:root`).

## Board members

Board members live in the front matter of `content/the-board.md` as a
`members:` list; the page body is just the intro text above the cards. Each
entry renders one card on the board page and one schema.org `Person` in the
page's JSON-LD. Only `name` and `photo` are required; the build fails
if a member has no `photo`.

```yaml
members:
  - name: 'Ruth Holloway'
    role: 'Co-treasurer'            # badge on the photo; "President" is coral
    photo: 'images/headshots/ruth-holloway.jpg'
    appointed: 'January 2024'
    email: 'treasurer@perlfoundation.org'
    seat_sponsor:
      name: 'Hart Woods Group, LLC'
      url: 'https://example.com/'   # optional; links the sponsor name
    profiles:                       # the person's own public profiles:
      - label: 'Mastodon'           # rendered with rel="me", JSON-LD sameAs
        url: 'https://hachyderm.io/@geekruthie'
    companies:                      # organizations they work for/own:
      - label: 'Example Co'         # JSON-LD worksFor
        url: 'https://example.com/'
    bio: |
      First paragraph, always shown.

      Further paragraphs (separated by a blank line) collapse behind
      "Read more". Markdown is allowed.
```

Put a URL under `profiles` only if it represents the person themselves
(personal site, GitHub, Mastodon, …); a company's site goes under `companies`.

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




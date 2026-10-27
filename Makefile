# Makefile for perlfoundation.org (Hugo site)

HUGO ?= hugo
# SEARCH=1 (default) builds the Pagefind search index after Hugo; SEARCH=0 skips
# it for a faster Hugo-only build. The Pagefind version is pinned in package.json
# / package-lock.json (installed with integrity checks via `npm ci`), so there is
# no version string to keep in sync here.
SEARCH ?= 1

# e2e tests run Playwright against a freshly built site (the config's webServer
# builds Hugo + Pagefind and serves public/). PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
# keeps `npm ci` from downloading a browser: the pinned @playwright/test build
# is expected to be in the shared browser cache. On a fresh machine, run
# `make e2e-browser` once first to install it.
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD ?= 1

# `make` with no target prints this help menu rather than building anything.
.DEFAULT_GOAL := help

.PHONY: help
## help: list the available targets
help:
	@echo "Usage: make <target>"
	@echo
	@grep -E '^## ' $(MAKEFILE_LIST) | sed -e 's/^## //' | awk -F ': ' '{ printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2 }'

.PHONY: serve
## serve: run `hugo serve`, binding to the tailnet IP if Tailscale is available
serve:
	@ts_ip=$$(command -v tailscale >/dev/null 2>&1 && tailscale ip -4 2>/dev/null | head -n1); \
	if [ -n "$$ts_ip" ]; then \
		echo "Tailscale detected; binding to $$ts_ip (Hugo picks an open port)"; \
		$(HUGO) serve --bind "$$ts_ip" --baseURL "http://$$ts_ip"; \
	else \
		echo "Tailscale not available; serving on localhost (Hugo picks an open port)"; \
		$(HUGO) serve; \
	fi

.PHONY: build
## build: build the static site into public/ (SEARCH=1 also builds the search index; SEARCH=0 skips)
build:
	$(HUGO) --gc --minify
ifeq ($(SEARCH),1)
	npm ci
	./node_modules/.bin/pagefind --site public
endif

.PHONY: node_modules
## node_modules: install pinned Node deps (Pagefind + Playwright) via npm ci
node_modules:
	npm ci

.PHONY: e2e-browser
## e2e-browser: download the Playwright browser (run once on a fresh machine)
e2e-browser:
	PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD= npx playwright install chromium

.PHONY: test-e2e
## test-e2e: run the Playwright e2e suite (builds + serves the site itself)
test-e2e: node_modules
	npm run test:e2e

.PHONY: test-e2e-ui
## test-e2e-ui: run the e2e suite in Playwright's interactive UI mode
test-e2e-ui: node_modules
	npx playwright test --ui

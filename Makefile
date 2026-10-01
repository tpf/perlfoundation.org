# Makefile for perlfoundation.org (Hugo site)

HUGO ?= hugo
# SEARCH=1 (default) builds the Pagefind search index after Hugo; SEARCH=0 skips
# it for a faster Hugo-only build. The Pagefind version is pinned in package.json
# / package-lock.json (installed with integrity checks via `npm ci`), so there is
# no version string to keep in sync here.
SEARCH ?= 1

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

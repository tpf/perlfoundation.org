# Makefile for perlfoundation.org (Hugo site)

HUGO ?= hugo

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
## build: build the static site into public/
build:
	$(HUGO) --gc --minify

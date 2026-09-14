# Makefile for perlfoundation.org (Hugo site)

HUGO ?= hugo
THEME := themes/blowfish

.PHONY: init
## init: ensure the blowfish theme submodule is checked out
init:
	@if [ ! -f "$(THEME)/theme.toml" ]; then \
		echo "Initializing $(THEME) submodule..."; \
		git submodule update --init --recursive "$(THEME)"; \
	else \
		echo "$(THEME) already initialized."; \
	fi

.PHONY: serve
## serve: run `hugo serve`, binding to the tailnet IP if Tailscale is available
serve: init
	@ts_ip=$$(command -v tailscale >/dev/null 2>&1 && tailscale ip -4 2>/dev/null | head -n1); \
	if [ -n "$$ts_ip" ]; then \
		echo "Tailscale detected; binding to $$ts_ip (Hugo picks an open port)"; \
		$(HUGO) serve --bind "$$ts_ip" --baseURL "http://$$ts_ip"; \
	else \
		echo "Tailscale not available; serving on localhost (Hugo picks an open port)"; \
		$(HUGO) serve; \
	fi

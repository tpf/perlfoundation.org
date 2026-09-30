// perlfoundation.org — header interactions (2026 redesign)
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {
    var header = document.querySelector('.site-header');

    // ---- Desktop nav: each item is a real link to its section landing page
    // (works with no JS). We enhance it into a disclosure: hover previews the
    // section; activating (click / Enter / Space) opens it and moves focus into
    // the panel. We do NOT open on plain focus, so keyboard users can Tab across
    // all nav items and reach every control. ----
    if (header) {
      var bar = header.querySelector('.site-header__bar');
      var mega = header.querySelector('#megamenu');
      var navItems = header.querySelectorAll('.site-header__navitem');
      var cols = mega ? mega.querySelectorAll('.megamenu__col') : [];
      var activeNavItem = null;

      function closeMenu(restoreFocus) {
        header.classList.remove('is-open');
        navItems.forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
        cols.forEach(function (c) { c.classList.remove('is-shown'); });
        if (restoreFocus && activeNavItem) { activeNavItem.focus(); }
        activeNavItem = null;
      }

      function openSection(section) {
        var btn = header.querySelector('.site-header__navitem[data-section="' + section + '"]');
        var col = mega && mega.querySelector('.megamenu__col[data-section="' + section + '"]');
        if (!btn || !col) { return; }
        cols.forEach(function (c) { c.classList.toggle('is-shown', c === col); });
        navItems.forEach(function (b) { b.setAttribute('aria-expanded', String(b === btn)); });
        header.classList.add('is-open');
        activeNavItem = btn;
        // Drop the panel under the engaged button, clamped to the header width.
        var maxLeft = header.offsetWidth - mega.offsetWidth;
        mega.style.left = Math.max(0, Math.min(btn.offsetLeft, maxLeft)) + 'px';
      }

      function focusFirstInColumn(section) {
        var col = mega && mega.querySelector('.megamenu__col[data-section="' + section + '"]');
        var link = col && col.querySelector('a[href]');
        if (link) { link.focus(); }
      }

      navItems.forEach(function (item) {
        var section = item.getAttribute('data-section');
        item.addEventListener('mouseenter', function () { openSection(section); });
        item.addEventListener('click', function (e) {
          e.preventDefault();
          if (header.classList.contains('is-open') && item.getAttribute('aria-expanded') === 'true') {
            closeMenu(false);
          } else {
            openSection(section);
            focusFirstInColumn(section);
          }
        });
      });

      // The panel lives inside the bar, so leaving the whole cluster closes it;
      // moving from a button down into the panel does not.
      if (bar) {
        bar.addEventListener('mouseleave', function () {
          if (!header.contains(document.activeElement)) { closeMenu(false); }
        });
      }
      header.addEventListener('focusout', function (e) {
        if (!header.contains(e.relatedTarget)) { closeMenu(false); }
      });
      document.addEventListener('keydown', function (e) {
        // Escape closes; if focus is inside the panel, return it to the trigger.
        if (e.key === 'Escape' && header.classList.contains('is-open')) {
          closeMenu(header.contains(document.activeElement));
        }
      });
      document.addEventListener('click', function (e) {
        if (!header.contains(e.target)) { closeMenu(false); }
      });
    }

    // ---- Board member "Read more" bios ----
    // The <details>/<summary> shows and hides natively (works with no JS); we
    // only relabel the summary as it toggles. The +/− marker is CSS.
    var bioDetails = document.querySelectorAll('.board-card__moredetails');
    bioDetails.forEach(function (d) {
      var summary = d.querySelector('summary');
      if (!summary) { return; }
      d.addEventListener('toggle', function () {
        summary.textContent = d.open ? 'Show less' : 'Read more';
      });
    });

    // ---- Mobile menu toggle ----
    var toggle = document.querySelector('.site-header__toggle');
    var mobileMenu = document.querySelector('#mobile-menu');
    if (toggle && mobileMenu) {
      function closeMobile(restoreFocus) {
        mobileMenu.setAttribute('hidden', '');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Menu';
        if (restoreFocus) { toggle.focus(); }
      }
      function openMobile() {
        mobileMenu.removeAttribute('hidden');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.textContent = 'Close';
      }
      toggle.addEventListener('click', function () {
        if (mobileMenu.hasAttribute('hidden')) { openMobile(); } else { closeMobile(false); }
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !mobileMenu.hasAttribute('hidden')) { closeMobile(true); }
      });
      document.addEventListener('click', function (e) {
        if (mobileMenu.hasAttribute('hidden') || toggle.contains(e.target)) { return; }
        if (!mobileMenu.contains(e.target)) { closeMobile(false); }
      });
    }

    // ---- Site search (Pagefind, lazy-loaded into a modal on first open) ----
    var searchTriggers = document.querySelectorAll('.site-header__search');
    var searchModal = document.getElementById('site-search');
    if (searchTriggers.length && searchModal) {
      var searchLoaded = false;
      var lastTrigger = null;

      function focusSearchInput() {
        var input = searchModal.querySelector('input');
        if (input) { input.focus(); }
      }

      function loadPagefind() {
        if (searchLoaded) { focusSearchInput(); return; }
        searchLoaded = true;
        var css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = '/pagefind/pagefind-ui.css';
        document.head.appendChild(css);
        var js = document.createElement('script');
        js.src = '/pagefind/pagefind-ui.js';
        js.onload = function () {
          /* global PagefindUI */
          new PagefindUI({ element: '#search', showSubResults: true, showImages: false });
          focusSearchInput();
        };
        js.onerror = function () {
          document.getElementById('search').innerHTML =
            '<p class="site-search__error">Search isn’t available on this build yet.</p>';
        };
        document.body.appendChild(js);
      }

      function openSearch(trigger) {
        lastTrigger = trigger || null;
        searchModal.classList.add('is-open');
        searchModal.setAttribute('aria-hidden', 'false');
        searchTriggers.forEach(function (b) { b.setAttribute('aria-expanded', 'true'); });
        document.documentElement.style.overflow = 'hidden';
        // Move focus into the dialog synchronously (the panel is tabindex="-1"),
        // so focus is trapped from the outset; Pagefind moves it to the input
        // once its async script finishes loading.
        var panel = searchModal.querySelector('.site-search__panel');
        if (panel) { panel.focus(); }
        loadPagefind();
      }

      function closeSearch() {
        searchModal.classList.remove('is-open');
        searchModal.setAttribute('aria-hidden', 'true');
        searchTriggers.forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
        document.documentElement.style.overflow = '';
        if (lastTrigger) { lastTrigger.focus(); }
      }

      searchTriggers.forEach(function (btn) {
        btn.addEventListener('click', function () { openSearch(btn); });
      });
      searchModal.querySelectorAll('[data-search-close]').forEach(function (el) {
        el.addEventListener('click', closeSearch);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && searchModal.classList.contains('is-open')) { closeSearch(); }
      });
      // Keep keyboard focus inside the dialog while it is open.
      searchModal.addEventListener('keydown', function (e) {
        if (e.key !== 'Tab') { return; }
        var nodes = searchModal.querySelectorAll('a[href], button, input, [tabindex]:not([tabindex="-1"])');
        var list = Array.prototype.filter.call(nodes, function (el) { return el.offsetParent !== null; });
        if (!list.length) { return; }
        var first = list[0], last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      });
    }
  });
})();

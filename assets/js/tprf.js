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

    // ---- Desktop nav: each button opens ONLY its own section, dropped under
    // that button. Hover, keyboard focus, and click all engage a section so
    // pressing a different button visibly changes what's shown. ----
    if (header) {
      var bar = header.querySelector('.site-header__bar');
      var mega = header.querySelector('#megamenu');
      var navItems = header.querySelectorAll('.site-header__navitem');
      var cols = mega ? mega.querySelectorAll('.megamenu__col') : [];

      function closeMenu() {
        header.classList.remove('is-open');
        navItems.forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
        cols.forEach(function (c) { c.classList.remove('is-shown'); });
      }

      function openSection(section) {
        var btn = header.querySelector('.site-header__navitem[data-section="' + section + '"]');
        var col = mega && mega.querySelector('.megamenu__col[data-section="' + section + '"]');
        if (!btn || !col) { return; }
        cols.forEach(function (c) { c.classList.toggle('is-shown', c === col); });
        navItems.forEach(function (b) { b.setAttribute('aria-expanded', String(b === btn)); });
        header.classList.add('is-open');
        // Drop the panel under the engaged button, clamped to the header width.
        var maxLeft = header.offsetWidth - mega.offsetWidth;
        mega.style.left = Math.max(0, Math.min(btn.offsetLeft, maxLeft)) + 'px';
      }

      navItems.forEach(function (btn) {
        var section = btn.getAttribute('data-section');
        // Pointer and keyboard focus preview the section; click pins/toggles it.
        btn.addEventListener('mouseenter', function () { openSection(section); });
        btn.addEventListener('focus', function () { openSection(section); });
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          if (header.classList.contains('is-open') && btn.getAttribute('aria-expanded') === 'true') {
            closeMenu();
          } else {
            openSection(section);
          }
        });
      });

      // The panel lives inside the bar, so leaving the whole cluster closes it;
      // moving from a button down into the panel does not.
      if (bar) {
        bar.addEventListener('mouseleave', function () {
          if (!header.contains(document.activeElement)) { closeMenu(); }
        });
      }
      header.addEventListener('focusout', function (e) {
        if (!header.contains(e.relatedTarget)) { closeMenu(); }
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { closeMenu(); }
      });
      document.addEventListener('click', function (e) {
        if (!header.contains(e.target)) { closeMenu(); }
      });
    }

    // ---- Board member "Read more" toggles ----
    var bioToggles = document.querySelectorAll('.board-toggle');
    bioToggles.forEach(function (btn) {
      var more = btn.parentNode.querySelector('.board-card__more');
      if (!more) { return; }
      btn.addEventListener('click', function () {
        var isOpen = !more.hasAttribute('hidden');
        if (isOpen) {
          more.setAttribute('hidden', '');
          btn.setAttribute('aria-expanded', 'false');
          btn.textContent = '+ Read more';
        } else {
          more.removeAttribute('hidden');
          btn.setAttribute('aria-expanded', 'true');
          btn.textContent = '− Show less';
        }
      });
    });

    // ---- Mobile menu toggle ----
    var toggle = document.querySelector('.site-header__toggle');
    var mobileMenu = document.querySelector('#mobile-menu');
    if (toggle && mobileMenu) {
      toggle.addEventListener('click', function () {
        var isOpen = !mobileMenu.hasAttribute('hidden');
        if (isOpen) {
          mobileMenu.setAttribute('hidden', '');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.textContent = 'Menu';
        } else {
          mobileMenu.removeAttribute('hidden');
          toggle.setAttribute('aria-expanded', 'true');
          toggle.textContent = 'Close';
        }
      });
    }
  });
})();

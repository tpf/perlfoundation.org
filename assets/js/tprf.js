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

    // ---- Desktop mega-menu: click/tap toggles; hover & focus handled by CSS ----
    if (header) {
      var navItems = header.querySelectorAll('.site-header__navitem');
      var mega = header.querySelector('#megamenu');

      function setExpanded(state) {
        navItems.forEach(function (b) { b.setAttribute('aria-expanded', String(state)); });
      }
      function openMenu() { header.classList.add('is-open'); setExpanded(true); }
      function closeMenu() { header.classList.remove('is-open'); setExpanded(false); }

      navItems.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          if (header.classList.contains('is-open')) { closeMenu(); } else { openMenu(); }
        });
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { closeMenu(); }
      });
      document.addEventListener('click', function (e) {
        if (mega && !header.contains(e.target)) { closeMenu(); }
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

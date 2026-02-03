// Dropdown menu keyboard and touch accessibility
(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropdowns);
  } else {
    initDropdowns();
  }

  function initDropdowns() {
    const dropdownTriggers = document.querySelectorAll('.nested-menu');

    dropdownTriggers.forEach(trigger => {
      const dropdownContainer = trigger.nextElementSibling;

      if (!dropdownContainer || !dropdownContainer.classList.contains('menuhide')) {
        return;
      }

      const menuItems = dropdownContainer.querySelectorAll('a');

      // Toggle dropdown on click/tap
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleDropdown(trigger, menuItems);
      });

      // Keyboard support for trigger
      trigger.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleDropdown(trigger, menuItems);
        } else if (e.key === 'Escape') {
          closeDropdown(trigger);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          openDropdown(trigger);
          // Focus first menu item
          if (menuItems.length > 0) {
            menuItems[0].focus();
          }
        }
      });

      // Add keyboard navigation for menu items
      menuItems.forEach((item, index) => {
        item.addEventListener('keydown', function(e) {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (index + 1) % menuItems.length;
            menuItems[nextIndex].focus();
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = (index - 1 + menuItems.length) % menuItems.length;
            menuItems[prevIndex].focus();
          } else if (e.key === 'Escape') {
            e.preventDefault();
            closeDropdown(trigger);
            trigger.focus();
          } else if (e.key === 'Tab') {
            // Allow normal tab behavior, but close dropdown when tabbing out
            if (!e.shiftKey && index === menuItems.length - 1) {
              closeDropdown(trigger);
            } else if (e.shiftKey && index === 0) {
              closeDropdown(trigger);
            }
          }
        });
      });

      // Keep dropdown open when hovering over it
      dropdownContainer.addEventListener('mouseenter', function() {
        trigger.classList.add('dropdown-hover');
      });

      dropdownContainer.addEventListener('mouseleave', function() {
        trigger.classList.remove('dropdown-hover');
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', function(e) {
        if (!trigger.contains(e.target) && !dropdownContainer.contains(e.target)) {
          closeDropdown(trigger);
        }
      });

      // Close dropdown on Escape key globally
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          closeDropdown(trigger);
        }
      });
    });
  }

  function toggleDropdown(trigger, menuItems) {
    const isOpen = trigger.classList.contains('is-open');

    if (isOpen) {
      closeDropdown(trigger);
    } else {
      openDropdown(trigger);
      // Focus first menu item when opened via keyboard
      if (document.activeElement === trigger && menuItems && menuItems.length > 0) {
        setTimeout(function() {
          menuItems[0].focus();
        }, 100);
      }
    }
  }

  function openDropdown(trigger) {
    // Close all other dropdowns first
    document.querySelectorAll('.nested-menu.is-open').forEach(otherTrigger => {
      if (otherTrigger !== trigger) {
        closeDropdown(otherTrigger);
      }
    });

    trigger.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown(trigger) {
    trigger.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
  }
})();

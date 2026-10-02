const { test, expect } = require('@playwright/test');

// The mobile header (wordmark + search/Donate/Menu) needs ~383px; below 375px
// the wordmark is hidden so nothing pushes the page wider than the viewport.
test.describe('Narrow viewports', () => {
  for (const width of [320, 375]) {
    test(`no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(width);
      await expect(page.locator('.site-header__toggle')).toBeInViewport({ ratio: 1 });
    });
  }
});

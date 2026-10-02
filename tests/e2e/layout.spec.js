const { test, expect } = require('@playwright/test');

// The mobile header's wordmark + search/Donate/Menu stop fitting below ~367px
// and pushed the Menu button off-screen; the wordmark is hidden below 375px.
const wordmark = '.site-header__brand--m .site-header__wordmark';

test.describe('Narrow viewports', () => {
  for (const path of ['/', '/the-board.html', '/cpan-licensing-guidelines.html']) {
    for (const width of [320, 366, 374]) {
      test(`no horizontal overflow on ${path} at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 800 });
        await page.goto(path);
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        expect(scrollWidth).toBeLessThanOrEqual(width);
        await expect(page.locator('.site-header__toggle')).toBeInViewport({ ratio: 1 });
      });
    }
  }

  test('mobile wordmark is hidden at 374px and shown at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 374, height: 800 });
    await page.goto('/');
    await expect(page.locator(wordmark)).toBeHidden();
    await page.setViewportSize({ width: 375, height: 800 });
    await expect(page.locator(wordmark)).toBeVisible();
  });
});

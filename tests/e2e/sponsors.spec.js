const { test, expect } = require('@playwright/test');

test.describe('Sponsors page', () => {
  test('first in-kind card is Aikido with a loaded logo and link', async ({ page }) => {
    await page.goto('/our-sponsors.html');
    const card = page.locator('.in-kind-sponsor').first();
    const logo = card.locator('img');

    await expect(logo).toHaveAttribute('alt', 'Aikido');
    await expect(card.locator('a')).toHaveAttribute('href', 'https://www.aikido.dev/');
    // The logo is loading="lazy": it only fetches once scrolled near the viewport.
    await logo.scrollIntoViewIfNeeded();
    await expect.poll(() => logo.evaluate((img) => img.naturalWidth)).toBeGreaterThan(0);
  });
});

const { test, expect } = require('@playwright/test');

test.describe('Sponsors page', () => {
  test('Aikido in-kind card links its logo and name to aikido.dev', async ({ page }) => {
    await page.goto('/our-sponsors.html');
    const card = page.locator('.in-kind-sponsor').filter({ has: page.getByRole('img', { name: 'Aikido' }) });
    const logo = card.locator('img');

    await expect(logo).toHaveAttribute('alt', 'Aikido');
    await expect(card.locator('.sponsor-logo-container a')).toHaveAttribute('href', 'https://www.aikido.dev/');
    const nameLink = card.locator('.sponsor-description a');
    await expect(nameLink).toHaveAttribute('href', 'https://www.aikido.dev/');
    await expect(nameLink).toHaveText('Aikido');
    // The logo is loading="lazy": it only fetches once scrolled near the viewport.
    await logo.scrollIntoViewIfNeeded();
    await expect.poll(() => logo.evaluate((img) => img.naturalWidth)).toBeGreaterThan(0);
  });
});

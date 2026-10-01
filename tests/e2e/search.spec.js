const { test, expect } = require('@playwright/test');

// Site search modal — the focus race and Escape behavior from review pass 2.
test.describe('Site search modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('opening search moves focus into the dialog synchronously', async ({ page }) => {
    await page.locator('.site-header__search').first().click();
    await expect(page.locator('#site-search')).toHaveClass(/is-open/);

    // Focus lands in the panel immediately — it does not wait for Pagefind to
    // load and steal it (the race the tabindex="-1" panel fix closed).
    const focusInPanel = await page.evaluate(() => {
      const panel = document.querySelector('.site-search__panel');
      return panel.contains(document.activeElement);
    });
    expect(focusInPanel).toBe(true);
  });

  test('Pagefind UI loads and exposes a search input', async ({ page }) => {
    await page.locator('.site-header__search').first().click();
    await expect(page.locator('#search input')).toBeVisible({ timeout: 15000 });
  });

  test('Escape closes search and restores focus to the trigger', async ({ page }) => {
    const trigger = page.locator('.site-header__search').first();
    await trigger.click();
    await expect(page.locator('#site-search')).toHaveClass(/is-open/);

    await page.keyboard.press('Escape');
    await expect(page.locator('#site-search')).not.toHaveClass(/is-open/);
    await expect(trigger).toBeFocused();
  });
});

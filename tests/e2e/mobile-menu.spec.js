const { test, expect } = require('@playwright/test');

// Mobile menu — Escape / outside-click close and focus restoration (pass 2).
// Run these against a phone-sized viewport where the mobile bar is visible.
test.use({ viewport: { width: 390, height: 780 } });

test.describe('Mobile menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('toggle opens and closes the menu', async ({ page }) => {
    const toggle = page.locator('.site-header__toggle');
    const menu = page.locator('#mobile-menu');

    await expect(menu).toBeHidden();
    await toggle.click();
    await expect(menu).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await toggle.click();
    await expect(menu).toBeHidden();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('Escape closes the menu and restores focus to the toggle', async ({ page }) => {
    const toggle = page.locator('.site-header__toggle');
    const menu = page.locator('#mobile-menu');

    await toggle.click();
    await expect(menu).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(toggle).toBeFocused();
  });

  test('clicking outside closes the menu', async ({ page }) => {
    const toggle = page.locator('.site-header__toggle');
    const menu = page.locator('#mobile-menu');

    await toggle.click();
    await expect(menu).toBeVisible();

    // The menu is in normal flow, so a main-content heading sits below it and
    // is outside the menu (and not the toggle).
    await page.locator('main#main h1, main#main h2').first().click();
    await expect(menu).toBeHidden();
  });
});

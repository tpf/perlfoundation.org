const { test, expect } = require('@playwright/test');

// Desktop mega-menu — the accessibility contract from review pass 2.
test.describe('Desktop mega-menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('top-level nav items are real links (JS-less fallback)', async ({ page }) => {
    const about = page.locator('.site-header__navitem[data-section="about"]');
    await expect(about).toHaveJSProperty('tagName', 'A');
    await expect(about).toHaveAttribute('href', '/about.html');
  });

  test('nav item points aria-controls at its own column, not a shared id', async ({ page }) => {
    const about = page.locator('.site-header__navitem[data-section="about"]');
    await expect(about).toHaveAttribute('aria-controls', 'megamenu-about');
    const hasHaspopup = await about.evaluate((el) => el.hasAttribute('aria-haspopup'));
    expect(hasHaspopup).toBe(false);
  });

  test('focusing a nav item does NOT open the menu (keyboard reachability)', async ({ page }) => {
    const about = page.locator('.site-header__navitem[data-section="about"]');
    await about.focus();
    await expect(about).toBeFocused();
    await expect(page.locator('.site-header')).not.toHaveClass(/is-open/);
  });

  test('activating a nav item opens its section and moves focus into the column', async ({ page }) => {
    const about = page.locator('.site-header__navitem[data-section="about"]');
    await about.focus();
    await page.keyboard.press('Enter');

    await expect(page.locator('.site-header')).toHaveClass(/is-open/);
    await expect(page.locator('#megamenu-about')).toHaveClass(/is-shown/);
    await expect(about).toHaveAttribute('aria-expanded', 'true');

    const focusInColumn = await page.evaluate(() => {
      const col = document.querySelector('#megamenu-about');
      return col.contains(document.activeElement) && document.activeElement.tagName === 'A';
    });
    expect(focusInColumn).toBe(true);
  });

  test('Escape closes the menu and restores focus to the trigger', async ({ page }) => {
    const about = page.locator('.site-header__navitem[data-section="about"]');
    await about.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.site-header')).toHaveClass(/is-open/);

    await page.keyboard.press('Escape');
    await expect(page.locator('.site-header')).not.toHaveClass(/is-open/);
    await expect(about).toBeFocused();
  });

  test('clicking outside closes the menu', async ({ page }) => {
    const about = page.locator('.site-header__navitem[data-section="about"]');
    // Open via keyboard: a real mouse click would hover-open then toggle shut.
    await about.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.site-header')).toHaveClass(/is-open/);

    // A heading in the main content is outside the header and not a link.
    await page.locator('main#main h1, main#main h2').first().click();
    await expect(page.locator('.site-header')).not.toHaveClass(/is-open/);
  });
});

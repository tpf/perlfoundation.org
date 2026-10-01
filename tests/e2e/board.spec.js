const { test, expect } = require('@playwright/test');

// Board member bios collapse behind a native <details>/<summary> so they work
// with no JS; tprf.js only relabels the summary (review pass 2).
test.describe('Board member bios', () => {
  test('bios are a native <details> disclosure that toggles and relabels', async ({ page }) => {
    await page.goto('/the-board.html');

    const details = page.locator('.board-card__moredetails').first();
    const summary = details.locator('summary');

    await expect(details).toHaveJSProperty('open', false);
    await expect(summary).toHaveText('Read more');

    await summary.click();
    await expect(details).toHaveJSProperty('open', true);
    await expect(summary).toHaveText('Show less');

    await summary.click();
    await expect(details).toHaveJSProperty('open', false);
    await expect(summary).toHaveText('Read more');
  });
});

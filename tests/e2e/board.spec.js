const { test, expect } = require('@playwright/test');

// Board member bios collapse behind a native <details>/<summary> so they work
// with no JS; tprf.js only relabels the summary (review pass 2).
test.describe('Board page', () => {
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

  test('JSON-LD has one Person per board card, anchored to the card', async ({ page }) => {
    await page.goto('/the-board.html');

    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(blocks).toHaveLength(1);
    const graph = JSON.parse(blocks[0])['@graph'];
    const orgId = graph.find((n) => n['@type'] === 'Organization')['@id'];
    const people = graph.filter((n) => n['@type'] === 'Person');

    await expect(page.locator('.board-card')).toHaveCount(people.length);
    for (const person of people) {
      expect(person.memberOf['@id']).toBe(orgId);
      const anchor = new URL(person['@id']).hash;
      await expect(page.locator(`article.board-card${anchor}`)).toBeVisible();
    }
  });

  test('profile links are rel="me" and name their member for screen readers', async ({ page }) => {
    await page.goto('/the-board.html');

    const card = page.locator('#ruth-holloway');
    const link = card.getByRole('link', { name: 'Ruth Holloway: Mastodon' });
    await expect(link).toHaveAttribute('rel', 'me');
    await expect(card.getByRole('list', { name: 'Ruth Holloway: profiles' }).getByRole('listitem')).toHaveCount(5);
  });
});

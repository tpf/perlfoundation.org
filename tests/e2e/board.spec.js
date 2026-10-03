const { test, expect } = require('@playwright/test');

test.describe('Board page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/the-board.html');
  });

  // Bios collapse behind a native <details>/<summary> so they work with no JS;
  // tprf.js only relabels the summary (review pass 2).
  test('bios are a native <details> disclosure that toggles and relabels', async ({ page }) => {
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
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(blocks).toHaveLength(1);
    const graph = JSON.parse(blocks[0])['@graph'];
    const orgId = graph.find((n) => n['@type'] === 'Organization')['@id'];
    const people = graph.filter((n) => n['@type'] === 'Person');

    await expect(page.locator('.board-card')).toHaveCount(people.length);
    for (const person of people) {
      expect(person.memberOf['@id']).toBe(orgId);
      expect(person.url).toBe(person['@id']);
      // Plain text: no markup, entities or hard line breaks from the Markdown.
      expect(person.description).toMatch(/^[^<&\n]+$/);
      const anchor = new URL(person['@id']).hash;
      const card = page.locator(`article.board-card${anchor}`);
      await expect(card).toBeVisible();
      // The card heading names the member, so the headshot is decorative.
      await expect(card.locator('img')).toHaveAttribute('alt', '');
    }
  });

  test('profile and company links match the JSON-LD and name their member', async ({ page }) => {
    const graph = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent())['@graph'];
    const people = graph.filter((n) => n['@type'] === 'Person');
    // Guard against a vacuous pass if no member has profile links.
    expect(people.some((p) => p.sameAs?.length)).toBe(true);

    for (const person of people) {
      const card = page.locator(new URL(person['@id']).hash);
      const prefix = new RegExp(`^${person.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}: `);

      // Profiles: one rel="me" link per sameAs URL, in a list named for the member.
      const profiles = card.locator('a[rel~="me"]');
      await expect(profiles).toHaveCount(person.sameAs?.length ?? 0);
      if (person.sameAs) {
        await expect(card.getByRole('list', { name: `${person.name}: profiles` }).getByRole('listitem'))
          .toHaveCount(person.sameAs.length);
      }

      // Companies: one link per worksFor org, never rel="me" (not the person).
      const companies = card.locator('.board-card__companies a');
      await expect(companies).toHaveCount(person.worksFor?.length ?? 0);
      await expect(card.locator('.board-card__companies a[rel~="me"]')).toHaveCount(0);
      if (person.worksFor) {
        await expect(card.locator('.board-card__companies').getByRole('list', { name: 'Companies:' })).toBeVisible();
      }

      for (const link of [...await profiles.all(), ...await companies.all()]) {
        await expect(link).toHaveAccessibleName(prefix);
      }
    }
  });
});

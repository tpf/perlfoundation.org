const { test, expect } = require('@playwright/test');

test('robots.txt allows crawling and points at an absolute sitemap', async ({ request }) => {
  const res = await request.get('/robots.txt');
  expect(res.ok()).toBe(true);
  const body = await res.text();
  expect(body).toMatch(/^User-agent: \*$/m);
  expect(body).toMatch(/^Allow: \/$/m);
  expect(body).toMatch(/^Sitemap: https?:\/\/\S+\/sitemap\.xml$/m);
});

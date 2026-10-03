// Playwright config for the perlfoundation.org e2e suite.
//
// The site is a static Hugo build and search is a Pagefind index that only
// exists after a build, so the webServer builds the site (Hugo + Pagefind) and
// serves public/ over plain HTTP. Tests assume dependencies are already
// installed (node_modules present); they do NOT run `npm ci` here.
const { defineConfig, devices } = require('@playwright/test');

const PORT = Number(process.env.E2E_PORT) || 4173;
const BASE_URL = `http://localhost:${PORT}`;

module.exports = defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI
    ? [['github'], ['list'], ['html', { open: 'never' }]]
    : 'list',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: `hugo --gc --minify --baseURL ${BASE_URL}/ && ./node_modules/.bin/pagefind --site public && cd public && python3 -m http.server ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});

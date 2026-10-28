import fs from 'node:fs';
import { defineConfig } from '@playwright/test';

const hasChrome = fs.existsSync('/Applications/Google Chrome.app');

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 45000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:4174',
    headless: true,
    channel: hasChrome ? 'chrome' : undefined,
  },
  projects: [
    {
      name: 'Mobile (375x812)',
      use: {
        viewport: { width: 375, height: 812 },
        isMobile: true,
      },
    },
    {
      name: 'Desktop (1280x800)',
      use: {
        viewport: { width: 1280, height: 800 },
      },
    },
  ],
  webServer: {
    command: 'npm run preview -- --port 4174',
    url: 'http://localhost:4174/Mult-metro-sem-Mist-rio/#/',
    reuseExistingServer: false,
    timeout: 20000,
  },
});

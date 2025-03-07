require('dotenv').config(); // Load environment variables
const { defineConfig } = require('@playwright/test');
const path = require('path');

console.log("Loaded User Email:", process.env.USER_EMAIL || " NOT SET");
console.log("Loaded User Password:", process.env.USER_PASSWORD ? "********" : " NOT SET");

if (!process.env.USER_EMAIL || !process.env.USER_PASSWORD) {
  throw new Error("ERROR: Missing USER_EMAIL or USER_PASSWORD in .env file!");
}

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',  
    trace: 'on-first-retry',  
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
});


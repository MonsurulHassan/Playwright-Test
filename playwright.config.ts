import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

const envArg = process.env.ENV || "local";
let envFile = "credentials.env";
if (envArg === "stage") envFile = "credentials.stage.env";
else if (envArg === "test1") envFile = "credentials.test1.env";
else if (envArg === "test2") envFile = "credentials.test2.env";
dotenv.config({ path: path.resolve(__dirname, envFile) });

export default defineConfig({
  testDir: './src/tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: process.env.REPORTING_WORKSPACE_BASE_URL,
    httpCredentials:
      process.env.REPORTING_WORKSPACE_ADMIN_EMAIL &&
      process.env.REPORTING_WORKSPACE_ADMIN_PASSWORD
        ? {
            username: process.env.REPORTING_WORKSPACE_ADMIN_EMAIL,
            password: process.env.REPORTING_WORKSPACE_ADMIN_PASSWORD,
          }
        : undefined,
    trace: "on-first-retry",
    testIdAttribute: "data-test-element-id",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: false,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "Auth Setup",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: /.*\.setup\.ts/,
      dependencies: ["Auth Setup"],
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

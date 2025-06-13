import * as dotenv from 'dotenv';
import { test as base, expect } from '@playwright/test';

// Load environment variables from the appropriate .env file
const envFile = process.env.ENV === 'stage' ? '../credentials.stage.env' : '../credentials.env';
dotenv.config({ path: require('path').resolve(__dirname, envFile) });

export const adminCredentials = {
  email: process.env.REPORTING_WORKSPACE_ADMIN_EMAIL as string,
  password: process.env.REPORTING_WORKSPACE_ADMIN_PASSWORD as string,
  baseUrl: process.env.REPORTING_WORKSPACE_BASE_URL as string,
};

export const regularCredentials = {
  email: process.env.REPORTING_REGULAR_MEMBER_EMAIL as string,
  password: process.env.REPORTING_REGULAR_MEMBER_PASSWORD as string,
  baseUrl: process.env.REPORTING_WORKSPACE_BASE_URL as string,
};

export const community = {
  key: process.env.REPORTING_COMMUNITY_KEY as string,
  name: process.env.REPORTING_COMMUNITY_NAME as string,
};

// Example usage in a test
// import { adminCredentials, regularCredentials } from './auth.setup';
// await page.goto(adminCredentials.baseUrl);
// await page.fill('input[name="email"]', adminCredentials.email);
// await page.fill('input[name="password"]', adminCredentials.password);
// await page.click('button[type="submit"]');
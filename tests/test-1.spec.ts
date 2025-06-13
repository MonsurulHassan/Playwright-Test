import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login-page';
import dotenv from 'dotenv'; 
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../credentials/.env.local')
})


test('ideascale', async ({ page }) => {
  if (!process.env.REPORTING_WORKSPACE_BASE_URL) {
    throw new Error('REPORTING_WORKSPACE_BASE_URL is not defined in environment variables.');
  }
  await page.goto(process.env.REPORTING_WORKSPACE_BASE_URL);
  await page.getByRole('button', { name: 'Accept' }).click();
  await page.getByRole('button', { name: 'Log in' }).click();
  
  const loginPage = new LoginPage(page);
  expect(await loginPage.isAtPage()).toBe(true);

  // await page.getByRole('textbox', { name: 'Email' }).fill('monsurul.hassan@ideascale.com');
  // await page.getByRole('textbox', { name: 'Password' }).click();
  // await page.getByRole('textbox', { name: 'Password' }).fill('brewski02');
  // await page.getByRole('button', { name: 'Log in' }).click();
  // await expect(page.locator('h1')).toContainText('CA Test Workspace');
}); 

test('environment', async ({ page }) => {
  console.log('EMAIL:', process.env.REPORTING_WORKSPACE_ADMIN_EMAIL);

  // await page.getByRole('textbox', { name: 'Email' }).fill('monsurul.hassan@ideascale.com');
  // await page.getByRole('textbox', { name: 'Password' }).click();
  // await page.getByRole('textbox', { name: 'Password' }).fill('brewski02');
  // await page.getByRole('button', { name: 'Log in' }).click();
  // await expect(page.locator('h1')).toContainText('CA Test Workspace');
});



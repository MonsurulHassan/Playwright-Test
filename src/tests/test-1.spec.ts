import { test, expect } from '@playwright/test';

testt('test', async ({ page }) => {
  await page.goto('https://ca-test.ideascale.ca/c/');
  await page.getByRole('button', { name: 'Accept' }).click();
  await page.getByTestId('login-link').click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('monsurul.hassan@ideascale.com');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('brewski01');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('button', { name: 'Show Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('brewski02');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('button', { name: 'Apps' }).click();
  await page.getByText('Manage WorkspaceReportingReporting (Sunsetting Soon)Member ManagementIdeaScale').click();
  await page.getByRole('menuitem', { name: 'Manage Workspace' }).click();
  await page.getByRole('link', { name: 'Terms Of Service' }).click();
  await page.locator('section').filter({ hasText: 'Terms Of Service If you' }).locator('i').click();
  await page.locator('button[name="updateTosSettings"]').click();
});
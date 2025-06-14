import { LoginPage } from "../pages/login-page";
import { Page, test as setup } from "@playwright/test";
import * as dotenv from "dotenv";
import * as path from "node:path";

const envArg = process.env.ENV || 'local';
let envFile = 'credentials.env';
if (envArg === 'stage') envFile = 'credentials.stage.env';
else if (envArg === 'test1') envFile = 'credentials.test1.env';
else if (envArg === 'test2') envFile = 'credentials.test2.env';
dotenv.config({ path: path.resolve(__dirname, envFile) });

async function authenticateAndSaveStorage(
  page: Page,
  email: string,
  password: string,
  storageFilePath: string
): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.goTo();
  await loginPage.login(email, password);
  await page.locator("[data-test-element-id='workspace-home']").waitFor({ state: "visible" });
  await page.context().storageState({ path: storageFilePath });
}

setup("authenticate workspace admin", async ({ page }) => {
  await authenticateAndSaveStorage(
    page,
    process.env["REPORTING_WORKSPACE_ADMIN_EMAIL"]!,
    process.env["REPORTING_WORKSPACE_ADMIN_PASSWORD"]!,
    ".auth/workspace-admin.json"
  );
});

setup("authenticate workspace regular member", async ({ page }) => {
  await authenticateAndSaveStorage(
    page,
    process.env["REPORTING_REGULAR_MEMBER_EMAIL"]!,
    process.env["REPORTING_REGULAR_MEMBER_PASSWORD"]!,
    ".auth/regular-member.json"
  );
});
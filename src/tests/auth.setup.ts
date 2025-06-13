import { LoginPage } from "../pages/login-page";
import { test as setup } from "@playwright/test";
import * as dotenv from "dotenv";
import * as path from "node:path";

const envArg = process.env.ENV || 'local';
let envFile = 'credentials.env';
if (envArg === 'stage') envFile = 'credentials.stage.env';
else if (envArg === 'test1') envFile = 'credentials.test1.env';
else if (envArg === 'test2') envFile = 'credentials.test2.env';
dotenv.config({ path: path.resolve(__dirname, envFile) });

const workspaceAdminAuthFile = path.join(
  process.cwd(),
  ".auth/workspace-admin.json"
);
const regularMemberAuthFile = path.join(
  process.cwd(),
  ".auth/regular-member.json"
);

setup("authenticate workspace admin user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goTo();
  await loginPage.login(
    process.env["REPORTING_WORKSPACE_ADMIN_EMAIL"]!,
    process.env["REPORTING_WORKSPACE_ADMIN_PASSWORD"]!
  );
  await page.waitForEvent("load");

  await page.context().storageState({ path: ".auth/workspace-admin.json" });
});

setup("authenticate workspace regular member", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goTo();
  await loginPage.login(
    process.env["REPORTING_REGULAR_MEMBER_EMAIL"]!,
    process.env["REPORTING_REGULAR_MEMBER_PASSWORD"]!
  );
  await page.waitForEvent("load");

  await page.context().storageState({ path: ".auth/regular-member.json" });
});
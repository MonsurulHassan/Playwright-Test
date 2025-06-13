import { LoginPage } from "../pages/login-page";
import { test as base } from "@playwright/test";
import * as dotenv from "dotenv";
import * as path from "path";
import { WorkspaceHomePage } from "../pages/workspace-home-page";
import { WorkspaceTermsOfServicePage } from "@page/workspace-terms-of-service-page";

const envArg = process.env.ENV || 'local';
let envFile = 'credentials.env';
if (envArg === 'stage') envFile = 'credentials.stage.env';
else if (envArg === 'test1') envFile = 'credentials.test1.env';
else if (envArg === 'test2') envFile = 'credentials.test2.env';
dotenv.config({ path: path.resolve(__dirname, envFile) });

type PageFixtures = {
  workspaceHomePage: WorkspaceHomePage;
  workspaceTermsOfServicePage: WorkspaceTermsOfServicePage;
};

export const test = base.extend<PageFixtures>({
    workspaceHomePage: async ({ page }, use) => {
        const workspaceHomePage = new WorkspaceHomePage(page);
        await use(workspaceHomePage);
    },

    workspaceTermsOfServicePage: async ({ page }, use) => {
        const workspaceTermsOfServicePage = new WorkspaceTermsOfServicePage(page);
        await use(workspaceTermsOfServicePage);
    },
});
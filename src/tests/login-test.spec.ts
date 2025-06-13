import { expect } from "@playwright/test";
import { test } from "../fixtures/page-fixtures";

test.describe("admin-panel", () => {
    test.use({ storageState: ".auth/workspace-admin.json" });
    test('Login as Workspace Admin', async ({ workspaceHomePage, workspaceTermsOfServicePage }) => {
        await workspaceHomePage.goTo();
        expect(workspaceHomePage.isAtPage()).toBeTruthy();

        await workspaceTermsOfServicePage.goTo();
        expect(workspaceTermsOfServicePage.isAtPage()).toBeTruthy();

        // const workspaceTermsOfServiceSection = await workspaceTermsOfServicePage.getWorkspaceTermsOfServiceSection();
        // workspaceTermsOfServiceSection.enableWorkspaceTermsOfService;
        // await workspaceTermsOfServiceSection.clickSaveButton();
    });
});




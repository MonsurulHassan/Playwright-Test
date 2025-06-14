import { expect } from "@playwright/test";
import { test } from "../fixtures/page-fixtures";
import { WorkspaceHomePage } from "@page/workspace-home-page";
import { WorkspaceTermsOfServicePage } from "@page/workspace-terms-of-service-page";

test.describe("admin-panel", () => {
  test.use({ storageState: ".auth/workspace-admin.json" });
  test('login as workspace admin', async ({ workspaceHomePage }) => {
    await workspaceHomePage.goTo();
    console.log("Workspace Home Page ID:", await workspaceHomePage.getCurrentPageId());
    expect(await workspaceHomePage.isAtPage()).toBeTruthy();
  });

  test.use({ storageState: ".auth/regular-member.json" });
  test('login as workspace regular member', async ({ workspaceHomePage }) => {
    await workspaceHomePage.goTo();
    console.log("Workspace Home Page ID:", await workspaceHomePage.getCurrentPageId());
    expect(await workspaceHomePage.isAtPage()).toBeTruthy();
  });

  test('login as both workspace admin and regular member', async ({ browser }) => {
    // Workspace Admin
    const adminContext = await browser.newContext({
      storageState: '.auth/workspace-admin.json',
    });
    const adminPage = await adminContext.newPage();

    const workspaceHomePageAdmin = new WorkspaceHomePage(adminPage);
    await workspaceHomePageAdmin.goTo();
    expect(workspaceHomePageAdmin.isAtPage()).toBeTruthy();

    const workspaceTOSPageAdmin = new WorkspaceTermsOfServicePage(adminPage);
    await workspaceTOSPageAdmin.goTo();
    expect(workspaceTOSPageAdmin.isAtPage()).toBeTruthy();

    await adminContext.close();

    // Workspace Regular Member
    const memberContext = await browser.newContext({
      storageState: '.auth/regular-member.json',
    });
    const memberPage = await memberContext.newPage();

    const workspaceHomePageMember = new WorkspaceHomePage(memberPage);
    await workspaceHomePageMember.goTo();
    expect(workspaceHomePageMember.isAtPage()).toBeTruthy();

    await memberContext.close();
  });
});

import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class WorkspaceTermsOfServicePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async getPageId(): Promise<string> {
        return "workspace-info";
    }

    async getPageUrl(): Promise<string> {
        return "/a/workspace-admin/basic-settings/global#anchor-settings-global-workspace-tos";
    }  

    async goTo(): Promise<void> {
        await this.page.goto(await this.getPageUrl());
        await this.page.locator("[data-test-element-id='workspace-info']").waitFor({ state: "visible" });
    }
}
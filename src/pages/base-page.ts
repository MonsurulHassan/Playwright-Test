import { Page } from "@playwright/test";

export abstract class BasePage {
    readonly page: Page;

    protected constructor(page: Page) {
        this.page = page;
    }

    abstract getPageId(): Promise<string>;

    abstract getPageUrl(): Promise<string>;;

    async goTo(): Promise<void> {
        this.acceptWorkspaceTermsOfService();
        await this.page.goto(await this.getPageUrl());
    }

    async getCurrentPageId(): Promise<string> {
        const pageId = await this.page.locator("body").getAttribute("data-test-element-id");
        return pageId || "Page ID not found";
    }

    async isAtPage(): Promise<boolean> {
        const currentPageId = await this.getCurrentPageId();
        const expectedPageId = this.getPageId();

        return currentPageId === await expectedPageId;
    }

    protected async acceptCookies(): Promise<void> {
        if (await this.page.locator(".cookie-consent-modal").isVisible()) {
            await this.page.locator('button[data-action-url$="accept"]').click();
        }
    }

    async acceptWorkspaceTermsOfService(): Promise<void> {
        if (await this.page.locator(".membership-tos-accept-content").isVisible()) {
            await this.page.locator(".check-mark").waitFor({ state: "visible" });
            await this.page.locator(".check-mark").check();
            await this.page.getByRole("button", { name: "Confirm" }).waitFor({ state: "visible" });
            await this.page.getByRole("button", { name: "Confirm" }).click();
        }

        // const tosSection = this.page.locator("section:has(#anchor-settings-global-workspace-tos)");
        // const tosSwitch = tosSection.locator("#tos-enabled");
        // if (await tosSwitch.isVisible()) {
        //     await tosSwitch.click();
        //     await this.page.getByRole("button", { name: "Save Changes" }).click();
        // } else {
        //     console.warn("Terms of Service switch not found or not visible.");
        // }
    }
}
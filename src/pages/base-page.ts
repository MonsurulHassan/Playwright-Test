import { Page } from "@playwright/test";

export abstract class BasePage {
    readonly page: Page;

    protected constructor(page: Page) {
        this.page = page;
    }

    abstract getPageId(): Promise<string>;

    abstract getPageUrl(): Promise<string>;

    abstract goTo(): Promise<void>; 

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
        const cookieConsentModal = this.page.locator(".cookie-consent-modal");
        if (await cookieConsentModal.isVisible()) {
            await this.page.getByRole("button", { name: "Accept" }).click();
            await cookieConsentModal.waitFor({ state: "hidden" });
            await this.page.waitForLoadState('networkidle');
        }
    }
}
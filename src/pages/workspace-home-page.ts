import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class WorkspaceHomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async getPageId(): Promise<string> {
    return "workspace-home";
  }

  async getPageUrl(): Promise<string> {
    return "/c";
  }

  async goTo(): Promise<void> {
    await this.page.goto(await this.getPageUrl());
    await this.page.locator("[data-test-element-id='workspace-home']").waitFor({ state: "visible" });
  }
}
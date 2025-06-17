import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class WorkspaceHomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async getPageId(): Promise<string> {
    return "landing-page";
  }

  async getPageUrl(): Promise<string> {
    return "/c";
  }

  async goTo(): Promise<void> {
    await this.page.goto(await this.getPageUrl());
    await this.page.getByTestId("landing-page").waitFor({ state: "visible" });
  }
}
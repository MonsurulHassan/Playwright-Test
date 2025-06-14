import { BasePage } from "./base-page";
import { Locator, Page } from "@playwright/test";
import { WorkspaceTermsOfServiceSection } from "@components/workspace-settings/WorkspaceTermsOfServiceSection";

export class WorkspaceInfoPage extends BasePage {
    private readonly workspaceTermOfServiceSection: Locator;

  constructor(page: Page) {
    super(page);
    this.workspaceTermOfServiceSection = page.locator("section:has(#anchor-settings-global-workspace-tos)");
  }

  async getPageId(): Promise<string> {
    return "workspace-info";
  }

  async getPageUrl(): Promise<string> {
    return "/a/workspace-admin/basic-settings/global";
  }

  async goTo(): Promise<void> {
    await this.page.goto(await this.getPageUrl());
  }

  async getWorkspaceTermsOfServiceSection(): Promise<WorkspaceTermsOfServiceSection> {
    return new WorkspaceTermsOfServiceSection(
        this.page,
        this.workspaceTermOfServiceSection
    );
  }
}


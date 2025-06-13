import { Page } from "@playwright/test";
import { WorkspaceInfoPage } from "./workspace-info-page";

export class WorkspaceTermsOfServicePage extends WorkspaceInfoPage {
    constructor(page: Page) {
        super(page);
    }

    async getPageUrl(): Promise<string> {
        return "/a/workspace-admin/basic-settings/global#anchor-settings-global-workspace-tos";
    }  
}
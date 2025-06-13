import { IdeascaleSwitch, Toggle } from "@components/IdeascaleSwitch";
import { Locator, Page } from "@playwright/test";

export class WorkspaceTermsOfServiceSection {
    private readonly page: Page;
    private readonly section: Locator;

    constructor(page: Page, section: Locator) {
        this.page = page;
        this.section = section
    }

  // async printSection() {
  //   const anchor = this.section.locator('a').first(); // or use '#anchor-settings-global-workspace-tos'

  //   const anchorId = await anchor.getAttribute('id');
  //   console.log('Anchor ID:', anchorId);
  // }

    async enableWorkspaceTermsOfService(): Promise<WorkspaceTermsOfServiceSection> {
    const switchLocator = this.section.locator('#tos-enabled');
    const ideaScaleSwitch = new IdeascaleSwitch(this.page, switchLocator);
    await ideaScaleSwitch.switchState(Toggle.ON);
    return this;
    // const isChecked = await switchLocator.getAttribute('aria-checked');
    // if (isChecked !== 'true') {
    //   await switchLocator.click();
    }

  async clickSaveButton() { 
    const saveButton = this.section.getByRole('button', { name: 'Save Changes' });
    await saveButton.click();
  }
}
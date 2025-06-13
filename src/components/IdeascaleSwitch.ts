import { Page, Locator, expect } from '@playwright/test';

export class IdeascaleSwitch {
  private element: Locator;
  private page: Page;

  constructor(page: Page, element: Locator) {
    this.page = page;
    this.element = element;
  }

  async isTurnedOn(): Promise<boolean> {
    // Assumes aria-checked or checked attribute indicates state
    // const checkbox = this.element.locator('input[type="checkbox"]');
    return await this.element.isChecked();

  }

  async isLegacySwitch(): Promise<boolean> {
    const parentClass = await this.element.locator('..').getAttribute('class');
    return parentClass?.includes('bootstrap-switch-container') ?? false;
  }

  async switchState(toggle: Toggle): Promise<void> {
    if (toggle === Toggle.ON) {
      await this.turnOn();
      await expect(async () => await this.isTurnedOn()).resolves.toBe(true);
    } else if (toggle === Toggle.OFF) {
      await this.turnOff();
      // Handle alert if present
      try {
        // Playwright auto-handles dialogs, but you can listen for them:
        this.page.once('dialog', async dialog => {
          await dialog.accept();
        });
      } catch (e) {
        throw new Error('No alert present to accept.');
      }
      await expect(async () => !(await this.isTurnedOn())).resolves.toBe(true);
    }
  }

  private async turnOn(): Promise<void> {
    if (!(await this.isTurnedOn())) {
      await this.clickSwitch();
    }
  }

  private async turnOff(): Promise<void> {
    if (await this.isTurnedOn()) {
      await this.clickSwitch();
    }
  }

  public async clickSwitch(): Promise<void> {
    if (await this.isLegacySwitch()) {
      await this.element.locator('..').click();
    } else {
      const id = await this.element.getAttribute('id');
      
      const switchLabel = await this.element
        .locator('..')
        .locator(`.ideascale-switch label[for='${id}']`);
      await switchLabel.isVisible() && await switchLabel.isEnabled();
      await switchLabel.click();
    }
  }

  // Utility to get Toggle enum from boolean
  static getToggle(state: boolean): Toggle {
    return state ? Toggle.ON : Toggle.OFF;
  }
}

export enum Toggle {
  ON = 'on',
  OFF = 'off',
}
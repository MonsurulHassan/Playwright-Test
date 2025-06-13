import { BasePage } from "./base-page";
import { Page } from "@playwright/test";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async getPageId(): Promise<string> {
    return "login-page";
  }

  async getPageUrl(): Promise<string> {
    return "/a/workspace/login";
  }

  async goTo(): Promise<void> {
    await this.page.goto(await this.getPageUrl());
  }

  async fillEmail(email: string): Promise<void> {
    const emailField = this.page.getByRole("textbox", { name: "Email" });
    await emailField.click();
    await emailField.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    const passwordField = this.page.getByRole("textbox", { name: "Password" });
    await passwordField.click();
    await passwordField.fill(password);
  }

  async login(email: string, password: string): Promise<void> {
    await this.acceptCookies();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.page.getByRole("button", { name: "Log in" }).click();
  }
}
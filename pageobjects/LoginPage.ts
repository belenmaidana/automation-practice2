import { test, expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  logInButton: Locator;
  signInbutton: Locator;
  userName: Locator;
  password: Locator;
  toVerifyLogin: Locator;
  page: Page;

  constructor(page: Page) {
    this.page = page;
    this.logInButton = page.getByTestId("header-login-button");
    this.signInbutton = page.getByTestId("login-button");
    this.userName = page.getByPlaceholder("Ingresá tu e-mail");
    this.password = page.locator("#login-password");
    this.toVerifyLogin = page.locator("//span[text()='Mi acceso']"); // locator para verificar el login exitoso
  }

  async goTo() {
    await this.page.goto("https://www.naturacosmeticos.com.ar/");
    await this.page.waitForSelector(".ot-sdk-container");
    await this.page.click("#onetrust-accept-btn-handler");
  }

  async validLogin(username: string, password: string) {
    await this.logInButton.click();
    await this.page.waitForLoadState("networkidle");
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.signInbutton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async verifyLogin() {
    await this.page.waitForURL("https://www.naturacosmeticos.com.ar/");
    await expect(this.toVerifyLogin).toContainText("Mi acceso");
    return this.toVerifyLogin;
  }
}

module.exports = { LoginPage };

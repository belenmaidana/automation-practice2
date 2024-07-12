import { test, expect, Locator, Page } from "@playwright/test";

export class FavouritePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addProductToFav(productName2: string) {
    await this.page.locator("//p[text()='MAQUILLAJE']").hover();
    await this.page.getByRole("link", { name: "Labiales" }).click();
    await this.page.waitForLoadState();
    await this.page.getByRole("link", { name: productName2 }).nth(1).click();
    await this.page.locator("(//button[@type='button'])[3]").click();
    await this.page.waitForLoadState();
    await this.page.locator("(//button[@type='button'])[1]").click();
    await this.page.waitForLoadState();
    await expect(
      this.page.getByRole("link", { name: productName2, exact: true })
    ).toHaveText(productName2);
    console.log(
      "Su producto " + productName2 + " ha sido agregado a favoritos"
    );
    await this.page.locator("#favoriteButton").click();
    console.log("Favoritos vaciado correctamente");
  }

  async goTo() {
    await this.page.goto("https://www.naturacosmeticos.com.ar/");
    await this.page.waitForLoadState();
  }
}

module.exports = { FavouritePage };

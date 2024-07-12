import { test, expect, Locator, Page } from "@playwright/test";

export class CartPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addProductToCart(productName: string) {
    await this.page.locator("//p[text()='ROSTRO']").click();
    await this.page.waitForLoadState();
    await this.page.pause();
    await this.page.getByRole("link", { name: productName }).first().click();
    await this.page.waitForLoadState();
    await this.page.locator("//span[text()='Comprar']").click();
  }

  async incrementQty() {
    // VER POR QUE NO TOMA EL VALOR 2 Y SIGUE TOMANDO EL 1   // No usar xpath para seleccionar hijos. usar nth, last, first

   
    await this.page.getByRole("button", { name: "+" }).click();
    await expect(
      this.page.locator("//input[contains(@class,'MuiInputBase-input MuiInput-input')]").last()).toHaveValue("2");
  }

  async checkOut() {
    await expect(
      this.page.locator("//span[text()='Mi carrito']")
    ).toBeVisible();
    const productoAgregado = await this.page
      .locator("//p[text()='Serum rellenador biohidratante']")
      .innerText();
    console.log(
      "Su producto " + productoAgregado + "ha sido agregado al carrito"
    );
    await this.page.locator("//span[text()='Mi carrito']").click();
  }

  async agregarDireccion(
    provincia: string,
    localidad: string,
    codigoPostal: string,
    calle: string,
    numero: string,
    tipoDireccion: string,
    receptor: string,
    telefono: string
  ) {
    await this.page.waitForLoadState();
    await this.page.locator("//button[@data-testid='open-delivery']").click();
    await this.page.waitForLoadState();
    await this.page
      .getByRole("heading", { name: "Añadir nueva dirección" })
      .click();
    await this.page.locator("#react-select-2-placeholder").click();
    await this.page.getByText(provincia, { exact: true }).click();
    await this.page.locator("#react-select-3-input").fill(localidad);
    await this.page
      .getByText("San Miguel (BELLA VISTA)", { exact: true })
      .click();
    await this.page.getByPlaceholder("B3643BAC").fill(codigoPostal);
    await this.page.getByPlaceholder("Ej: Avenida del Libertador").fill(calle);
    await this.page.locator('input[name="houseNumber"]').fill(numero);
    await this.page.getByPlaceholder("Ej: Casa, trabajo").fill(tipoDireccion);
    await this.page.locator('input[name="recipientName"]').fill(receptor);
    await this.page.getByPlaceholder("2345-6789").fill(telefono);
    await this.page.getByLabel("Definir como dirección").check();
    await this.page.pause();
    await this.page
      .getByRole("button", { name: "Guardar modificaciones" })
      .click();
    await this.page.waitForLoadState();
    await this.page
      .locator("a")
      .filter({ hasText: "casaSalguero, 1560 Código" })
      .getByRole("button")
      .nth(1)
      .click();
    await this.page.getByRole("button", { name: "Borrar" }).click();
    await this.page.waitForLoadState();
    await this.page.locator("(//button[@type='button'])[1]").click();
  }

  async emptyCart() {
    await this.page.waitForLoadState();
    await this.page.locator("//button[@data-testid='basket-badge']").click();
    await this.page.waitForLoadState();
    await this.page.locator("//span[text()='Mi carrito']").click();
    await this.page
      .locator(
        "(//div[contains(@class,'MuiGrid-root MuiGrid-item')]//button)[3]"
      )
      .click();
    await this.page.waitForLoadState();
    await expect(
      this.page.locator(
        "//h6[text()='Aún no tenés productos en tu carrito de compras']"
      )
    ).toHaveText("Aún no tenés productos en tu carrito de compras");
    console.log("Carrito vaciado con éxito");
  }
}

module.exports = { CartPage };

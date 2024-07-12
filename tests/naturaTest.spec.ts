import { test, expect } from "@playwright/test";
// const { LoginPage } = require("../pageobjects/LoginPage");
// const { CartPage } = require("../pageobjects/CartPage");
// const { FavouritePage } = require("../pageobjects/FavouritePage");
import { POManager } from "../pageobjects/POManager";

const dataset = JSON.parse(JSON.stringify(require("../utils/testData.json")));


// Hacer log in en la página

test.beforeEach("Login page", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(dataset.usermail, dataset.password);
  await loginPage.verifyLogin();
  await console.log("Login exitoso");
});

// Test Integral

test.skip("Natura Cosmeticos Test integral", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();

  await loginPage.goTo();
  await loginPage.validLogin(dataset.usermail, dataset.password);
  await loginPage.verifyLogin();
  await console.log("Login exitoso");

  const cartPage = poManager.getCartPage();
 
  await cartPage.addProductToCart(dataset.productName);
  //await cartPage.incrementQty();
  await console.log("Producto agregado con éxito");
  await cartPage.checkOut();
  await cartPage.agregarDireccion(
    dataset.provincia,
    dataset.localidad,
    dataset.codigoPostal,
    dataset.calle,
    dataset.numero,
    dataset.tipoDireccion,
    dataset.receptor,
    dataset.telefono
  );
  await cartPage.emptyCart();

  const favouritePage = poManager.getFavouritePage();
  await favouritePage.goTo();
  await favouritePage.addProductToFav(dataset.productName2);
});


// DIVIDIDO EN SECCIONES

// 1 - Agregar producto al carrito

test("Add product to Cart", async ({ page }) => {

  const poManager = new POManager(page);
  const cartPage = poManager.getCartPage();
  await cartPage.addProductToCart(dataset.productName);
  await cartPage.incrementQty();
  await console.log("Producto agregado con éxito");
  await cartPage.checkOut();
  await cartPage.agregarDireccion(
    dataset.provincia,
    dataset.localidad,
    dataset.codigoPostal,
    dataset.calle,
    dataset.numero,
    dataset.tipoDireccion,
    dataset.receptor,
    dataset.telefono
  );
});


// 2 - Agregar producto a favoritos
test("Add product to Favourite", async ({ page }) => {

  const poManager = new POManager(page);
  const favouritePage = poManager.getFavouritePage();
  await favouritePage.goTo();
  await favouritePage.addProductToFav(dataset.productName2);
  console.log("Test passed");
});



// 3-  Vaciar carrito
test("Empty cart", async ({ page }) => {

  const poManager = new POManager(page);
  const cartPage = poManager.getCartPage();
  await cartPage.emptyCart();
});

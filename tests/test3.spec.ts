import {chromium, Browser, test, expect, Page } from '@playwright/test';
const dataset = JSON.parse(JSON.stringify(require("../utils/testData.json")));

test("Test Login Error ", async ({page})=> {

    await page.goto("https://ultimateqa.com/complicated-page");
    
    const username = await page.locator("#user_login_667daad771045")
    const password=  await page.locator("#user_pass_667daad771045")
    const loginBtn = await page.locator("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > article:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(7) > div:nth-child(2) > div:nth-child(5) > div:nth-child(2) > form:nth-child(1) > p:nth-child(4) > button:nth-child(1)")
    await username.fill(dataset.username)
    await password.fill(dataset.password)
    await loginBtn.click()
    await page.waitForLoadState()
    await page.waitForSelector("//ul[@class='login-error-list']//li[1]")
    expect(await page.locator("//ul[@class='login-error-list']//li[1]")).toContainText("Error")
      
  })

//   test("Test Dynamic controls", async({page})=> {

//     await page.goto("https://the-internet.herokuapp.com/")



//   }
// )
import {chromium, Browser, test, expect, Page } from '@playwright/test';


test.skip("Test Hover Menu", async ({page})=> {

    await page.goto("https://ultimateqa.com/automation");
    
    const mainMenu = page.locator("#menu-main-menu")
    await mainMenu.locator("text='Education'").hover()
    await page.locator("text='Selenium Resources'").first().click()
    
    await page.pause();
      
  })


  test.skip("Test Fill out forms", async ({page}) => {

    await page.goto("https://ultimateqa.com/automation");
    await page.locator("text='Fill out forms'").click();
    const name = "Belen"
    const message = "Soy un mensaje"
    let operacionCaptcha = (await page.getByText('+').innerText()).toString()
    console.log(operacionCaptcha);
    const captchaInput = await page.locator("input[name='et_pb_contact_captcha_1']")
    const nameInput1 = await page.locator("#et_pb_contact_name_0")
    const messaegInput1 = await page.locator("#et_pb_contact_message_0")
    const nameInput2 = await page.locator("#et_pb_contact_name_1")
    const messageInput2 = await page.locator("#et_pb_contact_message_1")
    const submitBtn1 = await page.locator("(//button[@type='submit'])[1]")
    const submitBtn2 = await page.getByRole('button', { name: 'Submit 9' })


    // funcion para obtener Captcha del form2

    function extraerNumerosConSplit(texto: string): number[] {
        const palabras = operacionCaptcha.split(/\s+/);      // dividir por espacios
        const numeros = palabras.filter(palabra => /^\d+$/.test(palabra)).map(Number);
        return numeros;
    }
    
    const texto = `${operacionCaptcha}`;
    const numerosExtraidos: number[] = extraerNumerosConSplit(texto);  // convertir a array los valores
     let num2 = numerosExtraidos[0];   //extraer primer valor
     let num1 = numerosExtraidos[1];   // extraer segundo valor
     const sum = num1 +num2           //suma de los valores
    console.log(numerosExtraidos)    // imprimir el array de numeros 
    console.log(sum)                  // imprimir la suma de los valores

    
    // Input info box 1
    await nameInput1.fill(name)
    await messaegInput1.fill(message)
    await submitBtn1.click()
    await page.waitForLoadState();
    await expect(page.locator("(//div[@class='et-pb-contact-message'])[1]")).toHaveText("Thanks for contacting us");

    // Input info box 2
    await nameInput2.fill(name)
    await messageInput2.fill(message)
    await submitBtn2.click()
    await page.waitForLoadState();
    await expect(page.locator("//p[text()='Please, fill in the following fields:']")).toHaveText("Please, fill in the following fields:")
    await expect(page.locator("//li[text()='Captcha']")).toHaveText("Captcha");
    await page.waitForLoadState();
    await captchaInput.fill(`${sum}`)
    await submitBtn2.click()
    await page.waitForLoadState();
    await expect(page.locator("(//div[@class='et-pb-contact-message'])[2]")).toHaveText("Thanks for contacting us")


   })

test.only("Test Sprint App", async ({page})=> {

await page.goto("https://ultimateqa.com/automation")
await page.locator("a[href='https://ultimateqa.com/sample-application-lifecycle-sprint-1/']").click();
await page.locator("//input[@name='firstname']").fill("Name")
await page.locator("a[href='https://ultimateqa.com/sample-application-lifecycle-sprint-2/']").click()
await page.locator("input[name='firstname']").fill("FirstName")
await page.locator("input[name='lastname']").fill("Lastname")

// const selectoresRadio = page.locator("(//input[@name='gender'])[1]").selectOption("female")
await page.pause()





})


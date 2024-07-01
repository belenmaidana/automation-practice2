import {chromium, Browser, test, expect, Page } from '@playwright/test';
const dataset = JSON.parse(JSON.stringify(require("../utils/testData.json")));


// ULTIMATE QA - PAGE

test("Test Hover Menu - desde el menu apoyar el mouse sobre un titulo para acceder al link", async ({page})=> {

    await page.goto("https://ultimateqa.com/automation");
    
    const mainMenu = page.locator("#menu-main-menu")
    await mainMenu.locator("text='Education'").hover()
    await page.locator("text='Selenium Resources'").first().click()
    
    await page.pause();
      
  })



  test("Test Fill out forms - Captcha Suma de numeros", async ({page}) => {

    await page.goto("https://ultimateqa.com/automation");   //ingreso a la pagina
    await page.locator("text='Fill out forms'").click();    //click en la pagina de Forms

  
    const captchaInput = await page.locator("input[name='et_pb_contact_captcha_1']");        //locator para ingresar el resultado de la suma de captcha
    const nameInput1 = await page.locator("#et_pb_contact_name_0");                          //locator para ingresar el nombre en el form1
    const messaegInput1 = await page.locator("#et_pb_contact_message_0");                    //locator para ingresar el mensaje en el form 1
    const nameInput2 = await page.locator("#et_pb_contact_name_1");                          //locator para ingresar el nombre en el form2
    const messageInput2 = await page.locator("#et_pb_contact_message_1");                    //locator para ingresar el mensaje en el form 2
    const submitBtn1 = await page.locator("(//button[@type='submit'])[1]");                  //locator para el boton submit del form1
    const submitBtn2 = await page.getByRole('button', { name: 'Submit 9' });                 //locator para el boton submit del form2

    // funcion para obtener Captcha del form2

    async function extraerNumerosConSplit(texto: string): Promise<number[]> {                
        const palabras = texto.split(/\s+/);              // dividir por el signo "+"| y elimina los espacios vacios  // texto es el parametro que tendra la funcion
        console.log(palabras);                            // imprime [ '7', '+', '8' ]
        const numeros = palabras.filter(palabra =>        //filter filtra los caracteres que cumplan con la asetion de adentro y .map lo convierte en un array de tipo Number
        /^\d+$/.test(palabra)).map(Number);             // ^ y $ son aserciones de tipo LIMITE, .
        return numeros;                                  // finaliza la ejecucion de la funcion y especifica un valor para ser devuelto cuando se la llame
        //console.log(numeros);    //  imprime: [ 7, 8 ]
       
       }
  
  // funcion para sumar los numeros del captcha
    
    async function sumarNumeros() {           
      const operacionCaptcha1 = await page.locator("span.et_pb_contact_captcha_question").allInnerTexts();  //locator   imprime [ '7 + 8' ] 
      const numerosExtraidos: number[] = await extraerNumerosConSplit(operacionCaptcha1[0]);                // convertir a array los valores
      let sum = numerosExtraidos[0] + numerosExtraidos[1]                                                   //suma de los valores
      //console.log(numerosExtraidos[0] + numerosExtraidos[1]);                                             // imprimir el array de numeros 
      //console.log(sum);                                                                                   // imprimir la suma de los valores
      return sum;
    }

  // TEST

  // Input info box 1
  await nameInput1.fill(dataset.name);               // lo llamo desde el json
  await messaegInput1.fill(dataset.message);         // lo llamo desde el json
  await submitBtn1.click();                         //Click en boton Submit
  await page.waitForLoadState();                    //espera que cargue completamente la pagina
  await expect(page.locator("(//div[@class='et-pb-contact-message'])[1]")).toHaveText("Thanks for contacting us");   //asertion de envio de form con exito

  // Input info box 2
  await nameInput2.fill(dataset.name);                    //ingreso valores (vienen del json los datos)
  await messageInput2.fill(dataset.message);              //ingreso valores (vienen del json los datos)
  await submitBtn2.click();                                //Click en boton submit
  await page.waitForLoadState();                           //espera que cargue completamente la pagina
    
  await expect(page.locator("//p[text()='Please, fill in the following fields:']")).toHaveText("Please, fill in the following fields:");  //asertion de que falta ingresar un campo
  await expect(page.locator("//li[text()='Captcha']")).toHaveText("Captcha");        //asertion de que falta ingresar el captcha
  await page.waitForLoadState();                      //espera que cargue completamente la pagina

  await captchaInput.fill("0");                        //ingresa un valor erroneo 
  await submitBtn2.click();                            //click en el boton submit 
  await page.waitForLoadState();                       //espera que cargue completamente la pagina

  let sumaNumCaptcha = await sumarNumeros();            //llamo nuevamente la funcion Sumar numeros del captcha y la guardo en una nueva variable "sumaNumCaptcha"
  await captchaInput.fill(sumaNumCaptcha.toString());   // aca uso la variable creada arriba ya que no puedo utilizar la "sum" de la función porque solo tiene 
  await submitBtn2.click();                              //click en el boton submit        
  await page.waitForLoadState();                        //espera que cargue completamente la pagina
  await expect(page.locator("(//div[@class='et-pb-contact-message'])[2]")).toHaveText("Thanks for contacting us");  //asertion de envio de form con exito
   })

test("Test Sprint App", async ({page})=> {
  await page.goto("https://ultimateqa.com/automation")
  await page.locator("a[href='https://ultimateqa.com/sample-application-lifecycle-sprint-1/']").click();
  await page.locator("//input[@name='firstname']").fill(dataset.name);
  await page.locator("a[href='https://ultimateqa.com/sample-application-lifecycle-sprint-2/']").click();
  await page.waitForLoadState("networkidle")
  await page.waitForSelector("input[name='firstname']");
  await page.locator("input[name='firstname']").fill(dataset.name);
  await page.locator("input[name='lastname']").fill(dataset.lastname);
  // await page.locator("input[type='submit']").click();
  await page.waitForLoadState("networkidle")
  await page.locator("a[href='https://ultimateqa.com/sample-application-lifecycle-sprint-3/']").click();
  await page.locator("input[value='female']").click()
  await page.locator("input[name='firstname']").fill(dataset.name);
  await page.locator("input[name='lastname']").fill(dataset.lastname);
  await page.locator("a[href='https://ultimateqa.com/sample-application-lifecycle-sprint-4/']").click()
  await page.locator("#radio1-f").click()
  await page.locator("#f1").fill(dataset.name)
  await page.locator("#l1").fill(dataset.lastname)
  await page.locator("#radio2-f").click()
  await page.locator("#f2").fill(dataset.name)
  await page.locator("#l2").fill(dataset.lastname)
  await page.locator("a[href='/sample-application-lifecycle-sprint-5/']").click()
  await page.waitForLoadState("networkidle")
  await page.waitForSelector("#radio2-f");
  await page.locator("#radio2-f").click()   // ver por que no queda seleccionado el femalepage.pause()


})

test("Test Login automation", async ({page}) => {


  // Locators
  const createAccount = await page.locator("a[href='/users/sign_up']")
  const firstName = await page.locator("user[first_name]")
  const lastName =await page.locator("user[last_name]")
  const email = await page.locator("user[email]")
  const password = await page.locator("user[password]")
  const termsAndConditions = await page.locator("user[terms]")
  const signUpButton = await page.locator("//button[@data-callback='onSubmit']")

  // Ejecucion test
  await page.goto("https://ultimateqa.com/automation")
  await page.locator("a[href='http://courses.ultimateqa.com/users/sign_in']").click()
  await page.waitForLoadState()
  await createAccount.click()
  await page.waitForLoadState()
  await firstName.fill(dataset.name)     // abre una autenticación de Humanos y FALLA
  await lastName.fill(dataset.lastname)
  await email.fill(dataset.email)
  await password.fill(dataset.password)
  await signUpButton.click()
  await page.waitForLoadState()
  expect(await page.locator(".collections__heading")).toContainText("Products")


})

test("Test handling dropdown" , async ({page}) => {

  await page.goto("https://ultimateqa.com/simple-html-elements-for-automation/");

  await page.locator("//div[@class='et_pb_blurb_description']//select[1]").click();
  await page.pause();      
  await page.selectOption("//div[@class='et_pb_blurb_description']//select[1]", {
         value: "audi"      
        })
    await page.pause();       
    expect(page.locator("div[class='et_pb_blurb_description'] select")).toHaveText("Audi")  // PREGUNTAR A HORA XQ CUANDO QUIERO VALIDAR LA OPCION SELECCIONADA ME TRAE TODAS LAS OPCIONES JUNTAS }
    //Expected string: "Audi"
    // Received string: "VolvoSaabOpelAudi"
  })



  test.only("Test checkbox" , async ({page}) => {

    await page.goto("https://ultimateqa.com/simple-html-elements-for-automation/");
  
    await page.locator("//input[@name='vehicle'])[1]").check();
    await page.pause();
    expect(page.getByLabel('I have a bike')).toBeChecked();
  })
  


// implementar los locators dentro de los metodos para poder 


import { test, expect } from '@playwright/test';

test("Test Print Balance", async ({page})=> {

  await page.goto("https://demo.applitools.com/app.html");
  const saldo =  await page.locator("(//div[@class='balance-value']//span)[1]").textContent();
  console.log("Saldo "+saldo);

  const creditoDisponible =  await page.locator("(//div[@class='balance']//div)[2]").textContent();
  console.log("Credito disponible "+creditoDisponible); 

  const saldoAdeudado =  await page.locator("//div[@class='balance-value danger']").textContent();
  console.log("Saldo adeudado "+saldoAdeudado); 
})


test.only("Test table cicle for", async({page}) => 
 {  
    await page.goto("https://demo.applitools.com/app.html");
    const trTable = page.locator("tbody");
    const transactions =  page.locator("td[class='nowrap']"); 
    const count = await transactions.count();
    const rows = page.locator("tbody tr");
    const rowsText = await rows.nth(1).locator("td[class='nowrap']").textContent();   
    //console.log(count)   
    console.log(rowsText)


    
    for (let i=0; i < count; i++ ) {
      
      const rowsText = await rows.nth(i).locator("td[class='nowrap']").textContent();   // textos de los rows
      console.log(rowsText)
     }
     
     let rowsCount= 0;

     if (  rowsText?.toString() === "Complete")
      rowsCount++;
      console.log("Status completed "+ rowsCount)

  }    
)

    // for ( let i=0; i<count; ++i){
    
    // const declinedStatus = "Declined"
    // const completedStatus = "Completed"
    // const pendingStatus = "Pending"

    //   if (
    //         await page.locator("span[td[class$='nowrap']]").textContent() === declinedStatus)  // ver locator
    //         { 
    //           console.log("The status is "+declinedStatus)
    //             }
    //       break;
          
//      
    




// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

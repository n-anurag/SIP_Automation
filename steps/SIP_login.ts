import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { getRawLocator,getValidatedLocator, getPageUrl } from '../support/locator-utils';
import { exit } from 'process';

const CURRENT_OBJECT = "SIP";  // matches your JSON file name

// ----------------------------
// Open Login Page
// ---------------
// -------------

//new change

Given('I open the SIP login page', async function (this: CustomWorld) {
  const url = getPageUrl(CURRENT_OBJECT);
  if (!url) throw new Error(`URL missing in ${CURRENT_OBJECT}.json`);

  await this.page.goto(url);
  
});

// ----------------------------
// Perform DP Selection + Username/Password + Login
// ----------------------------
When('I login to SIP portal',
   async function (this: CustomWorld) {

  const username = await getValidatedLocator(this.page, CURRENT_OBJECT, "username");
  await username.fill(process.env.SIP_USERNAME || "SIP_USERNAME");

  const password = await getValidatedLocator(this.page, CURRENT_OBJECT, "password");
  await password.fill(process.env.SIP_PASSWORD || "SIP_PASSWORD");
  await this.page.waitForTimeout(2000);
  const loginBtn = await getValidatedLocator(this.page, CURRENT_OBJECT, "login_button");
  await loginBtn.click();
});


When('I fill the esewa payment details',
   async function (this: CustomWorld) {

    const esewa_id = await getValidatedLocator(this.page, CURRENT_OBJECT, "esewa_id");
    await esewa_id.fill(process.env.ESEWA_ID || "esewa_id");

    const esewa_password = await getValidatedLocator(this.page, CURRENT_OBJECT, "esewa_password");
    await esewa_password.fill(process.env.ESEWA_PASSWORD || "esewa_password");
    await this.page.waitForTimeout(2000);
   })



//Validate Transaction Pin

When('I enter transaction pin',
   async function (this: CustomWorld) {
    
    const sip_pin = await getValidatedLocator(this.page, CURRENT_OBJECT, "sip_pin");
    await sip_pin.fill(process.env.TRANSACTION_PIN || "sip_pin");
    await this.page.waitForTimeout(2000);

   });
// ----------------------------
// Validate Login Success
// ----------------------------
Then('I should be logged in to SIP', async function (this: CustomWorld) {
  const dashboard = await getValidatedLocator(this.page, CURRENT_OBJECT, "my_asba");
  await expect(dashboard).toBeVisible();
});

When('I wait for manual captcha', { timeout: -1 }, async function () {
  await this.page.pause();
});



When('I select on {string} button',
   async function (this: CustomWorld, buttonName: string){
   const button = await getValidatedLocator(
   this.page,
   CURRENT_OBJECT, "application_report");
   await button.click();
     await this.page.waitForTimeout(2000);
   });

When('I click on {string} button',
  async function (this: CustomWorld, fieldName: string) {

    const button = await getValidatedLocator(this.page, CURRENT_OBJECT, fieldName);
    await button.click();
    await this.page.waitForTimeout(2000);
});

When ('I click on screen',
  async function (this: CustomWorld) {
    await this.page.mouse.click(10,10);
    await this.page.waitForTimeout(2000);
});



When('I fill in {string} with {string}',
  async function (this: CustomWorld, fieldName: string, value: string) {

    const input = await getValidatedLocator(this.page, CURRENT_OBJECT, fieldName);
    await input.fill(value);
    await this.page.waitForTimeout(2000);
});


// When('I click on {string} button', 
//   async function (this: CustomWorld, buttonName: string) {

//     // locate Ordinary Share row
//     const ipoRow = this.page.locator("//div[@class='company-name']/child::span[6]");

//     // Check if ANY IPO row exists
//     const count = await ipoRow.count();

//     if (count > 0) {
//       console.log("IPO found: Ordinary Share available");

//       // Now click the Apply button next to that row
//       const applyBtn = this.page.locator("(//button[@type='button'])[6]");
//       await applyBtn.first().click();

//     } else {
//       console.log("IPO not available. Exiting scenario.");
//       return;   // stop the step safely
//     }
// });

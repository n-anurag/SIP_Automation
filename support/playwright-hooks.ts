import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { CustomWorld } from './world';

setDefaultTimeout(60 * 1000);

// persistent profile directory
const userDataDir = './user-data';
console.log(process.env.SIP_USERNAME)
Before(async function (this: CustomWorld) {
  // launch persistent context
  this.context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    args: ['--start-maximized',
    '--window-size=1920,1080']
  });

  this.page = await this.context.newPage();
});

// Only close the page. Do NOT close context/browser.
After(async function (this: CustomWorld) {
  if (this.page && !this.page.isClosed()) {
    await this.page.close();
  }
});

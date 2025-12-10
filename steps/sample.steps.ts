import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { getValidatedLocator, getPageUrl } from '../support/locator-utils';

const CURRENT_OBJECT = 'meroshare_login';

Given('I open the {string} page',
  async function (this: CustomWorld, objectName: string) {
  const url = getPageUrl(objectName);
  if (!url) {
    throw new Error(`No URL defined for '${objectName}.json'`);
  }
  await this.page.goto(url);
});

Then(
  'I should see the {string} field on {string}',
  async function (this: CustomWorld, elementName: string, objectName: string) {
    const locator = await getValidatedLocator(this.page, objectName, elementName);
    await expect(locator).toBeVisible();
  }
);



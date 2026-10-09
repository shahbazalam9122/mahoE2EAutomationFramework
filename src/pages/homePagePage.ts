import { pageFixture } from '../support/pageFixture';
import { Logger } from 'winston';
import { Page,chromium,expect } from '@playwright/test';

export class homePage {

async validateHomePage()
{
  await expect(pageFixture.page).toHaveURL("https://demo.mahocommerce.com/default/electronics/");
  await expect(pageFixture.page).toHaveTitle("Electronics");
  await expect(pageFixture.page.locator("//img[@alt='Electronics']")).toBeVisible();
  console.log("-----------Home Page Valiadted successfully--------------")
}

}

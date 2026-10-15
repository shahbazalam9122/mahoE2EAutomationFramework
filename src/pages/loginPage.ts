import { pageFixture } from '../support/pageFixture';
import {getLocator,getLocatorWithUpdate} from '../../src/utils/util';
import { Logger } from 'winston';

import { expect } from '@playwright/test';

export class loginPg
{

async clickOnLoginProfileBtn()
{

  await pageFixture.page.locator(getLocator("loginProfileBtn")).click();
  await pageFixture.page.waitForTimeout(5000);
}

async verifyLoginPageTxtBox(textbox:string)
{
  await pageFixture.page.locator(getLocatorWithUpdate("loginTxtBox",textbox)).isVisible();
}

async verifyLoginBtn()
{
  await pageFixture.page.locator(getLocator("loginBtn")).isVisible();
}

async enterTheValueInTheLoginTextBox(value:string,txtBox:string)
{ 
   await pageFixture.page.locator(getLocatorWithUpdate("loginTxtBox",txtBox)).fill(value);
}

async clickOnLoginBtn()
{

  await pageFixture.page.locator(getLocator("loginBtn")).click();
  await pageFixture.page.waitForTimeout(5000);
}

async verifyTheLoginDashboard()
{
  await expect(pageFixture.page.locator(getLocator("loginDashBoard"))).toHaveText("My Dashboard");
}

async verifyFailedLogin()
{
  await expect(pageFixture.page.locator(getLocator("failedLoginText"))).toHaveText("Invalid login or password.");
}

}
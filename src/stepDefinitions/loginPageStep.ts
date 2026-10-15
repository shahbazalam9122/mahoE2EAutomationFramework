import {Given,Then, setDefaultTimeout} from '@cucumber/cucumber';
import { Page,chromium,expect } from '@playwright/test';
import { pageFixture } from '../support/pageFixture';
import { Logger } from 'winston';
import { loginPg } from '../pages/loginPage';
import { log } from 'console';


const loginPageObj = new loginPg();

setDefaultTimeout(60 * 1000 * 2);

Then('User click on login profile button',async function()
{
   await loginPageObj.clickOnLoginProfileBtn();
})

Then('User verify {string} textbox',async function(txtBox:string)
{
   await loginPageObj.verifyLoginPageTxtBox(txtBox);
})

Then('User verify login button',async function()
{
   await loginPageObj.verifyLoginBtn();
})


Then('User enter {string} in {string} textbox',async function(value:string,textBox:string)
{
   await loginPageObj.enterTheValueInTheLoginTextBox(value,textBox);

})

Then('User click on login button',async function()
{
   await loginPageObj.clickOnLoginBtn();
})

Then('User verify login dashboard',async function()
{
   await loginPageObj.verifyTheLoginDashboard();
})

Then('User verify failed login',async function()
{
   await loginPageObj.verifyFailedLogin();
})

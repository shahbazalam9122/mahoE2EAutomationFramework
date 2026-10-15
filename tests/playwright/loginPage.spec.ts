import 'dotenv/config';
import { test } from '@playwright/test';
import { loginPg } from '../../src/pages/loginPage';
import { homePage } from '../../src/pages/homePagePage';
import { pageFixture } from '../../src/support/pageFixture';
import {attachScreenshotToAllure} from '../../src/utils/util';

const loginPageObj = new loginPg();
const homePageObj = new homePage();


test.beforeEach(async ({ page }) =>
{
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl) {
    throw new Error('BASE_URL is not set');
  }

  pageFixture.page = page;
  await page.goto(baseUrl);
});

test('Verify email,password and login btn in login page',async ()=>
{
    const emailTxt = "email";
    const passTxt = "pass";
    await homePageObj.validateHomePage();
   await loginPageObj.clickOnLoginProfileBtn();
 // Capture and attach directly to Allure
   await attachScreenshotToAllure('After Click On Login Button');

   await loginPageObj.verifyLoginPageTxtBox(emailTxt);
   await loginPageObj.verifyLoginPageTxtBox(passTxt);
   await loginPageObj.verifyLoginBtn();

});


test('User login into the application',async ()=>
{
    const emailTxt = "email";
    const passTxt = "pass";
    const emailD = "testing@gmail.com";
    const password = "Shahbaz123";
    await homePageObj.validateHomePage();
   await loginPageObj.clickOnLoginProfileBtn();
 // Capture and attach directly to Allure
   await attachScreenshotToAllure('After Click On Login Button');

   await loginPageObj.enterTheValueInTheLoginTextBox(emailD,emailTxt);
   await loginPageObj.enterTheValueInTheLoginTextBox(password,passTxt);
  await attachScreenshotToAllure('After entering the credentials');
  await loginPageObj.clickOnLoginBtn();
  await loginPageObj.verifyTheLoginDashboard();
   await attachScreenshotToAllure('After login');

  
});


test('Verify failure when user login with wrong password',async ()=>
{
    const emailTxt = "email";
    const passTxt = "pass";
    const emailD = "testing@gmail.com";
    const password = "wrongPassword";
    await homePageObj.validateHomePage();
   await loginPageObj.clickOnLoginProfileBtn();
 // Capture and attach directly to Allure
   await attachScreenshotToAllure('After Click On Login Button');

   await loginPageObj.enterTheValueInTheLoginTextBox(emailD,emailTxt);
   await loginPageObj.enterTheValueInTheLoginTextBox(password,passTxt);
  await attachScreenshotToAllure('After entering the credentials');
  await loginPageObj.clickOnLoginBtn();
  await loginPageObj.verifyFailedLogin();
   await attachScreenshotToAllure('Login Failed');

  
});


test('Verify failure when user login with wrong email',async ()=>
{
    const emailTxt = "email";
    const passTxt = "pass";
    const emailD = "XXXXXX@gmail.com";
    const password = "Shahbaz123";
    await homePageObj.validateHomePage();
   await loginPageObj.clickOnLoginProfileBtn();
 // Capture and attach directly to Allure
   await attachScreenshotToAllure('After Click On Login Button');

   await loginPageObj.enterTheValueInTheLoginTextBox(emailD,emailTxt);
   await loginPageObj.enterTheValueInTheLoginTextBox(password,passTxt);
  await attachScreenshotToAllure('After entering the credentials');
  await loginPageObj.clickOnLoginBtn();
  await loginPageObj.verifyFailedLogin();
   await attachScreenshotToAllure('Login Failed');

  
});
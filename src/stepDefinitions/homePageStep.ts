import {Given, setDefaultTimeout} from '@cucumber/cucumber';
import { Page,chromium,expect } from '@playwright/test';
import { pageFixture } from '../support/pageFixture';
import { Logger } from 'winston';
import { homePage } from '../pages/homePage';


const homePageObj = new homePage();

setDefaultTimeout(60 * 1000 * 2);
Given('User validate the home page loaded successfully',async function()
{
  pageFixture.logger.info("Cucumber Test - Validating the home page launch successfully");
 await homePageObj.validateHomePage();
   
})
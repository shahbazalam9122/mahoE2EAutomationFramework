import {Given,Then, setDefaultTimeout} from '@cucumber/cucumber';
import { Page,chromium,expect } from '@playwright/test';
import { pageFixture } from '../support/pageFixture';
import { Logger } from 'winston';
import { homePage } from '../pages/homePagePage';


const homePageObj = new homePage();

setDefaultTimeout(60 * 1000 * 2);
Given('User validate the home page loaded successfully',async function()
{
  pageFixture.logger.info("Cucumber Test - Validating the home page launch successfully");
 await homePageObj.validateHomePage();
})

Then('User validate the home page banner',async function()
{
    await homePageObj.validateHomePageBanner();
})

Then('User validate list of products are showing in home page',async function()
{
    await homePageObj.validateHomePageProductsList();
})

Then('User validate top navigation shopping categories {string}',async function(categories:string)
{
    await homePageObj.validateTopNavCategories(categories);
})

Then('User validate side panel categories {string}',async function(categories:string)
{
    await homePageObj.validateSidePanelCategories(categories);
})

Then('User verify the different language {string} dropdown',async function(languages:string)
{
    await homePageObj.validateDifferentLanguageDropdown(languages);
})
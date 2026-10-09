
import { test,Page,chromium,expect } from '@playwright/test';
import { Logger } from 'winston';
import { homePage } from '../../src/pages/homePagePage';
import { pageFixture } from '../../src/support/pageFixture';


const homePageObj = new homePage();


test("Verify Home page launch successfully",async ()=>
{

});
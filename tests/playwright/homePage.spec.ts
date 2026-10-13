
import 'dotenv/config';
import { test } from '@playwright/test';
import { homePage } from '../../src/pages/homePagePage';
import { pageFixture } from '../../src/support/pageFixture';


const homePageObj = new homePage();


test("Verify Home page launch successfully",async ()=>
{

});
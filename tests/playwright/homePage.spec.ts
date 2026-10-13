
import 'dotenv/config';
import { test } from '@playwright/test';
import { homePage } from '../../src/pages/homePagePage';
import { pageFixture } from '../../src/support/pageFixture';


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

test("Verify Home page launch successfully",async ()=>
{
  await homePageObj.validateHomePage();
});

test("Verify home page banner image",async ()=>
{
  await homePageObj.validateHomePageBanner();
});

test("Verify list of products are showing in the home page",async ()=>
{
  await homePageObj.validateHomePageProductsList();
})

test("Verify top nav categories",async ()=>
{
  const categories = "Fashion,Electronics,Food,Books,Jewelry,Beauty,Home,Sports,Kids,Garden";
  await homePageObj.validateTopNavCategories(categories);
})


test("Verify side panel categories",async ()=>
{
  const categories = "CATEGORY,PRICE,COLOR,BRAND,STORAGE";
  await homePageObj.validateSidePanelCategories(categories);
})


test("Verify different languages dropdown",async ()=>
{
  const differentLanguages = "English,Français,Deutsch,Italiano";
  await homePageObj.validateDifferentLanguageDropdown(differentLanguages);
})


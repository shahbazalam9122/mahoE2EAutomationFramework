import { pageFixture } from '../support/pageFixture';
import {getLocator} from '../../src/utils/util';
import { Logger } from 'winston';

import { expect } from '@playwright/test';


export class homePage {

async validateHomePage()
{
    const baseUrl = process.env.BASE_URL;
  await expect(pageFixture.page).toHaveURL(baseUrl);
  await expect(pageFixture.page).toHaveTitle("Electronics");
    await expect(pageFixture.page.locator(getLocator("homePageImgBanner"))).toBeVisible();
  console.log("-----------Home page loaded successfully--------------")
}

async validateHomePageBanner()
{
   await expect(pageFixture.page.locator(getLocator("homePageImgBanner"))).toBeVisible();
   console.log("--------Home page banner validated successfully--------");
}

async validateHomePageProductsList()
{
  const products = await pageFixture.page.locator(getLocator("homePageProductList")).all();
  console.log("Total number of products : "+products.length);
  expect(products.length).toBeGreaterThan(0);
  console.log("\n TOTAL PRODUCTS ARE : ");
  for(const p of products)
  {
    console.log("\n "+await p.innerText());
  }
}

async validateTopNavCategories(categories:string)
{
  const allCategories:string[] = categories.split(',');
  const webAllCategories = await pageFixture.page.locator(getLocator("homeNavCategories")).all();
  expect(allCategories.length).toBe(webAllCategories.length);
  for(let i = 0;i<allCategories.length;i++)
  {
    console.log("WEB VALUE : "+await webAllCategories[i].innerText() + " |  PARAMETER VALUE : "+allCategories[i])
     expect(allCategories[i]).toBe(await webAllCategories[i].innerText());

  }
}

async validateSidePanelCategories(categories:string)
{
  const sideCategories:string[] = categories.split(',');
  const webSideCategories = await pageFixture.page.locator(getLocator("homePageSidePanelCategories")).all();
  expect(sideCategories.length).toBe(webSideCategories.length);
  for(let i = 0;i<sideCategories.length;i++ )
  {
    console.log("WEB SIDE PANEL VALUE : "+await webSideCategories[i].innerText()+" | PARAMETER SIDE PANEL VALUE : "+sideCategories[i]);
    expect(sideCategories[i]).toBe((await webSideCategories[i].innerText()));
  }
}

async validateDifferentLanguageDropdown(language:string)
{
  const alllanguages:string[] = language.split(",");
   await pageFixture.page.locator(getLocator("diffLanguageDropdown")).click();
   const webLanguageList = await pageFixture.page.locator(getLocator("differnetLanguegeList")).all();
   expect(alllanguages.length).toBe(webLanguageList.length)
   for( let i = 0;i<alllanguages.length;i++)
   {
    console.log("WEB LANGUAGE : "+await webLanguageList[i].innerText() + " PARAMETER VALUE : "+alllanguages[i]);
    expect(alllanguages[i]).toBe(await webLanguageList[i].innerText());
   }

}

}



import * as dotenv from 'dotenv';
import { Before } from '@cucumber/cucumber';
import { chromium,Browser,Page, BrowserContext} from "@playwright/test";
import { invokeBrowser } from "../support/browser";
import { pageFixture } from './pageFixture';
import { createLogger } from 'winston';
import { options } from '../utils/logger';
dotenv.config();

// const url = process.env.BASE_URL;
const url = process.env.BASE_URL!;
const isHeadless = process.env.HEADLESS
let browser:Browser;
let context: BrowserContext;

Before(async function({pickle})
{

   const scenarioName = pickle.name+pickle.id;
   browser = await invokeBrowser();
   context = await browser.newContext();
    const page = await context.newPage();
    pageFixture.page=page;
    pageFixture.logger=createLogger(options(scenarioName))
   await page.goto(url);
   await pageFixture.page.waitForTimeout(5000);
   
})
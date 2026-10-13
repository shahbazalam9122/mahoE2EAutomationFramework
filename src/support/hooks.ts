import * as dotenv from 'dotenv';
import { After, Before,AfterStep,BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium,Browser,Page, BrowserContext} from "@playwright/test";
import { invokeBrowser } from "../support/browser";
import { pageFixture } from './pageFixture';
import { createLogger } from 'winston';
import { options } from '../utils/logger';
const fs = require("fs-extra");
import * as path from 'node:path';
import { execSync } from 'child_process';

const url = process.env.BASE_URL!;
const isHeadless = process.env.HEADLESS
let browser:Browser;
let context: BrowserContext;


BeforeAll(() => {
  const resultsDir = path.resolve(process.cwd(), 'test-results');
  const activeReports = new Set([
    'cucumber-report.html',
    'cucumber-report.json',
  ]);

  for (const entry of fs.readdirSync(resultsDir)) {
    if (!activeReports.has(entry)) {
      fs.removeSync(path.join(resultsDir, entry));
    }
  }
});

Before(async function({pickle})
{

   const scenarioNameAndId = pickle.name+pickle.id;
   const scenarioName = pickle.name;
   console.log("\n\n-----"+scenarioName+"------START------");
   browser = await invokeBrowser();
   context = await browser.newContext({
      recordVideo:{
          dir:"test-results/videos",
      },
   });
    const page = await context.newPage();
    pageFixture.page=page;
    pageFixture.logger=createLogger(options(scenarioNameAndId))
   await page.goto(url);
   await pageFixture.page.waitForTimeout(5000);
   
})

AfterStep(async function({pickle,result})
{
  const currDate = Date.now();
  const afterStep:string ="afterStep";
   const image = await pageFixture.page.screenshot({path:`./test-results/screenshots/${pickle.name}_${afterStep}_${currDate}.png`,type:"png"});
  this.attach(image,"image/png");
});

After(async function({pickle,result})
{
  
   let videoPath:string;

   console.log("Execution status is : "+result.status)
  const scenarioName = pickle.name;
   console.log("-----"+scenarioName+"------CLOSE------\n\n");

    // Get the video object before closing the context
    const video = pageFixture.page.video();

    // Close the context and wait until the video is saved
    await context.close();

    // Attach the video to the Cucumber/Allure report
    if (video) {
        const videoPath = await video.path();

        if (fs.existsSync(videoPath)) {
            const videoBuffer = fs.readFileSync(videoPath);

            await this.attach(videoBuffer, 'video/webm');
        }
    }

    // Close the browser after the video is finalized
    await browser.close();

});

AfterAll(async function () {
    console.log('Generating Allure HTML report...');

    execSync('npx allure generate allure-results --clean --single-file', {
        stdio: 'inherit'
    });

    console.log('Allure report generated successfully!');
});
import { chromium, firefox, LaunchOptions, webkit } from "playwright-core";
import * as dotenv from 'dotenv';
dotenv.config({quiet:true});


const browser = process.env.BROWSER;
const options : LaunchOptions ={
    headless:false,
}
export const invokeBrowser = () =>
{
    
    switch(browser)
    {
        case "chrome":
           return chromium.launch(options);
            break;
        case "firefox" :
            return firefox.launch(options);
              break   

        case "webkit" :
            return webkit.launch(options);
              break         
        default:
             throw new Error("Please set the Proper browser!")
    }
  
}
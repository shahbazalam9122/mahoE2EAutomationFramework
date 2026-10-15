import * as fs from 'fs';
import * as path from 'path';
import * as allure from 'allure-js-commons';
import { pageFixture } from '../support/pageFixture';

// Adjust the path to point directly to your locators folder
const LOCATORS_DIR = path.resolve(__dirname, '../../Resources/locators');

// Cache holding merged locators across all JSON files
let locatorMap: Record<string, string> | null = null;

function loadAllLocators(dirPath: string): Record<string, string> {
  const mergedLocators: Record<string, string> = {};

  if (!fs.existsSync(dirPath)) {
    throw new Error(`Locators directory not found at: ${dirPath}`);
  }

  // Read all files inside the locator folder (supports nested subdirectories too)
  function scanDir(directory: string) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.json')) {
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        try {
          const parsedData: Record<string, string> = JSON.parse(fileContent);

          for (const [key, value] of Object.entries(parsedData)) {
            if (mergedLocators[key]) {
              console.warn(
                `[Locator Warning] Duplicate key "${key}" detected in ${entry.name}. Overwriting previous value.`
              );
            }
            mergedLocators[key] = value;
          }
        } catch (err) {
          throw new Error(`Failed to parse JSON file at: ${fullPath}`);
        }
      }
    }
  }

  scanDir(dirPath);
  return mergedLocators;
}

/**
 * Returns the resolved static locator string for the given key.
 */
export function getLocator(key: string): string {
  if (!key || !key.trim()) {
    throw new Error('A locator key must be provided.');
  }

  // Load and cache locators once on first invocation
  if (!locatorMap) {
    locatorMap = loadAllLocators(LOCATORS_DIR);
  }

  const locator = locatorMap[key.trim()];

  if (!locator) {
    throw new Error(
      `Locator with key "${key}" was not found across any locator JSON files.`
    );
  }

  return locator;
}

/**
 * Retrieves the locator by key and replaces instances of 'XXXX' with dynamic values.
 * 
 * Supports:
 * 1. Single replacement: getLocatorWithUpdate("loginPageTxtBox", "email")
 * 2. Multiple sequential replacements: getLocatorWithUpdate("rowCell", "row-1", "col-2")
 */
export function getLocatorWithUpdate(
  key: string,
  replacement: string,
  ...additionalReplacements: string[]
): string {
  let locator = getLocator(key);
  const replacements = [replacement, ...additionalReplacements];

  for (const value of replacements) {
    locator = locator.replace('XXXX', value);
  }

  return locator;
}

export async function attachScreenshotToAllure(stepName: string = 'Step Screenshot'): Promise<void> {
    const screenshot = await pageFixture.page.screenshot({ fullPage: true });
    await allure.attachment(stepName, screenshot, 'image/png');
}
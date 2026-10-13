


// import locators from '../../Resources/locators/homepage.json';



// export function getLocator(selector: string): string {
//     if (!selector.trim()) {
//         throw new Error('A locator selector must be provided.');
//     }

//     const locator = locators[selector as keyof typeof locators];

//     if (!locator) {
//         throw new Error(`Locator not found for key: ${selector}`);
//     }

//     return locator;
// }





import * as fs from 'fs';
import * as path from 'path';

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
 * Returns the resolved locator string for the given key.
 */
export function getLocator(key: string): string {
  if (!key || !key.trim()) {
    throw new Error('A locator key must be provided.');
  }

  // Load and cache locators once on first invocation
  if (!locatorMap) {
    locatorMap = loadAllLocators(LOCATORS_DIR);
  }

  const locator = locatorMap[key];

  if (!locator) {
    throw new Error(
      `Locator with key "${key}" was not found across any locator JSON files.`
    );
  }

  return locator;
}
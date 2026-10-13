
import { FullConfig } from '@playwright/test';
import { execSync } from 'child_process';

async function globalTeardown(config: FullConfig) {
    console.log('Generating Allure report...');

    execSync('npx allure generate allure-results --clean --single-file', {
        stdio: 'inherit'
    });

    console.log('Allure report generated successfully!');
}

export default globalTeardown;

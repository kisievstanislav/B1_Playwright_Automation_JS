// const {test} = require ("@playwright/test"); - same thing as below
import { test } from '@playwright/test';

test('My first test', async ({ page }) => {
  page.goto('https://google.com');
  await page.waitForTimeout(5000);
});

/* 
   * Practice #1 - Bing Search

    1.  Create a test called “Bing Search”.
    2.  Navigate to: https://www.bing.com
    3.  Locate the search box.
    4.  Click the search box.
    5.  Enter: Playwright Automation
    6.  Press Enter.
    7.  Observe the search results.

    Methods you may need: goto() click() fill() press()
*/

import { test } from '@playwright/test';

test('Bing Search', async ({ page }) => {
  await page.goto('https://www.bing.com');

  //page.locator("//textarea[@id='sb_form_q']");
  let searchBox = page.locator("//textarea[@id='sb_form_q']");

  await searchBox.click();

  // You can do this ot the 2nd one
  //await searchBox.fill("Playwright Automation");
  await page.keyboard.type('Playwright Automation');

  await page.waitForTimeout(5000);
});

// BE BACK 10:25

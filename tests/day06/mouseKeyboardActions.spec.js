import { expect, test } from '@playwright/test';

// * =========================================================================
// * MOUSE
test.describe('Mouse Actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.LC_PRACTICE_BASE_URL}`);
    await page.waitForTimeout(2000);
  });

  test('Left Click', async ({ page }) => {
    //page.locator("//a[text()='A/B Testing']").click();
    //await page.waitForTimeout(2000);

    await page.click("//a[text()='A/B Testing']"); // By default, it is a LEFT CLICK
    await page.waitForTimeout(2000);
  });

  test('Righ Click', async ({ page }) => {
    await page.click("//a[text()='A/B Testing']", { button: 'right' });
    await page.waitForTimeout(2000);
  });

  test('Hover over', async ({ page }) => {
    await page.click("//a[text()='Hovers']");
    await page.waitForTimeout(2000);

    page.hover("//img[@alt='User Avatar']"); // It find 3 matching elements, it will do the action on the first one.
    // await page.waitForTimeout(8000);
    // Once you hover over, you can validate/assert that the related text is visible.

    // Option 2 for looping
    // let userProfiles = await page.locator("//img[@alt='User Avatar']").all();
    // for (const eachUserProfile of userProfiles) {
    //     await eachUserProfile.hover();
    //     await page.waitForTimeout(2000);
    // }

    // Option 2 for looping
    let userProfiles2 = page.locator("//img[@alt='User Avatar']");
    const numberOfUsers = await userProfiles2.count(); // 3
    for (let i = 0; i < numberOfUsers; i++) {
      await userProfiles2.nth(i).hover();
      await page.waitForTimeout(2000);
    }
  });

  test('Drag and Drop', async ({ page }) => {
    await page.click("//a[text()='Drag and Drop']");
    await page.waitForTimeout(2000);

    // Two elements is neededL: 1st-Element to be dragged, 2nd-Element is location to be dropped

    // Option 1 -  with locators use elem1.dratTo(elem2);
    const elemToBeDragged = page.locator("//div[@id='column-a']");
    const elemToBeDropped = page.locator("//div[@id='column-b']");
    // await page.dragAndDrop(elemToBeDragged, elemToBeDropped); // this will give an error
    await elemToBeDragged.dragTo(elemToBeDropped);
    await page.waitForTimeout(2000);

    // Option 2 - With locators directly as Strings
    await page.dragAndDrop("//div[@id='column-a']", "//div[@id='column-b']");

    await page.waitForTimeout(5000);
  });

  test('Double Click', async ({ page }) => {
    //await page.dblclick("//h1");
    //await page.waitForTimeout(3000);

    await page.goto('https://qa-practice.netlify.app/double-click');
    await page.dblclick("//button[@id='double-click-btn']");
    await page.waitForTimeout(3000);

    // After double click
    await expect(page.locator("//div[@id='double-click-result']")).toHaveText(
      'Congrats, you double clicked!'
    );
  });

  test('Scroll', async ({ page }) => {
    // scrolling with mouse wheel
    // x arg - > horizontal
    // y arg - > vertical
    //await page.mouse.wheel( 0, 1000);
    //await page.waitForTimeout(3000);

    // Other option is scrolling to that ement directly.
    // "//a[text()='New tab']"
    const elemtToScrollTo = page.locator("//a[text()='Web Tables']");
    await elemtToScrollTo.scrollIntoViewIfNeeded();
    await page.waitForTimeout(3000);
  });
});

// * =========================================================================
// * KEYBOARD

test.describe('Keyboard Actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://loopcamp.vercel.app/login.html');
    await page.waitForTimeout(2000);
  });

  // https://loopcamp.vercel.app/login.html
  test('Pressing Keys', { tag: '@keyboard' }, async ({ page }) => {
    const usernameInput = page.locator("//input[@id='username']");
    const passwordInput = page.locator("//input[@id='password']");

    await usernameInput.click();
    await page.keyboard.type('tomsmith');
    await page.keyboard.press('Tab');
    await page.keyboard.type('SuperSecretPassword');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.waitForTimeout(2000);
  });
});

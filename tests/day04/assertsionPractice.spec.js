import { expect, test } from '@playwright/test';

const base_url = 'https://the-internet.herokuapp.com';

test.describe('Playwright Assertions', () => {
  // * --- 1. Page assertions -----------------------------------------------------------
  test('page - URL and title', async ({ page }) => {
    //await page.goto(`${base_url}/login`);
    await page.goto(`${process.env.BASE_URL}/login`);
    //await page.waitForTimeout(5000);

    await expect(page).toHaveTitle('The Internet');
    // EXPECTED:    - "The Internet"
    // ACTUA:       -  await expect(page).toHaveTitle();

    // think that you have clicked an element and it took you to new URL, now validate URL
    await expect(page).toHaveURL(`${base_url}/login`);
  });

  // * --- 2. Element assertions - visibility & state -----------------------------------------------------
  test('element - visible, hidden, enabled, disabled  ', async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}/dynamic_controls`);
    //await page.waitForTimeout(5000);

    const checkbox = page.locator("//input[@type='checkbox']");
    const input = page.locator("//form[@id='input-example']//input[@type='text']");
    1;
    await expect(checkbox).toBeVisible();
    await expect(input).toBeDisabled();

    const removeButton = page.locator(
      "//form[@id='checkbox-example']//button[@type='button' and normalize-space()='Remove']"
    );
    await removeButton.click();
    //await page.waitForTimeout(5000);
    await expect(checkbox).toBeHidden();
    await expect(page.locator("//form[@id='checkbox-example']//p[@id='message']")).toHaveText(
      "It's gone!"
    );

    await page
      .locator("//form[@id='input-example']//button[@type='button' and normalize-space()='Enable']")
      .click();
    //await page.waitForTimeout(5000);
    await expect(input).toBeEnabled();
    await expect(input).toBeEditable();
  });

  // * --- 3. Element assertions - checked -----------------------------------------------------
  test('element - checked / not checked', async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}/checkboxes`);
    //await page.waitForTimeout(5000);

    const box1 = page.locator("(//form[@id='checkboxes']//input[@type='checkbox'])[1]");
    const box2 = page.locator("(//form[@id='checkboxes']//input[@type='checkbox'])[2]");

    await expect(box1).not.toBeChecked(); // not operator
    await expect(box2).toBeChecked();

    //await box1.click();
    await box1.check(); // same as above
    //await page.waitForTimeout(5000);
    await expect(box1).toBeChecked();

    await box2.uncheck();
    //await page.waitForTimeout(5000);
    await expect(box2).not.toBeChecked();
  });

  // * --- 4. Element assertions - text, values, attribbute -----------------------------------------------------
  test('element - text, values, attribbute', async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}/login`);
    //await page.waitForTimeout(5000);

    await expect(page.locator('//h2')).toHaveText('Login Page');
    await expect(page.locator("//h4[@class='subheader']")).toContainText('tomsmith');

    const usernameField = page.locator(
      "//div[label[@for='username']]/input[@type='text' and @name='username']"
    );
    await usernameField.fill('tomsmith');
    await expect(usernameField).toHaveValue('tomsmith');
    expect(usernameField).toHaveAttribute('type', 'text');
  });

  // * --- 5. Element assertions - count -----------------------------------------------------
  test('element - count', async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}/add_remove_elements/`);
    //await page.waitForTimeout(5000);

    const addButton = page.locator("//button[text()='Add Element']");
    const deleteButton = page.locator("//div//button[.='Delete']");

    await expect(deleteButton).toHaveCount(0);

    await addButton.click();
    await addButton.click();
    await addButton.click();
    //await page.waitForTimeout(5000);

    await expect(deleteButton).toHaveCount(3);
    await expect(deleteButton).toHaveText(['Delete', 'Delete', 'Delete']);
  });

  // * --- 6. Value Assertions -----------------------------------------------------
  test('values - couread once, then compare', async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}/dropdown`);
    // await page.waitForTimeout(5000);

    const dropDown = page.locator("//select[@id='dropdown']");
    await dropDown.click();
    //await page.waitForTimeout(5000);

    const dropDownOpt = page.locator("//select[@id='dropdown']//option");
    const dDCount = await dropDownOpt.count();
    const dDListTexts = await dropDownOpt.allInnerTexts();
    const title = await page.title();

    // Validating the values. No promise in here, so no await keyword. If it failes there is retry. Fail immediately
    expect(dDCount).toBe(3);
    expect(dDListTexts).toContain('Option 1');
    expect(dDListTexts).toEqual(['Please select an option', 'Option 1', 'Option 2']);
    expect(dDCount).toBeGreaterThan(2);
    expect(dDCount).toBeLessThanOrEqual(20);
    expect(title.length).toBeLessThanOrEqual(12);
  });

  // * --- 7. Hard Assertions -----------------------------------------------------
  test('hard - stops', async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}/login`);
    await page.waitForTimeout(5000);

    await expect(page.locator('//h2')).toBeVisible();
    console.log('HARD 1 passed');

    await expect(page.locator("//input[@id='username']")).toBeVisible();
    console.log('HARD 2 passed');

    await expect(page.locator("//button[@type='submit']")).toContainText('Sign In');
    console.log('HARD 3 passed'); // with HARD assertion, once the code fails automation stops - hard assertion only affect the single test only
  });

  // * --- 8. Soft Assertions -----------------------------------------------------
  test('soft - reports and continues', async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}/login`);
    // await page.waitForTimeout(5000);

    await expect.soft(page.locator('//h2')).toBeVisible();
    console.log('HARD 1 passed');

    await expect.soft(page.locator("//input[@id='username']")).toBeVisible();
    console.log('HARD 2 passed');

    await expect.soft(page.locator("//button[@type='submit']")).toContainText('Sign In');
    console.log('HARD 3 passed'); // with SOFT assertion, once the code fails automation records what failed and continues and at the end it reports what failed
  });

  test('test01', async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}/login`);
  });
});

// * Explanation of BASE portion of URL
// https://the-internet.herokuapp.com    /checkboxes
// https://the-internet.herokuapp.com    /abtest
// https://the-internet.herokuapp.com    /login

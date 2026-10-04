import { expect, test } from '@playwright/test';

test('WebBased Authentication - embedded within URL', async ({ page }) => {
  // https://the-internet.herokuapp.com/basic_auth
  await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth');
  await page.waitForTimeout(5000);

  // HEADER AUT0HORIZATION ---> admin:admin --> both got inot that Header Auth0orization

  const successLogInMesg = page.locator(
    "//p[normalize-space()='Congratulations! You must have the proper credentials.']"
  );
  await expect(successLogInMesg).toBeVisible();
});

test('WebBased Authentication - encoded', async ({ page }) => {
  // 1 - encode the credentials.
  const encodedCreds = Buffer.from('admin:admin').toString('base64');
  // console.log(encodedCreds); // If you want to see what it encoded to -> run this console log statement

  // 2 - use the encoded credentials in the Header
  // HEADER AUTHORIZATION ---> admin:admin --> both got into that Header Authorization
  await page.setExtraHTTPHeaders({ Authorization: `Basic ${encodedCreds}` });

  // https://the-internet.herokuapp.com/basic_auth
  await page.goto('https://the-internet.herokuapp.com/basic_auth');
  await page.waitForTimeout(5000);

  const successLogInMesg = page.locator(
    "//p[normalize-space()='Congratulations! You must have the proper credentials.']"
  );
  await expect(successLogInMesg).toBeVisible();
});

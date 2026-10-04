import { test } from '@playwright/test';

test.describe('Login and validate Header, Middle and Footer', { tag: '@EPIC_01' }, async () => {
  // This will be executed before All test one time
  test.beforeAll(async ({}) => {
    console.log('Turn computer on');
  });

  // This will be executed after All test one time
  test.afterAll(async ({}) => {
    console.log('Turn computer off');
  });

  // This will be executed before each test one time
  test.beforeEach(async ({ page }) => {
    console.log('Login into the page');
  });

  // This will be executed after each test one time
  test.afterEach(async ({ page }) => {
    console.log('Log out from the page');
  });

  test(
    'Sample Test - Verifying header of page',
    { tag: ['@TC-01', '@smoke', '@regres'] },
    async ({ page }) => {
      //console.log("Login into the page");
      console.log('Test Case 01 running.......validation for header');
      //console.log("Log out from the page");
    }
  );

  test(
    'Sample Test - Verifying midle part of page',
    { tag: ['@TC-02', '@smoke', '@regres'] },
    async ({ page }) => {
      //console.log("Login into the page");
      console.log('Test Case 02 running......validation for middle');
      //console.log("Log out from the page");
    }
  );

  test(
    'Sample Test - Verifying footer of page',
    { tag: ['@TC-03', '@smoke', '@regres'] },
    async ({ page }) => {
      //console.log("Login into the page");
      console.log('Test Case 03 running......validation for footer');
      //console.log("Log out from the page");
    }
  );
});
 
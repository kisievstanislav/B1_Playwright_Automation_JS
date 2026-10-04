import { test } from '@playwright/test';

test('Credentials sources based on different run', { tag: '@testCred' }, async ({ page }) => {
  console.log('Username : ', process.env.APP_USER);
  console.log('Password : ', process.env.APP_PASS);
  console.log('Base URL : ', process.env.BASE_URL);
});

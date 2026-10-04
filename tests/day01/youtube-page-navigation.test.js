import { test } from '@playwright/test';

test('YouTube page navigation', async ({ page }) => {
    await page.goto('https://www.youtube.com/');
    
});

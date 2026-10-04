import { expect, test } from '@playwright/test';

test.describe('Alerts Practice', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.LC_PRACTICE_BASE_URL}javascript-alerts.html`);
    await page.waitForTimeout(2000);
  });

  test('Basic JS Alert', async ({ page }) => {
    // declaring hadling basic alerts -  since it is basic alert, playwrgith handles it automatically, you may or may not want tot declare this code
    //page.on("dialog", async(dialog)=> {
    //    console.log(`Alert message ${dialog.message()}`);
    //    await dialog.accept();
    //});

    let clickForJSAlert = page.locator("//button[@onclick='jsAlert()']");
    await clickForJSAlert.click();

    // await page.waitForTimeout(5000);
  });

  test('Confirmation JS Alert', async ({ page }) => {
    //declaring hadling confirm alerts -  since it is confimr alert, playwrgith handles it automatically with CANCEL not OK (Confirm)
    // "dialog" ---> this is part of the syntax, has to be "dialog"
    // (anyName)---> can be any different name/value
    page.on('dialog', async (anyName) => {
      console.log(`Alert message ${anyName.message()}`);
      await anyName.accept();
    });

    let clickForJSConfirm = page.locator("//button[@onclick='jsConfirm()']");
    await clickForJSConfirm.click();

    //await page.waitForTimeout(5000);
  });

  test('Promt JS Alert', async ({ page }) => {
    let promtText = 'LOOPCAMP Alert Practice';

    //declaring hadling promt alerts -  since it is promt alert, playwrgith handles it automatically with CANCEL not OK (Confirm), and not inserting any text into prompt
    //"dialog" ---> this is part of the syntax, has to be "dialog"
    //(anyName)---> can be any different name/value
    page.on('dialog', async (anyName) => {
      // Sometime you also need validate what kind of alert it is.
      expect(anyName.message()).toBe('I am a JS prompt'); // Here we specifically verify if it is PROMT ALERT with the message

      console.log(`Alert message ${anyName.message()}`);
      await anyName.accept(promtText);
    });

    let clickForJSPromt = page.locator("//button[@onclick='jsPrompt()']");
    await clickForJSPromt.click();

    //await page.waitForTimeout(5000);

    // With the code below I asserted if the text inserted in promt alert is being populated in UI
    let resultTextElem = page.locator("//p[@id='result']");
    await expect(resultTextElem).toContainText(promtText);
  });
});

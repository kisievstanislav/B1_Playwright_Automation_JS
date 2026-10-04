import { expect, test } from '@playwright/test';

test('iFrame Practive', async ({ page }) => {
  await page.goto(`${process.env.LC_PRACTICE_BASE_URL}iframe.html`);
  await page.waitForTimeout(3000);

  // Since we first need to navigate into the iFrame to locate the element the code below is not enough.
  //page.locator("//iframe[@class='tox-edit-area__iframe']");
  let textIFrame = page.frameLocator("//iframe[@class='tox-edit-area__iframe']");

  // Now, I need to locate the element from the iFrame to be able to insert text
  //body[@class='mce-content-body ']
  let textInputArea = textIFrame.locator("//body[@class='mce-content-body ']");

  // This itself only will fail becuase this element is inside if the iFrame.
  // So, we need to first locate iFrame and then locate the element inside of that iFrame
  //let textInputArea = page.locator("//body[@class='mce-content-body ']");

  await textInputArea.fill('Hello From iFame');

  await page.waitForTimeout(4000);
});

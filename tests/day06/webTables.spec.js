import { expect, test } from '@playwright/test';

test.describe('Web Tables', () => {
  let table;
  let allRows; // after .all() -> it array of obejcts (elements)
  let allColumns;
  let allCells;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://loopcamp.vercel.app/web-tables.html');
    await page.waitForTimeout(3000);

    table = page.locator("//table [@class='SampleTable']");
    allRows = await page.locator("//table [@class='SampleTable']//tbody//tr").all(); // after .all() -> it array of obejcts (elements)
    allColumns = await page.locator("//table [@class='SampleTable']//th").all();
    allCells = await page.locator("//table [@class='SampleTable']//td").all();
  });

  test('Verify there 9 rows in this table including header', async ({ page }) => {
    expect(allRows.length === 9).toBeTruthy();
    expect(allColumns.length === 13).toBeTruthy();
    expect(allCells.length === 104).toBeTruthy();
  });

  test('Read all the data from table ', async ({ page }) => {
    for (let eachCell of allCells) {
      console.log(await eachCell.innerText());
    }

    console.log('===========================');

    for (let i = 1; i < allCells.length - 1; i++) {
      console.log(await allCells[i].innerText());
      //await allCells[i].innerText();
    }

    // This allCells -> get all the information and stores []
    // To be able to skip all the first columna dn all the last column, we need to first loop through rows itself
    console.log('*********************************************');
    // skip first row, loop through all the other rows
    for (let i = 1; i < allRows.length; i++) {
      // find all the cell for each row
      let eachRowAllCells = await allRows[i].locator('//td').all();
      // (//table [@class='SampleTable']//tbody//tr)[2]//td

      // Skip the first and last cell for each row and take inner text for all the others.
      for (let i = 1; i < eachRowAllCells.length - 1; i++) {
        console.log(await eachRowAllCells[i].innerText());
      }
    }
  });
});

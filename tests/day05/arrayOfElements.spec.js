import { expect, test } from '@playwright/test';

/*
    Task:
        1. Verify that there are exactly 50 link elements which in the <ul> tag
        2. Verify that each of the 50 link elmenets which the <ul> tag is visible and clickable
        3. Verify that each of the 50 link elmenets which the <ul> tag has href attribut
*/

test.describe('Array of Elements', () => {
  let allLinks;

  test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.LC_PRACTICE_BASE_URL}`);
    allLinks = await page.locator("//ul[@class='list-group list-group-flush']//a").all(); // [e1, e2, e3, e4, .........e50]

    //allLinks2 = page.locator("//ul[@class='list-group list-group-flush']//a");
    // if you want you can use the .count() + nth(index) conbination to loop through elements
  });

  test('erify that there are exactly 50 link elements which in the <ul> tag', async ({ page }) => {
    // .all() returns Promise -> therefore it ahs to use await to fullfill either reject or success. Then it will get the elements

    expect(allLinks.length).toBe(50);
    expect(allLinks.length).toBeGreaterThanOrEqual(40);
    expect(allLinks.length).toBeLessThan(60);
  });

  test('Verify that each of the 50 link elmenets which the <ul> tag is visible and clickable', async ({
    page,
  }) => {
    // .all() returns Promise -> therefore it ahs to use await to fullfill either reject or success. Then it will get the elements
    //let allLinks = await page.locator("//ul[@class='list-group list-group-flush']//a").all(); // [e1, e2, e3, e4, .........e50]

    // for of loop
    for (let eachElem of allLinks) {
      // isVIsible() -> true/false -> Boolean
      // await expect ((eachElem).isVisible()).toBeTruthy();;
      await expect(eachElem).toBeVisible();
      await expect(eachElem).toBeEnabled();
    }
  });

  test('Verify that each of the 50 link elmenets which the <ul> tag has href attribut', async ({
    page,
  }) => {
    for (let eachElem of allLinks) {
      let eachElemHrefValue = await eachElem.getAttribute('href');
      expect(eachElemHrefValue).not.toBeNull();
      //console.log(eachElemHrefValue);

      // The code below is exact same thing as above.
      //expect (await eachElem.getAttribute("href")).not.toBeNull();

      // another way to assert
      await expect(eachElem).toHaveAttribute('href');
    }
  });
});

import { test as base_test, expect } from "@playwright/test";
import { BasePage } from "../pages/BasePage";


//Extends the base test with custom UI setup.
export const test = base_test.extend({page: async ({ page }, use: Function) => {

  // add the steps that are needed for UI setup here ...
    await page.goto(`${process.env.URL}`);
    await page.waitForLoadState("networkidle");


    // do not touch
    BasePage.setPage(page); // Set the page in BasePage for global access
    await use(page); // Use the page in the test functions

  },
});


export { expect }; 


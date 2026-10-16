import { test as base_test, expect } from "@playwright/test";
import { initElements } from "../GlobalPage";


//Extends the base test with custom UI setup.
export const test = base_test.extend({page: async ({ page }, use: Function) => {

  // add the steps that are needed for UI setup here ...
    await page.goto(`${process.env.URL}`, { waitUntil: "domcontentloaded" });


    initElements(page);
    await use(page); // Use the page in the test functions

  },
});


export { expect }; 


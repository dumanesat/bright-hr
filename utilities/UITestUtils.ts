import { test as base_test, expect } from "@playwright/test";
import { initElements } from "../GlobalPage";


//Extends the base test with custom UI setup.
export const test = base_test.extend({page: async ({ page, baseURL }, use: Function) => {

  // add the steps that are needed for UI setup here ...
    // Keep credentials visually masked in screenshots and video, including email.
    await page.addInitScript(() => {
      const maskLoginInputs = () => {
        for (const selector of ['#username', '#password']) {
          const input = document.querySelector<HTMLElement>(selector);
          input?.style.setProperty('-webkit-text-security', 'disc', 'important');
        }
      };
      new MutationObserver(maskLoginInputs).observe(document, { childList: true, subtree: true });
      document.addEventListener('DOMContentLoaded', maskLoginInputs);
    });
    await page.goto(baseURL!, { waitUntil: "domcontentloaded" });


    initElements(page);
    await use(page); // Use the page in the test functions

  },
});


export { expect }; 


import { HomePage } from "../pages/HomePage";
import { test, expect } from "../utilities/UITestUtils";

test.describe("UI User Story Example @user1", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
  });

  test("Test Case 1 Name", async ({ page }) => {
    await page.waitForTimeout(3000);
  });

  test("Test Case 2 Name", async ({ page }) => {
    await page.waitForTimeout(3000);
  });
});

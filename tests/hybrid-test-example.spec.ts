import { test, expect } from "../utilities/HybridTestUtils";

test.describe("Hybrid User Story Example @user3", () => {
  test("Test Case 1 Name", async ({apiContext, page }) => {

    // 1. API Interaction: Setup data or verify backend state
    const response = await apiContext.get("/example-endpoint"); 
    console.log(`API Response Status: ${response.status()}`);
    expect(response.status()).toBe(200);

    
    // 2. UI Interaction: Verify frontend reflects data or perform user actions
    await expect(page.locator('some-element')).toBeVisible();

  });
});



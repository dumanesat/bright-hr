import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  // Page Locators:
  public readonly searchBox = this.locator("#element1");


  
  // Page Actions:
  async enterSearchBox(input: string) {
    await this.searchBox.fill(input);
  }

}

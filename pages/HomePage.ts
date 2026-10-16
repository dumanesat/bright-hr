import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  // Page Locators:
  public readonly employeesMenu = BasePage.page.getByTestId("sideBar").getByRole("link", {
    name: "Employees",
    exact: true,
  });
  


  
  // Page Actions:
  public async clickEmployees(): Promise<void> {
    await this.employeesMenu.click();
  }


}

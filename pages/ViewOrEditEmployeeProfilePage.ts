import { BasePage } from "./BasePage";

export class ViewOrEditEmployeeProfilePage extends BasePage {
    // Page Locators:
    public readonly firstNameInput = BasePage.page.getByLabel("First name", { exact: true });
    public readonly lastNameInput = BasePage.page.getByLabel("Last name", { exact: true });
    public readonly emailAddressInput = BasePage.page.getByLabel("Email address", { exact: true });
    public readonly phoneNumberInput = BasePage.page.getByLabel(/^Phone number\b/);
    public readonly startDateInput = BasePage.page.getByLabel(/^Start date\b/);
    public readonly jobTitleInput = BasePage.page.getByLabel(/^Job title\b/);

    // Page Actions:
    public async getEmail(): Promise<string> {
        await this.emailAddressInput.waitFor({ state: "visible" });
        return this.emailAddressInput.inputValue();
    }
}

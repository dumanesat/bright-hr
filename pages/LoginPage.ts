import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    // Page Locators:
    public readonly usernameInputBox = this.locator("#username");//readonly=final

    public readonly passwordInputBox = this.locator("#password");

    public readonly loginBttn = BasePage.page.getByRole("button", { name: "Login", exact: true });



    

    // Page Actions (entry, click, check, dropdown, upload, etc.): 
    public async enterUsername(username: string): Promise<void> {
        await this.usernameInputBox.fill(username);
    }

    public async enterPassword(password: string): Promise<void> {
        await this.passwordInputBox.fill(password);
    }

    public async clickLoginButton(): Promise<void> {
        await this.loginBttn.click();
    }

    public async login(
        username: string,
        password: string,
    ): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }



}

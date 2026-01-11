import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    // Page Locators:
    public readonly usernameInputBox = this.locator("");

    public readonly passwordInputBox = this.locator("");

    public readonly loginBttn = this.locator("");



    

    // Page Actions (entry, click, check, dropdown, upload, etc.): 
    public async enterUsername(username: string = `${process.env.USERNAME}`) {
        await this.usernameInputBox.fill(username);
    }

    public async enterPassword(password: string = `${process.env.PASSWORD}`) {
        await this.passwordInputBox.fill(password);
    }

    public async clickLoginBttn() {
        await this.loginBttn.click();
    }

    public async login(username: string = `${process.env.USERNAME}`, 
        password: string = `${process.env.PASSWORD}`) {

        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginBttn();
    }



}
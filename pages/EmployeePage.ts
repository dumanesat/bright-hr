import { BasePage } from "./BasePage";
import type { EmployeeData } from "../test-data/EmployeeData";
import type { Locator } from "@playwright/test";

export class EmployeePage extends BasePage {
    // Page Locators:
    public readonly employeeSearchInput = BasePage.page.getByPlaceholder("Name or job title...", {
        exact: true,
    });
    public readonly firstNameInput = this.locator("#firstName");
    public readonly lastNameInput = this.locator("#lastName");
    public readonly emailAddressInput = this.locator("#email");
    public readonly phoneNumberInput = this.locator("#phoneNumber");
    public readonly startDateInput = this.locator("#startDate");
    public readonly jobTitleInput = this.locator("#jobTitle");

    public readonly addEmployeeButton = BasePage.page.getByRole("button", {
        name: "Add employee",
        exact: true,
    });

    public readonly saveNewEmployeeButton = BasePage.page.getByRole("button", {
        name: "Save new employee",
        exact: true,
    });

    public readonly closeModalButton = BasePage.page.getByRole("button", {
        name: "Close modal",
        exact: true,
    });

    // Page Actions:
    public async searchEmployees(name: string): Promise<void> {
        await this.employeeSearchInput.fill(name);
    }

    public getEmployeeEditLinks(fullName: string): Locator {
        return this.locator('div:has(> a[data-testid="EditButton"])')
            .filter({
                has: BasePage.page.getByRole("heading", { name: fullName, exact: true }),
            })
            .getByTestId("EditButton");
    }

    public async closeModal(): Promise<void> {
        await this.closeModalButton.click();
        await this.closeModalButton.waitFor({ state: "hidden" });
    }

    public async clickAddEmployee(): Promise<void> {
        await this.addEmployeeButton.click();
    }

    public async enterFirstName(firstName: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
    }

    public async enterLastName(lastName: string): Promise<void> {
        await this.lastNameInput.fill(lastName);
    }

    public async enterEmail(email: string): Promise<void> {
        await this.emailAddressInput.fill(email);
    }

    public async enterPhoneNumber(phoneNumber: string): Promise<void> {
        await this.phoneNumberInput.fill(phoneNumber);
    }

    public async enterStartDate(startDate: string): Promise<void> {
        await this.startDateInput.fill(startDate);
    }

    public async enterJobTitle(jobTitle: string): Promise<void> {
        await this.jobTitleInput.fill(jobTitle);
    }

    public async clickSaveNewEmployee(): Promise<void> {
        await this.saveNewEmployeeButton.click();
    }

    public async addEmployee(employee: EmployeeData): Promise<void> {
        await this.clickAddEmployee();
        await this.enterFirstName(employee.firstName);
        await this.enterLastName(employee.lastName);
        await this.enterEmail(employee.email);

        if (employee.phoneNumber !== undefined) {
            await this.enterPhoneNumber(employee.phoneNumber);
        }
        if (employee.startDate !== undefined) {
            await this.enterStartDate(employee.startDate);
        }
        if (employee.jobTitle !== undefined) {
            await this.enterJobTitle(employee.jobTitle);
        }

        await this.clickSaveNewEmployee();
        await this.saveNewEmployeeButton.waitFor({ state: "hidden" });
    }
}

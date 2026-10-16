import { loginPage, homePage, employeePage, viewOrEditEmployeeProfilePage } from "../GlobalPage";
import { createEmployeeData } from "../test-data/EmployeeDataFactory";
import { test, expect } from "../utilities/UITestUtils";

test.describe("Employee management", () => {
  test("adds two employees with all required and optional fields", async ({ page }) => {
    const username = process.env.BRIGHTHR_EMAIL;
    const password = process.env.BRIGHTHR_PASSWORD;

    if (!username || !password) {
      throw new Error("Set BRIGHTHR_EMAIL and BRIGHTHR_PASSWORD in .env before running the test.");
    }

    const employee = createEmployeeData();
    const secondEmployee = createEmployeeData();

    await test.step("Log in and open Employees", async () => {
      await page.getByRole("link", { name: "Log in", exact: true }).click();
      await loginPage.login(username, password);
      await homePage.clickEmployees();
      await expect(employeePage.addEmployeeButton).toBeVisible();
    });

    await test.step("Add the first employee with all fields and verify the success message", async () => {
      await employeePage.addEmployee(employee);
      await expect(
        page.getByText(`${employee.firstName} added to BrightHR Lite`, {
          exact: true,
        }),
      ).toBeVisible();
      await employeePage.closeModal();
    });

    await test.step("Add the second employee and verify the success message", async () => {
      await employeePage.addEmployee(secondEmployee);
      await expect(
        page.getByText(`${secondEmployee.firstName} added to BrightHR Lite`, {
          exact: true,
        }),
      ).toBeVisible();
      await employeePage.closeModal();
    });

    for (const addedEmployee of [employee, secondEmployee]) {
      await test.step(`Find ${addedEmployee.email} and verify the employee profile`, async () => {
        await homePage.clickEmployees();
        await employeePage.searchEmployees(addedEmployee.firstName);

        const fullName = `${addedEmployee.firstName} ${addedEmployee.lastName}`;
        const editLinks = employeePage.getEmployeeEditLinks(fullName);
        await expect(editLinks.first()).toBeVisible();

        // Save candidate URLs before leaving the employee list.
        const profileUrls = await editLinks.evaluateAll(links =>
          links.map(link => (link as HTMLAnchorElement).href),
        );

        let matchingProfileFound = false;
        for (const profileUrl of profileUrls) {
          await page.goto(profileUrl);
          const email = await viewOrEditEmployeeProfilePage.getEmail();
          if (email === addedEmployee.email) {
            matchingProfileFound = true;
            break;
          }
        }

        expect(matchingProfileFound, `No profile matched ${fullName} and ${addedEmployee.email}`)
          .toBe(true);
        await expect(viewOrEditEmployeeProfilePage.firstNameInput).toHaveValue(addedEmployee.firstName);
        await page.waitForTimeout(1000);
        await expect(viewOrEditEmployeeProfilePage.lastNameInput).toHaveValue(addedEmployee.lastName);
        await page.waitForTimeout(1000);
        await expect(viewOrEditEmployeeProfilePage.emailAddressInput).toHaveValue(addedEmployee.email);
        await page.waitForTimeout(1000);
        if (addedEmployee.phoneNumber !== undefined) {
          await expect(viewOrEditEmployeeProfilePage.phoneNumberInput).toHaveValue(addedEmployee.phoneNumber);
          await page.waitForTimeout(1000);
        }
        if (addedEmployee.startDate !== undefined) {
          await expect(viewOrEditEmployeeProfilePage.startDateInput).toHaveValue(addedEmployee.startDate);
          await page.waitForTimeout(1000);
        }
        if (addedEmployee.jobTitle !== undefined) {
          await expect(viewOrEditEmployeeProfilePage.jobTitleInput).toHaveValue(addedEmployee.jobTitle);
          await page.waitForTimeout(1000);
        }
        await homePage.clickEmployees();
      });
    }
  });
});

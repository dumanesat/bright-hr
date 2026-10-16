import type { Page } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { EmployeePage } from "./pages/EmployeePage";
import { ViewOrEditEmployeeProfilePage } from "./pages/ViewOrEditEmployeeProfilePage";

export let page: Page;
export let loginPage: LoginPage;
export let homePage: HomePage;
export let employeePage: EmployeePage;
export let viewOrEditEmployeeProfilePage: ViewOrEditEmployeeProfilePage;

export function initElements(argPage: Page): void {
    page = argPage;
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    employeePage = new EmployeePage(page);
    viewOrEditEmployeeProfilePage = new ViewOrEditEmployeeProfilePage(page);
}

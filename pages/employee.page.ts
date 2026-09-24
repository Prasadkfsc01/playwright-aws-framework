import { Locator, Page } from "@playwright/test";

export class EmployeePage {
  private readonly page: Page;

  readonly heading: Locator;
  readonly statusMessage: Locator;
  readonly employeeList: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page.getByRole("heading", {
      name: "Employee Management",
    });

    this.statusMessage = page.getByText("Application is running");

    this.employeeList = page.locator("#employee-list li");
  }

  async goto(): Promise<void> {
    await this.page.goto("/");
  }

  employee(name: string, role: string): Locator {
    return this.page.getByText(`${name} - ${role}`);
  }
}

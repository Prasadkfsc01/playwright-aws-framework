import { test, expect } from "../../fixtures/test.fixtures";

test("Employee Management application loads successfully", async ({ employeePage }) => {
  await employeePage.goto();

  await expect(employeePage.heading).toBeVisible();
  await expect(employeePage.statusMessage).toBeVisible();
});

test("@smoke Employee list is displayed", async ({ employeePage }) => {
  await employeePage.goto();
  await expect(employeePage.employeeList).toHaveCount(4);

  await expect(employeePage.employee("Rajeev", "QA Engineer")).toBeVisible();
});

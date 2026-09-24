import { test as base, expect } from "@playwright/test";

import { EmployeePage } from "../pages/employee.page";
import { EmployeeApiClient } from "../clients/employeeApi.client";
import { CognitoAuthClient } from "../clients/cognitoAuth.client";
import { environment } from "../config/environment";

type TestFixtures = {
  employeePage: EmployeePage;
  employeeApi: EmployeeApiClient;
  cognitoAuth: CognitoAuthClient;
};

export const test = base.extend<TestFixtures>({
  employeePage: async ({ page }, use) => {
    const employeePage = new EmployeePage(page);

    await use(employeePage);
  },

  employeeApi: async ({ request }, use) => {
    const employeeApi = new EmployeeApiClient(request, environment.apiUrl);

    await use(employeeApi);
  },

  cognitoAuth: async ({}, use) => {
    const cognitoAuth = new CognitoAuthClient();

    await use(cognitoAuth);
  },
});

export { expect };

import { test, expect } from "../../fixtures/test.fixtures";
import { Employee } from "../../models/employee.model";

test("@smoke GET employees without token returns 401", async ({ employeeApi }) => {
  const response = await employeeApi.getEmployees();

  console.log("No token status:", response.status());

  expect(response.status()).toBe(401);
});

test("GET employees with invalid token returns 401", async ({ employeeApi }) => {
  const response = await employeeApi.getEmployees("invalid-token");

  console.log("Invalid token status:", response.status());

  expect(response.status()).toBe(401);
});

test("@smoke GET employees with valid Cognito token returns 200", async ({
  employeeApi,
  cognitoAuth,
}) => {
  const accessToken = await cognitoAuth.getAccessToken();

  const response = await employeeApi.getEmployees(accessToken);

  console.log("Valid token status:", response.status());

  expect(response.status()).toBe(200);

  const employees: Employee[] = await response.json();

  console.log("Employees:", employees);

  expect(employees.length).toBeGreaterThan(0);

  expect(employees).toContainEqual({
    id: 1,
    name: "Rajeev",
    role: "QA Engineer",
  });
});

test("GET employees returns valid employee structure", async ({ employeeApi, cognitoAuth }) => {
  const accessToken = await cognitoAuth.getAccessToken();

  const response = await employeeApi.getEmployees(accessToken);

  expect(response.status()).toBe(200);

  const employees: Employee[] = await response.json();

  expect(Array.isArray(employees)).toBeTruthy();
  expect(employees.length).toBeGreaterThan(0);

  expect(employees[0]).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      role: expect.any(String),
    }),
  );
});

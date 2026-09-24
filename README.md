# Playwright AWS SDET Framework

A modular UI and API test automation framework built with Playwright, TypeScript and AWS cloud services.
This project demonstrates a Playwright framework for testing the UI, API, authentication and AWS-backed parts of an application.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- AWS S3
- AWS Cognito
- API Gateway
- AWS Lambda
- DynamoDB
- GitHub Actions

## Architecture

```text
                    Playwright Tests
                           |
                 ---------------------
                 |                   |
              UI Tests            API Tests
                 |                   |
           Page Objects          API Clients
                 |                   |
              AWS S3              Cognito
                                     |
                                    JWT
                                     |
                                API Gateway
                                     |
                                   Lambda
                                     |
                                  DynamoDB
```

## Framework Structure

```text
playwright-aws-demo/

├── app/
├── clients/
│   ├── cognitoAuth.client.ts
│   └── employeeApi.client.ts
├── config/
│   └── environment.ts
├── fixtures/
│   └── test.fixtures.ts
├── models/
│   └── employee.model.ts
├── pages/
│   └── employee.page.ts
├── tests/
│   ├── API/
│   └── UI/
├── .github/
│   └── workflows/
├── playwright.config.ts
└── package.json
```

The framework separates test logic from application implementation using:

- **Page Objects** for UI interactions
- **API Clients** for service communication
- **Custom Playwright Fixtures** for dependency creation
- **Models** for TypeScript type safety
- **Configuration Layer** for environment management

## AWS Testing

### UI

The Employee Management application is hosted as a static website in **AWS S3**.

Playwright validates:

- Application availability
- Page content
- Employee information
- UI behaviour

### API

The backend flow is:

```text
Playwright
   ↓
AWS Cognito
   ↓
JWT Access Token
   ↓
API Gateway
   ↓
Lambda
   ↓
DynamoDB
```

The API automation validates scenarios such as:

- No token → `401 Unauthorized`
- Invalid token → `401 Unauthorized`
- Valid Cognito JWT → `200 OK`
- Employee data returned from DynamoDB

## Running Tests

Install dependencies:

```bash
npm install
```

Install Playwright:

```bash
npx playwright install
```

Run tests:

```bash
npx playwright test
npx playwright test tests/UI
npx playwright test tests/API
```

## Reporting

Playwright HTML reporting is used to provide clear visibility of test execution results, including passed and failed tests, execution time, errors and failure details.

Reports can be viewed locally using:

```bash
npx playwright show-report
```

## Environment Configuration

Create a local `.env` using `.env.template` as reference.

```text
UI_BASE_URL=
API_URL=
AWS_REGION=cd ..

COGNITO_CLIENT_ID=
COGNITO_USERNAME=
COGNITO_PASSWORD=
```

## CI/CD

GitHub Actions is used to run the Playwright test suite and publish test reports and failure evidence as workflow artifacts.
Sensitive values such as passwords are stored securely using **GitHub Actions Secrets**.

- **PR Smoke Tests** – quick validation before changes are merged
- **Regression Tests** – full test suite after changes reach `main`
- **Nightly Regression** – scheduled overnight regression execution
- **API Authentication Tests** – focused validation of Cognito, JWT authentication and API behaviour

### Pipeline Execution

```text
GitHub
   ↓
Install Node dependencies
   ↓
Install Playwright
   ↓
Run UI + API tests
   ↓
Publish Playwright report
```

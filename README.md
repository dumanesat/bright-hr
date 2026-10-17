# BrightHR Employee Automation

UI tests for BrightHR Lite using Playwright, TypeScript, and the Page Object Model.

The test logs in, adds two employees, checks success messages, and verifies their
profile details. It uses full name and email to find the correct employee.
Faker creates new test data for each run.

## Setup

Use Node.js 22+ and Java 11+ for Allure.

```bash
npm ci
npx playwright install chrome
```

Copy `.env.example` to `.env.test` and add `BASE_URL`, `USERNAME`, and `PASSWORD`.
Never commit real credentials. Other environments use `.env.dev`, `.env.staging`,
and `.env.prod`. All four use the same sandbox in this demo; real PROD is blocked.

## Run Tests

```bash
npm run test:employee   # Default: TEST
npm run test:dev
npm run test:test
npm run test:staging
npm run test:prod
```

## Reports

```bash
npm run report:redact
npm run report          # Playwright HTML
npm run allure:generate
npm run allure:open     # Allure dashboard
```

Open the local URL shown in the terminal. `allure-results` contains raw data;
`allure-report` contains the HTML dashboard. Use `npm run allure:clean` before a
new run to clear old results.

## GitHub Actions

Pushes and pull requests to `main` run TEST. Manual runs allow environment selection.
Add GitHub Secrets: `URL`, `BRIGHTHR_EMAIL`, and `BRIGHTHR_PASSWORD`.
Download HTML reports from the run's **Artifacts** section.

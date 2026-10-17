# BrightHR Employee Automation

This project tests employee management in BrightHR Lite with Playwright and TypeScript.
It uses the Page Object Model to keep page actions separate from test checks.

## Test Scenario

The test logs in, adds two employees with required and optional details, and checks
the success messages. It then finds each employee by full name and email and checks
the saved profile details. Faker creates new test data for each run.

## Setup

Use Node.js 22 or later. Allure reports also need Java 11 or later.

```bash
git clone https://github.com/dumanesat/bright-hr.git
cd bright-hr
npm ci
npx playwright install chrome
```

Copy `.env.example` to `.env.test` and add your sandbox details:

```ini
BASE_URL=https://your-sandbox-url
USERNAME=your-login-email
PASSWORD=your-password
```

For other environments, create `.env.dev`, `.env.staging`, and `.env.prod` with the
same keys. All four environments use the same sandbox in this demo. Real passwords
and `.env` files must not be added to Git.

## Run Tests

TEST is the default environment. These commands create employees in the sandbox.

```bash
npm run test:employee
npm run test:dev
npm run test:test
npm run test:staging
npm run test:prod
```

Choose the environment and browser separately:

```bash
npx cross-env TEST_ENV=staging playwright test --project="Google Chrome"
```

`config/ConfigManager.ts` loads and checks the selected settings. PROD only allows
the TEST sandbox URL. Tests that create employees on real production need separate
approval and setup.

## Reports

Open the Playwright HTML report:

```bash
npm run report:redact
npm run report
```

Create and open the Allure dashboard:

```bash
npm run allure:generate
npm run allure:open
```

Run report commands even if a test fails. Keep the report server running and open
the local URL shown in the terminal. Do not open `index.html` directly.

`allure-results` holds raw test data. `allure-report` holds the HTML dashboard with
charts, steps, and test details. Screenshots, videos, and traces are saved on failure.
Before a new run with another environment, use `npm run allure:clean` to remove old
results. Previous report history is kept for trends.

## GitHub Actions

Pushes and pull requests to `main` run TEST. For a manual run, open **Actions →
Employee UI test → Run workflow** and choose an environment.

Add repository secrets `URL`, `BRIGHTHR_EMAIL`, and `BRIGHTHR_PASSWORD` for the demo.
CI uses these values without local `.env` files. For separate environments, add a
`BASE_URL` variable and both login secrets in each GitHub Environment. Keep the
repository `URL` secret as the sandbox reference.

Download `playwright-report` and `allure-report` from the run's **Artifacts** section.
Allure history is saved by environment and branch. Failed tests still fail CI, even
when reports are created. GitHub Pages can also publish the Playwright HTML report
when **Settings → Pages → Source** is set to **GitHub Actions**.

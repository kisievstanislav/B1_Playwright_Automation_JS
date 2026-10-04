# B1 Playwright Automation JS

A JavaScript browser-automation project using Playwright Test.

## Requirements

- Node.js and npm

## Setup

Install the project dependencies and the Chromium browser used by the tests:

```bash
npm install
npx playwright install chromium
```

Some tests use `APP_USER`, `APP_PASS`, and `BASE_URL`. Add the values required
for your test environment to a local `.env` file in the project root. Do not
commit real credentials or other secrets.

## Running tests

```bash
npm test                   # Run the tests in headed mode
npm run test:debug         # Open Playwright Inspector
npm run test-smoke         # Run tests tagged @testCred
npm run test-regression    # Run tests tagged @regression
npm run test:report        # Open the latest HTML report
```

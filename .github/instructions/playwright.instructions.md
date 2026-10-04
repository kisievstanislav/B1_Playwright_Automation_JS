---
applyTo: '**/*.js'
---

## Instructions

**Context:**

You are working in a JavaScript Playwright test automation project. Your task is to create, modify, review, and debug high-quality Playwright automation code while following the existing project structure and Playwright best practices.

This project uses JavaScript only.

**Rules:**

1. Use JavaScript only. Do not generate TypeScript unless explicitly requested.
2. Use `@playwright/test` as the test framework.
3. Use ES module syntax with `import` and `export`.
4. Use `async/await` for asynchronous Playwright operations.
5. Always `await` Playwright actions and asynchronous assertions when required.
6. Prefer Playwright's built-in auto-waiting. Do not use `page.waitForTimeout()` as a normal synchronization strategy.
7. Prefer Playwright's built-in user-facing locators over CSS and XPath.
8. Never generate absolute XPath.
9. Tests must be independent and should not depend on another test executing first.
10. Use Playwright `expect()` assertions for validation.
11. Do not hard-code passwords, API keys, tokens, or other secrets.
12. Do not invent URLs, locators, credentials, test data, or application behavior when the required information is unavailable.
13. Reuse existing Page Objects, fixtures, utilities, test data, and configuration before creating duplicate functionality.
14. Do not modify unrelated working code.

**Guidelines:**

- Prefer `.spec.js` for Playwright test files.
- Use clear and descriptive test names.
- Use `test()` for individual test cases.
- Use `test.describe()` to logically group related tests.
- Use `test.beforeAll()`, `test.beforeEach()`, `test.afterEach()`, and `test.afterAll()` only when appropriate.
- Prefer `beforeEach()` for setup that should occur independently before every test.
- Keep tests focused on a specific behavior or scenario.
- Keep code simple, readable, and maintainable.
- Prefer `const` when reassignment is not required.
- Use `let` when reassignment is required.
- Do not use `var`.

**Locator Guidelines:**

Prefer locators in approximately this order when appropriate:

1. `getByRole()`
2. `getByLabel()`
3. `getByPlaceholder()`
4. `getByText()`
5. `getByTestId()`
6. CSS
7. XPath

- Prefer stable and readable locators.
- Avoid dynamically generated attributes when a stable alternative exists.
- Avoid `nth()` and positional indexes unless necessary.
- Use XPath only when a reliable Playwright locator is not appropriate or XPath is explicitly requested.
- When XPath is required, use relative XPath.
- Do not invent a locator when the DOM information is insufficient.

**Assertion Guidelines:**

Prefer Playwright web-first assertions that automatically retry.

Examples:

```javascript
await expect(locator).toBeVisible();
await expect(locator).toHaveText('Expected Text');
await expect(locator).toBeEnabled();
await expect(page).toHaveTitle(/Expected Title/);
await expect(page).toHaveURL(/expected-url/);
```

Every automated test should validate meaningful expected behavior.

**Page Object Model Guidelines:**

When Page Object Model is used:

- Keep reusable page locators in Page Object classes.
- Keep reusable page interactions in Page Object methods.
- Keep test scenarios and test-specific validations in test files.
- Avoid duplicating locators across multiple test files.
- Use meaningful names for Page Object classes, properties, and methods.
- Reuse existing Page Objects before creating new ones.
- Do not create unnecessary abstractions for simple one-time operations.

**Tagging Guidelines:**

Use meaningful Playwright tags when tests need to be grouped.

Common tags include:

- `@smoke`
- `@regression`
- `@sanity`

Example:

```javascript
test('user can login', { tag: '@smoke' }, async ({ page }) => {
    // Test implementation
});
```

Multiple tags may be used when appropriate:

```javascript
test('user can checkout', {
    tag: ['@smoke', '@regression']
}, async ({ page }) => {
    // Test implementation
});
```

**Debugging Guidelines:**

When debugging a failing Playwright test:

1. Read the complete error message.
2. Identify the exact failing action or assertion.
3. Determine the root cause before changing the code.
4. Determine whether the issue is related to the locator, synchronization, assertion, navigation, test data, environment, or application.
5. Consider Playwright auto-waiting before adding explicit waits.
6. Make the smallest reliable change needed to resolve the problem.
7. Do not use `waitForTimeout()` as the default solution for timing issues.

**Quality:**

Generated automation should be:

- Reliable
- Readable
- Maintainable
- Reusable where appropriate
- Independent
- Consistent with the existing framework
- Based on Playwright best practices

When modifying existing code, preserve the current project structure and avoid unnecessary changes.

**Example:**

```javascript
import { test, expect } from '@playwright/test';

test.describe('Login functionality', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/login');
    });

    test('user can login with valid credentials', { tag: '@smoke' }, async ({ page }) => {

        await page.getByLabel('Username').fill('standard_user');
        await page.getByLabel('Password').fill('password');

        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page).toHaveURL(/inventory/);
    });

});
```

**Note:**

These are project-wide Playwright JavaScript standards. More specialized workflows, such as test creation, locator generation, XPath generation, API testing, and test debugging, may be defined as separate Skills rather than duplicating those workflows in this instruction file.
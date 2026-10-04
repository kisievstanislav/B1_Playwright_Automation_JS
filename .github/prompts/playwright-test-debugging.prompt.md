---
name: playwright-test-debugging
description: Diagnose and fix failing, flaky, or unexpected Playwright JavaScript automated tests. Use when the user asks to debug, troubleshoot, investigate, repair, or fix a Playwright test, test failure, timeout, locator failure, assertion failure, navigation issue, synchronization issue, or flaky test.
---

# Playwright Test Debugging

## Purpose

Diagnose the root cause of failing, flaky, or unexpected Playwright JavaScript automation and make the smallest reliable fix.

Base the diagnosis on available test code, Page Objects, error messages, traces, logs, application behavior, configuration, and related project files.

Follow all applicable project Playwright instructions and existing framework conventions.

## Workflow

### 1. Understand the Failure

Identify:

- The failing test
- The exact error message
- The failing action or assertion
- The expected behavior
- The actual behavior
- Whether the failure is consistent or intermittent
- Relevant test data
- Relevant environment or browser
- Any recent code or application changes when available

Do not assume the cause before examining the available evidence.

### 2. Inspect the Existing Project

Inspect relevant project files when available.

Look at:

- Failing test file
- Related Page Objects
- Fixtures
- Utilities
- Test data
- Authentication setup
- `playwright.config.js`
- Related working tests
- Environment configuration

Understand how the existing framework is intended to work before modifying it.

Do not create duplicate framework components as a debugging shortcut.

### 3. Locate the Exact Failure

Identify the specific operation that failed.

Examples include:

- Element lookup
- Click
- Fill
- Navigation
- Assertion
- API request
- Authentication
- Setup
- Teardown
- Fixture
- Hook

Use the complete error information when available.

Do not fix unrelated code simply because it appears in the same test.

### 4. Classify the Problem

Determine whether the failure is primarily related to:

- Locator
- Synchronization or timing
- Assertion
- Navigation
- Test data
- Authentication
- Page state
- Test dependency
- Fixture
- Hook
- Configuration
- Environment
- Network behavior
- Application defect
- Incorrect test expectation

Do not automatically treat every timeout as a waiting problem.

### 5. Determine the Root Cause

Determine why the failure occurred before changing the implementation.

Distinguish between symptoms and root causes.

For example:

```text
Timeout
   ↓
Element was never found
   ↓
Locator uses a dynamic attribute
   ↓
Root cause = unreliable locator
```

The solution should address the unreliable locator rather than simply increasing the timeout.

Base conclusions on available evidence.

Do not invent a root cause when the available information is insufficient.

### 6. Investigate Locator Failures

When the failure involves a locator:

- Inspect the existing locator.
- Determine whether it identifies the intended element.
- Check whether it may match zero or multiple elements.
- Check for dynamic attributes.
- Check for DOM or application changes.
- Check whether the element is inside a frame, container, dialog, or other relevant context.
- Follow applicable project locator standards.

If specialized locator-generation capabilities are available and substantial locator analysis is required, use the relevant locator-generation skill.

Any replacement locator must satisfy the project's locator requirements.

Do not replace a locator merely because the test failed if the actual root cause is elsewhere.

### 7. Investigate Synchronization Failures

When timing or synchronization appears relevant:

- Consider Playwright auto-waiting first.
- Determine what application state the test actually needs.
- Wait for meaningful state rather than arbitrary time.
- Check whether navigation, loading, rendering, network activity, or application state is incomplete.
- Prefer Playwright web-first assertions and appropriate waiting mechanisms.

Do not use:

```javascript
page.waitForTimeout()
```

as the default fix.

Do not increase timeouts merely to hide an underlying problem.

Increase a timeout only when the operation legitimately requires more time and the existing timeout is actually insufficient.

### 8. Investigate Assertion Failures

When an assertion fails:

- Determine the expected value or state.
- Determine the actual value or state.
- Verify that the assertion represents the requirement correctly.
- Verify that the assertion targets the correct element or page state.
- Check whether normalization, formatting, asynchronous updates, or test data affect the result.

Do not weaken or remove a valid assertion simply to make the test pass.

### 9. Investigate Test Isolation

Check whether the test depends on:

- Another test running first
- Shared mutable state
- Previous test data
- Existing browser state
- Test execution order
- Uncontrolled external state

Tests should remain independently executable unless the project explicitly defines otherwise.

Do not convert tests to serial execution merely to hide a test-isolation problem.

### 10. Investigate Flaky Tests

For intermittent failures, look for unstable behavior such as:

- Race conditions
- Unstable locators
- Shared state
- Timing assumptions
- Asynchronous UI updates
- Network dependencies
- Test data collisions
- Environment dependencies
- Incorrect cleanup
- Order dependencies

Fix the underlying instability rather than masking it with retries or arbitrary waits.

### 11. Determine Whether It Is an Application Defect

Do not assume every failed automated test is an automation defect.

If available evidence shows that:

- The automation performs the expected actions
- The locator is correct
- The test data is valid
- The expected result matches the requirement
- The application produces incorrect behavior

then avoid changing correct automation simply to make the test pass.

### 12. Apply the Smallest Reliable Fix

Once the root cause is established:

- Modify only what is necessary.
- Preserve existing framework structure.
- Reuse existing components.
- Avoid unrelated refactoring.
- Avoid introducing unnecessary abstractions.
- Keep the fix maintainable.

Do not rewrite an entire test when a small reliable change resolves the actual problem.

### 13. Validate the Fix

After making the change, verify when possible that:

- The original failure is resolved.
- The intended behavior is still validated.
- Assertions remain meaningful.
- No hard-coded waits were introduced.
- Locator uniqueness requirements are satisfied.
- Test independence is preserved.
- Existing framework conventions are followed.
- The change does not unnecessarily affect other tests.

When execution capabilities are available, run the relevant test to validate the fix.

Do not claim that a fix has been verified by execution if the test was not actually executed.

### 14. Handle Insufficient Information

If the root cause cannot be reliably determined, do not guess.

Request only the information necessary to continue.

This may include:

- Complete error message
- Failing test code
- Relevant Page Object
- Relevant DOM
- Playwright trace
- Screenshot
- Test output
- Configuration
- Expected application behavior

## Quality Criteria

A debugging result should:

- Address the root cause
- Make the smallest reliable change
- Preserve meaningful assertions
- Preserve test independence
- Avoid arbitrary waits
- Avoid unnecessary timeout increases
- Avoid hiding application defects
- Follow existing framework conventions
- Be based on available evidence

## Important Rules

- Determine the root cause before modifying code.
- Do not use `waitForTimeout()` as a debugging shortcut.
- Do not automatically increase timeouts.
- Do not weaken assertions merely to make a test pass.
- Do not introduce `nth()` or positional locators merely to make a locator pass.
- Do not hide test-isolation problems with serial execution.
- Do not hide flaky behavior with retries when the root cause can be fixed.
- Do not modify correct automation to compensate for an application defect.
- Do not invent missing application behavior or technical information.
- Do not modify unrelated working code.
- Follow applicable project Playwright instructions.

## Output Format

- Output only the code changes required to fix the test.
- Do not include explanations, reasoning, summaries, alternatives, or additional commentary unless explicitly requested.
- If no code change should be made because the evidence indicates an application defect, output only: `Possible application defect. No automation change recommended.`
- If the root cause cannot be determined from the available information, output only a concise request for the specific information required to continue.
- Do not claim the fix was verified unless it was actually executed and validated.
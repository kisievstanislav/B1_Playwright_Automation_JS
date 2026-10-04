---
name: generate-locator
description: Generate a reliable Playwright locator expression using a user-selected locator strategy while avoiding unstable current test data.
---

Generate a reliable Playwright locator expression for the element I provide.

Use the **playwright-locator-generation** skill for the complete locator analysis, generation, and verification workflow.

Follow applicable project Playwright instructions and existing framework conventions.

Use available live application/page information, HTML, DOM, accessibility information, application code, screenshot context, existing locators, Page Objects, and tests to analyze the intended target.

Do not invent DOM information, roles, labels, placeholders, text, test IDs, attributes, application behavior, test data, or identifying information.

Determine whether I am requesting:

- One specific UI element, or
- A collection of UI elements.

Before generating the locator, ask:

```text
Which locator strategy do you want?

1. getByRole
2. getByLabel
3. getByPlaceholder
4. getByText
5. getByTestId
6. locator() - CSS
7. locator() - XPath
8. Best available locator
```

Wait for my selection.

Do not generate a candidate locator with the selection question.

If I already explicitly requested a locator strategy, skip the question and use that strategy.

If I respond with a number from `1` through `8`, use the corresponding strategy.

Do not silently switch to another strategy after I select one.

If I select **Best available locator**, choose the most reliable locator based on stable UI information, Playwright best practices, and project conventions.

## Stable UI Identity

By default, generate the locator from stable UI information rather than changing test/application data.

Possible stable information includes:

- Role
- Stable accessible information
- Label
- Placeholder
- Test ID
- Stable ID
- Stable attribute
- Stable container
- Stable parent-child relationship
- Stable component structure
- Accessibility relationship
- Stable application-defined identifier

Do not assume an attribute is unique merely because it is named `id`, `name`, `data-testid`, `title`, or `aria-label`.

## Do Not Manufacture Uniqueness Using Current Data

Do not use changing current test/application data merely to make the locator unique.

This includes:

- Current search term
- Current search-result title
- Current video title
- Current video ID
- Current product name
- Current username
- Current customer name
- Current order number
- Current record value
- Current row text
- Current card text
- Dynamically generated content

For example, if:

```javascript
page.locator("//a[@id='video-title']");
```

matches multiple elements, do NOT automatically change it to:

```javascript
page.locator("//a[@id='video-title' and @title='Minions - Funniest Scenes']");
```

merely because `Minions - Funniest Scenes` is currently displayed.

That title is changing application data.

Do not automatically replace it with:

```javascript
page.getByRole('link', { name: videoTitle });
```

either.

A runtime variable containing changing application data is still data-driven identification.

Only use a runtime value such as:

```text
videoTitle
videoId
username
productName
orderNumber
```

when I explicitly request a data-driven locator.

## Repeating Collections

For repeating UI structures such as:

- Search results
- Video results
- Products
- Tables
- Rows
- Cards
- Feeds
- Recommendations

distinguish the collection locator from selection of one member.

If a structural locator identifies multiple valid collection members, do not manufacture uniqueness by adding current data.

If I requested one member and stable UI information cannot uniquely distinguish it, ask only:

```text
This element is part of a repeating collection and has no stable unique UI identifier. How should it be selected?

1. By position
2. By runtime data
3. Return the collection locator
```

Wait for my selection.

If I select **By position**, use position only because I explicitly selected it.

If I select **By runtime data**, use the runtime value I provide.

If the required variable/value has not been provided, ask only for the required runtime value or variable name.

If I select **Return the collection locator**, return the locator representing the intended collection even though it matches multiple elements.

## Mandatory Verification

For a single-element request, verify the actual match count whenever live application or sufficient full-DOM access is available.

Use this process:

```text
Generate candidate
        ↓
Check actual matches
        │
        ├── 0 → Reject
        │
        ├── 1 → Verify intended element and stability
        │
        └── >1 → Refine using stable UI information
                         ↓
                  Check again
```

Do not infer uniqueness from syntax.

Do not infer uniqueness from an `id`.

Do not stop after finding a syntactically valid locator.

If a candidate matches multiple elements, refine it only using stable UI information unless I explicitly selected position-based or data-driven identification.

Do not use:

```javascript
nth();
first();
last();
```

or positional XPath merely to turn multiple matches into one.

Do not add current test data merely to turn multiple matches into one.

A single match must still be verified as the intended element.

Evaluate the final locator for:

1. **Correctness** — It identifies the intended UI target.
2. **Uniqueness** — It resolves to exactly one intended element when one element is requested and verification is possible.
3. **Stability** — It does not unnecessarily depend on current data, incidental DOM structure, or ordering.
4. **Strategy compliance** — It uses the locator strategy I selected.

If the selected locator strategy cannot reliably identify the target, do not invent information and do not silently switch strategies.

Output only:

```text
The selected locator strategy cannot reliably identify this element. Please select another locator strategy.
```

If sufficient DOM or application context is unavailable to verify the locator, output only:

```text
Need surrounding DOM or page context to verify a reliable locator.
```

## Output Requirements

Before I select a locator strategy, output only the locator-strategy question and the eight options.

If repeating-element selection is required, output only the three repeating-element selection options and wait for my answer.

After all required selections are complete, output only the Playwright locator expression inside a JavaScript code block.

The JavaScript code block must contain only the locator expression so it can be inserted directly into the editor at the current cursor position.

Example:

```javascript
page.getByRole('button', { name: 'Login' });
```

Example CSS:

```javascript
page.locator('[data-testid="login-button"]');
```

Example XPath:

```javascript
page.locator("//button[@type='submit']");
```

Never output:

- A method
- A function
- A class
- A variable declaration
- A Page Object property
- An assignment
- A test step
- `return`
- Surrounding implementation

Do not place explanatory text before or after the JavaScript code block.

Do not include explanations, reasoning, alternatives, warnings, comments, summaries, or additional code unless I explicitly request them.

If the intended target itself is unclear, output only a concise request for the specific information needed.

## Purpose
Short, actionable guidance for AI coding agents working on this repository (Playwright tests in TypeScript). Focus on concrete, discoverable patterns and commands used in this project.

## Quick project summary
- Type: Playwright Test (TypeScript) automation project.
- Test location: `tests/` (configured in `playwright.config.ts`).
- Key files: `playwright.config.ts`, `tests/example.spec.ts`, `package.json`, `playwright-report/index.html`.

## How to run locally (examples)
- Run all tests: `npx playwright test`
- Run a specific file: `npx playwright test tests/example.spec.ts`
- Run a single test by name: `npx playwright test -g "Home page Elements visibility"`
- Show HTML report: `npx playwright show-report` (reporter set to `html` in config).
- Debug with inspector/headed: `npx playwright test --debug` or `npx playwright test --headed --project=chromium --trace on` and then `npx playwright show-trace`.

Note: `package.json` currently has no `scripts`. If you add one, prefer:
  "test": "playwright test"

## Configuration notes agents must know
- `playwright.config.ts` sets `testDir: './tests'`, `reporter: 'html'`, and `trace: 'on-first-retry'`.
- Multiple projects exist (chromium, firefox, webkit). Do not remove projects unless requested.
- `baseURL` is commented out in config; tests currently use explicit base URL constants (see `tests/example.spec.ts`). If you change this, update tests accordingly.

## Code patterns & conventions (copy exact styles)
- Tests import from Playwright: `import { test, expect } from '@playwright/test';` and live under `tests/*.spec.ts`.
- Browser/context/page pattern used in tests:
  const context = await browser.newContext();
  const page = await context.newPage();
- Locator strategies used in repo: `page.getByTestId('...')`, `page.getByRole(...)`, `page.locator(...)`. Prefer these when editing or adding tests to remain consistent.
- Wait patterns used: `await page.waitForLoadState('networkidle')` is common; avoid introducing blind long timeouts. If retryable flakiness appears, prefer Playwright traces (configured) and `waitForLoadState` or explicit locator waits.
- Popup handling pattern present: `const page1Promise = page.waitForEvent('popup');` followed by clicking the link that opens the popup.

## Editing guidance for tests
- New tests: follow the same structure and naming as `tests/example.spec.ts` and place them in `tests/` with `.spec.ts` suffix.
- Use existing test IDs and roles present in the app (e.g., `nav-link-Tools`, `navbar-logo`) rather than introducing brittle CSS selectors.
- When modifying selectors, search the repo for the selector string first to avoid duplicate/contradictory selectors.

## CI/Debug considerations
- There is no CI config in this repo. On CI, Playwright behavior in `playwright.config.ts` depends on `process.env.CI` (retries/workers). When running on CI, ensure `CI=true` is set.
- Reproduce failures locally using `--headed`, `--project`, and trace options; use `npx playwright show-report` and `npx playwright show-trace` to inspect.

## Files to check when making changes
- `tests/example.spec.ts` — canonical example/test patterns.
- `playwright.config.ts` — test runner settings.
- `package.json` — dependency list; add scripts only if requested.
- `playwright-report/index.html` — generated HTML reporter exists in repo; useful to check past run outputs.

## When to ask the maintainers
- Before adding or changing CI configuration or npm scripts.
- If you plan to set `baseURL` in `playwright.config.ts` (tests currently use an in-test `baseURL` constant).
- If you plan to change the test runner or upgrade Playwright versions that may break the current test syntax.

If anything here is unclear or you'd like a slightly different focus (for example CI-first instructions or a contributor-facing `CONTRIBUTING.md`), tell me what to emphasize and I will iterate.
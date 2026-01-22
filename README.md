# BluePi QA Challenge - Question 2: To-Do List Automation

Playwright automation testing project for To-Do List web application.

**Application Under Test:** https://abhigyank.github.io/To-Do-List/

**Author:** Rkira Helmer  
**Date:** January 22, 2026

---

## Overview

This project contains automated test cases for a To-Do List web application using Playwright and TypeScript. The test suite covers functional testing, negative cases, edge cases, and data validation scenarios.

**Total Test Cases:** 16

---

## Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (version 18 or higher)
- **npm** (version 9 or higher)
- **Git**

Check your versions:
```bash
node --version
npm --version
git --version
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rkirasun/bluepi-todo-automation
cd bluepi-todo-automation
```

### 2. Install dependencies

```

npm install

```

This will install the following packages:
- `@playwright/test` (v1.41.0) - Testing framework
- `@types/node` (v20.10.0) - TypeScript types for Node.js
- `typescript` (v5.3.0) - TypeScript compiler

### 3. Install Playwright browsers

```

npx playwright install

```

This downloads Chromium, Firefox, and WebKit browsers needed for testing.

---

## Running Tests

### Run all tests
```bash
npx playwright test

```

### Run tests with browser visible (headed mode)
```bash
npx playwright test --headed
```

### Run tests in UI mode (interactive)
```bash
npx playwright test --ui
```

### Run specific test file
```bash
npx playwright test tests/todo.spec.ts
```

### Run on specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Debug tests
```bash
npx playwright test --debug
```

### View test report
```bash
npx playwright show-report

```

---

## Project Structure

```
bluepi-todo-automation/
├── pages/
│   └── TodoPage.ts          # Page Object Model
├── tests/
│   └── todo.spec.ts         # Test cases (16 tests)
├── test-results/            # Generated test results
├── playwright-report/       # HTML test report
├── playwright.config.ts     # Playwright configuration
├── package.json             # Dependencies
├── BUG_REPORT.md           # Documented bugs
└── README.md               # This file
```

---

## Test Coverage

The test suite includes:

**Functional Tests (4 cases)**
- Add new task
- Complete task
- Delete task from To-Do
- Delete task from Completed

**Negative Tests (2 cases)**
- Empty string validation
- Whitespace bug (documented)

**Edge Cases & Data Validation (9 cases)**
- Duplicate tasks
- Thai language
- Emoji characters
- Special characters (@#$%)
- Very long text (200+ characters)
- Numbers
- Multiple tasks management

**Performance Test (1 case)**
- Adding 50 tasks

**Total:** 16 test cases

---

## Known Issues

Two bugs were found during testing and are documented in `BUG_REPORT.md`:

1. **BUG-001:** Whitespace Validation (Low Severity)
   - System accepts whitespace-only input
   - Should reject like empty string

2. **BUG-002:** Tab Filtering Not Working (Medium Severity)
   - To-Do and Completed tabs show all tasks
   - Filtering by status doesn't work

Both bugs are reproduced in the test suite with proper documentation.

---

## Configuration

### Playwright Config (`playwright.config.ts`)

- **Timeout:** 30 seconds per test
- **Retries:** 1 time on failure
- **Workers:** Parallel execution
- **Browsers:** Chromium, Firefox, WebKit
- **Screenshots:** On failure
- **Videos:** On first retry
- **Trace:** On first retry

---

## CI/CD

GitHub Actions workflow is configured in `.github/workflows/playwright.yml` for automated testing on push/pull requests.

---

## Additional Notes

### Test Approach
- Used Page Object Model pattern for maintainability
- Proper wait strategies
- Comprehensive test coverage
- Bug documentation in code

### Browser Support
Tests run on:
- Chromium (Chrome/Edge)
- Firefox
- WebKit (Safari)

### Evidence
- Screenshots saved in `test-results/` on failure
- Video recordings available on retry
- HTML report generated after each run

---

## Troubleshooting

### Tests failing
1. Check if browsers are installed: `npx playwright install`
2. Update dependencies: `npm install`
3. Check application is accessible: https://abhigyank.github.io/To-Do-List/

---

## Contact

For questions or clarifications, please contact:

**Rkira Helmer**  
QA Engineer  
January 22, 2026
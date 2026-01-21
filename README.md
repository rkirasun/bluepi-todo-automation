# BluePi QA Challenge – To-Do List Automation

This repository contains automated test scripts for the  
**To-Do List Web Application**: https://abhigyank.github.io/To-Do-List/

The project is implemented using **Playwright** with **TypeScript**,  
created as part of the **BluePi QA Challenge**.

---

## Prerequisites

- Node.js (v14 or higher)
- npm
- Git

---

## Setup & Installation

### 1. Clone repository

```

git clone https://github.com/rkirasun/bluepi-todo-automation.git
cd bluepi-todo-automation

```

### 2. Install dependencies

```

npm install

```

### 3. Install Playwright browsers

```

npx playwright install

```

---

## How to Run Tests

### Run all tests (headless)

```

npx playwright test

```

### Run tests with UI mode

```

npx playwright test --ui

```

### View test report

```

npx playwright show-report

```

---

## Project Structure

```

bluepi-todo-automation/
├── tests/
│   └── todo-list.spec.ts
├── playwright.config.ts
├── package.json
└── README.md

```

---

## Tech Stack

- Framework: Playwright
- Language: TypeScript
- Test Type: UI Automation Testing
- Target Application: https://abhigyank.github.io/To-Do-List/

---

## Notes

- Covers core To-Do List functionalities:
  - Add task
  - Complete task
  - Delete task
- Follows Playwright best practices.

---

Created for the **BluePi QA Challenge**.

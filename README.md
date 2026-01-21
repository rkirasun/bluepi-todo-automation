````markdown
# BluePi QA Challenge – To-Do List Automation 🧪

This repository contains automated test scripts for the  
**To-Do List Web Application**: https://abhigyank.github.io/To-Do-List/

The project is implemented using **Playwright** with **TypeScript**, created as part of the **BluePi QA Challenge**.

---

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm
- Git

---

## 🚀 Setup & Installation

### 1. Clone repository
```bash
git clone https://github.com/rkirasun/bluepi-todo-automation.git
cd bluepi-todo-automation
````

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

---

## 🏃‍♂️ How to Run Tests

### Run all tests (headless)

```bash
npx playwright test
```

### Run tests with UI mode

```bash
npx playwright test --ui
```

### View test report

```bash
npx playwright show-report
```

---

## 🛠 Project Structure

```text
bluepi-todo-automation/
│
├── tests/
│   └── todo-list.spec.ts
│
├── playwright.config.ts
├── package.json
└── README.md
```

---

## 🧪 Tech Stack

* Framework: Playwright
* Language: TypeScript
* Test Type: UI Automation Testing
* Target Application: [https://abhigyank.github.io/To-Do-List/](https://abhigyank.github.io/To-Do-List/)

---

## 📌 Notes

* Covers core To-Do List functionalities:

  * Add task
  * Complete task
  * Delete task
* Designed following Playwright best practices.

---

Created for the **BluePi QA Challenge**.

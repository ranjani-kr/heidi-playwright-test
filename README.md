# ** Heidi Playwright Automation Tests**
This repository contains Playwright automation tests for **Heidi Health** using the **Page Object Model (POM)** approach.

---

## ** Tech Stack & Framework**
- **Test Runner**: [Playwright](https://playwright.dev/)  
- **Programming Language**: JavaScript (Node.js)  
- **Test Strategy**: Page Object Model (POM)  
- **Environment Variables**: `.env` (for secure credentials)  
- **CI/CD**: (Optional) Can be integrated with GitHub Actions/Jenkins  

---

## ** Project Structure**
```
heidi-playwright-tests
│── pages/                   # Page Object Model (POM) classes
│── tests/                   # Test scripts
│── test-data/               # Sample test files
│── test-results/            # Stores test run reports
│── .env                     # Environment variables (ignored in Git)
│── .gitignore               # Files to exclude from Git
│── playwright.config.js      # Playwright configuration
│── package.json             # Dependencies
│── README.md                # Project documentation
```

---

## ** Playwright Configuration (playwright.config.js)**
The `playwright.config.js` file defines:
- **Timeouts**: `30s` default timeout per test  
- **Browser Configurations**:
  - Chromium (Google Chrome)
  - Firefox
  - WebKit (Safari)  
- **Headless Mode**: Enabled by default  
- **Reports & Screenshots**:
  - Screenshots on failure: on
  - Video on failure: on
  - Trace on first retry: on

---

## ** Setup Instructions**
### **1️ Clone the Repository**
```sh
git clone https://github.com/yourusername/heidi-playwright-tests.git
cd heidi-playwright-tests
```

### **2️ Install Dependencies**
```sh
npm install
```

### **3️ Set Up Environment Variables**
Create a `.env` file in the root directory:
```sh
touch .env
```
Add the following variables:
```sh
USER_EMAIL=your_email@example.com
USER_PASSWORD=your_password
```
⚠️ **Ensure `.env` is added to `.gitignore` to keep credentials secure.**

---

## **Test Execution Steps**
This project automates the following **end-to-end flow**:

### **1️ Login**
- Navigates to the **Heidi Health** login page.
- Enters **email** and **password** (from `.env`).
- Verifies successful login.

### **2️ Start a New Session**
- Clicks **"New Session"**.
- Selects **"Upload Session Audio"** from the dropdown.

### **3️ Upload a Recording**
- Waits for the **upload modal**.
- Uploads an audio file.
- Verifies the upload process.

### **4️ Wait for Document Generation**
- Waits for document processing.
- Ensures **"Referral Letter"** and **"Note"** tabs appear.

### **5️ Verify Referral Letter Content**
- Ensures **"Referral Letter"** tab is **selected**.
- Checks that generated content **is not empty**.

### **6️ Verify Notes Content**
- Opens the **"Note"** tab.
- Handles **popup confirmation**.
- Ensures generated notes **are not empty**.

### **7️ Edit Template**
- Clicks **ellipsis icon** and selects **"View/Edit Template"**.
- Modifies template **title and content**.
- Saves the updated template.

### **8️ Verify Updated Notes**
- Ensures a new tab with **updated notes** is created.
- Validates that **new content is present**.

### **9 Logout**
- Clicks the **profile dropdown**.
- Selects **"Logout"**.
- Verifies the **login page is visible**.

---

## ** Running Tests**
### **Run All Tests (Headless Mode)**
```sh
npx playwright test
```

### **Run Tests in a Specific Browser**
```sh
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### **Run Tests with UI (Headed Mode)**
```sh
npx playwright test --project=chromium --headed
```

### **Run a Specific Test**
```sh
npx playwright test tests/e2e/createSession.test.js --project=chromium
```

---

## **Debugging**
### **Run Tests with Debug Mode**
```sh
npx playwright test --debug
```

## ** Playwright Reports**
### **View Test Reports in HTML**
```sh
npx playwright show-report
```

### **Generate Test Reports**
```sh
npx playwright test --reporter=html
```
💡 **Open `playwright-report/index.html` in a browser to view test results.**

---

## ** CI/CD Integration**
This framework can be integrated with **GitHub Actions, Jenkins, GitLab CI/CD** for automated test runs.

---
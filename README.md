📘 SIP Automation – Playwright + Cucumber

📝 Overview

This project automates the SIP Registration and Payment Journey using Playwright and Cucumber (BDD).
The automation covers login, navigation, SIP actions, and eSewa payment initiation.
Due to mandatory security (CAPTCHA + OTP), the automation includes a manual intervention point where the test pauses and the user completes verification.

🚀 Key Features
✔ SIP Portal Automation

🔐 Login using environment variables
🧭 Navigation through SIP dashboard
📝 Form filling and PIN entry
🔁 Page interaction using reusable locators
✔ Payment Flow Support
💳 Auto-fills eSewa ID and password
⏸ Pauses at CAPTCHA screen for manual completion
🔄 Resumes or closes after user completes payment
✔ Persistent Browser Profile
🗂 Saves session, cookies, device info
🚫 Prevents session reset during CAPTCHA
⚙ Ensures stable payment redirection

🔧 Requirements

Node.js LTS
Playwright
Cucumber
Chrome / Chromium

⛔ Manual CAPTCHA Step

The test pauses at the payment gateway:
Solve CAPTCHA manually
Complete OTP
Finalize payment
Return to the test runner and close browser when done
This is necessary because CAPTCHA and OTP cannot be automated.

📸 Test Report

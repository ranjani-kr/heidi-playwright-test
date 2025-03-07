import { test, expect } from '@playwright/test';
require('dotenv').config(); // Load environment variables
const { LoginPage } = require('../../pages/LoginPage');
const { PasswordPage } = require('../../pages/PasswordPage');
const { HomePage } = require('../../pages/HomePage');
const { UploadModal } = require('../../pages/UploadModal');
const { DocumentGenerationPage } = require('../../pages/DocumentGenerationPage');
const { NotePage } = require('../../pages/NotePage');
const { ModalEditTemplatePage } = require('../../pages/ModalEditTemplatePage');
const { ReferralPage } = require('../../pages/ReferralPage');
const path = require('path');

test('Sample Test Flow', async ({ page }) => {
test.setTimeout(150000); // Setting timeout

// Initialize Page Objects
const loginPage = new LoginPage(page);
const passwordPage = new PasswordPage(page);
const homePage = new HomePage(page);
const uploadModal = new UploadModal(page);
const documentGenerationPage = new DocumentGenerationPage(page);
const referralPage = new ReferralPage(page);
const notePage = new NotePage(page);
const modalEditTemplatePage = new ModalEditTemplatePage(page);

// Load credentials from .env
const userEmail = process.env.USER_EMAIL;
const userPassword = process.env.USER_PASSWORD;

// Navigate & Login
await loginPage.goto();
expect(await loginPage.isLoginModalVisible()).toBeTruthy();

await loginPage.enterEmail(userEmail);
expect(await passwordPage.isPasswordVisible()).toBeTruthy();
await passwordPage.enterPassword(userPassword);

// Verify user loggedInSuccessfully
await homePage.verifyUserLoggedIn(userEmail);

// Start a New Session & Upload a File
await homePage.startNewSession();
await homePage.selectDropDownFromStartTranscribing('Upload session audio');

// Wait for Upload a File modal appears
expect(await uploadModal.isUploadTranscriptModalOpen()).toBeTruthy();

const filePath = path.join(process.cwd(), 'test-data', 'test.mp3');
await uploadModal.uploadFile(filePath);

// Wait for Document Generation to Complete
await documentGenerationPage.waitForDocumentGeneration();
    
// Ensure the Referral Letter tabs exist
expect(await documentGenerationPage.isReferralTabPresent()).toBeTruthy();

// Verify Referral Content
await referralPage.verifyAllReferralDetails()

// Open & Verify notes
await notePage.openNotesTab();
await notePage.verifyGeneratedNoteContent();
    
// Select View/Edit Template from EllipsisIcon
await notePage.selectOptionFromEllipsisIcon("View / edit template");

//Edit Generated Template
await modalEditTemplatePage.editTemplate("Acupuncturist's note QA updated", "Subjective -QA updated:");

// Verify Updated Notes
await documentGenerationPage.verifyUpdatedNoteTab("Acupuncturist's note QA updated");
await documentGenerationPage.verifyUpdatedNoteContent();
console.log("Test Execution Completed Successfully!");

//Log out and verify
await homePage.logout();
expect(await loginPage.isLoginModalVisible()).toBeTruthy();
console.log("Logout Successful. Test Completed!");

});

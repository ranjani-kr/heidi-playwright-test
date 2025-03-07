const { expect } = require('@playwright/test');
class HomePage {
    constructor(page) {
        this.page = page;
        this.emailElement = page.locator('p.text-xs', { hasText: 'qa.exercise.heidi@gmail.com' });
        this.newSessionButton = page.getByRole('button', { name: 'New session' });
        this.startTranscribingButton = page.locator('button', { hasText: 'Start transcribing' });
        this.dropdownIcon = this.startTranscribingButton.locator('div.cursor-pointer');
        this.userMenu = page.locator('div[title^="QA Role"]');  
        this.logoutOption = page.locator('div[role="menuitem"]', { hasText: 'Log out' });
    }

    async verifyUserLoggedIn(userEmail) {
        console.log(`Verifying logged-in user: ${userEmail}`);
        await this.emailElement.waitFor({ state: 'visible', timeout: 10000 });
        await expect(this.emailElement).toHaveText(userEmail, { timeout: 10000 });
    }

    async startNewSession() {
        console.log("Starting a new session...");
        await this.newSessionButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.newSessionButton.click();
    }

    async selectDropDownFromStartTranscribing(selectOption) {
        console.log("Opening the upload menu...");
        await this.startTranscribingButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.dropdownIcon.waitFor({ state: 'attached', timeout: 5000 });
        await this.dropdownIcon.waitFor({ state: 'visible', timeout: 5000 });
        const dropdownElement = await this.dropdownIcon.elementHandle(); // Ensure dropdown is stable
        await dropdownElement.waitForElementState('stable');
        await dropdownElement.waitForElementState('visible');
        await this.page.waitForTimeout(10000);
        await this.dropdownIcon.click();// click on arrow icon next to Start transcribing
        const selecDropdownOption = this.page.locator('[role="menuitem"]', { hasText: selectOption });
        await selecDropdownOption.waitFor({ state: 'visible' }); // Wait for it to be visible
        await this.page.waitForTimeout(1000);
        await selecDropdownOption.click();
    }

    async logout() {
        console.log("Clicking on the QA Role dropdown...");
        await this.userMenu.waitFor({ state: 'visible', timeout: 10000 });
        await this.userMenu.click();

        console.log("Clicking on 'Log out'...");
        await this.logoutOption.waitFor({ state: 'visible', timeout: 10000 });
        await this.logoutOption.click();
    }

}

module.exports = { HomePage };

class LoginPage {
    constructor(page) {
        this.page = page;
        this.modal = page.locator('[role="dialog"]'); // Login modal
        this.welcomeText = this.modal.locator('h2', { hasText: 'Welcome back' });
        this.emailInput = this.modal.locator('input[type="email"]');
        this.signInButton = this.modal.locator('button', { hasText: 'Sign in with email' });  
    }

    async goto() {
        console.log("Navigating to Login Page");
        await this.page.goto('/');
    }

    async isLoginModalVisible() {
        await this.modal.waitFor({ state: 'visible', timeout: 10000 }).catch(() => false);
        return this.welcomeText.isVisible({ timeout: 3000 });
    }

    async enterEmail(email) {
        console.log(`Entering email: ${email}`);
        await this.emailInput.waitFor({ state: 'visible', timeout: 5000 });
        await this.emailInput.fill(email);
        await this.signInButton.click();
    }
}

module.exports = { LoginPage };

class PasswordPage{
    constructor(page){
        this.page = page;
        this.heading = page.locator('h1',{hasText:'Enter your password'});
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
    }

    async isPasswordVisible() {
        return await this.heading.isVisible(); 
    }
    async waitForPasswordField() {
        await this.password.waitFor({ state: 'visible', timeout: 10000 });
    }

    async enterPassword(password) {
        await this.password.fill(password);
        await this.continueButton.click();
    }
}

module.exports = { PasswordPage };
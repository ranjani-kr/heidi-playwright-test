const { expect } = require('@playwright/test');

class ReferralPage {
    constructor(page) {
        this.page = page;
        this.referralTab = page.getByRole('tab', { name: 'Referral letter' });
        this.referralContent = page.locator('div[contenteditable="true"]');
    }

    async verifyReferralTabExists() {
        console.log("🔍 Checking if 'Referral letter' tab is present...");
        await expect(this.referralTab).toBeVisible({ timeout: 60000 });
    }
    async verifyReferralTabHighlighted() {
        console.log("🔍 Checking if 'Referral letter' tab is highlighted...");
        await expect(this.referralTab).toHaveAttribute('aria-selected', 'true');
    }

    async verifyReferralContentGenerated() {
        console.log("🔍 Checking if 'Referral letter' content is generated...");
        await this.referralContent.waitFor({ state: 'visible', timeout: 120000 });
        await expect(this.referralContent).not.toBeEmpty();
    }

    async verifyAllReferralDetails() {
        await this.verifyReferralTabExists();
        await this.verifyReferralTabHighlighted();
        await this.verifyReferralContentGenerated();
    }
}
module.exports = {ReferralPage};
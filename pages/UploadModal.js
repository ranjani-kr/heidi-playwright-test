const { expect } = require('@playwright/test');

class UploadModal {
    constructor(page) {
        this.page = page;
        this.modal = page.locator('[role="dialog"]');
        this.heading = this.modal.locator('h3', { hasText: 'Upload a recording' });
        this.fileInput = page.locator('input[type="file"][accept*="audio"]');
    }

    async isUploadTranscriptModalOpen(){
        return await this.modal.isVisible();
    }

    async uploadFile(filePath) {
        console.log("Waiting for the upload modal to open...");
        await this.modal.waitFor({ state: 'visible', timeout: 60000 });
        await expect(this.heading).toHaveText('Upload a recording');
        await this.fileInput.setInputFiles(filePath);
        await this.page.waitForSelector('[role="dialog"]', { state: 'hidden', timeout: 150000 });
    }
}

module.exports = {UploadModal};
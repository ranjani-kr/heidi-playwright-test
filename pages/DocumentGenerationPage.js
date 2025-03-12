const { expect } = require('@playwright/test');

class DocumentGenerationPage {
    constructor(page) {
        this.page = page;
        this.generatingDoc = page.locator('button:has-text("Generating document")');
        this.referralTab = page.getByRole('tab', { name: 'Referral letter' });
        this.notesTab = page.getByRole('tab', { name: 'Note' }); 
    }

    async waitForDocumentGeneration() {
        //await this.generatingDoc.waitFor({ state: 'visible', timeout: 180000 });
        await this.generatingDoc.waitFor({ state: 'hidden', timeout: 180000 });
        await Promise.race([
            this.page.waitForFunction(() => !document.querySelector('button')?.innerText.includes('Generating document'), null, { timeout: 180000 }),
            this.referralTab.waitFor({ state: 'visible', timeout: 180000 })
        ]);
        console.log("Document generation completed!");
    }

    async isNoteTabPresent() {
        await this.notesTab.waitFor({ state: 'visible', timeout: 180000 });
        return this.notesTab.isVisible();
    }

    async isReferralTabPresent(){
        await this.referralTab.waitFor({ state: 'visible', timeout: 180000 });
        return this.referralTab.isVisible();

    }
    
    async verifyUpdatedNoteTab(noteTabName) {
        console.log(`Checking if updated note tab '${noteTabName}' is created...`);
        const updatedNotesTab = this.page.getByRole('tab', { name: noteTabName });
        await expect(updatedNotesTab).toBeVisible({ timeout: 120000 });
        await expect(updatedNotesTab).toHaveAttribute('aria-selected', 'true');
    }

    async verifyUpdatedNoteContent() {
        console.log("Checking if updated note content is present...");
        const updatedNewNotes = this.page.locator('.tiptap.ProseMirror[role="textbox"]');
        await updatedNewNotes.waitFor({ state: 'visible', timeout: 60000 });
        await expect(updatedNewNotes).not.toBeEmpty();

        // Verify the expected content exists
        const extractedText = await updatedNewNotes.textContent();
        console.log("Extracted Text:", extractedText);
        await expect(extractedText).toMatch(/Subjective -QA updated/i);
    }
    
}

module.exports = {DocumentGenerationPage};
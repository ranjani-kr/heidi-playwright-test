const { expect } = require('@playwright/test');

class NotePage {
    constructor(page) {
        this.page = page;
        this.notesTab = page.getByRole('tab', { name: 'Note' });
        this.popup = page.getByRole('alertdialog');
        this.understandButton = page.locator('button', { hasText: 'I understand' });
        this.notesGenerated = page.locator('.DraftEditor-editorContainer [contenteditable="true"]');
        this.ellipsisIcon = page.locator('#note-settings-container').getByRole('button').nth(3);
        this.viewEditTemplateOption = page.locator('div[role="menuitem"]', { hasText: 'View / edit template' });
        this.editTemplateDialog = page.locator('span', { hasText: 'Edit template' });
        this.dialogPop = page.locator('//div[@role="dialog"]');
        this.templateHeading = page.getByPlaceholder("Untitled template");
        this.templateContent = page.locator('textarea[placeholder="Start writing your template content here..."]');
        this.saveButton = page.getByRole('button', { name: 'Save & use' });
    }

    async openNotesTab() {
        console.log('Clicking on the "Note" tab...');
        await this.notesTab.click();

        // Check if the pop-up appears and handle it
        const isPopupVisible = await this.popup.isVisible({ timeout: 3000 }).catch(() => false);
        if (isPopupVisible) {
            console.log('Handling the pop-up...');
            await this.understandButton.waitFor({ state: 'visible', timeout: 60000 });
            await this.understandButton.click();
            await this.popup.waitFor({ state: 'hidden', timeout: 60000 });
        }
        else {
            console.log('No popup detected. Proceeding...');
        }
    }

    async verifyGeneratedNoteContent() {
        console.log("Verifying generated note content...");
        await this.notesGenerated.waitFor({ state: 'visible', timeout: 120000 });
        await expect(this.notesGenerated).not.toBeEmpty();
    }

    async selectOptionFromEllipsisIcon(selectOption) {
        console.log('Clicking the ellipsis icon...');
        await this.ellipsisIcon.click();
    
        console.log(`Selecting '${selectOption}' from the dropdown...`);
        const optionLocator = this.page.locator('div[role="menuitem"]', { hasText: selectOption });
    
        await optionLocator.waitFor({ state: 'visible', timeout: 60000 });
        await optionLocator.click();
    }

}

module.exports = { NotePage };

const { expect } = require('@playwright/test');

class ModalEditTemplatePage {
    constructor(page) {
        this.page = page;
        this.editTemplateDialog = page.locator('span', { hasText: 'Edit template' });
        this.dialogPop = page.locator('//div[@role="dialog"]');
        this.templateHeading = page.getByPlaceholder("Untitled template");
        //this.templateContent = page.locator('textarea[placeholder="Start writing your template content here..."]');
        this.templateContent = page.locator('.tiptap.ProseMirror[role="textbox"]').nth(1);
        this.saveButton = page.getByRole('button', { name: 'Save & use' });
    }

    async editTemplate(newHeading, newContent) {
        console.log('Waiting for the "Edit Template" dialog to appear...');
        await this.editTemplateDialog.waitFor({ state: 'visible', timeout: 60000 });
        await this.dialogPop.waitFor({ state: 'visible', timeout: 60000 });

        console.log("Editing template heading...");
        await this.templateHeading.fill(newHeading);

        console.log("Editing template content...");
        await this.templateContent.waitFor({ state: 'visible', timeout: 60000 });

        const existingText = await this.templateContent.textContent();
        const updatedContent = existingText.replace(/^Subjective:.*/, newContent);

        //await this.templateContent.fill(updatedContent);
        // Clear and fill the new content
        await this.templateContent.evaluate((el, value) => {
            el.innerText = value; // Directly update the inner text
        }, updatedContent);
        
        console.log("Template content updated.");

        console.log("Selecting 'Document' option...");
        await this.page.locator('div.flex.rounded-sm:has-text("Note")').click();
        const dropdown = this.page.locator('select');
        await dropdown.selectOption('DOCUMENT_TEMPLATE');

        console.log(" Closing dropdown...");
        await this.page.mouse.click(10, 10); // Click outside to close dropdown

        console.log('Clicking the "Save & use" button...');
        let retries = 3;
        while (retries > 0) {
            try {
                await this.saveButton.click({ timeout: 5000 });
                break;
            } catch (error) {
                console.log(`Retry ${4 - retries}: Button not clickable, retrying...`);
                retries--;
                await this.page.waitForTimeout(1000);
            }
        }

        if (retries === 0) {
            console.log('Button is not clickable after retries, forcing click...');
            await this.saveButton.click({ force: true });
        }
    }
}

module.exports = { ModalEditTemplatePage };

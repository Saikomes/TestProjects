import BrowserActions from "../../../Common/browserActions";
import { expect } from "@playwright/test";

class ManageAccountsBaseActions {
    constructor(page, accountElements) {
        this.page = page;
        this.manageAccountsElements = accountElements;
    }

    async clickButtonIfEnabled(button) {
        const classAttribute = await button.getAttribute('class');
        if (!classAttribute.includes('ui-button-disabled')) {
            await button.click()
        }
        await BrowserActions.waitForPageReady(this.page)
    }

    async checkAssignmentButtonForDisable(button) {
        const classAttribute = await button.getAttribute('class');
        const groupTitleLocator = button.locator('xpath=./ancestor::li[contains(@class, "group-elt")] >> span.nq-name');
        const groupTitle = await groupTitleLocator.textContent();
        expect(classAttribute).toContain('ui-button-disabled', `Expected '${groupTitle}' button to be disabled, but it wasn't.`);
        return true;
    }

    async grantGroupAssignment(identifier, groupName) {
        await this.selectAccount(identifier)
        let addToGroupButton = this.manageAccountsElements.groupListItemAddButton(groupName)
        await this.clickButtonIfEnabled(addToGroupButton)
        await this.selectAccount(identifier);
        addToGroupButton = this.manageAccountsElements.groupListItemAddButton(groupName);
        expect(await this.checkAssignmentButtonForDisable(addToGroupButton), `Пользователь ${identifier} добавлен в группу ${groupName}`).toBeTruthy()
    }

    async removeGroupAssignment(identifier, groupName) {
        await this.selectAccount(identifier)
        let removeFromGroupButton = this.manageAccountsElements.groupListItemRemoveButton(groupName)
        await this.clickButtonIfEnabled(removeFromGroupButton)
        await this.selectAccount(identifier);
        removeFromGroupButton = this.manageAccountsElements.groupListItemRemoveButton(groupName)
        await this.checkAssignmentButtonForDisable(removeFromGroupButton)
        expect(await this.checkAssignmentButtonForDisable(removeFromGroupButton), `Пользователь ${identifier} удален из группы ${groupName}`).toBeTruthy()
    }

    async removeAllAssignments(identifier) {
        await this.selectAccount(identifier)
        const availableRemoveButtons = await this.manageAccountsElements.removeFromGroupButton().all()
        for (let removeButton of availableRemoveButtons) {
            const classAttribute = await removeButton.getAttribute('class');
            if (!classAttribute.includes('ui-button-disabled')) {
                await this.clickButtonIfEnabled(removeButton)
                await this.selectAccount(identifier)
                await BrowserActions.waitForPageReady(this.page)
            }
        }
        const removeButtons = await this.manageAccountsElements.removeFromGroupButton().all()
        for (let removeButton of removeButtons) {
            await this.checkAssignmentButtonForDisable(removeButton)
            expect(await this.checkAssignmentButtonForDisable(removeButton), `Пользователь ${identifier} удален из группы`).toBeTruthy()
        }
    }
}
export default ManageAccountsBaseActions
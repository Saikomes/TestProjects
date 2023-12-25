import MainMenuPageLocators from "../../locators/mainPageLocators";

class AdminMainPageElements {

    static changeTypeButton(page) {
        return page.locator(MainMenuPageLocators.changeTypeButton.locator);
    }

    static changeTypeMenu(page) {
        return page.locator(MainMenuPageLocators.changeTypeMenu.locator);
    }

    static changeTypeMenuItemByName(page, itemName) {
        return this.changeTypeMenu(page).locator(`${MainMenuPageLocators.changeTypeMenuItem.locator}:has-text("${itemName}")`);
    }

    static aboutButton(page) {
        return page.locator(MainMenuPageLocators.aboutButton.locator)
    }

    static helpButton(page) {
        return page.locator(MainMenuPageLocators.helpButton.locator)
    }

    static logoutButton(page) {
        return page.locator(MainMenuPageLocators.helpButton.locator)
    }

    static clientNameInput(page) {
        return page.locator(MainMenuPageLocators.clientNameInput.locator)
    }

    static linkToClientPageByEmail(page, email) {
        return page.locator(MainMenuPageLocators.linkToClientPageByEmail.locator(email))
    }

    static aboutDialogContent(page) {
        return page.locator(MainMenuPageLocators.aboutDialogContent.locator)
    }

    static helpDialog(page) {
        return page.locator(MainMenuPageLocators.helpDialog.locator)   
    }

    static logoutButton(page) {
        return page.locator(MainMenuPageLocators.logoutButton.locator)
    }

    static adminHeaderTitle(page) {
        return page.locator(MainMenuPageLocators.adminHeaderTitle.locator)
    }

}

export default AdminMainPageElements;
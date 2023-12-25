import MainMenuPageLocators from "../../locators/mainPageLocators";

class AdminMainPageMenuElements {

    static mainMenu(page) {
        return page.locator(MainMenuPageLocators.mainMenu.locator);
    }

    static mainMenuItem(page) {
        return page.locator(MainMenuPageLocators.mainMenuPageItem.locator);
    }

    static mainMenuItemByName(page, menuItemName) {
        return page.locator(MainMenuPageLocators.mainMenuPageItemByName.locator(menuItemName));
    }
    
    static subMenuItem(page) {
        return page.locator(MainMenuPageLocators.subMenuPageItem.locator);
    }
    
    static subMenuItemTitle(subMenuItem) {
        return subMenuItem.locator(MainMenuPageLocators.subMenuItemTitle.locator);
    }

    static menuItemTitle(menuItem) {
        return menuItem.locator(MainMenuPageLocators.mainMenuItemTitle.locator);
    }

}

export default AdminMainPageMenuElements;
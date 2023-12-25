import MainPageLocators from "../../locators/mainPage/mainPageLocators";
import TestHelpers from "../../../Common/modules/testHelpers";

class ClientMainPageMenuElements {

    constructor(page) {
        this.page = page;
    }

    mainPageMenuArea() {
        return this.page.locator(MainPageLocators.mainPageMenuLocators.mainPageMenuArea.locator)
    }

    mainMenuPageItem() {
        return TestHelpers.getLinkedLocator(this.mainPageMenuArea(), MainPageLocators.mainPageMenuLocators.mainMenuPageItem.locator)
    }

    menuItemTitle(menuElement) {
        return TestHelpers.getLinkedLocator(menuElement, MainPageLocators.mainPageMenuLocators.menuItemTitle.locator)
    }

    mainPageMenuItemByName(itemName) {
        return TestHelpers.getLinkedLocator(this.mainPageMenuArea(), MainPageLocators.mainPageMenuLocators.mainMenuPageItemByName.locator(itemName))
    }

    cabinetTitle() {
        return this.page.locator(MainPageLocators.controlPaneLocators.cabinetTitle.locator)
    }



}
export default ClientMainPageMenuElements
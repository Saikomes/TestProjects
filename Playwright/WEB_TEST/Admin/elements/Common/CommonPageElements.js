import CommonElementsLocators from "../../locators/Common/commonElementsLocators";
import TestHelpers from "../../../Common/modules/testHelpers";
export class CommonPageElements {

    static async menuFolderByName(page, name) {
        const menuFolders = await page.locator(CommonElementsLocators.horizontalMenuLocators.horizontalMenuFolder.locator).all();
        for (let menuFolder of menuFolders) {
            const menuFolderTitle = await menuFolder.locator(CommonElementsLocators.horizontalMenuLocators.horizontalMenuTitle.locator).first().textContent()
            if (menuFolderTitle=== name.replace(/\s+/g, '').trim() ) {
                return menuFolder
              }
          } 
    }

    static menuFolderExpandButton(page) {
        return page.locator(CommonElementsLocators.horizontalMenuLocators.horizontalMenuItemButton.locator)
    }

    static menuExpandButtonByName(menuItem) {
        return TestHelpers.getLinkedLocator(menuItem, CommonElementsLocators.horizontalMenuLocators.horizontalMenuItemButton.locator)
    }

    static menuItem(page, href) {
        const locator = page.locator(CommonElementsLocators.horizontalMenuLocators.horizontalMenuItem.locator(href))
        return locator;
    }

    static subMenuItem(page, href) {
        const locator = page.locator(CommonElementsLocators.horizontalMenuLocators.horizontalSubMenuItem.locator(href))
        return locator;
    }

    static prosoftLogo(page) {
        return page.locator(CommonElementsLocators.horizontalMenuLocators.prosoftLogo.locator)
    }

}

export default CommonPageElements
import { expect } from "@playwright/test";
import menuStructure from "../../modules/menuStructure";
import CommonPageElements from "../../elements/Common/CommonPageElements";
import MainMenuPageLocators from "../../locators/mainPageLocators";
import PageHelpers from "../../modules/PageHelpers";
import MainMenuElements from "../../elements/MainPage/adminMainPageMenuElements";
import BrowserActions from "../../../Common/browserActions";
import AdminMainPageMenuElements from "../../elements/MainPage/adminMainPageMenuElements";
import MenuConfig from "../../config/menuConfig";

class AdminMenuActions {

    static async navigateToPage(page, title, role = 'Admin', menuType = 'main') {
        await page.waitForLoadState('load');
        if ((await AdminMainPageMenuElements.mainMenu(page).count()) === 0){
            menuType = 'horizontal';
        }
        let expectedToolBar = null;

        const menuItems = menuStructure[role];
        
        for (const menuItem of menuItems) {
            let mainMenuItem;
            let expandButton;
            let menuFolder;
            if (menuType === 'horizontal') {
                menuFolder = await CommonPageElements.menuFolderByName(page, menuItem.menuName)
                if(menuFolder) {
                    mainMenuItem = menuFolder
                }
                else {
                    mainMenuItem = CommonPageElements.menuItem(page, menuItem.href);
                }
                expandButton = CommonPageElements.menuExpandButtonByName(mainMenuItem);
            } else {
                mainMenuItem = MainMenuElements.mainMenuItemByName(page, menuItem.menuName);
            }

            if (menuItem.menuName === title && menuItem.subMenu.length === 0) {
                await mainMenuItem.click();
                await BrowserActions.waitForPageReady(page)
                const currentUrl = await page.url();
                expect(currentUrl.endsWith(menuItem.href), `Переход на ${menuItem.menuName} произошел успешно`).toBeTruthy()
                expectedToolBar = PageHelpers.getExpectedToolBar(menuItems, title, 'menu');
                break;
            }
            else {
                for (const subMenuItem of menuItem.subMenu) {
                    if (subMenuItem.subMenuName === title) {
                        if (menuType === 'horizontal') {
                            await expandButton.click()
                            await CommonPageElements.subMenuItem(page, subMenuItem.href).hover()
                            await CommonPageElements.subMenuItem(page, subMenuItem.href).click()
                            await BrowserActions.waitForPageReady(page)
                            const currentUrl = await page.url();
                            expect(currentUrl.endsWith(subMenuItem.href), `Переход на ${subMenuItem.subMenuName} произошел успешно`).toBeTruthy()
                            break;
                        } else {
                            await mainMenuItem.click();
                            expectedToolBar = PageHelpers.getExpectedToolBar(menuItems, title, 'submenu');
                            await this.clickSubMenuItem(page, title);
                            break;
                        }                
                    }
                }
            }
        }
        // if (expectedToolBar) {
        //     await PageHelpers.checkForToolbarTitle(page, expectedToolBar);
        // }
        await BrowserActions.waitForPageReady(page)
    }

    static async clickSubMenuItem(page, title) {
        const subMenuItems = await page.locator(MainMenuPageLocators.subMenuPageItem.locator).all();

        for (let subMenuItem of subMenuItems) {
            if (await subMenuItem.isVisible()) {
                const navTitle = MainMenuElements.subMenuItemTitle(subMenuItem)
                const navTitleText = await navTitle.textContent();

                if (navTitleText === title) {
                    await subMenuItem.click();
                    break;
                }
            }
        }
    }

    
    static async navigateToMain(page) {
        if ((await AdminMainPageMenuElements.mainMenu(page).count()) === 0){
            await CommonPageElements.prosoftLogo(page).click()
            await BrowserActions.waitForPageReady(page)
        }
    }

    static async checkItemForBlock(itemAllowed, menuItem, title) {
        if (!itemAllowed) {
            let oldTitle = await menuItem.getAttribute('class');
            expect(oldTitle, `Элемент ${title} недоступен так как нет прав`).toContain('nav-blured')
        }
    }

}

export default AdminMenuActions;

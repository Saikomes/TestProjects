import { expect } from '@playwright/test';
import CommonElementsLocators from '../locators/Common/commonElementsLocators';


export class PageHelpers {

    static getExpectedToolBar(menuStructure, title, type) {
        for (const menuItem of menuStructure) {
            if (type === 'menu' && menuItem.menuName === title) {
                return menuItem.pageTitle;
            }
            if (type === 'submenu') {
                for (const subMenuItem of menuItem.subMenu) {
                    if (subMenuItem.subMenuName === title) {
                        return subMenuItem.pageTitle;
                    }
                }
            }
        }
        return null;
    }

    static async checkForToolbarTitle(page, expectedToolBar) {
        await page.waitForLoadState('load');
        const elementLocator = page.locator(`${CommonElementsLocators.horizontalMenuLocators.toolBarTitle.locator}:has-text("${expectedToolBar}")`);
        expect(await elementLocator.isVisible()).toBeTruthy();
    }

    static async checkForExpectedError(page, expectedErrorMessage) {
        await page.waitForLoadState('load');
        const elementLocator = page.locator(`${CommonElementsLocators.horizontalMenuLocators.exceptionMessage.locator}`);

        expect(await elementLocator.textContent()).toContain(expectedErrorMessage);
    }
}

export default PageHelpers

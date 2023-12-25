import { expect } from '@playwright/test';
import ElementActions from '../../Common/modules/elementActions';
import PageElements from './pageElements';
import TestConfig from '../config/adminTestConfig';
import menuStructure from './menuStructure';

export class PageActions {

    static async login(page) {
        if (TestConfig.DBMS == "PGSQL") {
            await page.waitForSelector(PageElements.areaLogin.locator);
            await page.getByLabel('Имя пользователя').fill(TestConfig.ADMIN_USER);
            await page.getByLabel('Пароль').fill(TestConfig.ADMIN_PASSWORD);
            const locator = await page.getByRole('button', { name: 'Войти' });
            await ElementActions.clickButton(page, locator);
        }
        return page;

    }

    static async waitForMainMenu(page) {
        await page.waitForSelector(PageElements.mainMenuPageItem.locator, { state: 'visible' });
    }

    static async goBack(page) {
        await page.goBack();
    }

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

    static async checkForToolbarTitle(page, toolBarTitle) {
        await page.waitForLoadState('load');
        const elementLocator = page.locator(`${PageElements.toolBarTitle.locator}:has-text("${toolBarTitle}")`);
        expect(await elementLocator.isVisible()).toBeTruthy();
        await this.goBack(page);
    }

    static async processMenuItem(page, menuItem) {
        const title = await menuItem.locator(PageElements.menuItemTitle.locator).first().innerText();
        const currentUrl = page.url();
        await menuItem.click();

        if (page.url() !== currentUrl) {
            const expectedToolBar = this.getExpectedToolBar(menuStructure, title, 'menu');
            await this.checkForToolbarTitle(page, expectedToolBar);
        }

        const subMenuItems = await page.locator(PageElements.subMenuPageItem.locator).all();
        for (let subMenuItem of subMenuItems) {
            await this.processSubMenuItem(page, subMenuItem, menuItem, title);
        }
    }

    static async processSubMenuItem(page, subMenuItem, menuItem) {
        if (await subMenuItem.isVisible()) {
            const subMenuItemTitle = await subMenuItem.locator(PageElements.menuItemTitle.locator).innerText();
            const expectedToolBar = this.getExpectedToolBar(menuStructure, subMenuItemTitle, 'submenu');
            await subMenuItem.click();
            await this.checkForToolbarTitle(page, expectedToolBar);
            await menuItem.click();
        }
    }
}

export default PageActions;

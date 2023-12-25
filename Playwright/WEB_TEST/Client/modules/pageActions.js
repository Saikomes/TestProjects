import { expect } from '@playwright/test';
import ElementActions from './elementActions'
import PageElements from './pageElements';
import ClientTestConfig from '../config/clientTestConfig';
import menuItemToPageTitleMapping from '../data/menuItemToPageTitleMapping.json';

export class PageActions {

    static async login(page) {
        await page.waitForSelector('#Email');
        await page.getByLabel('Электронная почта').fill(ClientTestConfig.CLIENT_EMAIL);
        await page.waitForSelector('#Password');
        await page.getByLabel('Пароль').fill(ClientTestConfig.CLIENT_PASSWORD);
        const locator = await page.getByRole('button', { name: 'Войти' });
        await ElementActions.clickButton(page, locator);
        return page
    }

    static async checkForPageTitle(page, menuItemTitle) {
        const expectedPageTitle = menuItemToPageTitleMapping[menuItemTitle];
        await page.waitForSelector('.blockUI.blockMsg.blockPage', { state: 'detached' });
        expect(await page.locator(`${PageElements.headerPageTitle.locator}`).innerText()).toEqual(expectedPageTitle);
    }


    static async processMenuItem(page, menuItem) {

        const menuItemTitleElement = await menuItem.locator('span');
        
        const menuItemTitle = await menuItemTitleElement.innerText();

        await Promise.all([
            page.waitForNavigation(),
            menuItem.click(),
        ]);
    
        await this.checkForPageTitle(page, menuItemTitle);
    }
    

}

export default PageActions
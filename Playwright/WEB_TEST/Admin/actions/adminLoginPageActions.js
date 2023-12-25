import { expect } from '@playwright/test';
import PageElements from '../modules/pageElements';
import AdminTestConfig from '../config/adminTestConfig';
import menuStructure from '../modules/menuStructure';

export class AdminLoginPageActions {

    static async login(page, user, password) {
        if (await page.isVisible('.logon-form')) {
            await page.waitForSelector(PageElements.areaLogin.locator);
            await page.getByLabel('Имя пользователя').fill(user);
            await page.getByLabel('Пароль').fill(password);
            const loginButton = await page.getByRole('button', { name: 'Войти' });
            await loginButton.click()
            await page.waitForLoadState('load');
        }
        return page;

    }
}
export default AdminLoginPageActions
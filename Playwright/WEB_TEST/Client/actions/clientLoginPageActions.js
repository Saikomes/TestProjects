import ClientTestConfig from "../config/clientTestConfig";
class ClientLoginPageActions {
    static async login(page, email, password) {
        await page.waitForSelector('#Email');
        await page.getByLabel('Электронная почта').fill(email);
        await page.waitForSelector('#Password');
        await page.getByLabel('Пароль').fill(password);
        const loginButton = await page.getByRole('button', { name: 'Войти' });
        await loginButton.click()
        await page.waitForLoadState('load');
        return page
    }
}
export default ClientLoginPageActions
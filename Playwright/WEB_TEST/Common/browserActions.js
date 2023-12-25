import { expect} from '@playwright/test';
export class BrowserActions {
    static async setup(browser, url) {
        const page = await browser.newPage();

        // Navigate to the page
        await page.goto(url);
    
        return page;
    }
    
    static async teardown(page) {
        await page.close();
    }

    static async waitForAjaxToComplete(page, timeout = 30000) {
        const startTime = Date.now();
        const isJQueryAvailable = await page.evaluate(() => {
            return typeof window.jQuery !== 'undefined';
        });
        if(!isJQueryAvailable) {
            return;
        }
        while (true) {
            const numberOfActiveAjaxRequests = await page.evaluate(() => $.active);
            if (numberOfActiveAjaxRequests === 0) {
                await Promise.race([
                    page.waitForSelector('.b-ajax-spinner', { state: 'hidden', timeout: timeout }),
                    page.waitForSelector('.b-ajax-spinner', { state: 'detached', timeout: timeout })
                ]);
                return;
            }
    
            if (Date.now() - startTime > timeout) {
                console.error('waitForAjaxToComplete timed out.');
            }

            await page.waitForTimeout(100);
        }
    }

    static async waitPageBlockPass(page) {
        await page.waitForSelector('.blockUI.blockMsg.blockPage', { state: 'detached' });
    }

    static async checkForError(page) {
        const errorIsVisible = await page.locator('.b-es-error-message').isVisible() || await page.locator('h2:text-is("Ошибка")').isVisible()
        expect(errorIsVisible, "Проверка на наличие сообщения об ошибке").toBeFalsy()
    }

    //ждем пока страница не будет доступна для работы(ajax завершен, интерфейс не заблокирован)
    static async waitForPageReady (page, timeout = 30000) {
        await page.waitForLoadState();
        await page.waitForLoadState('domcontentloaded')
        await this.waitForAjaxToComplete(page, timeout);
        await this.waitPageBlockPass(page)
        await this.checkForError(page)
    }
}

export default BrowserActions;

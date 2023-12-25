import CommonPageElements from "../../elements/common/commonPageElements";
import menuItemToPageTitleMapping from "../../data/menuItemToPageTitleMapping.json"
import BrowserActions from "../../../Common/browserActions";
import { expect } from "@playwright/test";

class CommonClientPageActions {
    constructor(page) {
        this.page = page
        this.commonPageElements = new CommonPageElements(page);
    }

    async checkForPageTitle(menuItemTitle) {
        const expectedPageTitle = menuItemToPageTitleMapping[menuItemTitle];
        await BrowserActions.waitForPageReady(this.page)
        const pageTitle = await this.commonPageElements.headerPageTitle().innerText()
        expect(pageTitle, `Заголовок страницы ожидаем: ${expectedPageTitle}`).toEqual(expectedPageTitle);
    }

}
export default CommonClientPageActions
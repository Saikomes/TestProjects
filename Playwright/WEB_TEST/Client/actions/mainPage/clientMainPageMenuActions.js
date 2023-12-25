import ClientMainPageMenuElements from "../../elements/mainPage/clientMainPageMenuElements"
import menuItemToPageTitleMapping from "../../data/menuItemToPageTitleMapping.json"
import CommonPageElements from "../../../Admin/elements/Common/CommonPageElements"
import BrowserActions from "../../../Common/browserActions"
import { expect } from "@playwright/test"
class ClientMainPageMenuActions {

    constructor(page){
        this.page = page
        this.commonPageElements = new CommonPageElements(page)
        this.mainPageMenuElements = new ClientMainPageMenuElements(page)
    }

    async navigateToPage(pageName) {
        await this.mainPageMenuElements.mainPageMenuItemByName(pageName).click()
        await BrowserActions.waitForPageReady(this.page)
    }

    async checkItemForBlock(itemAllowed, menuItem) {
        if (!itemAllowed) {
            let oldTitle = await menuItem.getAttribute('oldtitle');
            expect(oldTitle).toBe('Нет доступа. Обратитесь к администратору.')
        }
    }

    async headerPageTitle() {

    }


}

export default ClientMainPageMenuActions
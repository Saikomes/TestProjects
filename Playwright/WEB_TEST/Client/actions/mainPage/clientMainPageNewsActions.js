import ClientMainPageNewsElements from "../../elements/mainPage/clientMainPageNewsElements"
import menuItemToPageTitleMapping from "../../data/menuItemToPageTitleMapping.json"
import BrowserActions from "../../../Common/browserActions"
import { expect } from "@playwright/test"
class ClientMainPageNewsActions {

    constructor(page){
        this.page = page
        this.mainPageNewsElements = new ClientMainPageNewsElements(page)
    }

    async checkNewsIsShown(newsTitle) {
        const count = await this.mainPageNewsElements.newsItemByTitle(newsTitle).count()
        expect(count, `News "${newsTitle}" is present on page`).toBeGreaterThan(0)
    }


}

export default ClientMainPageNewsActions
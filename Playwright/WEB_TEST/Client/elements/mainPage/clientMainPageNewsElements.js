import MainPageLocators from "../../locators/mainPage/mainPageLocators";
import TestHelpers from "../../../Common/modules/testHelpers";

class ClientMainPageNewsElements {

    constructor(page) {
        this.page = page;
    }

    mainPageNewsArea() {
        return this.page.locator(MainPageLocators.mainPageNewsLocators.newsArea.locator)
    }

    newsItemByTitle(title) {
        return TestHelpers.getLinkedLocator(this.mainPageNewsArea(), MainPageLocators.mainPageNewsLocators.newsItemByTitle.locator(title))
    }

}
export default ClientMainPageNewsElements
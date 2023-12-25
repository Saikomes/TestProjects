import CommonPageLocators from "../../locators/common/commonPageLocators";

class CommonPageElements {

    constructor(page) {
        this.page = page;
    }

    headerPageTitle() {
        return this.page.locator(CommonPageLocators.headerPageTitle.locator)
    }

}
export default CommonPageElements
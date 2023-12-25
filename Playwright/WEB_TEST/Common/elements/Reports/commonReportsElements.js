import CommonReportsLocators from "../../locators/Reports/commonReportsLocators";
import TestHelpers from "../../modules/testHelpers";


class CommonReportsElements {
    constructor(page) {
        this.page = page;
    }

    reportsSideBar() {
        return this.page.locator(CommonReportsLocators.reportsSideBarLocators.reportsSideBar.locator);
    }

    reportParamArea() {
        return this.page.locator(CommonReportsLocators.reportParamLocators.reportParamArea.locator);
    }

    slickToggleForCategory(categoryName) {
        return TestHelpers.getLinkedLocator(this.reportsSideBar(), CommonReportsLocators.reportsSideBarLocators.slickToggleForCategory.locator(categoryName));
    }

    reportRowByName(reportName) {
        return TestHelpers.getLinkedLocator(this.reportsSideBar(), CommonReportsLocators.reportsSideBarLocators.reportRowByName.locator(reportName));
    }

    reportRowName(reportLocator) {
        return TestHelpers.getLinkedLocator(reportLocator, CommonReportsLocators.reportsSideBarLocators.reportRowName.locator);
    }

    buttonShowReport() {
        return TestHelpers.getLinkedLocator(this.reportParamArea(), CommonReportsLocators.reportParamLocators.buttonShowReport.locator);
    }

    selectFormatDropMenu() {
        return TestHelpers.getLinkedLocator(this.reportParamArea(), CommonReportsLocators.reportParamLocators.selectFormatDropMenu.locator);
    }

    selectFormatDropMenuItem(formatName) {
        return this.page.locator(CommonReportsLocators.reportParamLocators.optionByName.locator(formatName));
    }

}
export default CommonReportsElements
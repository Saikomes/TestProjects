import AccountingDataLocators from "../../../locators/AccountingData/accountingDataLocators";
import TestHelpers from "../../../../Common/modules/testHelpers";

export class ReadingsTypePanelElements {

    constructor(page, parentLocator = null) { 
        this.page = page;
        this.parentLocator = parentLocator ? page.locator(parentLocator) : page;
    }

    dataTypeToolBar() {
        return TestHelpers.getLinkedLocator(this.parentLocator, AccountingDataLocators.dataTypeToolbarLocators.dataTypeToolBar.locator)
    }

    NIButton() {
        return TestHelpers.getLinkedLocator(this.dataTypeToolBar(), AccountingDataLocators.dataTypeToolbarLocators.readingsNI.locator)
    }

    PRButton() {
        return TestHelpers.getLinkedLocator(this.dataTypeToolBar(), AccountingDataLocators.dataTypeToolbarLocators.readingsPR.locator)
    }

    PEButton() {
        return TestHelpers.getLinkedLocator(this.dataTypeToolBar(), AccountingDataLocators.dataTypeToolbarLocators.profilePE.locator)
    }

    PPButton() {
        return TestHelpers.getLinkedLocator(this.dataTypeToolBar(), AccountingDataLocators.dataTypeToolbarLocators.profilePP.locator)
    }

}

export default ReadingsTypePanelElements
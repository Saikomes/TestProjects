import JqTableLocators from "../../../locators/Common/Tables/jqTableLocators";
import TestHelpers from "../../../../Common/modules/testHelpers";
export class UiTableElements {
    constructor(page, parentLocator = null) { 
        this.page = page;
        this.parentLocator = parentLocator ? page.locator(parentLocator) : page;
    }

    deleteRowButton(row) {
        return TestHelpers.getLinkedLocator(row, JqTableLocators.deleteRowButton.locator);
    }

    editRowButton(row) {
        return TestHelpers.getLinkedLocator(row, JqTableLocators.editRowButton.locator);
    }

    detailedButton(row) {
        return TestHelpers.getLinkedLocator(row, JqTableLocators.detailedButton.locator);
    }

}

export default UiTableElements
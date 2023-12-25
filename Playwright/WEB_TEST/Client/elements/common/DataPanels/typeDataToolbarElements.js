import TypeDataToolbarLocators from "../../../locators/common/DataPanels/typeDataToolbarLocators";
import TestHelpers from "../../../../Common/modules/testHelpers";


class TypeDataToolbarElements {

    constructor(page) {
        this.page = page;
    }

    typeDataToolbar() {
        return this.page.locator(TypeDataToolbarLocators.typeDataToolbarLocators.typeDataToolbar.locator)
    }

    meteringPointButton() {
        return TestHelpers.getLinkedLocator(this.typeDataToolbar(), TypeDataToolbarLocators.typeDataToolbarLocators.meteringPointButton.locator)
    }

    detalisationButton() {
        return TestHelpers.getLinkedLocator(this.typeDataToolbar(), TypeDataToolbarLocators.typeDataToolbarLocators.detalisationButton.locator)
    }

}
export default TypeDataToolbarElements
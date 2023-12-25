import CommonElementsLocators from "../../locators/Common/commonElementsLocators";
import JqTableElements from "./Tables/jqTableElements";
import { TestHelpers } from "../../../Common/modules/testHelpers";

class ControlPaneElements {
    constructor(page, parentLocator = null) { 
        this.page = page;
        this.parentElement = parentLocator ? this.page.locator(parentLocator) : page;
    }

    controlPanel() {
        return TestHelpers.getLinkedLocator(this.parentElement, CommonElementsLocators.controlPaneLocators.controlPanel.locator)
    }

    searchInput() {
        return TestHelpers.getLinkedLocator(this.controlPanel(), CommonElementsLocators.controlPaneLocators.searchInput.locator)
    }

    searchButton() {
        return TestHelpers.getLinkedLocator(this.controlPanel(), CommonElementsLocators.controlPaneLocators.searchButton.locator)
    }

    buttonAdd() {
        return TestHelpers.getLinkedLocator(this.controlPanel(), CommonElementsLocators.controlPaneLocators.buttonAdd.locator)
    }

}
export default ControlPaneElements
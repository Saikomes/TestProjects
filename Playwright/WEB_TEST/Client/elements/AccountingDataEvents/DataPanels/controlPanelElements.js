import AccountingDataEventsLocators from "../../../locators/AccountingDataEvents/accountingDataEventsLocators";
import TestHelpers from "../../../../Common/modules/testHelpers";
import BaseControlPanelElements from "../../common/DataPanels/baseControlPanelElements";

export class ControlPanelElements extends BaseControlPanelElements {

    constructor(page) {
        super(page, AccountingDataEventsLocators.controlPanelLocators) 
    }

    controlPanel() {
        return this.page.locator(AccountingDataEventsLocators.controlPanelLocators.controlPanel.locator)
    }

    filterButton() {
        return TestHelpers.getLinkedLocator(this.controlPanel(), AccountingDataEventsLocators.controlPanelLocators.filterButton.locator)
    }

}

export default ControlPanelElements
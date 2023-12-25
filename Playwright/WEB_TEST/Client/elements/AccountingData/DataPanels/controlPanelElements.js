import AccountingDataLocators from "../../../locators/AccountingData/accountingDataLocators";
import TestHelpers from "../../../../Common/modules/testHelpers";
import BaseControlPanelElements from "../../common/DataPanels/baseControlPanelElements";

export class ControlPanelElements extends BaseControlPanelElements {

    constructor(page, parentLocator = null) { 
        super(page, AccountingDataLocators.controlPanelLocators)
        this.parentLocator = parentLocator ? page.locator(parentLocator) : page;
    }

    settingsButton() {
        return this.parentLocator.locator(this.controlPanelLocators.settingsButton.locator)
    }

}

export default ControlPanelElements
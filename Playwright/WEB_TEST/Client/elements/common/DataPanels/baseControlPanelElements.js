import TestHelpers from "../../../../Common/modules/testHelpers";

export class BaseControlPanelElements {

    constructor(page, controlPanelLocators) { 
        this.page = page;
        this.controlPanelLocators = controlPanelLocators
    }

    controlPanel() {
        return this.page.locator(this.controlPanelLocators.controlPanel.locator)
    }

    refreshButton() {
        return TestHelpers.getLinkedLocator(this.controlPanel(), this.controlPanelLocators.refreshButton.locator)
    }

    exportFormatButton() {
        return TestHelpers.getLinkedLocator(this.controlPanel(), this.controlPanelLocators.exportFormatButton.locator)
    }

    exportFormatMenu() {
        return TestHelpers.getLinkedLocator(this.controlPanel(), this.controlPanelLocators.exportFormatMenu.locator)
    }

    exportFormatOption(format) {
        return TestHelpers.getLinkedLocator(this.controlPanel(), this.controlPanelLocators.exportFormatOption.locator(format))
    }

}

export default BaseControlPanelElements
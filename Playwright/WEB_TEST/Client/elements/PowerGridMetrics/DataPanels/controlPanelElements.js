import PowerGridMetricsLocators from "../../../locators/PowerGridMetrics/powerGridMetricsLocators";
import TestHelpers from "../../../../Common/modules/testHelpers";
import BaseControlPanelElements from "../../common/DataPanels/baseControlPanelElements";

export class ControlPanelElements extends BaseControlPanelElements {

    constructor(page, parentLocator = null) { 
        super(page, PowerGridMetricsLocators.controlPanelLocators)
        this.parentLocator = parentLocator ? page.locator(parentLocator) : page;
    }

    showReportTgButton() {
        return TestHelpers.getLinkedLocator(this.controlPanel(), PowerGridMetricsLocators.controlPanelLocators.showReportTgButton.locator)
    }

    getCurrentDataButton() {
        return TestHelpers.getLinkedLocator(this.controlPanel(), PowerGridMetricsLocators.controlPanelLocators.currentDataButton.locator)
    }

    showReportButton() {
        return TestHelpers.getLinkedLocator(this.controlPanel(), PowerGridMetricsLocators.controlPanelLocators.showReportButton.locator)
    }

    gridMetricsParamsButton() {
        return TestHelpers.getLinkedLocator(this.controlPanel(), PowerGridMetricsLocators.controlPanelLocators.gridMetricsParamsButton.locator)
    }

    exportFormatOption(format) {
        return this.page.locator(PowerGridMetricsLocators.controlPanelLocators.exportFormatOption.locator(format))
    }

}

export default ControlPanelElements
import AccountingDataEventsLocators from "../../../locators/AccountingDataEvents/accountingDataEventsLocators";
import PowerGridMetricsLocators from "../../../locators/PowerGridMetrics/powerGridMetricsLocators";
import UiDialogElements from "../../common/uiDialogElements";
import TestHelpers from "../../../../Common/modules/testHelpers";


class GridMetricsParamsDialogElements extends UiDialogElements {

    constructor(page) {
        super(page)
    }

    gridMetricsParamsDialog() {
        return this.page.getByLabel(PowerGridMetricsLocators.gridMetricsParamsDialogLocators.gridMetricsParamsDialog.label)
    }

    selectAllButton() {
        return TestHelpers.getLinkedLocator(this.gridMetricsParamsDialog(), PowerGridMetricsLocators.gridMetricsParamsDialogLocators.selectAllButton.locator)
    }

    deselectAllButton() {
        return TestHelpers.getLinkedLocator(this.gridMetricsParamsDialog(), PowerGridMetricsLocators.gridMetricsParamsDialogLocators.deselectAllButton.locator)
    }

    invertButton() {
        return TestHelpers.getLinkedLocator(this.gridMetricsParamsDialog(), PowerGridMetricsLocators.gridMetricsParamsDialogLocators.invertButton.locator)
    }

    expandAllButton() {
        return TestHelpers.getLinkedLocator(this.gridMetricsParamsDialog(), PowerGridMetricsLocators.gridMetricsParamsDialogLocators.expandAllButton.locator)
    }

    collapseAllButton() {
        return TestHelpers.getLinkedLocator(this.gridMetricsParamsDialog(), PowerGridMetricsLocators.gridMetricsParamsDialogLocators.collapseAllButton.locator)
    }
}
export default GridMetricsParamsDialogElements
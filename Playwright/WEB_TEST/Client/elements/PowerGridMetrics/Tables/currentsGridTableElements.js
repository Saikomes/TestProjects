import JsTreeTableElements from "../../common/Tables/jsTreeTableElements"
import PowerGridMetricsLocators from "../../../locators/PowerGridMetrics/powerGridMetricsLocators"

class CurrentsGridTableElements {

    constructor(page) {
        this.page = page
    }

    currentsGridTable() {
        return this.page.locator(PowerGridMetricsLocators.currentsGridLocators.currentsGridTable.locator)
    }

}
export default CurrentsGridTableElements
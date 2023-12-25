import JsTreeTableElements from "../../common/Tables/jsTreeTableElements"
import PowerGridMetricsLocators from "../../../locators/PowerGridMetrics/powerGridMetricsLocators"

class SVectorDiagramElements {

    constructor(page) {
        this.page = page
    }

    sVectorDiagram() {
        return this.page.locator(PowerGridMetricsLocators.sVectorDiagramLocators.sVectorDiagram.locator)
    }

}
export default SVectorDiagramElements
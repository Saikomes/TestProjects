import JsTreeTableElements from "../../common/Tables/jsTreeTableElements"
import PowerGridMetricsLocators from "../../../locators/PowerGridMetrics/powerGridMetricsLocators"

class IuVectorDiagramElements {

    constructor(page) {
        this.page = page
    }

    iuVectorDiagram() {
        return this.page.locator(PowerGridMetricsLocators.iuVectorDiagramLocators.iuVectorDiagram.locator)
    }

}
export default IuVectorDiagramElements
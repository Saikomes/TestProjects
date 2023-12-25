import JsTreeTableActions from "../../common/Tables/jsTreeTableActions";
import { expect } from "@playwright/test";

class GridMetricsParamsTableActions extends JsTreeTableActions {

    constructor(page) {
        super(page, "#paramsTree-tree")
    }
}
export default GridMetricsParamsTableActions
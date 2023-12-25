import JsTreeTableActions from "./jsTreeTableActions";
import { expect } from "@playwright/test";

class PointsTreeTableActions extends JsTreeTableActions {

    constructor(page) {
        super(page, "#pointsTree-tree")
    }

}
export default PointsTreeTableActions
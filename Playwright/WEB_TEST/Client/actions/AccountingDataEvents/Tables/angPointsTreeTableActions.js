import AngTableActions from "../../common/Tables/AngTableActions";
import { expect } from "@playwright/test";

class AngPointsTreeTableActions extends AngTableActions {

    constructor(page) {
        super(page, "#pointsTree-tree")
    }
}
export default AngPointsTreeTableActions
import CommonPanelsLocators from "../../../locators/Common/DataPanels/commonPanelsLocators";
import ControlPaneElements from "../controlPaneElements";
import JqTableElements from "../Tables/jqTableElements";
import TestHelpers from "../../../../Common/modules/testHelpers";

export class PointsDetailsTableElements {

    constructor(page, parentLocator = null) { 
        this.page = page;
        this.parentLocator = parentLocator ? page.locator(parentLocator) : page;
    }

    tableRowById(rowId) {
        return this.parentLocator.locator(CommonPanelsLocators.pointsDetailsTableLocators.rowById.locator(rowId))
    }

}

export default PointsDetailsTableElements
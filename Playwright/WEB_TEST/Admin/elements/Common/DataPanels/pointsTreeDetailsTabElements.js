import CommonPanelsLocators from "../../../locators/Common/DataPanels/commonPanelsLocators";
import ControlPaneElements from "../controlPaneElements";
import JqTableElements from "../Tables/jqTableElements";
import PointsDetailsTableElements from "./pointsDetailsTableElements";
import TestHelpers from "../../../../Common/modules/testHelpers";
import SlickTableElements from "../Tables/slickTableElements";
export class PointsTreeDetailsTabElements {

    constructor(page) {
        this.page = page
        this.pointsDetailsTableElements = new SlickTableElements(page, CommonPanelsLocators.pointsTreeDetailsTab.tabPointsDetailsTree.locator)
        this.controlPaneElements = new ControlPaneElements(page, CommonPanelsLocators.pointsTreeDetailsTab.tabPointsDetailsTree.locator)
    }

    tabPointsTreeDetails() {
        return this.page.locator(CommonPanelsLocators.pointsTreeDetailsTab.tabPointsDetailsTree.locator)
    }

}

export default PointsTreeDetailsTabElements
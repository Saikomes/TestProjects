import CommonPanelsLocators from "../../../locators/Common/DataPanels/commonPanelsLocators";
import ControlPaneElements from "../controlPaneElements";
import JqTableElements from "../Tables/jqTableElements";
import TestHelpers from "../../../../Common/modules/testHelpers";
export class PointsTreeTabElements {

    constructor(page) {
        this.page = page
        this.jqTableElements = new JqTableElements(page, CommonPanelsLocators.pointsTreeTab.tabPointsTree.locator)
        this.controlPaneElements = new ControlPaneElements(page, CommonPanelsLocators.pointsTreeTab.tabPointsTree.locator)
    }

    tabPointsTree() {
        return this.page.locator(CommonPanelsLocators.pointsTreeTab.tabPointsTree.locator)
    }

    treeModeDropdown() {
        return TestHelpers.getLinkedLocator(this.tabPointsTree(), CommonPanelsLocators.pointsTreeTab.treeModeDropdown.locator)
    }

    searchParamDropdown() {
        return TestHelpers.getLinkedLocator(this.tabPointsTree(), CommonPanelsLocators.pointsTreeTab.searchParamDropdown.locator)
    }



}

export default PointsTreeTabElements
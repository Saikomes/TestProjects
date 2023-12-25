import PointsTreeDetailsTabElements from "../../../elements/Common/DataPanels/pointsTreeDetailsTabElements";
import PointsTreeDetailsTableActions from "./pointsDetailsTableActions";
import ControlPaneActions from "../controlPaneActions";
import CommonPanelsLocators from "../../../locators/Common/DataPanels/commonPanelsLocators";
import UiFormActions from "../uiFormActions";
class PointsTreeDetailsTabActions {
    constructor(page) {
        this.page = page
        this.pointsTreeDetailsTabElements = new PointsTreeDetailsTabElements(page)
        this.pointsTreeDetailsTableActions = new PointsTreeDetailsTableActions(page, CommonPanelsLocators.pointsTreeDetailsTab.tabPointsDetailsTree.locator)
        this.controlPaneActions = new ControlPaneActions(page, CommonPanelsLocators.pointsTreeDetailsTab.tabPointsDetailsTree.locator)
        this.uiFormActions = new UiFormActions(page)
    }
}

export default PointsTreeDetailsTabActions
import PointsTreeTabElements from "../../../elements/Common/DataPanels/pointsTreeTabElements";
import JqTableActions from "../Tables/jqTableActions";
import ControlPaneActions from "../controlPaneActions";
import CommonPanelsLocators from "../../../locators/Common/DataPanels/commonPanelsLocators";
import UiFormActions from "../uiFormActions";
import BrowserActions from "../../../../Common/browserActions";
class PointsTreeTabActions {
    constructor(page) {
        this.page = page
        this.pointsTreeTabElements = new PointsTreeTabElements(page)
        this.pointTableActions = new JqTableActions(page, CommonPanelsLocators.pointsTreeTab.tabPointsTree.locator)
        this.controlPaneActions = new ControlPaneActions(page, CommonPanelsLocators.pointsTreeTab.tabPointsTree.locator)
        this.uiFormActions = new UiFormActions(page)
    }

    async chooseTreeMode(treeModeValue) {
        const dropdown = this.pointsTreeTabElements.treeModeDropdown()
        await this.uiFormActions.selectDropdownOptionByElement(dropdown, treeModeValue)
    }

    async chooseSearchParam(searchParam) {
        const dropdown = this.pointsTreeTabElements.searchParamDropdown()
        await this.uiFormActions.selectDropdownOptionByElement(dropdown, searchParam)
    }

    async performSearch(searchParam, paramValue) {
        await this.chooseSearchParam(searchParam)
        await this.controlPaneActions.fillSearchField(paramValue)
        await this.controlPaneActions.launchSearch()
        await BrowserActions.waitForPageReady(this.page)
    }
}

export default PointsTreeTabActions
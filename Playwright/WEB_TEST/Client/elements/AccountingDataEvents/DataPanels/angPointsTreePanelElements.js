import AngPointsTreePanelLocators from "../../../locators/AccountingDataEvents/DataPanels/angPointsTreePanelLocators";
import AngPointsTreeTableElements from "../Tables/angPointsTreeTableElements";
import TestHelpers from "../../../../Common/modules/testHelpers";


class AngPointsTreePanelElements {

    constructor(page) {
        this.page = page;
        this.angPointsTreeTableElements = new AngPointsTreeTableElements(this.page)
    }

    pointsTreePanel() {
        return this.page.locator(AngPointsTreePanelLocators.pointsTreePanel.pointsTreePanel.locator)
    }

    energoResourseDropdown() {
        return TestHelpers.getLinkedLocator(this.pointsTreePanel(), AngPointsTreePanelLocators.pointsTreePanel.resourseType.locator)
    }

    searchInput() {
        return this.pointsTreePanel().getByPlaceholder( AngPointsTreePanelLocators.pointsTreePanel.searchInput.placeholder)
    }

}
export default AngPointsTreePanelElements
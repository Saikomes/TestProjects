import PointsTreePanelLocators from "../../../locators/common/DataPanels/pointsTreePanelLocators";
import TestHelpers from "../../../../Common/modules/testHelpers";


class PointsTreePanelElements {

    constructor(page) {
        this.page = page;
    }

    pointsTreePanel() {
        return this.page.locator(PointsTreePanelLocators.pointsTreePanel.pointsTreePanel.locator)
    }

    levelSelect() {
        return TestHelpers.getLinkedLocator(this.pointsTreePanel(), PointsTreePanelLocators.pointsTreePanel.levelSelect.locator)
    }

    energoResourseDropdown() {
        return TestHelpers.getLinkedLocator(this.pointsTreePanel(), PointsTreePanelLocators.pointsTreePanel.resourseType.locator)
    }

    searchInput() {
        return this.pointsTreePanel().getByPlaceholder( PointsTreePanelLocators.pointsTreePanel.searchInput.placeholder)
    }

    async pointsTreeElement(text) {
        const checkboxRole =  PointsTreePanelLocators.pointsTreePanel.pointsTreeElement(text);
        return await this.pointsTreePanel().getByRole(checkboxRole.role, { name: checkboxRole.name }); 
    }

    pointsTreeElementCheckbox(pointsTreeElement) {
        return TestHelpers.getLinkedLocator(pointsTreeElement, PointsTreePanelLocators.pointsTreePanel.pointsTreeElementCheckBox.locator)
    }

    pointsTreeElementRow(pointsTreeElement) {
        return TestHelpers.getLinkedLocator(pointsTreeElement, '//./ancestor::li[1]')
    }

    pointsTreeRow() {
        return TestHelpers.getLinkedLocator(this.pointsTreePanel(), PointsTreePanelLocators.pointsTreePanel.pointsTreeRow.locator)
    }

}
export default PointsTreePanelElements
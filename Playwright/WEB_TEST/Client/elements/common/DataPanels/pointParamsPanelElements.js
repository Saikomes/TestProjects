import PointParamsPanelLocators from "../../../locators/common/DataPanels/pointParamsPanelLocators";
import TestHelpers from "../../../../Common/modules/testHelpers";


class PointParamsPanelElements {

    constructor(page) {
        this.page = page;
    }

    pointParamsPanel() {
        return this.page.locator(PointParamsPanelLocators.pointParamsPanelLocators.pointParamsPanel.locator)
    }

    searchField() {
        return TestHelpers.getLinkedLocator(this.pointParamsPanel(), PointParamsPanelLocators.pointParamsPanelLocators.searchField.locator)
    }

    applyParamsButton() {
        return TestHelpers.getLinkedLocator(this.pointParamsPanel(), PointParamsPanelLocators.pointParamsPanelLocators.applyParamsButton.locator)
    }

    paramsGroup (groupName) {
        return TestHelpers.getLinkedLocator(this.pointParamsPanel(), PointParamsPanelLocators.pointParamsPanelLocators.paramsGroup.locator(groupName))
    }

    groupExpandButton (group) {
        return TestHelpers.getLinkedLocator(group, PointParamsPanelLocators.pointParamsPanelLocators.groupExpandButton.locator)
    }

}
export default PointParamsPanelElements
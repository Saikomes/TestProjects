import AngPointsTreePanelElements from "../../../elements/AccountingDataEvents/DataPanels/angPointsTreePanelElements";
import BrowserActions from "../../../../Common/browserActions";
import AngPointsTreeTableActions from "../Tables/angPointsTreeTableActions";
import { expect } from "@playwright/test";

class AngPointsTreePanelActions {

    constructor(page) {
        this.page = page;
        this.angPointsTreePanelElements = new AngPointsTreePanelElements(page)
        this.angPointsTreeTableActions = new AngPointsTreeTableActions(page)
    }


    async selectEnergoresourse(resourseValue) {
        const resourseType = await this.page.evaluate((id) => {
            const resourceType = es.ResourceTypes.find(type => type.Id === id);
            return resourceType ? resourceType.Name : null;
          }, resourseValue);
        await this.angPointsTreePanelElements.energoResourseDropdown().hover()
        await this.angPointsTreePanelElements.energoResourseDropdown().click()
        const menuLocator = this.page.locator(".ui-dropdown-items")
        await menuLocator.locator(`p-dropdownitem li:has(span:text-is("${resourseType}"))`).click()
        await BrowserActions.waitForPageReady(this.page)
    }

    async performSearch(text) {
        await this.angPointsTreePanelElements.searchInput().fill(text)
        await this.angPointsTreePanelElements.searchInput().press("Enter")
    }

}
export default AngPointsTreePanelActions
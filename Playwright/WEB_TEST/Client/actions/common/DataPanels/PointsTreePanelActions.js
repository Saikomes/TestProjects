import PointsTreePanelElements from "../../../elements/common/DataPanels/pointsTreePanelElements";
import BrowserActions from "../../../../Common/browserActions";
import ClientElementActions from "../../../modules/clientElementActions";
import AccountingDataLocators from "../../../locators/AccountingData/accountingDataLocators";
import PointsTreeTableActions from "../Tables/pointsTreeTableActions";
import { expect } from "@playwright/test";

class PointsTreePanelActions {

    constructor(page) {
        this.page = page;
        this.pointsTreePanelElements = new PointsTreePanelElements(page)
        this.clientElementActions = new ClientElementActions(page)
        this.pointsTreeTableActions =  new PointsTreeTableActions(page)
    }

    async selectPointLevel(optionValue) {
        await this.clientElementActions.chooseOptionInSelect(this.pointsTreePanelElements.pointsTreePanel(),
        AccountingDataLocators.pointsTreePanelLocators.pointsTreeControlLocators.levelSelect.locator, optionValue)
    }

    async selectEnergoresourse(resourseValue) {
        const resourseType = await this.page.evaluate((id) => {
            const resourceType = es.ResourceTypes.find(type => type.Id === id);
            return resourceType ? resourceType.Name : null;
          }, resourseValue);
        await this.pointsTreePanelElements.energoResourseDropdown().hover()
        await this.pointsTreePanelElements.energoResourseDropdown().click()
        const menuLocator = this.page.locator(".ui-dropdown-items")
        await menuLocator.locator(`p-dropdownitem li:has(span:text-is("${resourseType}"))`).click()
        await BrowserActions.waitForPageReady(this.page)
    }

    async performSearch(text) {
        await this.pointsTreePanelElements.searchInput().fill(text)
        await this.pointsTreePanelElements.searchInput().press("Enter")
    }

    // async selectPointTreeElement(text) {
    //     await this.performSearch(text)
    //     const pointTreeElement = await this.pointsTreePanelElements.pointsTreeElement(text)
    //     await pointTreeElement.click()
    //     await BrowserActions.waitForPageReady(this.page)
    //     const pointsTreeElementRow = this.pointsTreePanelElements.pointsTreeElementRow(pointTreeElement)
    //     const pointsTreeElementCheckbox = this.pointsTreePanelElements.pointsTreeElementCheckbox(pointsTreeElementRow)
    //     const isUnchecked = await pointsTreeElementRow.getAttribute('class').then(classes => classes.includes('jstree-unchecked'));
    //     const isCheckboxVisible = await pointsTreeElementCheckbox.isVisible();
    //     if (isUnchecked && isCheckboxVisible) {
    //         await pointsTreeElementCheckbox.click();
    //         await BrowserActions.waitForPageReady(this.page, 80000)
    //     }
    // }

}
export default PointsTreePanelActions
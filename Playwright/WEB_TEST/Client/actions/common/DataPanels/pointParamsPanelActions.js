import PointParamsPanelElements from "../../../elements/common/DataPanels/pointParamsPanelElements";
import BrowserActions from "../../../../Common/browserActions";
import ClientElementActions from "../../../modules/clientElementActions";
import ClientElementVerifications from "../../../modules/clientElementVerifications";
import CommonElementsLocators from "../../../locators/common/commonElementsLocators";
import { expect } from "@playwright/test";

class PointParamsPanelActions {

    constructor(page) {
        this.page = page;
        this.pointParamsPanelElements = new PointParamsPanelElements(page)
        this.clientElementActions = new ClientElementActions(page)
        this.clientElementVerifications = new ClientElementVerifications(page)
    }

    async expandParamGroup(paramGroup) {
        const paramsGroup = await this.pointParamsPanelElements.paramsGroup(paramGroup)
        const isExpanded = await paramsGroup.getAttribute('class').then(classes => classes.includes('expanded'));
        if(!isExpanded) {
            await this.pointParamsPanelElements.groupExpandButton(paramsGroup).click()
        }
    }

    async applyParams(params) {
        for(let key in params) {
            await this.expandParamGroup(params[key].detalisationGroup)
            const paramCheckboxLocator = CommonElementsLocators.checkBoxByTitle.locator(params[key].detalisationName)
            await this.clientElementActions.checkCheckbox(this.pointParamsPanelElements.pointParamsPanel(), paramCheckboxLocator)
            await this.clientElementVerifications.verifyCheckboxState(this.pointParamsPanelElements.pointParamsPanel(),paramCheckboxLocator, true)
        }
        await this.pointParamsPanelElements.applyParamsButton().click()
        await BrowserActions.waitForPageReady(this.page)
    }

}
export default PointParamsPanelActions
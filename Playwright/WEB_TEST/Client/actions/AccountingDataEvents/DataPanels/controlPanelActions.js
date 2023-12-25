import ControlPanelElements from "../../../elements/AccountingDataEvents/DataPanels/controlPanelElements";
import BrowserActions from "../../../../Common/browserActions";
import { expect } from "@playwright/test";
import BaseControlPanelActions from "../../common/DataPanels/baseControlPanelActions";
export class ControlPanelActions extends BaseControlPanelActions {

    constructor(page) {
        const controlPanelElements = new ControlPanelElements(page)
        super(page, controlPanelElements);
    }

    async openFilterDialog() {
        await this.controlPanelElements.filterButton().click()
    }

}

export default ControlPanelActions
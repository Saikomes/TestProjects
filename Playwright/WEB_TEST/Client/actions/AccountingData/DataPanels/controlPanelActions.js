import ControlPanelElements from "../../../elements/AccountingData/DataPanels/controlPanelElements";
import BaseControlPanelActions from "../../common/DataPanels/baseControlPanelActions";
import BrowserActions from "../../../../Common/browserActions";
import { expect } from "@playwright/test";
export class ControlPanelActions extends BaseControlPanelActions {

    constructor(page) {
        const controlPanelElements = new ControlPanelElements(page);
        super(page, controlPanelElements);
    }

    async openSettingsDialog() {
        await this.controlPanelElements.settingsButton().click()
    }

}

export default ControlPanelActions
import ControlPanelElements from "../../../elements/AccountingDataEvents/DataPanels/controlPanelElements";
import BrowserActions from "../../../../Common/browserActions";
import { expect } from "@playwright/test";
import UiFormActions from "../uiFormActions";

class BaseControlPanelActions extends UiFormActions {

    constructor(page, controlPanelElements) {
        super(page);
        this.controlPanelElements = controlPanelElements;
    }

    async openFilterDialog() {
        await this.controlPanelElements.filterButton().click()
    }

    async refreshEvents() {
        await this.controlPanelElements.refreshButton().click()
    }

    async exportResult(format) {
        await this.controlPanelElements.exportFormatButton().hover()
        await this.controlPanelElements.exportFormatButton().click()
        await this.controlPanelElements.exportFormatOption(format).hover()
        await this.controlPanelElements.exportFormatOption(format).click()
        const newPage = await new Promise(resolve => {
            this.page.once('popup', resolve);
        });

        await BrowserActions.waitForPageReady(newPage)
        await newPage.waitForLoadState('networkidle')
        
        const url = newPage.url();

        expect(url).not.toBeNull()

        return newPage;
        
    }

}

export default BaseControlPanelActions
import { UiTableElements } from "../../../elements/Common/Tables/uiTableElements";
import BrowserActions from "../../../../Common/browserActions";
import ToolTipDialogActions from "../toolTipDialogActions";
import ToolTipDialogElements from "../../../elements/Common/toolTipDialogElements";
import { expect } from '@playwright/test';

class UiTableActions {
    constructor(page, parentLocator = null) {
        this.page = page;
        this.uiTableElements = new UiTableElements(page, parentLocator);
        this.parentLocator = parentLocator ? page.locator(parentLocator) : page;
    }

    async editRow(row) {
        await this.uiTableElements.editRowButton(row).click()
    }

    async deleteRow(row) {
        const toolTipDialogActions = new ToolTipDialogActions(this.page)
        const toolTipDialogElements = new ToolTipDialogElements(this.page)
        await this.uiTableElements.deleteRowButton(row).click()
        await this.page.waitForTimeout(2000);
        if(await toolTipDialogElements.toolTipDialog().isVisible()) {
            await toolTipDialogActions.chooseDialogOption("Ок")
        }
    }

}

export default UiTableActions
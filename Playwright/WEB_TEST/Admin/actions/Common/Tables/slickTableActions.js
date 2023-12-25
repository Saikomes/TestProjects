import SlickTableElements from "../../../elements/Common/Tables/slickTableElements";
import UiTableActions from "./uiTableActions";
import ToolTipDialogActions from "../toolTipDialogActions";
import { expect } from '@playwright/test';

class SlickTableActions extends UiTableActions {
    constructor(page, parentLocator = null) {
        super(page, parentLocator);
        this.slickTableElements = new SlickTableElements(page, parentLocator);
    }

    async cleanTable() {
        while (true) { 
            const toolTipDialogActions = new ToolTipDialogActions(this.page)
            const firstTableRow = await this.slickTableElements.tableRow().nth(0);
            const isVisible = await firstTableRow.isVisible();
            
            if (isVisible) { 
                await this.slickTableElements.deleteRowButton(firstTableRow).click();
                await toolTipDialogActions.chooseDialogOption("Ок");
            } else {
                break;
            }
        }
    }
}

export default SlickTableActions
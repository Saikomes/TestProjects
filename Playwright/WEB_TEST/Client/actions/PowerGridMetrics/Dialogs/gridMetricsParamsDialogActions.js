import GridMetricsParamsDialogElements from "../../../elements/PowerGridMetrics/Dialogs/gridMetricsParamsDialogElements";
import GridMetricsParamsTableActions from "../Tables/gridMetricsParamsTableActions";
import UiDialogActions from "../../Common/uiDialogActions";
import BrowserActions from "../../../../Common/browserActions";
import { expect } from "@playwright/test";

class GridMetricsParamsDialogActions extends UiDialogActions {

    constructor(page) {
        super(page, new GridMetricsParamsDialogElements(page))
        this.gridMetricsParamsTableActions = new GridMetricsParamsTableActions(page)
    }

    async deselectAllEvents() {
        await this.uiDialogElements.deselectAllButton().click()
        await BrowserActions.waitForPageReady(this.page)
    }



}
export default GridMetricsParamsDialogActions
import FilterByCategoryDialogElements from "../../../elements/AccountingDataEvents/Dialogs/filterByCategoryDialogElements";
import AngTableActions from "../../common/Tables/AngTableActions";
import UiDialogActions from "../../Common/uiDialogActions";
import BrowserActions from "../../../../Common/browserActions";
import { expect } from "@playwright/test";

class FilterByCategoryDialogActions extends UiDialogActions {

    constructor(page) {
        super(page, new FilterByCategoryDialogElements(page))
        this.filterDialogTableActions = new AngTableActions(page, "#eventsTree-treecontainer")
    }

    async deselectAllEvents() {
        await this.uiDialogElements.deselectAllButton().click()
    }



}
export default FilterByCategoryDialogActions
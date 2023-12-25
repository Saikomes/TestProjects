import ExecutiveUserElements from "../../elements/CustomersAndContracts/ExecutiveUserElements";
import MergeUsersDialogActions from "./Dialogs/mergeUsersDialogActions";
import EditPersonelDialogActions from "./Dialogs/editPersonelDialogActions";
import JqTableActions from "../Common/Tables/jqTableActions";
import UiFormActions from "../Common/uiFormActions";
import ControlPaneActions from "../Common/controlPaneActions";
import ExecutiveUserLocators from "../../locators/CustomersAndContracts/ExecutiveUserLocators";

class ExecutiveUserActions {
    constructor(page) {
        this.page = page;
        this.executiveUserElements = new ExecutiveUserElements(page);
        this.executiveUsersTableActions = new JqTableActions(page)
        this.uiFormActions = new UiFormActions(page)
        this.controlPaneActions = new ControlPaneActions(page, ExecutiveUserLocators.executiveUserContentContainer.locator)
        this.mergeUsersDialogActions = new MergeUsersDialogActions(page)
        this.editPersonelDialogActions = new EditPersonelDialogActions(page)
    }

    async getRowByFIO(row) {
        const rowFioValue = await this.executiveUsersTableActions.getRowCellValue(row, "refGrid-ref-cont_Name")
        return rowFioValue
    }

    async clickMergeButton() {
        await this.executiveUserElements.mergeUsersButton().click()
    }

}

export default ExecutiveUserActions
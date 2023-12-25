import ContractsElements from "../../elements/CustomersAndContracts/ContractsElements";
import ContractsLocators from "../../locators/CustomersAndContracts/ContractsLocators";
import JqTableActions from "../Common/Tables/jqTableActions";
import UiFormActions from "../Common/uiFormActions";
import ControlPaneActions from "../Common/controlPaneActions";
import EditContractDialogActions from "./Dialogs/editContractDialogActions";

class ContractsActions {
    constructor(page) {
        this.page = page;
        this.customersElements = new ContractsElements(page)
        this.contractsTableActions = new JqTableActions(page)
        this.uiFormActions = new UiFormActions(page)
        this.controlPaneActions = new ControlPaneActions(page, ContractsLocators.contractsContentContainer.locator)
        this.editContractDialogActions = new EditContractDialogActions(page)
    }

    async getRowIdValue(row) {
        const rowIdValue = await this.contractsTableActions.getRowCellValue(row, "refGrid-ref-cont_Id")
        return rowIdValue
    }

}

export default ContractsActions
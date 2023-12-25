import ContractsLocators from "../../locators/CustomersAndContracts/ContractsLocators";
import JqTableElements from "../Common/Tables/jqTableElements";
import ControlPaneElements from "../Common/controlPaneElements";
import EditContractDialogElements from "./Dialogs/editContractDialogElements";
import { TestHelpers } from "../../../Common/modules/testHelpers";

class ContractsElements {
    constructor(page) {
        this.page = page
        this.contractsTableElements = new JqTableElements(page)
        this.controlPaneElements = new ControlPaneElements(page, ContractsLocators.contractsContentContainer.locator)
        this.editContractDialogElements = new EditContractDialogElements(page);
    }
}
export default ContractsElements
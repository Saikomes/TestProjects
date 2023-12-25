import ContractsLocators from "../../../locators/CustomersAndContracts/ContractsLocators";
import UiDialogElements from "../../Common/uiDialogElements";
import { TestHelpers } from "../../../../Common/modules/testHelpers";

class EditContractDialogElements extends UiDialogElements {
    constructor(page) {
        super(page)
    }

    editContractDialog() {
        return this.page.locator(ContractsLocators.editContractDialogLocators.editContractDialog.locator)
    }

}
export default EditContractDialogElements
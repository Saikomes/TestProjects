import { expect } from "@playwright/test";
import EditContractDialogElements from "../../../elements/CustomersAndContracts/Dialogs/editContractDialogElements";
import UiDialogActions from "../../Common/uiDialogActions";
class EditContractDialogActions extends UiDialogActions {
    constructor(page) {
        super(page, new EditContractDialogElements(page));
    }
}
export default EditContractDialogActions
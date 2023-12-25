import { expect } from "@playwright/test";
import EditSubjectDialogElements from "../../../elements/CustomersAndContracts/Dialogs/editSubjectDialogElements";
import UiDialogActions from "../../Common/uiDialogActions";
class EditSubjectDialogActions extends UiDialogActions {
    constructor(page) {
        super(page, new EditSubjectDialogElements(page));
    }
}
export default EditSubjectDialogActions
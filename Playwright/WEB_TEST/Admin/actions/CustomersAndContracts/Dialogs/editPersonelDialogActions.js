import { expect } from "@playwright/test";
import EditPersonelDialogElements from "../../../elements/CustomersAndContracts/Dialogs/editPersonelDialogElements";
import UiDialogActions from "../../Common/uiDialogActions";
class EditPersonelDialogActions extends UiDialogActions {
    constructor(page) {
        super(page, new EditPersonelDialogElements(page));
    }
}
export default EditPersonelDialogActions
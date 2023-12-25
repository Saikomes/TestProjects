import CustomersLocators from "../../../locators/CustomersAndContracts/CustomersLocators";
import UiDialogElements from "../../Common/uiDialogElements";
import { TestHelpers } from "../../../../Common/modules/testHelpers";

class EditSubjectDialogElements extends UiDialogElements {
    constructor(page) {
        super(page)
    }

    editSubjectDialog() {
        return this.page.locator(CustomersLocators.editSubjectDialogLocators.editSubjectDialog.locator)
    }

}
export default EditSubjectDialogElements
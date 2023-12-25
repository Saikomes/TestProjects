import ExecutiveUserLocators from "../../../locators/CustomersAndContracts/ExecutiveUserLocators";
import UiDialogElements from "../../Common/uiDialogElements";
import { TestHelpers } from "../../../../Common/modules/testHelpers";

class EditPersonelDialogElements extends UiDialogElements {
    constructor(page) {
        super(page)
    }

    editPersonelDialog() {
        return this.page.locator(ExecutiveUserLocators.editPersonelDialogLocators.editPersonelDialog.locator)
    }

}
export default EditPersonelDialogElements
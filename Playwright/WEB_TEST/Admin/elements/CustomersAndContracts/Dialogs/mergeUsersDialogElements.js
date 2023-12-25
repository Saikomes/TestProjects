import ExecutiveUserLocators from "../../../locators/CustomersAndContracts/ExecutiveUserLocators";
import UiDialogElements from "../../Common/uiDialogElements";
import { TestHelpers } from "../../../../Common/modules/testHelpers";

class MergeUsersDialogElements extends UiDialogElements {
    constructor(page) {
        super(page)
    }

    mergeUsersDialog() {
        return this.page.locator(ExecutiveUserLocators.mergePersonelDialogLocators.mergePersonelDialog.locator)
    }

}
export default MergeUsersDialogElements
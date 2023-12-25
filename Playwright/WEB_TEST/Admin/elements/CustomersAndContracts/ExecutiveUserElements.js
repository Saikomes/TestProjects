import ExecutiveUserLocators from "../../locators/CustomersAndContracts/ExecutiveUserLocators";
import EditPersonelDialogElements from "./Dialogs/editPersonelDialogElements";
import MergeUsersDialogElements from "./Dialogs/mergeUsersDialogElements";
import JqTableElements from "../Common/Tables/jqTableElements";
import ControlPaneElements from "../Common/controlPaneElements";
import { TestHelpers } from "../../../Common/modules/testHelpers";

class ExecutiveUserElements {
    constructor(page) {
        this.page = page
        this.executiveUsersTableElements = new JqTableElements(page)
        this.controlPaneElements = new ControlPaneElements(page, ExecutiveUserLocators.executiveUserContentContainer.locator)
        this.editPersonelDialogElements = new EditPersonelDialogElements(page)
        this.mergeUsersDialogElements = new MergeUsersDialogElements(page)
    }

    mergeUsersButton() {
        return this.page.locator(ExecutiveUserLocators.contolElementsLocators.mergeUsersButton.locator);
    }

}
export default ExecutiveUserElements
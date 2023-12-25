import CustomersLocators from "../../locators/CustomersAndContracts/CustomersLocators";
import JqTableElements from "../Common/Tables/jqTableElements";
import ControlPaneElements from "../Common/controlPaneElements";
import EditSubjectDialogElements from "./Dialogs/editSubjectDialogElements";
import { TestHelpers } from "../../../Common/modules/testHelpers";

class CustomersElements {
    constructor(page) {
        this.page = page
        this.customersTableElements = new JqTableElements(page)
        this.controlPaneElements = new ControlPaneElements(page, CustomersLocators.customersContentContainer.locator)
        this.editSubjectDialogElements = new EditSubjectDialogElements(page);
    }

    searchCriteriaDropdown() {
        return this.page.locator(CustomersLocators.contolElementsLocators.searchCriteriaDropdown.locator);
    }

    selectRowCheckboxCell() {
        return this.page.locator(CustomersLocators.customersTableLocators.selectRowCheckboxCell.locator);
    }

    selectRowCheckbox() {
        return this.page.locator(CustomersLocators.customersTableLocators.selectRowCheckbox.locator);
    }

}
export default CustomersElements
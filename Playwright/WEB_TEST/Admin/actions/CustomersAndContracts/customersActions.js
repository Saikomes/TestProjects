import CustomersElements from "../../elements/CustomersAndContracts/CustomersElements";
import JqTableActions from "../Common/Tables/jqTableActions";
import UiFormActions from "../Common/uiFormActions";
import ControlPaneActions from "../Common/controlPaneActions";
import EditSubjectDialogActions from "./Dialogs/editSubjectDialogActions";
import CustomersLocators from "../../locators/CustomersAndContracts/CustomersLocators";

class CustomersActions {
    constructor(page) {
        this.page = page;
        this.customersElements = new CustomersElements(page);
        this.customersTableActions = new JqTableActions(page)
        this.uiFormActions = new UiFormActions(page)
        this.controlPaneActions = new ControlPaneActions(page, CustomersLocators.customersContentContainer.locator)
        this.editSubjectDialogActions = new EditSubjectDialogActions(page)
    }

    async selectSearchCriteria(searchCriteriaValue) {
        const dropdown = this.customersElements.searchCriteriaDropdown();
        await this.uiFormActions.selectDropdownOptionByElement(dropdown, searchCriteriaValue)
    }

    async getRowIdValue(row) {
        const rowIdValue = await this.customersTableActions.getRowCellValue(row, "refGrid-ref-cont_Id")
        return rowIdValue
    }

}

export default CustomersActions
import UiFormLocators from "../Common/uiFormLocators";
import JqTableLocators from "../Common/Tables/jqTableLocators";
import CommonElementsLocators from "../Common/commonElementsLocators";
export class CustomersLocators {

    static customersContentContainer = {
        alias: 'Контент страницы "Субъекты рынка"', 
        locator: '.customers-reference-container'
    };

    static contolElementsLocators = {

        ...CommonElementsLocators.controlPaneLocators,
        searchCriteriaDropdown: {
            alias: 'Меню выбора критерия поиска', 
            locator: UiFormLocators.dropdownItemById.locator("#search-criteria-customer-ref-cont")
        },
    };

    static customersTableLocators = {
        selectRowCheckboxCell: {
            alias: 'Ячейка с чекбоксом выбора строки',
            locator: JqTableLocators.tableCell.locator("refGrid-ref-cont_cb")
        },

        idColumnHeader: {
            alias: 'Заголовок столбца id',
            locator: '#refGrid-ref-cont_Id'
        },

        nameColumnHeader: {
            alias: 'Заголовок столбца наименования',
            locator: '#refGrid-ref-cont_Name'
        },

        idCell: {
            alias: 'Ячейка с id субъекта',
            locator: JqTableLocators.tableCell.locator("refGrid-ref-cont_cb")
        },

        selectRowCheckbox: {
            alias: 'Чекбокс выбора строки',
            locator: '.cbox'
        },

    };

    static editSubjectDialogLocators = {
        editSubjectDialog: {
            alias: 'Диалог создания/редактирования субъекта рынка',
            locator: CommonElementsLocators.uiDialogLocators.dialogByLabel.locator('ui-dialog-title-edit-customer-dlg')
        },
    }

};

export default CustomersLocators
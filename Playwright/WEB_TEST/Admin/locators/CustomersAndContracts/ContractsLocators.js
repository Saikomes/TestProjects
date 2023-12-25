import UiFormLocators from "../Common/uiFormLocators";
import JqTableLocators from "../Common/Tables/jqTableLocators";
import CommonElementsLocators from "../Common/commonElementsLocators";
export class ContractsLocators {

    static contractsContentContainer = {
        alias: 'Контент страницы "Контракты"', 
        locator: '.contracts-reference-container'
    };

    static contolElementsLocators = {

        ...CommonElementsLocators.controlPaneLocators,
        onlyActiveToggle: {
            alias: 'Переключатель только активные договоры', 
            locator: '#only-active'
        },
    };

    static contractsTableLocators = {
        idColumnHeader: {
            alias: 'Заголовок столбца id',
            locator: '#refGrid-ref-cont_Id'
        },
        idCell: {
            alias: 'Ячейка с id договора',
            locator: JqTableLocators.tableCell.locator("refGrid-ref-cont_Id")
        },
        contractNumberColumnHeader: {
            alias: 'Заголовок столбца номера договора',
            locator: '#refGrid-ref-cont_Number'
        },
    };

    static editContractDialogLocators = {
        editContractDialog: {
            alias: 'Диалог создания/редактирования контракта',
            locator: CommonElementsLocators.uiDialogLocators.dialogByLabel.locator('ui-dialog-title-edit-contract-dlg')
        },
    }

};

export default ContractsLocators
import UiFormLocators from "../Common/uiFormLocators";
import JqTableLocators from "../Common/Tables/jqTableLocators";
import CommonElementsLocators from "../Common/commonElementsLocators";
import EditDocumentDialogLocators from "../Common/Dialogs/editDocumentDialogLocators";
export class DocumentsLocators {

    static searchToolbar = {
        alias: 'Тулбар поиска документа по параметрам', 
        locator: '.ui-search-toolbar'
    };

    static documentsTableLocators = {
        numberColumnHeader: {
            alias: 'Header колонки Номер',
            locator: '#filtered-grid_DocumentNumber'
        },
        numberCell: {
            alias: 'Ячейка с id субъекта',
            locator: JqTableLocators.tableCell.locator("filtered-grid_DocumentNumber")
        },
    };

    static editDocumentDialogLocators = EditDocumentDialogLocators

};

export default DocumentsLocators
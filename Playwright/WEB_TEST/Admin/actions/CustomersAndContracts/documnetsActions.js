import DocumentsElements from "../../elements/CustomersAndContracts/DocumentsElements";
import JqTableActions from "../Common/Tables/jqTableActions";
import UiFormActions from "../Common/uiFormActions";
import EditDocumentDialogActions from "../Common/Dialogs/editDocumentDialogActions";
import UiSearchToolbarActions from "../Common/uiSearchToolbarActions";
class DocumentsActions {
    constructor(page) {
        this.page = page;
        this.documentsElements = new DocumentsElements(page)
        this.documentsTable = new JqTableActions(page)
        this.uiFormActions = new UiFormActions(page)
        this.editDocumentDialogActions = new EditDocumentDialogActions(page)
        this.searchToolBarActions = new UiSearchToolbarActions(page)
    }

}

export default DocumentsActions
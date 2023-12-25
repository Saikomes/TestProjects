import DocumentsLocators from "../../locators/CustomersAndContracts/DocumentsLocators";
import JqTableElements from "../Common/Tables/jqTableElements";
import EditDocumentDialogElements from "../Common/Dialogs/editDocumentDialogElements";
import { TestHelpers } from "../../../Common/modules/testHelpers";

class DocumentsElements {
    constructor(page) {
        this.page = page
        this.documentsTableElements = new JqTableElements(page)
        this.editDocumentDialogElements = new EditDocumentDialogElements(page);
    }

    searchToolbar() {
        return this.page.locator(DocumentsLocators.searchToolbar.locator);
    }

}
export default DocumentsElements
import DeviceRegistryLocators from "../../../locators/AccountingStructure/DeviceRegistry/deviceRegistryLocators";
import EditDocumentDialogLocators from "../../../locators/Common/Dialogs/editDocumentDialogLocators";
import UiDialogElements from "../uiDialogElements";
import TestHelpers from "../../../../Common/modules/testHelpers";

class EditDocumentDialogElements extends UiDialogElements {
    constructor(page) {
        super(page)
    }

    editDocumentDialog() {
        return this.page.locator(EditDocumentDialogLocators.createDocumentDialog.locator)
    }

    documentNumberinput() {
        return TestHelpers.getLinkedLocator(this.editDocumentDialog(), EditDocumentDialogLocators.documentNumberinput.locator)
    }

    documentTypeSelect() {
        return TestHelpers.getLinkedLocator(this.editDocumentDialog(), EditDocumentDialogLocators.documentTypeSelect.locator)
    }
    
    filePathInput() {
        return TestHelpers.getLinkedLocator(this.editDocumentDialog(), EditDocumentDialogLocators.filePathInput.locator)
    }

    fioSelect() {
        return TestHelpers.getLinkedLocator(this.editDocumentDialog(), EditDocumentDialogLocators.fioSelect.locator)
    }

    executionDateInput() {
        return TestHelpers.getLinkedLocator(this.editDocumentDialog(), EditDocumentDialogLocators.executionDateInput.locator)
    }


}
export default EditDocumentDialogElements
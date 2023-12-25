import EditDocumentDialogElements from "../../../elements/Common/Dialogs/editDocumentDialogElements";
import EditDocumentDialogLocators from "../../../locators/Common/Dialogs/editDocumentDialogLocators";
import UiFormActions from "../uiFormActions";
import UiDialogActions from "../uiDialogActions";
class EditDocumentDialogActions extends UiDialogActions {
    constructor(page) {
        super(page, new EditDocumentDialogElements(page))
        this.createDocumentDialogElements = new EditDocumentDialogElements(page)
        this.uiFormActions = new UiFormActions(page)
    }

    async fillDocumentNumber(number) {
        await this.uiFormActions.elementActions.setInputValue(this.createDocumentDialogElements.editDocumentDialog(),
        EditDocumentDialogLocators.documentNumberinput.locator, number)
    }

    async chooseDocumentType(documentType) {
        await this.uiFormActions.elementActions.chooseOptionInSelect(this.createDocumentDialogElements.editDocumentDialog(),
        EditDocumentDialogLocators.documentTypeSelect.locator, documentType)
    }

    async fillPathToFile(path) {
        await this.uiFormActions.elementActions.setInputValue(this.createDocumentDialogElements.editDocumentDialog(),
        EditDocumentDialogLocators.filePathInput.locator, path)
    }

    async chooseFio(fio) {
        await this.uiFormActions.elementActions.chooseOptionInSelect(this.createDocumentDialogElements.editDocumentDialog(),
        EditDocumentDialogLocators.fioSelect.locator, fio)
    }

    async fillExecutionDate(date) {
        await this.uiFormActions.elementActions.setInputValue(this.createDocumentDialogElements.editDocumentDialog(),
        EditDocumentDialogLocators.executionDateInput.locator, date)
    }

}

export default EditDocumentDialogActions
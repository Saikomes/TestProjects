import CommonElementsLocators from "../commonElementsLocators";
const EditDocumentDialogLocators = {
    createDocumentDialog: {
        alias: 'Диалог создания нового документа',
        locator: CommonElementsLocators.uiDialogLocators.dialogByLabel.locator('ui-dialog-title-edit-document-dlg'),
    },
    documentNumberinput: {
        alias: 'Ввод номера документа',
        locator:  '#DocumentNumber'
    },
    documentTypeSelect: {
        alias: 'Выбор типа документа',
        locator:  '#s2id_DocumentType'
    },
    filePathInput: {
        alias: 'Путь до файла',
        locator:  '#ExternalNumber'
    },
    fioSelect: {
        alias: 'Выбор исполнителя',
        locator:  '#s2id_UserExecutiveId'
    },
    executionDateInput: {
        alias: 'Дата выполнения действия',
        locator:  '#s2id_UserExecutiveId'
    },
};

export default EditDocumentDialogLocators
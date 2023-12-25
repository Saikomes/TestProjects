import UiFormLocators from "../../Common/uiFormLocators";
import CommonElementsLocators from "../../Common/commonElementsLocators";
export class DeviceRegistryLocators {

    static mainPaneLocators = {

        mainContentPane: {
            alias: 'Панель основного содержания страницы', 
            locator: '#mainContentPane'
        },

        showDocumentsButton: {
            alias: 'Кнопка "Показать документы"',
            locator:  '.btn-dr-show-documentlinks'
        },

        sendEmailButton: {
            alias: 'Кнопка отправить уведомление о присоединении',
            locator: '.propertyValueSendEmailButton'
        },

    };

    static deviceDocumentsDialogLocators = {
        deviceDocumentsDialog: {
            alias: 'Диалог "Документы"',
            locator: CommonElementsLocators.uiDialogLocators.dialogByLabel.locator('ui-dialog-title-dl-dr-documentlinks-dlg'),
        },
        chooseDocumentSelect: {
            alias: 'Выбор документа для добавления к оборудованию',
            locator:  '#s2id_NewDocument'
        },
        createDocumentButton: {
            alias: 'Кнопка создания документа',
            locator: '.ajr-create-element'
        },
        addDocumentButton: {
            alias: 'Кнопка создания документа',
            locator: '#device-new-document-btn'
        },
    };

    static createDocumentDialogLocators = {
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

};

export default DeviceRegistryLocators
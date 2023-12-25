import UiFormLocators from "../Common/uiFormLocators";
import JqTableLocators from "../Common/Tables/jqTableLocators";
import CommonElementsLocators from "../Common/commonElementsLocators";
export class ExecutiveUserLocators {

    static executiveUserContentContainer = {
        alias: 'Контент страницы "Оперативный персонал"', 
        locator: '.executiveusers-reference-container'
    };

    static contolElementsLocators = {

        ...CommonElementsLocators.controlPaneLocators,

        mergeUsersButton: {
            alias: 'Кнопка "Слияние двух ФИО"', 
            locator: '.executiveusers-merge-users-btn'
        },
    };

    static usersTableLocators = {
        fioColumnHeader: {
            alias: 'Ячейка с id субъекта',
            locator: '#refGrid-ref-cont_Name'
        },
        fioCell: {
            alias: 'Ячейка с id субъекта',
            locator: JqTableLocators.tableCell.locator("refGrid-ref-cont_Name")
        },
    };

    static mergePersonelDialogLocators = {

        mergePersonelDialog: {
            alias: 'Диалог создания/редактирования персонала',
            locator: CommonElementsLocators.uiDialogLocators.dialogByLabel.locator('ui-dialog-title-merge-users-dlg')
        },
        deleteUserSelect: {
            alias: 'select2 для выбора пользователя подлежащего удалению',
            locator: '#s2id_IdUserFrom'
        },
        mergedUserSelect: {
            alias: 'select2 для выбора которому будут переданы документы',
            locator: '#s2id_IdUserTo'
        }
    }

    static editPersonelDialogLocators = {
        editPersonelDialog: {
            alias: 'Диалог создания/редактирования персонала',
            locator: CommonElementsLocators.uiDialogLocators.dialogByLabel.locator('ui-dialog-title-edit-exec-user-dlg')
        },
    }

};

export default ExecutiveUserLocators
import CommonElementsLocators from "../Common/commonElementsLocators"
export class NewsLocators {
    static newsPageLocators = {
        newsRowByTitle: {
            alias: 'Строка новости по заголовку',
            locator: (title) => `//tr[contains(@class, "jqgrow") and .//td[@aria-describedby="refGrid-ref-cont_Title" and text()="${title}"]]`
        },
        searchField: {
            alias: 'Поле поиска',
            locator: '#edtSearchPoint'
        },
        searchButton: {
            alias: 'Кнопка поиска',
            locator: '#btnSearchPoint'
        },
        addNewsButton: {
            alias: 'Кнопка добавления новости',
            locator: '#btnAdd'
        },
        editNewsButton: {
            alias: 'Кнопка редактирования новости',
            locator: 'button[title="Редактировать"]'
        },
        removeNewsButton: {
            alias: 'Кнопка удаления новости',
            locator: 'button[title="Удалить"]'
        }
    }
    static editNewsDialogLocators = {
        editNewsDialog: {
            alias: 'Диалог редактирования новости',
            locator: CommonElementsLocators.uiDialogLocators.dialogByLabel.locator('ui-dialog-title-edit-news-dialog')
        },
        titleInput: {
            alias: 'Поле заголовка',
            locator: '#Title'
        },
        previewInput: {
            alias: 'Поле аннонса',
            locator: '#Preview'
        },
        publishCheckbox: {
            alias: 'Чекбокс "Публиковать у абонента"',
            locator: '#IsPublished'
        },
        publishSinceInput: {
            alias: 'Поле "Публиковать с"',
            locator: '#PublishFromDate'
        },
        publishToInput: {
            alias: 'Поле "Публиковать по"',
            locator: '#PublishToDate'
        },
        groupsSelector: {
            alias: 'Селектор групп для отображения новости',
            locator: '#s2id_GroupsIdsToView'
        },
        newsContentFrame: {
            alias: 'Поле содержания новости" ',
            locator: 'iframe[title="Визуальный текстовый редактор\\, Body"]'
        },
        saveButton: {
            alias: 'Кнопка сохранить',
            locator: '.ok-btn'
        },
        closeBitton: {
            alias: 'Кнопка закрыть',
            locator: '.cancel-btn'
        },
        groupSelectMenu: { 
            alias: 'Меню выбора группы', 
            locator: '.select2-results' 
        },
        groupSelectMenuItem: { 
            alias: 'Элемент меню выбора группы', 
            locator: (groupName) => `.select2-result-label:has-text("${groupName}")` 
        },
    }
};

export default NewsLocators
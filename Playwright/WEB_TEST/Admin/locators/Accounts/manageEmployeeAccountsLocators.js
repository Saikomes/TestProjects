export class ManageEmployeeAccountsLocators {
    static groupListLocators = {
        groupListArea: { 
            alias: 'Список групп', 
            locator: '.group-list-container'
        },

        groupListItemByName: {
            alias: 'Группа разрешений по имени',
            locator: (groupName) => `xpath=//li[contains(@class, "group-elt") and starts-with(normalize-space(.//span[@class="nq-name"]), "${groupName}")]`
        },

        addToGroupButton: {
            alias: 'Кнопка добавления в группу',
            locator: 'button.group-include'
        },

        removeFromGroupButton: {
            alias: 'Кнопка удаления из группы',
            locator: 'button.group-exclude'
        }

    };

    static accountListLocators = {

        accountsArea: {
            alias: 'Область учетных записей сотрудников', 
            locator: '.employee-list-container'
        },

        accountRow: {
            alias: 'Строка учетной записи',
            locator: `.jqgrow`
        },

        accountRowByLogin: {
            alias: 'Строка учетной записи по переданному логину',
            locator: (login) => `.jqgrow:has(.mea-login:text-is("${login}"))`
        },

        accountRowCheckBox: {
            alias: 'Чекбокс строки учетной записи',
            locator: '.cbox'
        },

        searchInput: {
            alias: 'Поле поиска',
            locator: '#edtSearchPoint'
        },

        searchButton: {
            alias: 'Кнопка поиска',
            locator: '#btnSearchPoint'
        }

    };
};

export default ManageEmployeeAccountsLocators
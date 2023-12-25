import { groupListLocators } from "./commonManageAccountsLocators";
export class ManageCustomerAccountsLocators {
    static groupListLocators = groupListLocators

    static centerPaneLocators = {

        centerPane: {
            alias: 'Область учетных записей абонентов', 
            locator: '#center-pane'
        },

        accountRowByEmail: {
            alias: 'Строка учетной записи по email',
            locator: (email) => `//tr[contains(@class, "jqgrow") and .//a[contains(.//mark/text(), "${email}")]]`
        },

        accountRowCheckBox: {
            alias: 'Чекбокс строки учетной записи',
            locator: '.cbox'
        },

        searchInput: {
            alias: 'Поле поиска',
            locator: '.reference-search'
        },

        searchButton: {
            alias: 'Кнопка поиска',
            locator: '#btnSearch' 
        }

    };

    static sidePaneLocators = {

        sidePane: {
            alias: 'Область статусов учетных записей', 
            locator: '#sidebar-pane'
        },

        accountStatus: {
            alias: 'Статус аккаунта',
            locator: (status) => `.ui-selectee:has(:text("${status}")) > a`
        },

        accountAction: {
            alias: 'Действие с учетной записью клиента',
            locator: (actionUrl) => `a[data-action-url*="${actionUrl}"]`
        }

    };
};

export default ManageCustomerAccountsLocators
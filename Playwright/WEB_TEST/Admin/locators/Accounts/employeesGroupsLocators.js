export class EmployeesGroupsLocators {
    static sidePaneLocators = {
        sidePane: { 
            alias: 'Боковая панель менеджера групп', 
            locator: `#sidebar-pane`
        },
        employeesGroupByName: { 
            alias: 'Группа сотрудников по имени', 
            locator: (headerText) => `//li[contains(@class, 'nq-folder') and .//span[contains(@class, 'nq-fld-name') and text() = '${headerText}']`
        },
        employeesGroupItemByName: { 
            alias: 'Элемент группы сотрудников по имени', 
            locator: (itemName) => `li.ui-widget-content:not(.nq-folder):has(span:text-is('${itemName}'))`
        },
        searchField: { 
            alias: 'Поле поиска', 
            locator: `div.search-panel > input`
        },
        addNewGroupButton : { 
            alias: 'Добавить новую группу', 
            locator: `button.new-nq:visible`
        },
        deleteGroupButton: {
            alias: 'Удалить группу', 
            locator: `button.nq-delete:visible`
        }
    };

    static groupConfigurationLocators = {

        groupEditForm: {
            alias: 'Форма редактирования группы', 
            locator: '.nq-edit-frm'
        },
        fullAccessCheckBox: { 
            alias: 'Чекбокс полного доступа', 
            locator: '.gr-full-access'
        },
        groupNameInput: { 
            alias: 'Поле ввода имени группы', 
            locator: `.gr-name`
        },
        permissionGroupByName: { 
            alias: 'Группа разрешений по имени', 
            locator: (category) => `div.category-container:has(:text(" ${category} "))`
        },

        permissionCheckBox: { 
            alias: 'Чекбокс разрешения', 
            locator: `//label/preceding-sibling::input[@type="checkbox"]`
        },

        permissionCheckBoxByName: { 
            alias: 'Чекбокс определенного разрешения', 
            locator: (permissionName) => `//label[text()="${permissionName}"]/preceding-sibling::input[@type="checkbox"]`
        },
        saveButton: { 
            alias: 'Кнопка сохранения группы', 
            locator: `.nq-save-btn`
        },
        cancelButton: { 
            alias: 'Кнопка отмены редактирования группы', 
            locator: `.nq-cancel-btn`
        },

    };
};

export default EmployeesGroupsLocators
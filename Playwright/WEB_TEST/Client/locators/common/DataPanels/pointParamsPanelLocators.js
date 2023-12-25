export class PointParamsPanelLocators {

    static pointParamsPanelLocators = {
        pointParamsPanel: { alias: 'Панель параметров точки', locator: 'points-params' },
        searchField: {alias: 'Поле поиска', locator: 'input'},
        applyParamsButton: {alias: 'Поле поиска', locator: 'button[title="Применить"]'},
        paramsGroup: {alias: 'Группа параметров', locator: (groupName) => `.b-params-group:has(p-checkbox[title="${groupName}"])`},
        groupExpandButton: {alias: 'Кнопка раскрытия группы', locator: `.jstree-icon`},
    }
    
};

export default PointParamsPanelLocators
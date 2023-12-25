export class PointsTreePanelLocators {

    static pointsTreeControlLocators = {
        levelSelect: { alias: 'Select выбора уровня поиска', locator: '#lvl-points' },
        resourseType: {alias: 'Dropdown выбора типа энергоресурса', locator: '#select-points-tree-resource-type >> .ui-dropdown-label' },
        searchInput: { alias: 'Поле ввода поиска', locator: 'input[name="node-name"]', placeholder: /Поиск.*/i}
    }

    static pointsTreeTableLocators = {
        pointsTreeElement: (text) => { return { role: 'link', name: text } },
        pointsTreeElementCheckBox: { alias: 'Чекбокс выбора элемента', locator: 'ins.jstree-checkbox'},
        pointsTreeRow: {alias: 'Строка таблицы', locator: 'li[nodeobjectid]'}
    }

    static pointsTreePanel = {
        pointsTreePanel: { alias: 'Панель точек учета', locator: '#treeCont' },
        ...this.pointsTreeControlLocators,
        ...this.pointsTreeTableLocators
    }
    
};

export default PointsTreePanelLocators
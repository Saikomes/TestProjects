import AngPointsTreeTableLocators from "../Tables/angPointsTreeTableLocators"
export class AngPointsTreePanelLocators {

    static pointsTreeControlLocators = {
        resourseType: {alias: 'Dropdown выбора типа энергоресурса', locator: '#select-points-tree-resource-type >> .ui-dropdown-label' },
        searchInput: { alias: 'Поле ввода поиска', placeholder: /Поиск.*/i}
    }

    static pointsTreeTableLocators = {
        ...AngPointsTreeTableLocators
    }

    static pointsTreePanel = {
        pointsTreePanel: { alias: 'Панель точек учета', locator: '#treeCont' },
        ...this.pointsTreeControlLocators,
        ...this.pointsTreeTableLocators
    }
    
};

export default AngPointsTreePanelLocators
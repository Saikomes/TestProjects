import UiFormLocators from "../uiFormLocators";
import CommonElementsLocators from "../commonElementsLocators";
export class CommonPanelsLocators {

    static pointsTreeTab = {
        ...CommonElementsLocators.controlPaneLocators,
        tabPointsTree: { alias: 'Панель точек учета', locator: '#tabs-pointsTree' },
        treeModeDropdown: { alias: 'Dropdown режима выбора точек учета', locator: '#operator-tree-mode-selector-pointsTree' },
        searchParamDropdown: { alias: 'Dropdown выбора парметра для поиска точек учета', locator: '#node-search-param-NodesReference-pointsTree' },
    }

    static pointsTreeDetailsTab = {
        ...CommonElementsLocators.controlPaneLocators,
        tabPointsDetailsTree: { alias: 'Панель детализации точки учета', locator: '#DetailsTree-pointsTree' },
    }

    static pointsDetailsTableLocators = {
        rowById: {
            alias: 'Строка таблицы по ее id',
            locator: (id) => `//div[contains(@class, "slick-row") and .//div[contains(@class, "slick-cell l0 r0") and text()="${id}"]]`
        }
    }
    
};

export default CommonPanelsLocators
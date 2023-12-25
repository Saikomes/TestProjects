import { table } from "console";

export class AccountingDataLocators {
    static baseLocators = {
        selectPointTypeMenu: { alias: 'Кнопка выбора критерия поиска потребителей', locator: '#operator-tree-mode-selector-pointsTree-button' },
        selectorPointsTree: { alias: 'Список доступных критериев поиска потребителей', locator: '#operator-tree-mode-selector-pointsTree' },
        pointsTreeMenu: { alias: 'Меню доступных критериев поиска потребителей', locator: '#operator-tree-mode-selector-pointsTree-menu' },
        menuItem: { alias: 'Пункт Dropdown меню', locator: 'a[role="option"]' },
        nodesReferenceButton: { alias: 'Кнопка выбора режима отображения ОУ', locator: '#node-search-param-NodesReference-pointsTree-button' },
        nodesReferenceTree: { alias: 'Список доступных критериев отображения ОУ', locator: '#node-search-param-NodesReference-pointsTree' },
        nodesReferenceMenu: { alias: 'Меню доступных критериев ОУ', locator: '#node-search-param-NodesReference-pointsTree-menu' },
        btnSearchPoint: { alias: 'Кнопка запуска поиска ОУ', locator: '#btnSearchPoint'},
        edtSearchPoint: { alias: 'Поле поиска ОУ', locator: '#edtSearchPoint'},
        pointsTree: { alias: 'Дерево точек учета', locator: '#pointsTree'},
        pointsTreeRow: { alias: 'Строка дерева точек учета', locator: 'div.slick-row'},
        mainPlot: {
            locator: '#chart',
            alias: 'Основной график'
        },
        mainGrid: {
            locator: '#gridPlaceholder',
            alias: 'Основная таблица'
        },
        chartLegend: {
            locator: '#chart-legend',
            alias: 'Легенда графика'
        },
        legendEntries: {
            locator: '.jqplot-table-legend.jqplot-table-legend-label',
            alias: 'Записи легенды'
        },
        decimalPlacesSelector: {
            locator: '#cmbDecimalPlaces',
            alias: 'Выбор точности'
        },
        reportButton: {
            locator: '#btnShowReport',
            alias: 'Кнопка отчета'
        },
        sumSwitch: {
            locator: '#chkSumByPoint',
            alias: 'Переключатель суммирования по точкам учета'
        },
        withTariffsSwitch: {
            locator: '#chkWithTariffs',
            alias: 'Переключатель с тарифами'
        },
        withCoeffsSwitch: {
            locator: '#chkWithCoeffs',
            alias: 'Переключатель с учетом коэффициентов трансформации'
        },
        showLongNamesSwitch: {
            locator: '#chkLongNames',
            alias: 'Переключатель полного имени ТУ'
        }
    };

    static leftPaneLocators = {
        selectPointTypeMenu: { alias: 'Кнопка выбора критерия поиска потребителей', locator: '#operator-tree-mode-selector-pointsTree-button' },
        selectorPointsTree: { alias: 'Список доступных критериев поиска потребителей', locator: '#operator-tree-mode-selector-pointsTree' },
        pointsTreeMenu: { alias: 'Меню доступных критериев поиска потребителей', locator: '#operator-tree-mode-selector-pointsTree-menu' },
        menuItem: { alias: 'Пункт Dropdown меню', locator: 'a[role="option"]' },
        nodesReferenceButton: { alias: 'Кнопка выбора режима отображения ОУ', locator: '#node-search-param-NodesReference-pointsTree-button' },
        nodesReferenceTree: { alias: 'Список доступных критериев отображения ОУ', locator: '#node-search-param-NodesReference-pointsTree' },
        nodesReferenceMenu: { alias: 'Меню доступных критериев ОУ', locator: '#node-search-param-NodesReference-pointsTree-menu' },
        btnSearchPoint: { alias: 'Кнопка запуска поиска ОУ', locator: '#btnSearchPoint' },
        edtSearchPoint: { alias: 'Поле поиска ОУ', locator: '#edtSearchPoint' },
    };

    static gridLocators = {
    cell: {
        locator: (row, column) => `.slick-row[row="${row}"] .slick-cell[cell="${column}"]`,
        alias: 'Ячейка таблицы'
    },
    checkboxInsideCell: {
        locator: 'input[type="checkbox"]',
        alias: 'Чекбокс внутри ячейки'
    },
    rowSwitcher: {
        locator: (row) => `.slick-row[row="${row}"] .slick-cell[cell="0"] .slick-toggle`,
        alias: 'Переключатель строки'
    },
    tableRow: {
        locator: `div.slick-row`,
        alias: 'Строка дерева точек учета'
    }
};

}
export default AccountingDataLocators
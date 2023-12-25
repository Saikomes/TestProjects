const AccountingDataPage = {
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
     chartLegend: { alias: 'Легенда графика', locator: '#chart-legend' },
     jqplotTableLegendLabel: { alias: 'Метка легенды таблицы', locator: '.jqplot-table-legend.jqplot-table-legend-label' },
     decimalPlacesSelector: { alias: 'Выбор десятичных знаков', locator: '#cmbDecimalPlaces' },
     reportButton: { alias: 'Кнопка отчета', locator: '#btnShowReport' },
     sumSwitch: { alias: 'Переключатель суммы', locator: '#chkSumByPoint' },
     withTariffsSwitch: { alias: 'С тарифами', locator: '#chkWithTariffs' },
     withCoeffsSwitch: { alias: 'С коэффициентами', locator: '#chkWithCoeffs' },
     showLongNamesSwitch: { alias: 'Показать полные имена', locator: '#chkLongNames' },
};

export default AccountingDataPage
const PageElements = {
    areaProtocol: { alias: 'Протокол', locator: 'pso-protocol' },
    areaStatistic: { alias: 'Статистика', locator: 'pso-statistic' },
    areaStatus: { alias: 'Состояние опроса', locator: 'pso-status' },
    areaDevices: { alias: 'Устройства', locator: 'pso-devices' },
    statisticDropdownMenu: '.select-statistic-type > .mat-input-wrapper > .mat-input-flex', // example of a dropdown menu selector
    tooltip: '.pso-tooltip-wrapper > b', 
    tableRow: 'pso-datatable-body-row',
    tableRowCell: 'pso-datatable-body-cell > div > span',
    deviceStatus: '#Layer_1 path',
    pollStatus: '.device-debt-ico > svg > path',
    searchField: { placeholder: 'Поиск прибора', locator: 'pso-device-search' },
    column: 'pso-bar-view > pso-bar-column > div'
};

export default PageElements
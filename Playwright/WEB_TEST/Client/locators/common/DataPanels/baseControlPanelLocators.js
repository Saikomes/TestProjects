const BaseControlPanelLocators = {
    refreshButton: {alias: 'Кнопка "Обновить данные"', locator: `button[title="Обновить данные"]` },
    periodLength: {  locator: '#cmdPeriodLength' },
    beginDate: { locator: '#edtBeginDate' },
    endDate: { locator: '#edtEndDate' },
    exportFormatButton: {alias: 'Кнопка выбора формата экспорта результатов', locator: `p-splitbutton[icon="pi pi-print"] >> .ui-corner-right >> .ui-button-text`},
    exportFormatMenu: {alias: 'Меню выбора формата экспорта данных', locator: `#pr_id_1_list_overlay`},
    exportFormatOption: {alias: 'Опция формата экспорта данных', locator: (format) => `.ui-menuitem-link:has(span:text-is("${format}"))`},
    decimalPlacesButton: { locator: '#select-ads-toolbar-decimal-places' },
}

export default BaseControlPanelLocators
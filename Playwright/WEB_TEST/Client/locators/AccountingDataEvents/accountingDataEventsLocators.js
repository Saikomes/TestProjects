import AngPointsTreePanelLocators from "./DataPanels/angPointsTreePanelLocators"
import EventsTableLocators from "./Tables/eventsTableLocators"

export class AccountingDataEventsLocators {

    static pointsTreePanelLocators = {
        ...AngPointsTreePanelLocators
    }

    static eventsTableLocators = {
        ...EventsTableLocators
    }

    static controlPanelLocators = {
        controlPanel: {alias: 'Контрольная панель', locator: `grid-toolbar`},
        filterButton: {alias: 'Кнопка "Фильтрация"', locator: `button[title="Фильтр по категориям"]`},
        refreshButton: {alias: 'Кнопка "Обновить данные"', locator: `button[title="Обновить данные"]` },
        periodLength: {  locator: '#cmdPeriodLength' },
        beginDate: { locator: '#edtBeginDate' },
        endDate: { locator: '#edtEndDate' },
        info: { locator: 'p-checkbox[ng-reflect-label="Информация"]' },
        warning: { locator: 'p-checkbox[ng-reflect-label="Предупреждение"]' },
        accident: { type: 'checkbox', locator: 'p-checkbox[ng-reflect-label="Авария"]'},
        groupBy: { type: 'checkbox', locator: 'p-checkbox[ng-reflect-label="Группировать"]'},
        exportFormatButton: {alias: 'Кнопка выбора формата экспорта результатов', locator: `p-splitbutton[icon="pi pi-print"] >> .ui-corner-right >> .ui-button-text`},
        exportFormatMenu: {alias: 'Меню выбора формата экспорта данных', locator: `#pr_id_1_list_overlay`},
        exportFormatOption: {alias: 'Опция формата экспорта данных', locator: (format) => `.ui-menuitem-link:has(span:text-is("${format}"))`},
    }

    static filterByCategoryDialogLocators = {
        filterByCategoryDialog: {alias: 'Диалог "Фильтрации событий по категориям"', label: `Фильтр событий по категориям`},
        selectAllButton: {alias: 'Кнопка "Выбрать все"', locator: `#eventsTree-tree-toolbar-selAll`},
        deselectAllButton: {alias: 'Кнопка "Убрать все"', locator: `#eventsTree-tree-toolbar-selNone`},
        invertButton: {alias: 'Кнопка "Инвертировать"', locator: `#eventsTree-tree-toolbar-selInv`},
        expandAllButton: {alias: 'Кнопка "Развернуть все"', locator: `#expandAll`},
        collapseAllButton: {alias: 'Кнопка "Свернуть все"', locator: `#collapseAll`},
    }

};

export default AccountingDataEventsLocators
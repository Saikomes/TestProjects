import PointsTreePanelLocators from "../common/DataPanels/pointsTreePanelLocators"
import TypeDataToolbarLocators from "../common/DataPanels/typeDataToolbarLocators"
import BaseControlPanelLocators from "../common/DataPanels/baseControlPanelLocators"

export class AccountingDataLocators {

    static DataPanes = {
        leftPane: {alias: "Левая панель", locator: `.b-leftside-pane`},
        contentPane: {alias: "Панель основного содержимого", locator: `.content-panel`},
    }

    static pointsTreePanelLocators = {
        ...PointsTreePanelLocators
    }

    static typeDataToolbarLocators = {
        ...TypeDataToolbarLocators
    }

    static controlPanelLocators = {
        ...BaseControlPanelLocators,
        controlPanel: {alias: 'Контрольная панель', locator: `data-toolbar`},
        settingsButton: {alias: 'Кнопка "Настройки итогов"', locator: `button:has-text("Настройки итогов")`},
        periodType: { locator: '#select-ads-toolbar-groupby' },
        sum: { locator: 'p-checkbox[label="Суммировать"]' },
        tariff: { locator: 'p-checkbox[label="С тарифами"]' },
        coef: { type: 'checkbox', locator: 'p-checkbox[label="с Ктт*Ктн"]'},
    }

    static settingsLocators = {
        settingsDialog: {locator: 'p-dialog[header="Настройки"]'},
        sum: { locator: 'p-checkbox:has(label:text-is("Сумма"))'},
        sumLoss: { locator: 'p-checkbox:has(label:text-is("Сумма потерь"))' },
        sumWithLoss: { locator: 'p-checkbox[ng-reflect-label="Сумма с учетом потерь"]'},
        sumUncounted: { locator: 'p-checkbox:has(label:text-is("Сумма безучетного потребления"))' },
        sumWithUncounted: { locator: 'p-checkbox:has(label:text-is("Сумма с учетом безучетного потребления"))'},
        sumWithLossAndUncounted: { locator: 'p-checkbox:has(label:text-is("Общая сумма с учетом потерь и безучетного потребления"))'},
        calcS: { locator: 'p-checkbox:has(label:text-is("Расчет полной мощности"))'},
    }

    static readingsTableLocators = {
        readingsTable: {locator: 'data-grid:has(header-panel:has-text("Показания"))'},
        readingsTableViewport: {locator: '.slick-viewport'},
        dataRowByCellValue: {
            locator: (pointRegex) => {
                return `.slick-row:has(.slick-cell :text-matches("${pointRegex}", "i"))`
        },
            alias: "Строка данных по значению одной из ячеек"
        },
        columnHeader: {
            locator: `.slick-header-column`,
            alias: "Шапка колонки"
        },
        columnHeaderName: {
            locator: `.slick-column-name`,
            alias: "Заголовок шапки колонки"
        },
        dataRow: {
            locator: `.slick-row`,
            alias: "Строка данных"
        },
        expandButton: {locator: '.slick-toggle'},
        columnValue: {
            locator: (index) => `.slick-cell.l${index}.r${index}`,
            alias: "Значение для определенной колонки"
        },
    }

    static dataTypeToolbarLocators = {
        dataTypeToolBar: {locator: '.content-panel >> type-data-toolbar'},
        readingsNI: {locator: 'button:has-text("Показания (НИ)")'},
        readingsPR: {locator: 'button:has-text("Показания (ПР)")'},
        profilePE: {locator: 'button:has-text("Профиль (ЭН)")'},
        profilePP: {locator: 'button:has-text("Профиль (МЩ)")'},
    }
};

export default AccountingDataLocators
import PointsTreePanelLocators from "../common/DataPanels/pointsTreePanelLocators"
import TypeDataToolbarLocators from "../common/DataPanels/typeDataToolbarLocators"
import BaseControlPanelLocators from "../common/DataPanels/baseControlPanelLocators"

export class PowerGridMetricsLocators {


    static pointsTreePanelLocators = {
        ...PointsTreePanelLocators
    }

    static controlPanelLocators = {
        ...BaseControlPanelLocators,
        controlPanel: {alias: 'Контрольная панель', locator: `.grid-metrics-toolbar`},
        periodLength: {  locator: '#cmdPeriodLength' },
        gridMetricsParamsButton: {alias: 'Кнопка "Параметры ЭС"', locator: `#btnGridMetricsParams`},
        coef: { type: 'checkbox', locator: '#chkWithCoeffs'},
        reportWithParams: { type: 'checkbox', locator: '#reportWithParams'},
        beginDate: { locator: '#dataModeSelector > button:nth-child(7)' },
        endDate: { locator: '#dataModeSelector > button:nth-child(10)' },
        decimalPlacesButton: { locator: '#cmbDecimalPlaces-button' },
        currentDataButton: { locator: '#btnCurrentData' },
        showReportTgButton: { locator: '#btnShowReport-tgF' },
        showReportButton: { locator: '#btnShowReport' },
        exportFormatButton: {alias: 'Кнопка выбора формата экспорта результатов', locator: `#btnReportFormat`},
        exportFormatMenu: {alias: 'Меню выбора формата экспорта данных', locator: `.report-format-selector`},
        exportFormatOption: {alias: 'Опция формата экспорта данных', locator: (format) => `li:text-is("${format}")`},
    }

    static dataForPeriodChartLocators = {
        dataForPeriodChart: {locator: '.b-charts-main-chart'},
        chartCanvas: { locator: '.jqplot-event-canvas' },
        chartTooltip: { locator: '.jqplot-highlighter-tooltip:has(.es-tooltip-series-value)' },
        pointTime: { locator: '.es-tooltip-series-time' },
        pointValue: { locator: '.es-tooltip-series-value' },
        chartLegend: { locator: '#chart-legend' },
        chartLegendPoint: {locator: (text) => `.jqplot-table-legend-label:text-matches("${text}")`}
    }

    static gridMetricsParamsDialogLocators = {
        gridMetricsParamsDialog: {alias: 'Диалог выбора параметров', label: `Параметры режима ЭС`},
        selectAllButton: {alias: 'Кнопка "Выбрать все"', locator: `#paramsTree-tree-toolbar-selAll`},
        deselectAllButton: {alias: 'Кнопка "Убрать все"', locator: `#paramsTree-tree-toolbar-selNone`},
        invertButton: {alias: 'Кнопка "Инвертировать"', locator: `#paramsTree-tree-toolbar-selInv`},
        expandAllButton: {alias: 'Кнопка "Развернуть все"', locator: `#expandAll`},
        collapseAllButton: {alias: 'Кнопка "Свернуть все"', locator: `#collapseAll`},
    }

    static currentsGridLocators = {
        currentsGridTable: {alias: 'Таблица текущих значений', locator: `.currents-grid`},
    }

    static sVectorDiagramLocators = {
        sVectorDiagram: {alias: 'Диаграмма мощности', locator: `#s-vector-diagram-container`},
    }

    static iuVectorDiagramLocators = {
        iuVectorDiagram: {alias: 'Диаграмма токов-напряжений', locator: `#iu-vector-diagram-container`},
    }

};

export default PowerGridMetricsLocators
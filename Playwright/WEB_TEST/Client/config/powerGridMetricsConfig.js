import PowerGridMetricsActions from "../actions/PowerGridMetrics/powerGridMetricsActions";
import AccountingDataLocators from "../locators/AccountingData/accountingDataLocators";
import PowerGridMetricsLocators from "../locators/PowerGridMetrics/powerGridMetricsLocators";

function makeControlPanelConfig(values) {
    return {
      periodLength: { type: 'dropdown2', locator: PowerGridMetricsLocators.controlPanelLocators.periodLength.locator, value: values.periodLength },
      beginDate: { type: 'calendar', locator: PowerGridMetricsLocators.controlPanelLocators.beginDate.locator, value: values.beginDate },
      endDate: { type: 'calendar', locator: PowerGridMetricsLocators.controlPanelLocators.endDate.locator, value: values.endDate },
      coef: { type: 'checkbox2', locator: PowerGridMetricsLocators.controlPanelLocators.coef.locator, value: values.coef },
    };
  }

const energoResourse = {
    energy: { Name: 'Электроэнергия', Id: 1 },
    heat: {Name: 'Тепло', Id: 5},
    CWS: { Name: 'ХВС', Id: 3 },
    HWS: {Name: 'ГВС', Id: 4},
    gas: {Name: 'Газ', Id: 2},
}

const pointLevel = {
    customer: { Name: 'Потребитель', value: '1', allowedTypes: ['32'] },
    accountingObject: {Name: 'Объект учета', value: '2', allowedTypes: ['5', '144']},
    accountingPoint: {Name: 'Точка учета', value: '3', allowedTypes: ['21', '149']},
};


const periodLength = {
    day: { name: 'сутки', value: '1' },
    week: { name: 'неделя', value: '2' },
    month: { name: 'месяц', value: '3' },
    quartal: { name: 'квартал', value: '4' },
    year: { name: 'год', value: '5' },
    custom: { name: 'другой', value: '6' },
};

const reportTypes = {
    regimeParams: { name: 'Параметры режима ЭС'},
    tgControl: { name: 'Контроль tg' },
}

const meteringPoints = {
    firstCounter: {
        deviceID: '1181',
        name: 'к. 306 (CE805M)\\Счетчик CE208 №011507114079893',
        tariffs: [0,1,2]
    },
    secondCounter: {
        deviceID: '1178',
        name: 'ВРУ 0,4кВ\\Ввод 1_2'
    }
}

const eventTableColumns = {
    importance: {uiColumn: 'Важность', dbColumn: 'Importance', index: '0'},
    pointName: {uiColumn: 'Название ТУ', dbColumn: 'PointName', index: '1'},
    eventDescr: {uiColumn: 'Событие', dbColumn: 'EventDescr', index: '2'},
    startDate: {uiColumn: 'Время-от', dbColumn: 'DTOnMs', index: '3'},
    duration: {uiColumn: 'Длительность', dbColumn: 'Duration', index: '5'},
}

const filterOptions = ["Активная мощность по сумме фаз", "Реактивная мощность по сумме фаз", "Полная мощность по сумме фаз", "Напряжение по фазе A"]

const eventCategories = {
    limitsU: {
        categoryID: '24'
    },
    timeCorrections: {
        categoryID: '6'
    }
}

const importances = {
    info: {
        id: '1'
    },
    warning: {
        id: '2'
    },
    error: {
        id: '3'
    }
}

const testCases = [
    {
        eventCategories: [eventCategories.limitsU, eventCategories.timeCorrections],
        reportFormat: "Html",
        allParamsInReport: false,
        energoResourse: energoResourse.energy,
        pointLevel: pointLevel.accountingPoint,
        devices: [meteringPoints.firstCounter],
        importances: [
            importances.info,
            importances.warning,
            importances.error
        ],
        esParameters: filterOptions,
        columns: eventTableColumns,
        controlPanel: makeControlPanelConfig({
            periodLength: periodLength.custom.value,
            beginDate: '01.11.2023',
            endDate: '27.11.2023',
            coef: true,
        }),
    }
]


const PowerGridMetricsConfig = {
    testCases,
    reportTypes
}

export default PowerGridMetricsConfig;


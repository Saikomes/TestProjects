import AccountingDataLocators from "../locators/AccountingData/accountingDataLocators";
import AccountingDataEventsLocators from "../locators/AccountingDataEvents/accountingDataEventsLocators";

function makeControlPanelConfig(values) {
    return {
      periodLength: { type: 'dropdown', locator: AccountingDataEventsLocators.controlPanelLocators.periodLength.locator, value: values.periodLength },
      beginDate: { type: 'calendar', locator: AccountingDataEventsLocators.controlPanelLocators.beginDate.locator, value: values.beginDate },
      endDate: { type: 'calendar', locator: AccountingDataEventsLocators.controlPanelLocators.endDate.locator, value: values.endDate },
      info: { type: 'checkbox', locator: AccountingDataEventsLocators.controlPanelLocators.info.locator, value: values.info },
      warning: { type: 'checkbox', locator: AccountingDataEventsLocators.controlPanelLocators.warning.locator, value: values.warning },
      accident: { type: 'checkbox', locator: AccountingDataEventsLocators.controlPanelLocators.accident.locator, value: values.accident },
      groupBy: { type: 'checkbox', locator: AccountingDataEventsLocators.controlPanelLocators.groupBy.locator, value: values.groupBy },
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
    day: { name: 'сутки', value: 'day' },
    week: { name: 'неделя', value: 'week' },
    month: { name: 'месяц', value: 'month' },
    quartal: { name: 'квартал', value: 'quarter' },
    year: { name: 'год', value: 'year' },
    custom: { name: 'другой', value: 'custom' },
};


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

const filterOptions = {
    limits: {Name: "Пределы"},
    time: {Name: "Время"},
}

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
        reportType: "HTML",
        energoResourse: energoResourse.energy,
        pointLevel: pointLevel.accountingPoint,
        devices: [meteringPoints.firstCounter],
        importances: [
            importances.info,
            importances.warning,
            importances.error
        ],
        filterOptions: {
            limits: filterOptions.limits,
            time: filterOptions.time,
        },
        columns: eventTableColumns,
        controlPanel: makeControlPanelConfig({
            periodLength: periodLength.custom.value,
            beginDate: '26.06.2023',
            endDate: '27.06.2023',
            info: true,
            warning: true,
            accident: true,
            groupBy: true,
        }),
    }
]


const AccountingDataEventsConfig = {
    testCases,
}

export default AccountingDataEventsConfig;


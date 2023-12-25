import AccountingDataLocators from "../locators/AccountingData/accountingDataLocators";

function makeControlPanelConfig(values) {
    return {
      periodLength: { type: 'dropdown', locator: AccountingDataLocators.controlPanelLocators.periodLength.locator, value: values.periodLength },
      beginDate: { type: 'calendar', locator: AccountingDataLocators.controlPanelLocators.beginDate.locator, value: values.beginDate },
      endDate: { type: 'calendar', locator: AccountingDataLocators.controlPanelLocators.endDate.locator, value: values.endDate },
      periodType: { type: 'dropdown', locator: AccountingDataLocators.controlPanelLocators.periodType.locator, value: values.periodType },
      sum: { type: 'checkbox', locator: AccountingDataLocators.controlPanelLocators.sum.locator, value: values.sum },
      tariff: { type: 'checkbox', locator: AccountingDataLocators.controlPanelLocators.tariff.locator, value: values.tariff },
      coef: { type: 'checkbox', locator: AccountingDataLocators.controlPanelLocators.coef.locator, value: values.coef },
    };
  }
  
  function makeSettingsConfig(values) {
    return {
      sum: { type: 'checkbox', locator: AccountingDataLocators.settingsLocators.sum.locator, value: values.sum },
      sumLoss: { type: 'checkbox', locator: AccountingDataLocators.settingsLocators.sumLoss.locator, value: values.sumLoss },
      sumWithLoss: { type: 'checkbox', locator: AccountingDataLocators.settingsLocators.sumWithLoss.locator, value: values.sumWithLoss },
      sumUncounted: { type: 'checkbox', locator: AccountingDataLocators.settingsLocators.sumUncounted.locator, value: values.sumUncounted },
      sumWithUncounted: { type: 'checkbox', locator: AccountingDataLocators.settingsLocators.sumWithUncounted.locator, value: values.sumWithUncounted },
      sumWithLossAndUncounted: { type: 'checkbox', locator: AccountingDataLocators.settingsLocators.sumWithLossAndUncounted.locator, value: values.sumWithLossAndUncounted },
      calcS: { type: 'checkbox', locator: AccountingDataLocators.settingsLocators.calcS.locator, value: values.calcS },
    };
  }

  function extractColumnsById(readings, id) {
    let targetReadings;
    for (const key in readings) {
        if (readings[key].resourseId === id) {
            targetReadings = readings[key].readings;
            break;
        }
    }

    const dbColumns = [];
    const uiColumns = [];
    for (const key in targetReadings) {
        dbColumns.push(targetReadings[key].dbColumn);
        uiColumns.push(targetReadings[key].uiColumn);
    }

    return { dbColumns, uiColumns };
}
  

const energoResourse = {
    energy: { Name: 'Электроэнергия', Id: 1 },
    heat: {Name: 'Тепло', Id: 5},
    CWS: { Name: 'ХВС', Id: 3 },
    HWS: {Name: 'ГВС', Id: 4},
    gas: {Name: 'Газ', Id: 2},
}

const energoResourseParamTypes = {
    energy: { Name: 'Электроэнергия', ParamTypes: '2,4,6,8', Id: 1 },
    heat: {Name: 'Тепло', ParamTypes: '72,247,555', Id: 5},
    CWS: { Name: 'ХВС', ParamTypes: '76', Id: 3 },
    HWS: {Name: 'ГВС', ParamTypes: '76', Id: 4},
    gas: {Name: 'Газ', ParamTypes: '76', Id: 2},
}

const pointLevel = {
    customer: { Name: 'Потребитель', value: '1', allowedTypes: ['32'] },
    accountingObject: {Name: 'Объект учета', value: '2', allowedTypes: ['5', '144']},
    accountingPoint: {Name: 'Точка учета', value: '3', allowedTypes: ['21', '149']},
};

pointLevel.accountingObject.allowedTypes.push(...pointLevel.customer.allowedTypes);
pointLevel.accountingPoint.allowedTypes.push(...pointLevel.customer.allowedTypes, ...pointLevel.accountingObject.allowedTypes)

const periodLength = {
    day: { name: 'сутки', value: 'day' },
    week: { name: 'неделя', value: 'week' },
    month: { name: 'месяц', value: 'month' },
    quartal: { name: 'квартал', value: 'quarter' },
    year: { name: 'год', value: 'year' },
    custom: { name: 'другой', value: 'custom' },
};

const dataKind = {
    NI: { name: 'Показания(НИ)', value: '1' },
    PR: { name: 'Показания(ПР)', value: '2' },
    PE: { name: 'Профиль(ЭН)', value: '3' },
    PP: { name: 'Профиль(МЩ)', value: '4' },
};

const periodType = {
    halfHour: { name: 'по полчаса', value: '1', milliseconds: 1800000 },
    hour: { name: 'по часу', value: '2', milliseconds: 3600000 },
    day: { name: 'по суткам', value: '3', milliseconds: 86400000 },
    month: { name: 'по месяцам', value: '4' },
    quartal: { name: 'по кварталам', value: '5' },
    year: { name: 'по годам', value: '6' },
};

const meteringPoints = {
    firstCounter: {
        deviceID: '4436',
        name: 'к. 306 (CE805M)\\Счетчик CE208 №011507114079893',
        tariffs: [0,1,2]
    },
    secondCounter: {
        deviceID: '1178',
        name: 'ВРУ 0,4кВ\\Ввод 1_2'
    }
}

const readings = {
    aIncome: {uiColumn: 'aIncome', dbColumn: 'A прием', headerTitle: 'A прием', detalisationName: 'Активная энергия, прием', detalisationGroup: 'Часто используемые'},
    rIncome: {uiColumn: 'rIncome', dbColumn: 'R прием', headerTitle: 'R прием', detalisationName: 'Реактивная энергия, прием', detalisationGroup: 'Часто используемые'},
    aOutcome: {uiColumn: 'aOutcome', dbColumn: 'A отдача', headerTitle: 'A отдача', detalisationName: 'Активная энергия, отдача', detalisationGroup: 'Часто используемые'},
    rOutcome: {uiColumn: 'rOutcome', dbColumn: 'R отдача', headerTitle: 'R отдача', detalisationName: 'Реактивная энергия, отдача', detalisationGroup: 'Часто используемые'},
    frequency: {uiColumn: 'rOutcome', dbColumn: 'R отдача', headerTitle: 'R отдача', detalisationName: 'Частота', detalisationGroup: 'Дополнительные'},
}
const testCases = [
    {
        checkLossDetalisation: false,
        reportType: "HTML",
        detalisationParams: false,
        pointLevel: pointLevel.accountingPoint,
        energoResourse: energoResourse.energy,
        devices: [meteringPoints.firstCounter],
        dataKind: dataKind.NI,
        columns: {
            aIncome: readings.aIncome,
            aOutcome: readings.aOutcome,
        },
        controlPanel: makeControlPanelConfig({
            periodLength: periodLength.month.value,
            periodType: periodType.day.value,
            beginDate: '24.09.2023',
            endDate: '24.10.2023',
            sum: false,
            tariff: false,
            coef: true,
        }),
        settings: makeSettingsConfig({
            sum: true,
            sumLoss: false,
            sumWithLoss: false,
            sumUncounted: false,
            sumWithUncounted: true,
            sumWithLossAndUncounted: false,
            calcS: false,
        }),
    }
]


const AccountingDataConfig = {
    testCases,
    energoResourseParamTypes
}

export default AccountingDataConfig;


import { ClientReportLocators } from "../locators/reports/clientReportLocators";

function applyCommonConfig(values) {
    return {
      periodLength: { type: 'select2', locator: ClientReportLocators.reportParamLocators.periodDurationDropdown.locator, value: values.periodLength },
      beginDate: { type: 'calendar', locator: ClientReportLocators.reportParamLocators.periodStart.locator, value: values.beginDate },
      endDate: { type: 'calendar', locator: ClientReportLocators.reportParamLocators.periodEnd.locator, value: values.endDate },
      reportFormat: { type: 'select2', locator: ClientReportLocators.reportParamLocators.selectFormatDropMenu.locator, value: values.reportFormat },
    };
  }

  function applyAdditionalConfig(values = {}) {
    return {
      contract: values.contract ? { type: 'select2', locator: ClientReportLocators.reportParamLocators.reportParamSelect.locator("Договор"), value: values.contract } : null,
      accuracy: values.accuracy ? { type: 'select2', locator: ClientReportLocators.reportParamLocators.reportParamSelect.locator("Точность"), value: values.accuracy } : null,
      paramForReport: values.paramForReport ? { type: 'select2', locator: ClientReportLocators.reportParamLocators.reportParamSelect.locator("Параметр для отчета"), value: values.paramForReport.Name } : null,
    };
  }

  function applyReportConfig(commonValues, additionalValues) {
    const commonConfig = applyCommonConfig(commonValues);
    const additionalConfig = applyAdditionalConfig(additionalValues);
    return { ...commonConfig, ...additionalConfig };
  }

  const parametersForReport = {
    activeEnergyIncome: { Name: 'Активная энергия, прием', value: '4' },
    activeEnergyOutcome: { Name: 'Активная энергия, отдача', value: '2' },
};

  const reports = {
    flowAccountingAct: { Name: 'Акт учета перетоков', ReportId: '1037', Category: 'Стандартные', Settings: applyReportConfig({
      periodLength: "месяц",
      beginDate: "01.12.2023",
      endDate: "01.01.2024",
      reportFormat: "HTML",
  }), },
    energoConsumptionDetail: {
      Name: 'Детализация потребления энергоресурса', 
    ReportId: '1029', 
    Category: 'Стандартные', 
    Settings: applyReportConfig({
      periodLength: "сутки",
      beginDate: "01.12.2023",
      endDate: "02.12.2023",
      reportFormat: "PDF",
  }, {
    paramForReport: parametersForReport.activeEnergyIncome,
  })},
};

const ReportsConfig = {
  reports,
  parametersForReport
}

export default ReportsConfig;

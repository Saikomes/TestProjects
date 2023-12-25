import CommonReportsLocators from "../../../Common/locators/Reports/commonReportsLocators";

export class ClientReportListLocators {

    static reportsSideBarLocators = {
        ...CommonReportsLocators.reportsSideBarLocators,
        
        reportRow: {
            alias: 'Строка отчета',
            locator: `//span[contains(@class, 'slick-toggle slick-grid__tree-point')]/ancestor::div[contains(@class, 'slick-cell')]`
        },

    }
    static reportParamLocators = {
        ...CommonReportsLocators.reportParamLocators
    };
};

export default ClientReportListLocators
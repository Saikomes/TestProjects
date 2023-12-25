import CommonReportsLocators from "../../../Common/locators/Reports/commonReportsLocators";
export class AdminReportListLocators {

    static reportsSideBarLocators = {
        ...CommonReportsLocators.reportsSideBarLocators,
        
        reportRow: {
            alias: 'Строка отчета',
            locator: `//span[contains(@class, 'slick-toggle slick-no-bullet')]/ancestor::div[contains(@class, 'slick-cell')]`
        },

    }
    static reportParamLocators = {
        ...CommonReportsLocators.reportParamLocators
    };
    
};

export default AdminReportListLocators
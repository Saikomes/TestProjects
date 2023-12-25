import CommonReportsElements from "../../../Common/elements/Reports/commonReportsElements";
import ClientReportListLocators from "../../locators/reports/clientReportListLocators";
import TestHelpers from "../../../Common/modules/testHelpers";

class ClientReportListElements extends CommonReportsElements {

    reportRow() {
        return TestHelpers.getLinkedLocator(this.reportsSideBar(), ClientReportListLocators.reportsSideBarLocators.reportRow.locator);
    }

}
export default ClientReportListElements
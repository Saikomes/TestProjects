import AdminReportListLocators from "../../locators/Reports/adminReportListLocators";
import TestHelpers from "../../../Common/modules/testHelpers";
import CommonReportsElements from "../../../Common/elements/Reports/commonReportsElements";

class AdminReportListElements  extends CommonReportsElements {

    reportRow() {
        return TestHelpers.getLinkedLocator(this.reportsSideBar(), AdminReportListLocators.reportsSideBarLocators.reportRow.locator);
    }

}

export default AdminReportListElements
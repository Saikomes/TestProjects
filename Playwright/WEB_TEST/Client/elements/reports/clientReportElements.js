import CommonReportsElements from "../../../Common/elements/Reports/commonReportsElements";
import ClientReportListElements from "./clientReportListElements";
import UiFormActions from "../../actions/Common/uiFormActions";
import TestHelpers from "../../../Common/modules/testHelpers";

class ClientReportElements extends CommonReportsElements {

    constructor(page) {
        super(page)
        this.clientReportListElements = new ClientReportListElements(page)
    }

    reportRow() {
        return TestHelpers.getLinkedLocator(this.reportsSideBar(), ClientReportListLocators.reportsSideBarLocators.reportRow.locator);
    }

}
export default ClientReportElements
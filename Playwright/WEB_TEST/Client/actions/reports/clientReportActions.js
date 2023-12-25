import CommonReportsActions from "../../../Common/actions/Reports/commonReportsActions";
import ClientReportElements from "../../elements/reports/clientReportElements";
import ClientReportListActions from "./clientReportListActions";
import UiFormActions from "../Common/uiFormActions";
import { expect } from "@playwright/test";

class ClientReportActions extends CommonReportsActions {
    constructor(page) {
        super(page);
        this.clientReportElements = new ClientReportElements(page);
        this.clientReportListActions = new ClientReportListActions(page)
        this.uiFormActions = new UiFormActions(page)
    }

}
export default ClientReportActions
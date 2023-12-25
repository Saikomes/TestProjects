import CommonReportsActions from "../../../Common/actions/Reports/commonReportsActions";
import ClientReportListElements from "../../elements/reports/clientReportListElements";
import { expect } from "@playwright/test";

class ClientReportListActions extends CommonReportsActions {
    constructor(page) {
        super(page);
        this.clientReportListElements = new ClientReportListElements(page);
    }

    async expandCategory(categoryName) {
        const categoryToggleLocator = this.clientReportListElements.slickToggleForCategory(categoryName)
        let classAttribute = await categoryToggleLocator.getAttribute('class');
        if(classAttribute.includes('slick-grid__tree-expand')) {
            await categoryToggleLocator.click();
        }
        classAttribute = await categoryToggleLocator.getAttribute('class');
        expect(classAttribute.includes('slick-grid__tree-expand')).toBeFalsy()
    }

    async collapseCategory(categoryName) {
        const categoryToggleLocator = this.clientReportListElements.slickToggleForCategory(categoryName)
        let classAttribute = await categoryToggleLocator.getAttribute('class');
        if(classAttribute.includes('slick-grid__tree-collapse')) {
            await categoryToggleLocator.click();
        }
        classAttribute = await categoryToggleLocator.getAttribute('class');
        expect(classAttribute.includes('slick-grid__tree-collapse')).toBeFalsy()
    }


}
export default ClientReportListActions
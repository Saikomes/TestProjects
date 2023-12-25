import { expect } from "@playwright/test";
import AdminReportListElements from "../../elements/Reports/adminReportListElements";
import CommonReportsActions from "../../../Common/actions/Reports/commonReportsActions";
class AdminReportListActions extends CommonReportsActions {
    constructor(page) {
        super(page);
        this.reportListElements = new AdminReportListElements(page);
    }

    async expandCategory(categoryName) {
        const categoryToggleLocator = this.reportListElements.slickToggleForCategory(categoryName)
        let classAttribute = await categoryToggleLocator.getAttribute('class');
        if(classAttribute.includes('slick-expand')) {
            await categoryToggleLocator.click();
        }
        classAttribute = await categoryToggleLocator.getAttribute('class');
        expect(classAttribute.includes('slick-expand')).toBeFalsy()
        
    }

    async collapseCategory(categoryName) {
        const categoryToggleLocator = this.reportListElements.slickToggleForCategory(categoryName)
        let classAttribute = await categoryToggleLocator.getAttribute('class');
        if(classAttribute.includes('slick-collapse')) {
            await categoryToggleLocator.click();
        }
        classAttribute = await categoryToggleLocator.getAttribute('class');
        expect(classAttribute.includes('slick-collapse')).toBeFalsy()
    }

}
export default AdminReportListActions
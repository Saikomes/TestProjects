import CommonReportsElements from "../../elements/Reports/commonReportsElements";

class CommonReportsActions  {
    constructor(page) {
        this.page = page;
        this.commonReportsElements = new CommonReportsElements(page);
    }

    async expandCategory(categoryName) {
        const categoryToggleLocator = this.commonReportsElements.slickToggleForCategory(categoryName)
        const classAttribute = await categoryToggleLocator.getAttribute('class');
        if (classAttribute.includes('slick-expand')) {
            await categoryToggleLocator.click();
        }
    }

    async collapseCategory(categoryName) {
        const categoryToggleLocator = this.commonReportsElements.slickToggleForCategory(categoryName)
        const classAttribute = await categoryToggleLocator.getAttribute('class');
        if (classAttribute.includes('slick-collapse')) {
            await categoryToggleLocator.click();
        }
    }

    async selectReportByName(reportName) {
        await this.commonReportsElements.reportRowByName(reportName).click()
    }

    async selectFormatDropMenu() {
        await this.commonReportsElements.selectFormatDropMenu().click()
    }

    async selectFormatDropMenuItem(formatName) {
        await this.commonReportsElements.selectFormatDropMenuItem(formatName).click()
    }

    async selectReportFormat(formatName) {
        await this.selectFormatDropMenu()
        await this.selectFormatDropMenuItem(formatName)
    }
    
    async showReport() {
        await this.commonReportsElements.buttonShowReport().click()
    }
}
export default CommonReportsActions
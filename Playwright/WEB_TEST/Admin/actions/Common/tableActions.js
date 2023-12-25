import BrowserActions from "../../../Common/browserActions";
class TableActions {
    constructor(page) {
        this.page = page;
    }

    async sortByAscending(columnId) {
        const isAscDisabled = await this.page.locator(`${columnId} span[sort="asc"].ui-state-disabled`).count();

        if (!isAscDisabled) {
            await this.page.locator(`${columnId} span[sort="asc"]`).click();
        }
        await BrowserActions.waitForPageReady(this.page)
    }

    async sortByDescending(columnId) {
        const isDescDisabled = await this.page.locator(`${columnId} span[sort="desc"].ui-state-disabled`).count();

        if (!isDescDisabled) {
            await this.page.locator(`${columnId} span[sort="desc"]`).click();
        }
        await BrowserActions.waitForPageReady(this.page)
    }
}
export default TableActions
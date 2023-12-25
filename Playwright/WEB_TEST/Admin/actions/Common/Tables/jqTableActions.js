import { JqTableElements } from "../../../elements/Common/Tables/jqTableElements";
import UiTableActions from "./uiTableActions";
import BrowserActions from "../../../../Common/browserActions";
import { expect } from '@playwright/test';

class JqTableActions extends UiTableActions {
    constructor(page, parentLocator = null) {
        super(page, parentLocator);
        this.jqTableElements = new JqTableElements(page, parentLocator);
    }

    async getRowCellValue(row, cellDescription) {
        const cellElement = this.jqTableElements.rowCell(row, cellDescription);
        return await cellElement.textContent();
    }

    async sortByAscending(columnId) {
        await this.parentLocator.locator(`${columnId}`).click()
        const ascArrow = this.parentLocator.locator(`${columnId} span[sort="asc"].ui-state-disabled`)
        let isAscDisabled = await ascArrow.count();
        if (isAscDisabled) {
            await this.parentLocator.locator(`${columnId} span[sort="desc"]`).click();
            isAscDisabled = await descArrow.count()
            expect(isAscDisabled).toEqual(0)
        }
        await BrowserActions.waitForPageReady(this.page)
    }

    async sortByDescending(columnId) {
        await this.parentLocator.locator(`${columnId}`).click()
        const descArrow = this.parentLocator.locator(`${columnId} span[sort="desc"].ui-state-disabled`)
        let isDescDisabled = await descArrow.count();
        if (isDescDisabled) {
            await this.parentLocator.locator(`${columnId} span[sort="asc"]`).click();
            isDescDisabled = await descArrow.count()
            expect(isDescDisabled).toEqual(0)
        }
        await BrowserActions.waitForPageReady(this.page)
    }

}

export default JqTableActions
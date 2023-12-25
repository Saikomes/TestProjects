import SlickTableLocators from "../../../locators/Common/Tables/slickTableLocators";
import { UiTableElements } from "./uiTableElements";
export class SlickTableElements extends UiTableElements {
    constructor(page, parentLocator = null) {
        super(page, parentLocator)
    }
        
    tableRow() {
        return this.parentLocator.locator(SlickTableLocators.tableRow.locator)
    }

    async headerIndex(headerText) {
        const headers = await this.parentLocator.locator('.slick-header-column span.slick-column-name').all();
        for (let i = 0; i < headers.length; i++) {
          const text = await headers[i].textContent();
          if (text === headerText) {
            return i;
          }
        }
        return -1;
    }

    async rowByColumnValue(columnHeaderText, value) {
        const headerIndex = await this.headerIndex(columnHeaderText)
        return this.parentLocator.locator(SlickTableLocators.rowByColumnValue.locator(headerIndex, value))
    }

}

export default SlickTableElements
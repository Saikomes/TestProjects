import TypeDataToolbarElements from "../../../elements/common/DataPanels/typeDataToolbarElements";
import BrowserActions from "../../../../Common/browserActions";
import { expect } from "@playwright/test";

class TypeDataToolbarActions {

    constructor(page) {
        this.page = page;
        this.typeDataToolbarElements = new TypeDataToolbarElements(page)
    }

    async selectAccountingPointRegime() {
        await this.typeDataToolbarElements.meteringPointButton().click()
        await BrowserActions.waitForPageReady(this.page)
    }

    async selectDetalisationRegime() {
        await this.typeDataToolbarElements.detalisationButton().click()
        await BrowserActions.waitForPageReady(this.page)
    }

}
export default TypeDataToolbarActions
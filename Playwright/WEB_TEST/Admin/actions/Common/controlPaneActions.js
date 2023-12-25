import ControlPaneElements from "../../elements/Common/controlPaneElements";
import BrowserActions from "../../../Common/browserActions";
class ControlPaneActions {
    constructor(page, parentLocator = null) {
        this.page = page
        this.controlPaneElements = new ControlPaneElements(page, parentLocator);
    }

    async performSearch(value) {
        await this.controlPaneElements.searchInput().fill(value)
        await this.controlPaneElements.searchButton().click()
        await BrowserActions.waitForPageReady(this.page)
    }

    async fillSearchField(value) {
        await this.controlPaneElements.searchInput().fill(value)
    }

    async launchSearch() {
        await this.controlPaneElements.searchButton().click()
        await BrowserActions.waitForPageReady(this.page)
    }

    async clickAddButton() {
        await this.controlPaneElements.buttonAdd().click()
    }

}

export default ControlPaneActions
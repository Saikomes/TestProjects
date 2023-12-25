import { expect } from "@playwright/test";
import GlobalSettingsTabElements from "../../elements/GlobalSettings/globalSettingsTabElements";
import UiFormActions from "../Common/uiFormActions";

class GlobalSettingsTabActions {
    constructor(page) {
        this.page = page
        this.uiFormActions = new UiFormActions(page)
        this.globalSettingsTabElements = new GlobalSettingsTabElements(page)
    }

    async saveChanges() {
        await this.globalSettingsTabElements.saveChangesBtn().click()
    }

    async cancelChanges() {
        await this.globalSettingsTabElements.cancelChangesBtn().click()
    }

}
export default GlobalSettingsTabActions
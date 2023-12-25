import GlobalSettingsLocators from "../../locators/GlobalSettings/globalSettingsLocators";
import { TestHelpers } from "../../../Common/modules/testHelpers";

class GlobalSettingsTabElements{
    constructor(page) {
        this.page = page
    }

    saveChangesBtn() {
        return this.page.locator(GlobalSettingsLocators.globalSettingsTabLocators.saveChangesBtn.locator)
    }

    cancelChangesBtn() {
        return this.page.locator(GlobalSettingsLocators.globalSettingsTabLocators.cancelChangesBtn.locator)
    }

}
export default GlobalSettingsTabElements
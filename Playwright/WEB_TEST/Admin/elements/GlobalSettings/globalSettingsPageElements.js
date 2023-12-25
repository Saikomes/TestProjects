import GlobalSettingsLocators from "../../locators/GlobalSettings/globalSettingsLocators";
import { TestHelpers } from "../../../Common/modules/testHelpers";

class GlobalSettingsPageElements{
    constructor(page) {
        this.page = page
    }

    globalSettingsTab() {
        return this.page.locator(GlobalSettingsLocators.globalSettingsPageLocators.globalSettingsTab.locator)
    }

    mailTemplateSettingsTab() {
        return this.page.locator(GlobalSettingsLocators.globalSettingsPageLocators.mailTemplateSettingsTab.locator)
    }

    outgoingEmailSettingsTab() {
        return this.page.locator(GlobalSettingsLocators.globalSettingsPageLocators.outgoingEmailSettingsTab.locator)
    }

}
export default GlobalSettingsPageElements
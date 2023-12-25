import { expect } from "@playwright/test";
import PageHelpers from "../../modules/PageHelpers";
import GlobalSettingsLocators from "../../locators/GlobalSettings/globalSettingsLocators";
import GlobalSettingsPageElements from "../../elements/GlobalSettings/globalSettingsPageElements";

class GlobalSettingsPageActions {
    constructor(page) {
        this.page = page;
        this.globalSettingsPageElements = new GlobalSettingsPageElements(page);
    }

    async toggleGlobalSettingsTab() {
        await this.globalSettingsPageElements.globalSettingsTab().click()
        expect(await this.page.locator(GlobalSettingsLocators.globalSettingsTabLocators.globalSettingsTabContent.locator).isVisible(), "Содержимое вкладки общесистемные настройки видимо пользователю").toBeTruthy()
    }

    async toggleMailTemplateSettingsTab() {
        await this.globalSettingsPageElements.mailTemplateSettingsTab().click()
        expect(await this.page.locator(GlobalSettingsLocators.emailTemplatesTabLocators.emailTemplatesTabContent.locator).isVisible(), "Содержимое вкладки почтовых шаблонов видимо пользователю").toBeTruthy()
    }

    async toggleOutgoingEmailSettingsTab() {
        await this.globalSettingsPageElements.outgoingEmailSettingsTab().click()
        expect(await this.page.locator(GlobalSettingsLocators.outgoingEmailSettingsLocators.outgoingEmailTabContent.locator).isVisible(), "Содержимое вкладки настроек исходящих email видимо пользователю").toBeTruthy()
    }
    

}
export default GlobalSettingsPageActions
import GlobalSettingsLocators from "../../locators/GlobalSettings/globalSettingsLocators";
import { TestHelpers } from "../../../Common/modules/testHelpers";

class OutgoingEmailSettingsElements{
    constructor(page) {
        this.page = page
    }

    addAccountBtn() {
        return this.page.locator(GlobalSettingsLocators.outgoingEmailSettingsLocators.addAccountBtn.locator)
    }

    accountRowBySmtpAddress(address) {
        return this.page.locator(GlobalSettingsLocators.outgoingEmailSettingsLocators.accountRowBySmtpAddress.locator(address))
    }

    editAccountButton(accountsRow) {
        return TestHelpers.getLinkedLocator(accountsRow, GlobalSettingsLocators.outgoingEmailSettingsLocators.editAccountButton.locator);
    }
    setupTaskButton(accountsRow) {
        return TestHelpers.getLinkedLocator(accountsRow, GlobalSettingsLocators.outgoingEmailSettingsLocators.deleteAccountButton.locator);
    }

}
export default OutgoingEmailSettingsElements
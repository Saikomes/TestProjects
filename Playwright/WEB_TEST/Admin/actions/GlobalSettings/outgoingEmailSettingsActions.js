import { expect } from "@playwright/test";
import OutgoingEmailSettingsElements from "../../elements/GlobalSettings/outgoingEmailSettingsElements";
import ToolTipDialogActions from "../Common/toolTipDialogActions";

class OutgoingEmailSettingsActions {
    constructor(page) {
        this.page = page;
        this.outgoingEmailSettingsElements = new OutgoingEmailSettingsElements(page);
        this.toolTipDialogActions = new ToolTipDialogActions(page)
    }

    async addNewAccount() {
        await this.outgoingEmailSettingsElements.addAccountBtn().click()
    }

    async expandAccountSettings(address) {
        const accountsRow = this.outgoingEmailSettingsElements.accountRowBySmtpAddress(address)
        await this.outgoingEmailSettingsElements.editAccountButton(accountsRow).click()
    }

    async deleteAccount(address) {
        const accountsRow = this.outgoingEmailSettingsElements.accountRowBySmtpAddress(address)
        await this.outgoingEmailSettingsElements.deleteAccount(accountsRow).click()
        await this.toolTipDialogActions.chooseDialogOption("Ок")
    }
    

}
export default OutgoingEmailSettingsActions
import { expect } from "@playwright/test";
import ManageCustomerAccountsElements from "../../elements/Accounts/manageCustomerAccountsElements";
import BrowserActions from "../../../Common/browserActions";
import ManageAccountsBaseActions from "./manageAccountsBaseActions";

class ManageCustomerAccountsActions extends ManageAccountsBaseActions {
    constructor(page) {
        super(page, new ManageCustomerAccountsElements(page));
    }

    async changeStatusRegime(status) {
        await this.manageAccountsElements.accountStatus(status).click()
    }

    async selectAccount(email) {
        await this.changeStatusRegime("Все")
        await this.manageAccountsElements.searchInput().fill(email)
        await BrowserActions.waitForPageReady(this.page)
        await this.page.locator('#btnSearch >> span').first().click()
        await BrowserActions.waitForPageReady(this.page)
        await this.manageAccountsElements.accountRowCheckBox(email).check();
    }
    async changeAccountStatus(email, actionUrl) {
        await this.selectAccount(email)
        await this.manageAccountsElements.accountAction(actionUrl).click()
        await BrowserActions.waitForPageReady(this.page)
    }
}
export default ManageCustomerAccountsActions
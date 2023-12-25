import { expect } from "@playwright/test";
import ManageEmployeeAccountsElements from "../../elements/Accounts/manageEmployeeAccountsElements";
import BrowserActions from "../../../Common/browserActions";
import ManageAccountsBaseActions from "./manageAccountsBaseActions";

class ManageEmployeeAccountsActions extends ManageAccountsBaseActions {
    constructor(page) {
        super(page, new ManageEmployeeAccountsElements(page));
    }
    async selectAccount(login) {
        await this.manageAccountsElements.searchInput().fill(login)
        await this.manageAccountsElements.searchButton().click()
        await BrowserActions.waitForPageReady(this.page)
        const accountCheckbox = await this.manageAccountsElements.accountRowCheckBox(login)
        await accountCheckbox.check();
    }
}
export default ManageEmployeeAccountsActions
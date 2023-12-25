import ManageEmployeeAccountsLocators from "../../locators/Accounts/manageEmployeeAccountsLocators";
import { TestHelpers } from "../../../Common/modules/testHelpers";
import CommonManageAccountsElements from "./commonManageAccountsElements";


class ManageEmployeeAccountsElements  extends CommonManageAccountsElements{

    accountsArea() {
        return this.page.locator(ManageEmployeeAccountsLocators.accountListLocators.accountsArea.locator)
    }

    async accountRowByLogin(login) {
        let accountRows =await TestHelpers.getLinkedLocator(this.accountsArea(), ManageEmployeeAccountsLocators.accountListLocators.accountRow.locator).all()
        for (let accountRow of accountRows) {
            const accountLogin = await accountRow.locator('td[aria-describedby="refGrid-ref-cont_WindowsLoginName"] .mea-login').textContent()
            if(accountLogin == login) {
                return accountRow
            }
        }
        return null;
    }

    async accountRowCheckBox(login) {
        return TestHelpers.getLinkedLocator(await this.accountRowByLogin(login), ManageEmployeeAccountsLocators.accountListLocators.accountRowCheckBox.locator);
    }

    searchInput() {
        return TestHelpers.getLinkedLocator(this.accountsArea(), ManageEmployeeAccountsLocators.accountListLocators.searchInput.locator);
    }

    searchButton() {
        return TestHelpers.getLinkedLocator(this.accountsArea(), ManageEmployeeAccountsLocators.accountListLocators.searchButton.locator);
    }


}
export default ManageEmployeeAccountsElements
import CommonManageAccountsElements from "./commonManageAccountsElements";
import ManageCustomerAccountsLocators from "../../locators/Accounts/manageCustomerAccountsLocators";
import TestHelpers from "../../../Common/modules/testHelpers";


class ManageCustomerAccountsElements extends CommonManageAccountsElements {

    accountsArea() {
        return this.page.locator(ManageCustomerAccountsLocators.centerPaneLocators.centerPane.locator)
    }
    
    accountsStatusArea() {
        return this.page.locator(ManageCustomerAccountsLocators.sidePaneLocators.sidePane.locator)
    }

    accountRowByEmail(email) {
        return TestHelpers.getLinkedLocator(this.accountsArea(), ManageCustomerAccountsLocators.centerPaneLocators.accountRowByEmail.locator(email));
    }

    accountRowCheckBox(email) {
        return TestHelpers.getLinkedLocator(this.accountRowByEmail(email), ManageCustomerAccountsLocators.centerPaneLocators.accountRowCheckBox.locator);
    }

    accountStatus(status) {
        return TestHelpers.getLinkedLocator(this.accountsStatusArea(), ManageCustomerAccountsLocators.sidePaneLocators.accountStatus.locator(status));
    }

    accountAction(actionUrl) {
        return TestHelpers.getLinkedLocator(this.accountsArea(), ManageCustomerAccountsLocators.sidePaneLocators.accountAction.locator(actionUrl));
    }

    searchInput() {
        return TestHelpers.getLinkedLocator(this.accountsArea(), ManageCustomerAccountsLocators.centerPaneLocators.searchInput.locator);
    }

    searchButton() {
        return TestHelpers.getLinkedLocator(this.accountsArea(), ManageCustomerAccountsLocators.centerPaneLocators.searchButton.locator);
    }

}

export default ManageCustomerAccountsElements;
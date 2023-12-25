import { groupListLocators } from "../../locators/Accounts/commonManageAccountsLocators";
import TestHelpers from "../../../Common/modules/testHelpers";

class CommonManageAccountsElements {
    constructor(page) {
        this.page = page;
    }
    
    groupListArea() {
        return this.page.locator(groupListLocators.groupListArea.locator);
    }

    groupListItemByName(groupName) {
        return TestHelpers.getLinkedLocator(this.groupListArea(), groupListLocators.groupListItemByName.locator(groupName));
    }

    groupListItemByName(groupName) {
        return TestHelpers.getLinkedLocator(this.groupListArea(), groupListLocators.groupListItemByName.locator(groupName));
    }

    addToGroupButton() {
        return TestHelpers.getLinkedLocator(this.groupListArea(), groupListLocators.addToGroupButton.locator);
    }

    removeFromGroupButton() {
        return TestHelpers.getLinkedLocator(this.groupListArea(), groupListLocators.removeFromGroupButton.locator);
    }

    groupListItemAddButton(groupName) {
        return TestHelpers.getLinkedLocator(this.groupListItemByName(groupName), groupListLocators.addToGroupButton.locator);
    }

    groupListItemRemoveButton(groupName) {
        return TestHelpers.getLinkedLocator(this.groupListItemByName(groupName), groupListLocators.removeFromGroupButton.locator);
    }
}

export default CommonManageAccountsElements;
import EmployeesGroupsLocators from "../../locators/Accounts/employeesGroupsLocators";
import { TestHelpers } from "../../../Common/modules/testHelpers";


class EmployeesGroupsElements {
    constructor(page) {
        this.page = page;
    }

    sidePane() {
        return this.page.locator(EmployeesGroupsLocators.sidePaneLocators.sidePane.locator);
    }

    groupEditForm() {
        return this.page.locator(EmployeesGroupsLocators.groupConfigurationLocators.groupEditForm.locator);
    }

    fullAccessCheckBox() {
        return TestHelpers.getLinkedLocator(this.groupEditForm(), EmployeesGroupsLocators.groupConfigurationLocators.fullAccessCheckBox.locator);
    }

    groupNameInput() {
        return TestHelpers.getLinkedLocator(this.groupEditForm(), EmployeesGroupsLocators.groupConfigurationLocators.groupNameInput.locator);
    }

    searchField() {
        return TestHelpers.getLinkedLocator(this.sidePane(), EmployeesGroupsLocators.sidePaneLocators.searchField.locator);
    }

    addNewGroupButton() {
        return TestHelpers.getLinkedLocator(this.sidePane(), EmployeesGroupsLocators.sidePaneLocators.addNewGroupButton.locator).first();
    }


    employeesGroupItemByName(groupItemName) {
        return TestHelpers.getLinkedLocator(this.sidePane(), EmployeesGroupsLocators.sidePaneLocators.employeesGroupItemByName.locator(groupItemName));
    }

    removeEmpoyeeGroupByNameButton(groupItemName) {
        return TestHelpers.getLinkedLocator(this.employeesGroupItemByName(groupItemName), EmployeesGroupsLocators.sidePaneLocators.deleteGroupButton.locator);
    }

    permissionItem() {
        return TestHelpers.getLinkedLocator(this.groupEditForm(), EmployeesGroupsLocators.groupConfigurationLocators.permissionCheckBox.locator);
    }

    permissionGroupByName(groupName) {
        return TestHelpers.getLinkedLocator(this.groupEditForm(), EmployeesGroupsLocators.groupConfigurationLocators.permissionGroupByName.locator(groupName));
    }

    permissionGroupItemByName(groupName, groupItemName) {
        return TestHelpers.getLinkedLocator(this.permissionGroupByName(groupName), EmployeesGroupsLocators.groupConfigurationLocators.permissionCheckBoxByName.locator(groupItemName));
    }

    saveGroupButton() {
        return TestHelpers.getLinkedLocator(this.groupEditForm(), EmployeesGroupsLocators.groupConfigurationLocators.saveButton.locator).first()
    }

    cancelGroupEditButton() {
        return TestHelpers.getLinkedLocator(this.groupEditForm(), EmployeesGroupsLocators.groupConfigurationLocators.cancelButton.locator).first()
    }
}
export default EmployeesGroupsElements
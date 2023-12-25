import EmployeesGroupsElements  from "../../elements/Accounts/elmpoyeesGroupsElements";
import PermissionManager from "./permissionManager";
import CommonPageElements from "../../elements/Common/CommonPageElements";
import BrowserActions from "../../../Common/browserActions";
class EmployeesGroupsActions {
    constructor(page) {
        this.page = page;
        this.employeesGroupsElements = new EmployeesGroupsElements(page);
        this.permissionManager = new PermissionManager(page)
    }

    async addNewGroup() {
        await this.employeesGroupsElements.addNewGroupButton().hover()
        await this.employeesGroupsElements.addNewGroupButton().click()
        await this.employeesGroupsElements.groupEditForm().isEnabled();
    }

    async deleteGroupIfExists(groupName) {
        if ((await this.employeesGroupsElements.removeEmpoyeeGroupByNameButton(groupName).count()) != 0){
            await this.employeesGroupsElements.removeEmpoyeeGroupByNameButton(groupName).click()
            await this.page.getByRole('button', { name: 'ОК', exact: true }).click();
        }
        await BrowserActions.waitForPageReady(this.page)
    }

    async cleanGroupFromPermissions(groupName) {
        await this.employeesGroupsElements.employeesGroupItemByName(groupName).click()
        await this.permissionManager.unsetAllPermissions()
        await this.saveGroup()
    }

    async renameGroup(groupName) {
        await this.employeesGroupsElements.groupNameInput().fill(groupName)
    }

    async grantFullAccess() {
        await this.employeesGroupsElements.fullAccessCheckBox().check()
    }

    async saveGroup() {
        await this.employeesGroupsElements.saveGroupButton().click()
    }

    async cancelGroupEdit() {
        await this.employeesGroupsElements.cancelGroupEditButton().click()
    }

    async setPermission(groupName, permissionName) {
        await this.permissionManager.setPermission(groupName, permissionName)
    }

    async unsetPermission(groupName, permissionName) {
        await this.permissionManager.unsetPermission(groupName, permissionName)
    }

}

export default EmployeesGroupsActions
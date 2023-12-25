import EmployeesGroupsElements from "../../elements/Accounts/elmpoyeesGroupsElements";
class PermissionManager {
    constructor(page) {
        this.page = page;
        this.employeesGroupsElements = new EmployeesGroupsElements(page)
    }

    async setPermission(groupName, permissionName) {

        const checkBoxLocator = this.employeesGroupsElements.permissionGroupItemByName(groupName, permissionName)
        await checkBoxLocator.check();
    }

    async unsetPermission(groupName, permissionName) {

        const checkBoxLocator = this.employeesGroupsElements.permissionGroupItemByName(groupName, permissionName)
        await checkBoxLocator.uncheck();
    }

    async unsetAllPermissions() {

        const checkBoxLocators = await this.employeesGroupsElements.permissionItem().all()
        for (let checkBoxLocator of checkBoxLocators) {
            await checkBoxLocator.uncheck();
        }
    }

}

export default PermissionManager
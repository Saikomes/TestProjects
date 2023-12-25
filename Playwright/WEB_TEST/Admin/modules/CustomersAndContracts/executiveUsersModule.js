import ExecutiveUserActions from "../../actions/CustomersAndContracts/executiveUserActions";
import ExecutiveUserElements from "../../elements/CustomersAndContracts/ExecutiveUserElements";
import ExecutiveUserLocators from "../../locators/CustomersAndContracts/ExecutiveUserLocators";
import CustomersAndContractsConfig from "../../config/customersAndContractsConfig";
import { expect } from "@playwright/test";

export class ExecutiveUserModule {

    constructor(page) {
        this.page = page
        this.executiveUserActions = new ExecutiveUserActions(page)
        this.executiveUserElements = new ExecutiveUserElements(page)
    }

    async CreateExecutiveUser(executiveUserSettings) {
        await this.executiveUserActions.controlPaneActions.clickAddButton();
        const editPersonelDialog = this.executiveUserElements.editPersonelDialogElements.editPersonelDialog();
        await expect(editPersonelDialog).toBeVisible();
        await this.executiveUserActions.editPersonelDialogActions.applySettings(Object.values(executiveUserSettings), editPersonelDialog);
        await this.executiveUserActions.editPersonelDialogActions.chooseDialogOption(editPersonelDialog, "Сохранить");
    }

    async CheckUserSettings(executiveUserSettings, userName) {
        await this.executiveUserActions.controlPaneActions.performSearch(userName)
        const lastCustomerRow = this.executiveUserElements.executiveUsersTableElements.tableRowByGridValue(ExecutiveUserLocators.usersTableLocators.fioColumnHeader.locator,
            userName);
          await this.executiveUserActions.executiveUsersTableActions.editRow(lastCustomerRow);
          const editPersonelDialog = this.executiveUserElements.editPersonelDialogElements.editPersonelDialog();
          await expect(editPersonelDialog).toBeVisible();
          await this.executiveUserActions.editPersonelDialogActions.verifySettings(Object.values(executiveUserSettings), editPersonelDialog);
          await this.executiveUserActions.editPersonelDialogActions.chooseDialogOption(editPersonelDialog, "Закрыть");
    }

    async MergeUsers(mergeUsersSettings) {
        await this.executiveUserActions.clickMergeButton()
        const mergeUsersDialog = this.executiveUserElements.mergeUsersDialogElements.mergeUsersDialog()
        await expect(mergeUsersDialog).toBeVisible();
        await this.executiveUserActions.mergeUsersDialogActions.applySettings(mergeUsersSettings, mergeUsersDialog);
        await this.executiveUserActions.mergeUsersDialogActions.verifySettings(mergeUsersSettings, mergeUsersDialog);
        await this.executiveUserActions.mergeUsersDialogActions.chooseDialogOption(mergeUsersDialog, "Сохранить");
    }

    async CheckUsersMerged(deletedUserFio, mergedUserFio) {
        await this.executiveUserActions.controlPaneActions.fillSearchField(deletedUserFio)
        await this.executiveUserActions.controlPaneActions.launchSearch()
        const deletedUserRow = this.executiveUserElements.executiveUsersTableElements.tableRowByGridValue(ExecutiveUserLocators.usersTableLocators.fioColumnHeader.locator, deletedUserFio);
        await expect(deletedUserRow).not.toBeVisible()
        await this.executiveUserActions.controlPaneActions.fillSearchField(mergedUserFio)
        await this.executiveUserActions.controlPaneActions.launchSearch()
        const mergedUserRow = this.executiveUserElements.executiveUsersTableElements.tableRowByGridValue(ExecutiveUserLocators.usersTableLocators.fioColumnHeader.locator, mergedUserFio);
        await expect(mergedUserRow).toBeVisible()
    }


}

export default ExecutiveUserModule;
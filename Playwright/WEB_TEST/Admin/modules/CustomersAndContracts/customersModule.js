import DeviceDocumentsDialogElements from "../../elements/AccountingStructure/DeviceRegistry/Dialogs/deviceDocumentsDialogElements";
import UiFormActions from "../../actions/Common/uiFormActions";
import DeviceDocumentsDialogActions from "../../actions/AccountingStructure/DeviceRegistry/Dialogs/deviceDocumentsDialogActions";
import EditDocumentDialogActions from "../../actions/Common/Dialogs/editDocumentDialogActions";
import PointsTreeDetailsTabActions from "../../actions/Common/DatePanels/pointsTreeDetailsTabActions";
import PointsTreeTabActions from "../../actions/Common/DatePanels/pointsTreeTabActions";
import PointsTreeDetailsTabElements from "../../elements/Common/DataPanels/pointsTreeDetailsTabElements";
import ToolTipDialogActions from "../../actions/Common/toolTipDialogActions";
import CustomersActions from "../../actions/CustomersAndContracts/customersActions";
import CustomersElements from "../../elements/CustomersAndContracts/CustomersElements";
import CustomersLocators from "../../locators/CustomersAndContracts/CustomersLocators";
import CustomersAndContractsConfig from "../../config/customersAndContractsConfig";
import { expect } from "@playwright/test";
import CommonElementsLocators from "../../locators/Common/commonElementsLocators";

export class CustomersModule {

    constructor(page) {
        this.page = page
        this.customersActions = new CustomersActions(page)
        this.customersElements = new CustomersElements(page)
    }

    async CreateSubject(settings) {
        await this.customersActions.controlPaneActions.clickAddButton()
        const editSubjectDialog = this.customersElements.editSubjectDialogElements.editSubjectDialog()
        await expect(editSubjectDialog).toBeVisible();
        await this.customersActions.editSubjectDialogActions.applySettings(settings, editSubjectDialog)
        await this.customersActions.editSubjectDialogActions.chooseDialogOption(editSubjectDialog, "Сохранить")
        await this.page.waitForSelector('.ui-tooltip:has-text("Успешно создан субъект")', { state: 'visible' });
        await this.customersActions.editSubjectDialogActions.chooseDialogOption(editSubjectDialog, "Закрыть")
        expect(await editSubjectDialog.isVisible(), "Диалог создания субъекта успешно закрыт").toBeFalsy()
    }

    async DeleteCustomer(customerName) {
        await this.customersActions.controlPaneActions.performSearch(customerName)
        const testCustomerRows = this.customersElements.customersTableElements.tableRowByGridValue(CustomersLocators.customersTableLocators.nameColumnHeader.locator,
            customerName).all();
        for (let testCustomerRow of testCustomerRows) {
            await this.customersActions.customersTableActions.deleteRow(testCustomerRow)
        }
    }

    async CheckCustomerSettings(customerName, settings) {
        await this.customersActions.controlPaneActions.performSearch(customerName)
        const testCustomerRow = this.customersElements.customersTableElements.tableRowByGridValue(CustomersLocators.customersTableLocators.nameColumnHeader.locator,
            customerName);
        await this.customersActions.customersTableActions.editRow(testCustomerRow)
        const editSubjectDialog = this.customersElements.editSubjectDialogElements.editSubjectDialog()
        await expect(editSubjectDialog).toBeVisible();
        await this.customersActions.editSubjectDialogActions.verifySettings(settings, editSubjectDialog)
        await this.customersActions.editSubjectDialogActions.chooseDialogOption(editSubjectDialog, "Закрыть")
    }

    async DeleteSubject(subjectName) {
        await this.customersActions.selectSearchCriteria(CustomersAndContractsConfig.subjectSearchOptions.Name.value)
        await this.customersActions.controlPaneActions.performSearch(subjectName)
        const testCustomerRows = await this.customersElements.customersTableElements.tableRowByGridValue(CustomersLocators.customersTableLocators.nameColumnHeader.locator,
            subjectName).all();
        const rowIds = []
        for (let testCustomerRow of testCustomerRows) {
            if(await testCustomerRow.isVisible()) {
                const testCustomerId =await this.customersActions.getRowIdValue(testCustomerRow)
                rowIds.push(testCustomerId)
            }
        }
        for (let rowId of rowIds) {
            await this.customersActions.selectSearchCriteria(CustomersAndContractsConfig.subjectSearchOptions.ID.value)
            await this.customersActions.controlPaneActions.performSearch(rowId)
            const customerRow = this.customersElements.customersTableElements.tableRowByIndex(0)
            await this.customersActions.customersTableActions.deleteRow(customerRow)
        }
        await this.customersActions.selectSearchCriteria(CustomersAndContractsConfig.subjectSearchOptions.Name.value)
        await this.customersActions.controlPaneActions.performSearch(subjectName)
        const lastCustomerRow = this.customersElements.customersTableElements.tableRowByIndex(0)
        expect(await lastCustomerRow.isVisible(), `Строка удалена`).toBeFalsy()
    }


}

export default CustomersModule;
import DeviceDocumentsDialogElements from "../../elements/AccountingStructure/DeviceRegistry/Dialogs/deviceDocumentsDialogElements";
import UiFormActions from "../../actions/Common/uiFormActions";
import DeviceDocumentsDialogActions from "../../actions/AccountingStructure/DeviceRegistry/Dialogs/deviceDocumentsDialogActions";
import EditDocumentDialogActions from "../../actions/Common/Dialogs/editDocumentDialogActions";
import PointsTreeDetailsTabActions from "../../actions/Common/DatePanels/pointsTreeDetailsTabActions";
import PointsTreeTabActions from "../../actions/Common/DatePanels/pointsTreeTabActions";
import PointsTreeDetailsTabElements from "../../elements/Common/DataPanels/pointsTreeDetailsTabElements";
import ToolTipDialogActions from "../../actions/Common/toolTipDialogActions";
import ContractsActions from "../../actions/CustomersAndContracts/contractsActions";
import ContractsElements from "../../elements/CustomersAndContracts/ContractsElements";
import ContractsLocators from "../../locators/CustomersAndContracts/ContractsLocators";
import { expect } from "@playwright/test";

export class ContractsModule {

    constructor(page) {
        this.page = page
        this.contractsActions = new ContractsActions(page)
        this.contractsElements = new ContractsElements(page)
    }

    async CreateContract(settings) {
        await this.contractsActions.controlPaneActions.clickAddButton()
        const editContractDialog = this.contractsElements.editContractDialogElements.editContractDialog()
        await expect(editContractDialog).toBeVisible();
        await this.contractsActions.editContractDialogActions.applySettings(settings, editContractDialog)
        await this.contractsActions.editContractDialogActions.chooseDialogOption(editContractDialog, "Сохранить")
        await this.contractsActions.editContractDialogActions.chooseDialogOption(editContractDialog, "Закрыть")
    }

    async CheckContractSettings(contractNumber, expectedSettings) {
        await this.contractsActions.controlPaneActions.performSearch(contractNumber)
        const testContractRow = this.contractsElements.contractsTableElements.tableRowByGridValue(ContractsLocators.contractsTableLocators.contractNumberColumnHeader.locator,
            contractNumber);
        await this.contractsActions.contractsTableActions.editRow(testContractRow)
        const editContractDialog = this.contractsElements.editContractDialogElements.editContractDialog()
        await expect(editContractDialog).toBeVisible();
        await this.contractsActions.editContractDialogActions.verifySettings(expectedSettings, editContractDialog)
        await this.contractsActions.editContractDialogActions.chooseDialogOption(editContractDialog, "Закрыть")
    }

    async DeleteContract(contractNumber) {
        await this.contractsActions.controlPaneActions.performSearch(contractNumber)
        let testContractRow = this.contractsElements.contractsTableElements.tableRowByGridValue(ContractsLocators.contractsTableLocators.contractNumberColumnHeader.locator,
            contractNumber);
        const contractRowId = await this.contractsActions.getRowIdValue(testContractRow)
        await this.contractsActions.contractsTableActions.deleteRow(testContractRow)
        await this.contractsActions.controlPaneActions.performSearch(contractRowId)
        testContractRow = this.contractsElements.contractsTableElements.tableRowByGridValue(ContractsLocators.contractsTableLocators.idColumnHeader.locator,
        contractRowId);
        expect(await testContractRow.isVisible(), `Строка удалена`).toBeFalsy()
    }


}

export default ContractsModule;
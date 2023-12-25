import DeviceDocumentsDialogElements from "../../elements/AccountingStructure/DeviceRegistry/Dialogs/deviceDocumentsDialogElements";
import UiFormActions from "../../actions/Common/uiFormActions";
import DeviceDocumentsDialogActions from "../../actions/AccountingStructure/DeviceRegistry/Dialogs/deviceDocumentsDialogActions";
import EditDocumentDialogActions from "../../actions/Common/Dialogs/editDocumentDialogActions";
import PointsTreeDetailsTabActions from "../../actions/Common/DatePanels/pointsTreeDetailsTabActions";
import PointsTreeTabActions from "../../actions/Common/DatePanels/pointsTreeTabActions";
import PointsTreeDetailsTabElements from "../../elements/Common/DataPanels/pointsTreeDetailsTabElements";
import ToolTipDialogActions from "../../actions/Common/toolTipDialogActions";
import DocumentsActions from "../../actions/CustomersAndContracts/documnetsActions";
import DocumentsElements from "../../elements/CustomersAndContracts/DocumentsElements";
import DocumentsLocators from "../../locators/CustomersAndContracts/DocumentsLocators";
import CustomersAndContractsConfig from "../../config/customersAndContractsConfig";
import BrowserActions from "../../../Common/browserActions";
import { expect } from "@playwright/test";

export class DocumentsModule {

    constructor(page) {
        this.page = page
        this.documentsActions = new DocumentsActions(page)
        this.documentsElements = new DocumentsElements(page)
    }

    async CheckDocumentSettings(searchSettings, documentNumber) {
        const editDocumentDialog = this.documentsElements.editDocumentDialogElements.editDocumentDialog()
        await this.documentsActions.searchToolBarActions.applySearchSettings(searchSettings)
        const documentRow = this.documentsElements.documentsTableElements.tableRowByGridValue(DocumentsLocators.documentsTableLocators.numberColumnHeader.locator,
            documentNumber);
        expect(await documentRow.isVisible()).toBeTruthy();
        await this.documentsActions.documentsTable.editRow(documentRow)
        await this.documentsActions.editDocumentDialogActions.verifySettings(CustomersAndContractsConfig.testDocumentSettings, editDocumentDialog)
        await this.documentsActions.editDocumentDialogActions.chooseDialogOption(editDocumentDialog, "Закрыть")
    }

    async DeleteDocument(searchSettings, documentNumber, documentMustExist = false) {
        await this.documentsActions.searchToolBarActions.applySearchSettings(searchSettings)
        const documentRow = this.documentsElements.documentsTableElements.tableRowByGridValue(DocumentsLocators.documentsTableLocators.numberColumnHeader.locator,
            documentNumber);
        if(documentMustExist) {
            expect(await documentRow.isVisible()).toBeTruthy();
        }
        if(await documentRow.isVisible()) {
            const rowNumberBeforeDelete = await this.documentsElements.documentsTableElements.tableRow().count()
            await this.documentsActions.documentsTable.deleteRow(documentRow)
            await BrowserActions.waitForPageReady(this.page)
            const rowNumberAfterDelete = await this.documentsElements.documentsTableElements.tableRow().count()
            expect(rowNumberAfterDelete).toEqual(rowNumberBeforeDelete -1);
        }
    }


}

export default DocumentsModule;
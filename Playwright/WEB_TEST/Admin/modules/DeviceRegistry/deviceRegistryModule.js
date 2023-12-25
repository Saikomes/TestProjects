import DeviceDocumentsDialogElements from "../../elements/AccountingStructure/DeviceRegistry/Dialogs/deviceDocumentsDialogElements";
import UiFormActions from "../../actions/Common/uiFormActions";
import DeviceDocumentsDialogActions from "../../actions/AccountingStructure/DeviceRegistry/Dialogs/deviceDocumentsDialogActions";
import EditDocumentDialogActions from "../../actions/Common/Dialogs/editDocumentDialogActions";
import PointsTreeDetailsTabActions from "../../actions/Common/DatePanels/pointsTreeDetailsTabActions";
import PointsTreeTabActions from "../../actions/Common/DatePanels/pointsTreeTabActions";
import PointsTreeDetailsTabElements from "../../elements/Common/DataPanels/pointsTreeDetailsTabElements";
import ToolTipDialogActions from "../../actions/Common/toolTipDialogActions";
import DeviceRegistryActions from "../../actions/AccountingStructure/DeviceRegistry/deviceRegistryActions";
import DeviceRegistryElements from "../../elements/AccountingStructure/DeviceRegistry/deviceRegistryElements";
import { expect } from "@playwright/test";

export class DeviceRegistryModule {

    constructor(page) {
        this.page = page
        this.deviceRegistryActions = new DeviceRegistryActions(page)
        this.deviceRegistryElements = new DeviceRegistryElements(page)
    }

    async findDevice(searchAttribute, value) {
        const pointsTreeTabActions = new PointsTreeTabActions(this.page);
        const pointsTreeDetailsTabElements = new PointsTreeDetailsTabElements(this.page);
        const searchOption = searchAttribute;
        const searchValue = value;
        await pointsTreeTabActions.performSearch(searchOption, searchValue)
        const deviceRow = await pointsTreeDetailsTabElements.pointsDetailsTableElements.rowByColumnValue("ИД", searchValue)
        await expect(deviceRow).toBeVisible()
    }

    async cleanDeviceDocuments() {
        await this.deviceRegistryActions.showDocuments()
        const deviceDocumentsDialog = this.deviceRegistryElements.deviceDocumentsDialogElements.deviceDocumentsDialog()
        await this.deviceRegistryActions.deviceDocumentsDialogActions.documentTableActions.cleanTable()
        await this.deviceRegistryActions.deviceDocumentsDialogActions.chooseDialogOption(deviceDocumentsDialog, "Закрыть");
    }

    async addDeviceDocument(documentParams, documentNumber) {
        const deviceDocumentsDialog = this.deviceRegistryElements.deviceDocumentsDialogElements.deviceDocumentsDialog()
        const createDocumentDialog = this.deviceRegistryElements.createDocumentDialogElements.editDocumentDialog()
        await this.deviceRegistryActions.showDocuments()
        await this.deviceRegistryActions.deviceDocumentsDialogActions.createDocument()
        await this.deviceRegistryActions.createDocumentDialogActions.applySettings(documentParams)
        await this.deviceRegistryActions.createDocumentDialogActions.chooseDialogOption(createDocumentDialog, "Сохранить");
        await this.deviceRegistryActions.deviceDocumentsDialogActions.addDocument(documentNumber)
        const documentRow = await this.deviceRegistryElements.deviceDocumentsDialogElements.documentTableElements.rowByColumnValue("Номер документа", documentNumber)
        await expect(documentRow).toBeVisible()
        await this.deviceRegistryActions.deviceDocumentsDialogActions.chooseDialogOption(deviceDocumentsDialog, "Закрыть");
    }
}

export default DeviceRegistryModule;
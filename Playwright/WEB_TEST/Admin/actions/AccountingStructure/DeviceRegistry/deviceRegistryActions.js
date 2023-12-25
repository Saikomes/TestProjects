import DeviceRegistryElements from "../../../elements/AccountingStructure/DeviceRegistry/deviceRegistryElements";
import UiFormActions from "../../Common/uiFormActions";
import DeviceDocumentsDialogActions from "./Dialogs/deviceDocumentsDialogActions";
import EditDocumentDialogActions from "../../Common/Dialogs/editDocumentDialogActions";
import PointsTreeDetailsTabActions from "../../Common/DatePanels/pointsTreeDetailsTabActions";
import PointsTreeTabActions from "../../Common/DatePanels/pointsTreeTabActions";
import ToolTipDialogActions from "../../Common/toolTipDialogActions";

class DeviceRegistryActions {
    constructor(page) {
        this.page = page;
        this.uiFormActions = new UiFormActions(page)
        this.deviceRegistryElements = new DeviceRegistryElements(page);
        this.deviceDocumentsDialogActions = new DeviceDocumentsDialogActions(page)
        this.createDocumentDialogActions = new EditDocumentDialogActions(page)
        this.pointsTreeDetailsTabActions = new PointsTreeDetailsTabActions(page)
        this.pointsTreeTabActions = new PointsTreeTabActions(page)
    }

    async showDocuments() {
        await this.deviceRegistryElements.showDocumentsButton().click()
    }

    async sendEmail() {
        const sendEmailTooltipActions = new ToolTipDialogActions(this.page)
        await this.deviceRegistryElements.sendEmailButton().click()
        await sendEmailTooltipActions.chooseDialogOption("Ок")
    }

}

export default DeviceRegistryActions
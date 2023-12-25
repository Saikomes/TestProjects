import DeviceRegistryLocators from "../../../locators/AccountingStructure/DeviceRegistry/deviceRegistryLocators";
import PointsTreeDetailsTabElements from "../../Common/DataPanels/pointsTreeDetailsTabElements";
import PointsTreeTabElements from "../../Common/DataPanels/pointsTreeTabElements";
import DeviceDocumentsDialogElements from "./Dialogs/deviceDocumentsDialogElements";
import EditDocumentDialogElements from "../../Common/Dialogs/editDocumentDialogElements";
import TestHelpers from "../../../../Common/modules/testHelpers";

class DeviceRegistryElements {
    constructor(page) {
        this.page = page
        this.pointsTreeDetailsTabElements = new PointsTreeDetailsTabElements(page)
        this.pointsTreeTabElements = new PointsTreeTabElements(page)
        this.deviceDocumentsDialogElements = new DeviceDocumentsDialogElements(page)
        this.createDocumentDialogElements = new EditDocumentDialogElements(page)
    }

    mainContentPane() {
        return this.page.locator(DeviceRegistryLocators.mainPaneLocators.mainContentPane.locator)
    }

    showDocumentsButton() {
        return TestHelpers.getLinkedLocator(this.mainContentPane(), DeviceRegistryLocators.mainPaneLocators.showDocumentsButton.locator)
    }

    sendEmailButton() {
        return TestHelpers.getLinkedLocator(this.mainContentPane(), DeviceRegistryLocators.mainPaneLocators.sendEmailButton.locator)
    }
}
export default DeviceRegistryElements
import DeviceRegistryLocators from "../../../../locators/AccountingStructure/DeviceRegistry/deviceRegistryLocators";
import UiDialogElements from "../../../Common/uiDialogElements";
import TestHelpers from "../../../../../Common/modules/testHelpers";
import JqTableElements from "../../../Common/Tables/jqTableElements";
import SlickTableElements from "../../../Common/Tables/slickTableElements";

class DeviceDocumentsDialogElements extends UiDialogElements {
    constructor(page) {
        super(page)
        this.documentTableElements = new SlickTableElements(page, DeviceRegistryLocators.deviceDocumentsDialogLocators.deviceDocumentsDialog.locator)
    }

    deviceDocumentsDialog() {
        return this.page.locator(DeviceRegistryLocators.deviceDocumentsDialogLocators.deviceDocumentsDialog.locator)
    }

    chooseDocumentSelect() {
        return TestHelpers.getLinkedLocator(this.deviceDocumentsDialog(), DeviceRegistryLocators.deviceDocumentsDialogLocators.chooseDocumentSelect.locator)
    }

    createDocumentButton() {
        return TestHelpers.getLinkedLocator(this.deviceDocumentsDialog(), DeviceRegistryLocators.deviceDocumentsDialogLocators.createDocumentButton.locator)
    }

    addDocumentButton() {
        return TestHelpers.getLinkedLocator(this.deviceDocumentsDialog(), DeviceRegistryLocators.deviceDocumentsDialogLocators.addDocumentButton.locator)
    }


}
export default DeviceDocumentsDialogElements
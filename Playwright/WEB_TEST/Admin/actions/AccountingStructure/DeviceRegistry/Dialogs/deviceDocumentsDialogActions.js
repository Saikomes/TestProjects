import DeviceDocumentsDialogElements from "../../../../elements/AccountingStructure/DeviceRegistry/Dialogs/deviceDocumentsDialogElements";
import DeviceRegistryLocators from "../../../../locators/AccountingStructure/DeviceRegistry/deviceRegistryLocators";
import JqTableActions from "../../../Common/Tables/jqTableActions";
import UiFormActions from "../../../Common/uiFormActions";
import UiDialogActions from "../../../Common/uiDialogActions";
import SlickTableActions from "../../../Common/Tables/slickTableActions";
class DeviceDocumentsDialogActions extends UiDialogActions {
    constructor(page) {
        super(page,new DeviceDocumentsDialogElements(page))
        this.deviceDocumentsDialogElements = new DeviceDocumentsDialogElements(page)
        this.documentTableActions = new SlickTableActions(page, DeviceRegistryLocators.deviceDocumentsDialogLocators.deviceDocumentsDialog.locator)
        this.uiFormActions = new UiFormActions(page)
    }

    async findDocumentByNumber(number) {
        await this.uiFormActions.elementActions.chooseOptionInSelect2(this.deviceDocumentsDialogElements.deviceDocumentsDialog(),
        DeviceRegistryLocators.deviceDocumentsDialogLocators.chooseDocumentSelect.locator, number )
    }

    async createDocument() {
        await this.deviceDocumentsDialogElements.createDocumentButton().click()
    }

    async addDocument(documentNumber) {
        await this.findDocumentByNumber(documentNumber)
        await this.deviceDocumentsDialogElements.addDocumentButton().click()
    }

}

export default DeviceDocumentsDialogActions
import CommonElementsLocators from "../../locators/Common/commonElementsLocators";
import TestHelpers from "../../../Common/modules/testHelpers";
export class UiDialogElements {

    constructor(page) {
        this.page = page;
    }

    dialogByTitle(title) {
        return this.page.locator(CommonElementsLocators.uiDialogLocators.dialogByTitle.locator(title));
    }

    dialogOptionByName(dialog, dialogOption) {
        return TestHelpers.getLinkedLocator(dialog, CommonElementsLocators.uiDialogLocators.dialogOptionByName.locator(dialogOption));
    }

    dialogCloseButton(dialog) {
        return TestHelpers.getLinkedLocator(dialog, CommonElementsLocators.uiDialogLocators.closeButton.locator);
    }
}

export default UiDialogElements
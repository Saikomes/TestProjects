import UiDialogLocators from "../../locators/common/uiDialogLocators";
import TestHelpers from "../../../Common/modules/testHelpers";
export class UiDialogElements {

    constructor(page) {
        this.page = page;
    }

    dialogByTitle(title) {
        return this.page.locator(UiDialogLocators.dialogByTitle.locator(title));
    }

    dialogOptionByName(dialog, dialogOption) {
        return TestHelpers.getLinkedLocator(dialog, UiDialogLocators.dialogOptionByName.locator(dialogOption));
    }

    dialogCloseButton(dialog) {
        return TestHelpers.getLinkedLocator(dialog, UiDialogLocators.closeButton.locator);
    }
}

export default UiDialogElements
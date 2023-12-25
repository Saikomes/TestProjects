import CommonElementsLocators from "../../locators/Common/commonElementsLocators";
import TestHelpers from "../../../Common/modules/testHelpers";
export class ToolTipDialogElements {

    constructor(page) {
        this.page = page;
    }

    toolTipDialog() {
        return this.page.locator(CommonElementsLocators.toolTipDialogLocators.toolTipDialog.locator);
    }

    toolTipDialogText() {
        return TestHelpers.getLinkedLocator(this.toolTipDialog(), CommonElementsLocators.toolTipDialogLocators.toolTipDialogText.locator);
    }

    toolTipOptionButton(optionName) {
        return TestHelpers.getLinkedLocator(this.toolTipDialog(), CommonElementsLocators.toolTipDialogLocators.toolTipOptionButton.locator(optionName));
    }

}

export default ToolTipDialogElements
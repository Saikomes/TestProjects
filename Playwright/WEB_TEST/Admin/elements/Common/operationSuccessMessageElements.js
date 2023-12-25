import CommonElementsLocators from "../../locators/Common/commonElementsLocators";
import TestHelpers from "../../../Common/modules/testHelpers";
export class OperationSuccessMessageElements {

    constructor(page) {
        this.page = page;
    }

    successMessageDialog() {
        return this.page.locator(CommonElementsLocators.operationSuccessTooltipLocators.successToolTip.locator);
    }

    successMessageDialogText() {
        return TestHelpers.getLinkedLocator(this.successMessageDialog(), CommonElementsLocators.toolTipDialogLocators.toolTipDialogText.locator);
    }


}

export default OperationSuccessMessageElements
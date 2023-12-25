import ToolTipDialogLocators from "../../locators/Dialogs/tooltipDialogLocators";
import TestHelpers from "../../modules/testHelpers";


class ToolTipDialogElements {
    constructor(page) {
        this.page = page;
    }

    toolTipDialog() {
        return this.page.locator(ToolTipDialogLocators.toolTipDialog.locator);
    }

    toolTipDialogByLabel(label) {
        return this.page.locator(ToolTipDialogLocators.toolTipDialogByLabel.locator(label));
    }

    toolTipDialogText(dialog) {
        return TestHelpers.getLinkedLocator(dialog, ToolTipDialogLocators.toolTipDialogText.locator);
    }

    toolTipOptionButton(dialog, optionName) {
        return TestHelpers.getLinkedLocator(dialog, ToolTipDialogLocators.toolTipOptionButton.locator(optionName));
    }
}
export default ToolTipDialogElements
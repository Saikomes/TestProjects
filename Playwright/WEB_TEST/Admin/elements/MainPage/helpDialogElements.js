import MainMenuPageLocators from "../../locators/mainPageLocators";
import UiDialogElements from "../Common/uiDialogElements";
import { TestHelpers } from "../../../Common/modules/testHelpers";

class HelpDialogElements extends UiDialogElements {
    constructor(page) {
        super(page)
    }
    helpDialog() {
        return this.page.locator(MainMenuPageLocators.helpDialog.locator)
    }

}
export default HelpDialogElements
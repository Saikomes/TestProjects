import GlobalSettingsLocators from "../../locators/GlobalSettings/globalSettingsLocators";
import UiDialogElements from "../Common/uiDialogElements";
import { TestHelpers } from "../../../Common/modules/testHelpers";

class EditAccountDialogElements extends UiDialogElements {
    constructor(page) {
        super(page)
    }
    editAccountDialog() {
        return this.page.locator(GlobalSettingsLocators.editAccountDialogLocators.editAccountDialog.locator)
    }
    inputElementById(id) {
        return TestHelpers.getLinkedLocator(this.editAccountDialog(), GlobalSettingsLocators.editAccountDialogLocators.inputElementById.locator(id));
    }
    defaultToggle() {
        return TestHelpers.getLinkedLocator(this.editAccountDialog(), GlobalSettingsLocators.editAccountDialogLocators.defaultToggle.locator);
    }

}
export default EditAccountDialogElements
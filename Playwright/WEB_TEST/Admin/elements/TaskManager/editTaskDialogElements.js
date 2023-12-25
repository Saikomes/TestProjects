import TaskManagerLocators from "../../locators/TaskManager/taskManagerLocators";
import UiDialogElements from "../Common/uiDialogElements";
import { TestHelpers } from "../../../Common/modules/testHelpers";

class EditTaskDialogElements extends UiDialogElements {
    constructor(page) {
        super(page)
    }

    editTaskDialog() {
        return this.page.locator(TaskManagerLocators.editTaskDialogLocators.editTaskDialog.locator)
    }

    inputElementById(id) {
        return TestHelpers.getLinkedLocator(this.editTaskDialog(), TaskManagerLocators.editTaskDialogLocators.inputElementById.locator(id));
    }

    checkBoxElementById(id) {
        return TestHelpers.getLinkedLocator(this.editTaskDialog(), TaskManagerLocators.editTaskDialogLocators.checkBoxElementById.locator(id));
    }

}
export default EditTaskDialogElements
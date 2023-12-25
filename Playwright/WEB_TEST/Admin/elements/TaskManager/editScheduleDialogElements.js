import TaskManagerLocators from "../../locators/TaskManager/taskManagerLocators";
import UiDialogElements from "../Common/uiDialogElements";
import { TestHelpers } from "../../../Common/modules/testHelpers";

class EditScheduleDialogElements extends UiDialogElements {
    constructor(page) {
        super(page)
    }
    editScheduleDialog() {
        return this.page.locator(TaskManagerLocators.editScheduleDialogLocators.editScheduleDialog.locator)
    }
    scheduleInterval() {
        return TestHelpers.getLinkedLocator(this.editScheduleDialog(), TaskManagerLocators.editScheduleDialogLocators.interval.locator);
    }
    scheduleDayOfMonth() {
        return TestHelpers.getLinkedLocator(this.editScheduleDialog(), TaskManagerLocators.editScheduleDialogLocators.scheduleDayOfMonth.locator);
    }
    scheduleTime() {
        return TestHelpers.getLinkedLocator(this.editScheduleDialog(), TaskManagerLocators.editScheduleDialogLocators.scheduleTime.locator);
    }
    frequencyButton() {
        return TestHelpers.getLinkedLocator(this.editScheduleDialog(), TaskManagerLocators.editScheduleDialogLocators.frequencyButton.locator);
    }
    frequencyMenu() {
        return this.page.locator(TaskManagerLocators.editScheduleDialogLocators.frequencyMenu.locator)
    }
    frequencyMenuOptionByName(optionName) {
        return TestHelpers.getLinkedLocator(this.frequencyMenu(), TaskManagerLocators.editScheduleDialogLocators.frequencyMenuOptionByName.locator(optionName));
    }

}
export default EditScheduleDialogElements
import TaskManagerLocators from "../../locators/TaskManager/taskManagerLocators";
import { TestHelpers } from "../../../Common/modules/testHelpers";

class TaskManagerRowElements {
    constructor(page) {
        this.page = page
    }

    taskRowById(id) {
        return this.page.locator(TaskManagerLocators.taskManagerRowLocators.taskRowById.locator(id))
    }

    taskRowByName(taskName) {
        return this.page.locator(TaskManagerLocators.taskManagerRowLocators.taskRowByName.locator(taskName))
    }

    setupTaskButton(taskRow) {
        return TestHelpers.getLinkedLocator(taskRow, TaskManagerLocators.taskManagerRowLocators.setupTaskButton.locator);
    }

    setupScheduleButton(taskRow) {
        return TestHelpers.getLinkedLocator(taskRow, TaskManagerLocators.taskManagerRowLocators.setupScheduleButton.locator);
    }

    startTaskButton(taskRow) {
        return TestHelpers.getLinkedLocator(taskRow, TaskManagerLocators.taskManagerRowLocators.startTaskButton.locator);
    }

    stopTaskButton(taskRow) {
        return TestHelpers.getLinkedLocator(taskRow, TaskManagerLocators.taskManagerRowLocators.stopTaskButton.locator);
    }

    expandHistoryButton(taskRow) {
        return TestHelpers.getLinkedLocator(taskRow, TaskManagerLocators.taskManagerRowLocators.expandHistoryButton.locator);
    }

    scheduleDesc(taskRow) {
        return TestHelpers.getLinkedLocator(taskRow, TaskManagerLocators.taskManagerRowLocators.scheduleDesc.locator);
    }

    taskStatus(taskRow) {
        return TestHelpers.getLinkedLocator(taskRow, TaskManagerLocators.taskManagerRowLocators.taskStatus.locator);
    }

}
export default TaskManagerRowElements
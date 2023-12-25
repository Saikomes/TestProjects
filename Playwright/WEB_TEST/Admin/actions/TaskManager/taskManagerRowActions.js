import { expect } from "@playwright/test";
import TaskManagerRowElements from "../../elements/TaskManager/taskManagerRowElements";

class TaskManagerRowActions {
    constructor(page) {
        this.page = page;
        this.taskManagerRowElements = new TaskManagerRowElements(page);
    }

    async startTask(taskRow) {
        await this.taskManagerRowElements.startTaskButton(taskRow).click();
    }

    async openTaskSetup(taskRow) {
        await this.taskManagerRowElements.setupTaskButton(taskRow).click()
    }

    async openTaskSchedule(taskRow) {
        await this.taskManagerRowElements.setupScheduleButton(taskRow).click()
    }

    async expandHistory(taskRow) {
        await this.taskManagerRowElements.expandHistoryButton(taskRow).click()
    }
    

}
export default TaskManagerRowActions
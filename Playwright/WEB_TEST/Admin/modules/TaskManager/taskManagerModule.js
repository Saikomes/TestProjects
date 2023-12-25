import {expect} from '@playwright/test';
import TaskManagerRowActions from '../../actions/TaskManager/taskManagerRowActions';
import EditScheduleDialogActions from '../../actions/TaskManager/editScheduleDialogActions';
import EditScheduleDialogElements from '../../elements/TaskManager/editScheduleDialogElements';
import ExpandedHistoryDialogElements from '../../elements/TaskManager/expandedHistoryDialogElements';
import ExpandedHistoryDialogActions from '../../actions/TaskManager/expandedHistoryDialogActions';
import TaskManagerRowElements from '../../elements/TaskManager/taskManagerRowElements';
import SQL from '../../../Common/SQL/SQL';
import ClientTestConfig from '../../../Client/config/clientTestConfig';
import TaskManagerConfig from '../../config/taskManagerConfig';
import EditTaskDialogActions from '../../actions/TaskManager/editTaskDialogActions';
import EditTaskDialogElements from '../../elements/TaskManager/editTaskDialogElements';
import BrowserActions from '../../../Common/browserActions';
import TaskManagerLocators from '../../locators/TaskManager/taskManagerLocators';

export class TaskManagerModule {

     static async setupTask(page, taskRow, settings) {
        const taskManagerRowActions = new TaskManagerRowActions(page);
        const editTaskDialogActions = new EditTaskDialogActions(page);
        const editTaskDialogElements = new EditTaskDialogElements(page);
        await taskManagerRowActions.openTaskSetup(taskRow);
        await BrowserActions.waitForPageReady(page)
        const taskSetupDialog = editTaskDialogElements.editTaskDialog();
        await editTaskDialogActions.applySettings(settings);
        await editTaskDialogActions.chooseDialogOption(taskSetupDialog, "Сохранить");
        await page.waitForTimeout(2000);
        if(await taskSetupDialog.isVisible()) {
            await editTaskDialogActions.chooseDialogOption(taskSetupDialog, "Закрыть");
        } 
    }

    static async checkTaskExecution(adminPage, taskRow, validationFn) {
        const taskManagerRowActions = new TaskManagerRowActions(adminPage)
        const expandedHistoryDialogActions = new ExpandedHistoryDialogActions(adminPage)
        const expandedHistoryDialogElements = new ExpandedHistoryDialogElements(adminPage)
        await taskManagerRowActions.expandHistory(taskRow)
        const expandedHistoryDialog = expandedHistoryDialogElements.expandedHistoryDialog()
        await expandedHistoryDialogActions.checkLastTaskLaunchForErrors();
        const [firstRowText, secondRowText] = await expandedHistoryDialogActions.getLastTaskLaunchHistory();
        validationFn(firstRowText === "Задача запущена" ? secondRowText : firstRowText);
        await expandedHistoryDialogActions.chooseDialogOption(expandedHistoryDialog, "Закрыть")
    }
    
    static async setTaskExecutionRegime(page, taskRow, regime, additionalSetupFunc) {
        const taskManagerRowActions = new TaskManagerRowActions(page)
        const editScheduleDialogActions = new EditScheduleDialogActions(page)
        const editScheduleDialogElements = new EditScheduleDialogElements(page)
        await taskManagerRowActions.openTaskSchedule(taskRow)
        const taskScheduleDialog = editScheduleDialogElements.editScheduleDialog()
        await editScheduleDialogActions.chooseFrequencyRegime(regime)
    
        if (additionalSetupFunc) {
            await additionalSetupFunc(taskScheduleDialog);
        }
    
        await editScheduleDialogActions.chooseDialogOption(taskScheduleDialog, "Сохранить")
        await this.waitForScheludeRegimeChange(page);
        const taskManagerRowElements = new TaskManagerRowElements(page);
        const scheduleDesc = taskManagerRowElements.scheduleDesc(taskRow);
        const scheduleDescText = await scheduleDesc.textContent();
        return scheduleDescText
    }

    static async waitTaskExecution(page, intervalSeconds) {
        await page.waitForTimeout(intervalSeconds * 3 * 1000);
    }

    static async createTestCustomer(typeNumericValue, historyColumnName) {
        await SQL.createCustomer(ClientTestConfig.CLIENT_NAME, TaskManagerConfig.testStatusCustomer, await SQL.getHashedPassword(TaskManagerConfig.testStatusPassword));
        await SQL.changeCustomerStatus(TaskManagerConfig.testStatusCustomer, typeNumericValue);
        await SQL.decreaseCustomerDate(historyColumnName, TaskManagerConfig.testStatusCustomer, TaskManagerConfig.dateDiffInDays);
    }

    static async waitForScheludeRegimeChange(page) {
        const requestPromise = page.waitForRequest(request =>
            request.url().includes('/TaskManager/TaskList') && request.method() === 'GET'
        );
        const request = await requestPromise;
        await page.waitForTimeout(5000);
    }

    static async waitForAutoCleanToLaunch(page, timeoutInSeconds) {
        await page.waitForTimeout(timeoutInSeconds * 1.2 * 1000);
    }

    static async waitForTaskToBePending(page, taskRow, timeoutInSeconds) {  
        let taskIsPending = false
        const taskManagerRowElements = new TaskManagerRowElements(page)
        const taskStatus = taskManagerRowElements.taskStatus(taskRow)
        const startTaskButton = await taskManagerRowElements.startTaskButton(taskRow)
        await page.waitForTimeout(5000);
        for (let i = 0; i < timeoutInSeconds; i++) {
            const textContent = await taskStatus.textContent();
            if (textContent == "Ожидает запуска") {
                const buttonClass = await startTaskButton.getAttribute('class');
                if(!buttonClass.includes('ui-state-disabled'))
                {
                    taskIsPending = true
                    break;
                } 
            }
            await page.waitForTimeout(1000); 
        }

        expect(taskIsPending, `Task is pending, timeout: ${timeoutInSeconds} sec`).toBeTruthy()

    }

}

export default TaskManagerModule;

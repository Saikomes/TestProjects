import CommonElementsLocators from "../Common/commonElementsLocators"
export class TaskManagerLocators {
    static taskManagerRowLocators = {
        taskRowById: {
            alias: 'Строка задачи по Id',
            locator: (id) => `tr#${id}`
        },
        taskRowByName: {
            alias: 'Строка задачи по Id',
            locator: (taskName) => `tr:has(:text("${taskName}"))`
        },
        setupTaskButton: {
            alias: 'Кнопка "Настроить задачу"',
            locator: '.setupTask'
        },
        setupScheduleButton: {
            alias: 'Кнопка "Настроить расписание"',
            locator: '.setupSchedule'
        },
        startTaskButton: {
            alias: 'Кнопка запуска задачи',
            locator: '.startTask'
        },
        stopTaskButton: {
            alias: 'Кнопка запуска задачи',
            locator: '.stopTask'
        },
        expandHistoryButton: {
            alias: 'Кнопка раскрытия истории',
            locator: '.expandHistoryComm'
        },
        scheduleDesc: {
            alias: 'Значение расписания запуска службы',
            locator: '.scheduleDesc'
        },
        taskStatus: {
            alias: 'Статус задачи',
            locator: '.task-status'
        }

    }
    
    static editTaskDialogLocators = {
        editTaskDialog: {
            alias: 'Диалог настроек задачи',
            locator: CommonElementsLocators.uiDialogLocators.dialogByLabel.locator('ui-dialog-title-dlgSetupTask')
        },
        inputElementById: {
            alias: 'Элемент ввода по id',
            locator: (id) => `input#${id}`
        },
        checkBoxElementById: {
            alias: 'Чекбокс по id',
            locator: (id) => `.check-box#${id}`
        }
    }
    static editScheduleDialogLocators = {
        editScheduleDialog: {
            alias: 'Диалог настроек расписания задачи',
            locator: CommonElementsLocators.uiDialogLocators.dialogByLabel.locator('ui-dialog-title-dlgSetupSchedule')
        },
        frequencyButton: {
            alias: 'Кнопка вызова меню выбора режима запуска',
            locator: '#Frequency-button'
        },
        frequencyMenu: {
            alias: 'меню выбора режима запуска',
            locator: '#Frequency-menu'
        },
        frequencyMenuOptionByName: {
            alias: 'Пункт меню выбора режима запуска по имени',
            locator: (optionName) => `a:has-text("${optionName}")`
        },
        interval: {
            alias: 'Интервал',
            locator: '#Interval'
        },
        dayOfMonth: {
            alias: 'День месяца',
            locator: '#DayOfMonth'
        },
        time: {
            alias: 'Время суток',
            locator: '#Time'
        },
    }

    static expandedHistoryDialogLocators = {
        expandedHistoryDialog: {
            alias: 'История событий задачи',
            locator: CommonElementsLocators.uiDialogLocators.dialogByLabel.locator('ui-dialog-title-taskHistoryDlg')
        },
        historyRowByNumber: {
            alias: 'Строка события по номеру',
            locator: (rowNumber) => `#taskHistoryGrid > tbody > tr:nth-child(${1 + rowNumber})`
        },
        historyRowDateTime: {
            alias: 'ячейка Время строки события',
            locator: `td[aria-describedby=taskHistoryGrid_Время]`
        },
        historyRowEvent: {
            alias: 'ячейка Событие строки события',
            locator: `td[aria-describedby=taskHistoryGrid_Событие]`
        }
    }
};

export default TaskManagerLocators
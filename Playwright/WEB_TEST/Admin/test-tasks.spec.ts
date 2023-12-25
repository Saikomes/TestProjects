import { SMTPServer } from 'smtp-server';
import { simpleParser } from 'mailparser';
import POP3Client from 'node-pop3';
import { test, expect } from '../lib/fixtures/hook'
import AdminTestConfig from './config/adminTestConfig';
import TestUtils from '../Common/testUtils';
import AdminMenuActions from './actions/Common/adminMenuActions';
import MainPageActions from './actions/MainPage/mainPageActions';
import MainPageConfig from './config/mainPageConfig';
import AccountsConfig from './config/accountsConfig';
import AdminLoginPageActions from './actions/adminLoginPageActions';
import SQL from '../Common/SQL/SQL';
import TaskManagerRowActions from './actions/TaskManager/taskManagerRowActions';
import TaskManagerRowElements from './elements/TaskManager/taskManagerRowElements';
import EditScheduleDialogActions from './actions/TaskManager/editScheduleDialogActions';
import EditScheduleDialogElements from './elements/TaskManager/editScheduleDialogElements';
import TaskManagerConfig from './config/taskManagerConfig';
import TaskManagerModule from './modules/TaskManager/taskManagerModule';
import ValidationFunctions from './modules/TaskManager/validationFunctions';
import ClientTestConfig from '../Client/config/clientTestConfig';
import EditAccountDialogActions from './actions/GlobalSettings/editAccountDialogActions';
import GlobalSettingsPageActions from './actions/GlobalSettings/globalSettingsPageActions';
import OutgoingEmailSettingsElements from './elements/GlobalSettings/outgoingEmailSettingsElements';
import OutgoingEmailSettingsActions from './actions/GlobalSettings/outgoingEmailSettingsActions';
import EditAccountDialogElements from './elements/GlobalSettings/editAccountDialogElements';
import ManageCustomerAccountsActions from './actions/Accounts/manageCustomerAccountsActions';
import MenuConfig from './config/menuConfig';


/**
   * @description ### Тест задач
  Проверяется работа следующих задач:
  - Автоочистка учетных записей абонентов
  - Обновление БД адресов
  - Расчет координат объектов для карты ГИС
  - Рассылка сообщений
*/
test.describe.serial('Service functionality tests', () => {
    let adminPage, adminChecker
    test.beforeAll(async ({ browser }, testInfo) => {
        await SQL.createEmployee(AdminTestConfig.ADMIN_USER, AdminTestConfig.ADMIN_PASSWORD, AccountsConfig.accountType.Admin);
        await SQL.createCustomer(TaskManagerConfig.testCustomerName, TaskManagerConfig.testCustomerEmail, await SQL.getHashedPassword(ClientTestConfig.CLIENT_PASSWORD));
        ({ page: adminPage, checker: adminChecker } = await TestUtils.setupTest(browser, AdminTestConfig.ADMIN_ADDRESS, testInfo));
        await AdminLoginPageActions.login(adminPage, AdminTestConfig.ADMIN_USER, AdminTestConfig.ADMIN_PASSWORD)
        await MainPageActions.changeCabinetRegime(adminPage, MainPageConfig.cabinetRegime.Operator)
        await MainPageActions.changeCabinetRegime(adminPage, MainPageConfig.cabinetRegime.Admin)
    });
    test.afterAll(async () => {
        await TestUtils.teardownTest(adminChecker, adminPage);
    });
    /**
     * @description ### Тест автоочистки пользователей
     Состоит из следующих этапов:
      - Загружается конфигурация, в которой определяется удаление какого 
        типа пользователей будет проверяться для удаления
      - Ставим ручной режим работы службы
      - Создаем пользователя с необходимой для автоудаления информацией по датам
      - Запускаем задачу
      - Проверяем что задача отработана корректно и нужный тип пользователей удален
    */
    TaskManagerConfig.autoCleanUsersConfig.forEach(({ type, message, historyColumnName }) => {
        test.describe.serial(`Testing the auto-cleanup service for user type "${type.name}"`, () => {
            let autoCleanRow
            test.beforeAll(async () => {
                await AdminMenuActions.navigateToPage(adminPage, "Служебные задачи", MenuConfig.menuRegime.Admin)
                const taskManagerRowElements = new TaskManagerRowElements(adminPage)
                autoCleanRow = taskManagerRowElements.taskRowById("CleanupCustomerMemberships")
            });

            test("Setting up the auto-cleanup service", async () => {
                await TaskManagerModule.setupTask(adminPage, autoCleanRow, TaskManagerConfig.autoCleantaskSettings);
            })
            test("Setting the manual execution mode for the service", async () => {
                const scheduleDescription = await TaskManagerModule.setTaskExecutionRegime(
                    adminPage,
                    autoCleanRow,
                    TaskManagerConfig.taskExecutionRegime.manual.scheludeMenuOption
                );
                expect(scheduleDescription).toContain(TaskManagerConfig.taskExecutionRegime.manual.scheduleColumnDesc);
            })
            test("Manually starting the service", async () => {
                await TaskManagerModule.createTestCustomer(type.value, historyColumnName);
                const taskManagerRowActions = new TaskManagerRowActions(adminPage)
                await taskManagerRowActions.startTask(autoCleanRow)
                await TaskManagerModule.waitForTaskToBePending(adminPage, autoCleanRow, TaskManagerConfig.taskPendingTimeoutInSeconds)
            })
            test("Check that the service started and worked without errors", async () => {
                await TaskManagerModule.checkTaskExecution(adminPage, autoCleanRow, ValidationFunctions.autoDeleteValidationFactory(message))
            })
            test("Automatic service launch", async () => {
                await TaskManagerModule.createTestCustomer(type.value, historyColumnName);
                const scheduleDescription = await TaskManagerModule.setTaskExecutionRegime(
                    adminPage,
                    autoCleanRow,
                    TaskManagerConfig.taskExecutionRegime.const.scheludeMenuOption,
                    async () => {
                        const editScheduleDialogActions = new EditScheduleDialogActions(adminPage)
                        await editScheduleDialogActions.setInterval(TaskManagerConfig.autoExecutionIntervalSeconds)
                    }
                )
                expect(scheduleDescription).toContain(TaskManagerConfig.taskExecutionRegime.const.scheduleColumnDesc);
            })
            test("Rechecking that the service started without errors", async () => {
                await TaskManagerModule.checkTaskExecution(adminPage, autoCleanRow, ValidationFunctions.autoDeleteValidationFactory(message))
            })

        })

    })


    /**
     * @description ### Тест обновления БД адресов
     Состоит из следующих этапов:
      - Применяем настройки для службы опрелеляемые в конфигурации(путь до FIAS)
      - Ставим ручной режим запуска службы
      - Запускаем задачу
      - Проверяем что задача отработана корректно
    */
    test.describe.serial(`Testing the database address update service`, () => {
        let refreshDbRow
        test.beforeAll(async () => {
            await AdminMenuActions.navigateToPage(adminPage, "Служебные задачи", MenuConfig.menuRegime.Admin)
            const taskManagerRowElements = new TaskManagerRowElements(adminPage)
            refreshDbRow = taskManagerRowElements.taskRowById("UpdateFiasAddressReference")
        });

        test("Setting up the database address update service", async () => {
            await TaskManagerModule.setupTask(adminPage, refreshDbRow, TaskManagerConfig.refreshDBTaskSettings);
        })

        test("Setting the manual execution mode for the service", async () => {
            const scheduleDescription = await TaskManagerModule.setTaskExecutionRegime(
                adminPage,
                refreshDbRow,
                TaskManagerConfig.taskExecutionRegime.manual.scheludeMenuOption
            );
            expect(scheduleDescription).toContain(TaskManagerConfig.taskExecutionRegime.manual.scheduleColumnDesc);
        })

        test("Manually starting the service", async () => {
            const taskManagerRowActions = new TaskManagerRowActions(adminPage)
            await taskManagerRowActions.startTask(refreshDbRow)
            await TaskManagerModule.waitForTaskToBePending(adminPage, refreshDbRow, TaskManagerConfig.taskPendingTimeoutInSeconds)
        })

        test("Check that the service started and worked without errors", async () => {
            await TaskManagerModule.checkTaskExecution(adminPage, refreshDbRow, ValidationFunctions.refreshDbValidationFactory(TaskManagerConfig.serviceValidationMessages.refreshDBValidationMessage))
        })

    })

    /**
     * @description ### Тест расчета координат объекта
     Состоит из следующих этапов:
      - Применяем настройки для службы опрелеляемые в конфигурации(путь до OSM)
      - Ставим ручной режим запуска службы
      - Запускаем задачу
      - Проверяем что задача отработана корректно
    */
    test.describe.serial(`Testing the coordinates calculation service`, () => {
        let importOsmRow
        test.beforeAll(async () => {
            await AdminMenuActions.navigateToPage(adminPage, "Служебные задачи", MenuConfig.menuRegime.Admin)
            const taskManagerRowElements = new TaskManagerRowElements(adminPage)
            importOsmRow = taskManagerRowElements.taskRowById("ImportOsm")
        });

        test("Setting up the coordinates calculation service", async () => {
            await TaskManagerModule.setupTask(adminPage, importOsmRow, TaskManagerConfig.importOsmTaskSettings);
        })

        test("Setting the manual execution mode for the service", async () => {
            const scheduleDescription = await TaskManagerModule.setTaskExecutionRegime(
                adminPage,
                importOsmRow,
                TaskManagerConfig.taskExecutionRegime.manual.scheludeMenuOption
            );
            expect(scheduleDescription).toContain(TaskManagerConfig.taskExecutionRegime.manual.scheduleColumnDesc);
        })

        test("Manually starting the service", async () => {
            const taskManagerRowActions = new TaskManagerRowActions(adminPage)
            await taskManagerRowActions.startTask(importOsmRow)
            await TaskManagerModule.waitForTaskToBePending(adminPage, importOsmRow, TaskManagerConfig.taskPendingTimeoutInSeconds)
        })

        test("Check that the service started and worked without errors", async () => {
            await TaskManagerModule.checkTaskExecution(adminPage, importOsmRow, ValidationFunctions.importOsmValidationFactory(TaskManagerConfig.serviceValidationMessages.importOsmValidationMessage))
        })

    })

    /**
     * @description ### Тест службы рассылки сообщений
     Состоит из следующих этапов:
      - Настраиваем smtp сервер в общесистемных настройках
      - Триггерим событие отправки письма, 
        для теста выбрано утверждение учетной записи
      - Ставим ручной режим запуска службы
      - Запускаем службу вручную
      - Проверяем историю службы
      - Проверяем дошло ли письмо до почтового ящика
    */
    test.describe.serial(`Testing the mail service`, () => {
        test.beforeAll(async () => {
            await SQL.createCustomer(ClientTestConfig.CLIENT_NAME, ClientTestConfig.CLIENT_EMAIL, await SQL.getHashedPassword(ClientTestConfig.CLIENT_PASSWORD))
        });
        
        test.describe.serial(`Service pre-execution actions`, () => {
            test.skip("Setting the smtp server", async () => {
                await AdminMenuActions.navigateToPage(adminPage, "Общесистемные настройки", MenuConfig.menuRegime.Admin)
                const globalSettingsPageActions = new GlobalSettingsPageActions(adminPage)
                const outgoingEmailSettingsElements = new OutgoingEmailSettingsElements(adminPage)
                const outgoingEmailSettingsActions = new OutgoingEmailSettingsActions(adminPage)
                const editAccountDialogActions = new EditAccountDialogActions(adminPage)
                const editAccountDialogElements = new EditAccountDialogElements(adminPage)
                await globalSettingsPageActions.toggleOutgoingEmailSettingsTab()
                const accountRow = outgoingEmailSettingsElements.accountRowBySmtpAddress("localhost")
                if (accountRow.isVisible()) {
                    await outgoingEmailSettingsActions.expandAccountSettings("localhost")
                }
                else {
                    await outgoingEmailSettingsActions.addNewAccount()
                }
                const editAccountDialog = editAccountDialogElements.editAccountDialog()
                await editAccountDialogActions.applySettings(TaskManagerConfig.mailServiceSettings)
                await editAccountDialogActions.chooseDialogOption(editAccountDialog, "Сохранить")
            })
        })
        test.describe.serial(`Starting mail sending service`, () => {
            let mailRow
            test.beforeAll(async () => {
                await AdminMenuActions.navigateToPage(adminPage, "Служебные задачи", MenuConfig.menuRegime.Admin)
                const taskManagerRowElements = new TaskManagerRowElements(adminPage)
                mailRow = taskManagerRowElements.taskRowById("SendQueuedEmailMessages")
            });

            test("Setting the manual execution mode for the service", async () => {
                const scheduleDescription = await TaskManagerModule.setTaskExecutionRegime(
                    adminPage,
                    mailRow,
                    TaskManagerConfig.taskExecutionRegime.manual.scheludeMenuOption
                );
                expect(scheduleDescription).toContain(TaskManagerConfig.taskExecutionRegime.manual.scheduleColumnDesc);
            })

            test("Triggering email sending action", async () => {
                await AdminMenuActions.navigateToPage(adminPage, "Учетные записи абонентов", MenuConfig.menuRegime.Admin)
                const manageCustomerAccountsActions = new ManageCustomerAccountsActions(adminPage)
                await manageCustomerAccountsActions.changeAccountStatus(TaskManagerConfig.testCustomerEmail, AccountsConfig.accountActionsUrl.Approve)
                await AdminMenuActions.navigateToPage(adminPage, "Служебные задачи", MenuConfig.menuRegime.Admin)
            })

            test("Manually starting the service", async () => {
                const taskManagerRowActions = new TaskManagerRowActions(adminPage)
                await taskManagerRowActions.startTask(mailRow)
                await TaskManagerModule.waitForTaskToBePending(adminPage, mailRow, TaskManagerConfig.taskPendingTimeoutInSeconds)
            })

            test("Check that the service started and worked without errors", async () => {
                await TaskManagerModule.checkTaskExecution(adminPage, mailRow, ValidationFunctions.mailServiceValidationFactory(TaskManagerConfig.serviceValidationMessages.mailValidationMessage))
            })

            test("Check last received email", async () => {
                let currentTime = new Date();
                const client = new POP3Client({
                    user: TaskManagerConfig.pop3Settings.user,
                    password: TaskManagerConfig.pop3Settings.password,
                    host: TaskManagerConfig.pop3Settings.host,
                    port: 110,
                    tls: false,
                });

                let messageList = await client.LIST();
                const lastMsgNum = messageList.length;
                let msg = await client.RETR(lastMsgNum);
                let parsedEmail = await simpleParser(msg);
                let emailTime = new Date(parsedEmail.date);
                let timeDifference = currentTime.getTime() - emailTime.getTime();

                expect(parsedEmail.text, "Текст письма соответсвует ожидаемому").toContain(TaskManagerConfig.expectedMailMessage)
                            
                expect(timeDifference, "Проверка что последнее доставленное письмо свежее").toBeLessThan(TaskManagerConfig.tolleratedMailDelayinMs);
                await client.QUIT();
            })

        })

    })

        /**
     * @description ### Тест сопоставления адресов с объектами учета
     Состоит из следующих этапов:
      - Применяем настройки для службы опрелеляемые в конфигурации
      - Ставим ручной режим запуска службы
      - Запускаем задачу
      - Проверяем что задача отработана корректно
    */
      test.describe.serial(`Testing the address assignment service`, () => {
        let assignAddressesRow
        test.beforeAll(async () => {
            await AdminMenuActions.navigateToPage(adminPage, "Служебные задачи", MenuConfig.menuRegime.Admin)
            const taskManagerRowElements = new TaskManagerRowElements(adminPage)
            assignAddressesRow = taskManagerRowElements.taskRowById("AssignAddressesTask")
        });

        test("Setting up the address assignment service", async () => {
            await TaskManagerModule.setupTask(adminPage, assignAddressesRow, TaskManagerConfig.assignAddressesTaskSettings);
        })

        test("Setting the manual execution mode for the service", async () => {
            const scheduleDescription = await TaskManagerModule.setTaskExecutionRegime(
                adminPage,
                assignAddressesRow,
                TaskManagerConfig.taskExecutionRegime.manual.scheludeMenuOption
            );
            expect(scheduleDescription).toContain(TaskManagerConfig.taskExecutionRegime.manual.scheduleColumnDesc);
        })

        test("Manually starting the service", async () => {
            const taskManagerRowActions = new TaskManagerRowActions(adminPage)
            await taskManagerRowActions.startTask(assignAddressesRow)
            await TaskManagerModule.waitForTaskToBePending(adminPage, assignAddressesRow, TaskManagerConfig.taskPendingTimeoutInSeconds)
        })

        test("Check that the service started and worked without errors", async () => {
            await TaskManagerModule.checkTaskExecution(adminPage, assignAddressesRow, ValidationFunctions.assignAddressValidationFactory(TaskManagerConfig.serviceValidationMessages.assignAddressesValidationMessage))
        })

    })

})

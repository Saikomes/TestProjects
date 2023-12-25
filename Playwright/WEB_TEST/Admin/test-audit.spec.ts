import { test, expect } from '../lib/fixtures/hook'
import AdminTestConfig from './config/adminTestConfig';
import TestUtils from '../Common/testUtils';
import AdminMenuActions from './actions/Common/adminMenuActions';
import MainPageActions from './actions/MainPage/mainPageActions';
import MainPageConfig from './config/mainPageConfig';
import EmployeesGroupsActions from './actions/Accounts/EmployeesGroupsActions';
import AccountsConfig from './config/accountsConfig';
import AdminLoginPageActions from './actions/adminLoginPageActions';
import ClientTestConfig from '../Client/config/clientTestConfig';
import SQL from '../Common/SQL/SQL';
import NewsActions from './actions/News/newsActions';
import NewsElements from './elements/News/newsElements';
import DateHelper from '../Common/modules/dateHelper';
import NewsConfig from './config/newsConfig';
import ClientMainPageMenuActions from '../Client/actions/mainPage/clientMainPageMenuActions';
import ClientLoginPageActions from '../Client/actions/clientLoginPageActions';
import ClientMainPageMenuElements from '../Client/elements/mainPage/clientMainPageMenuElements';
import ClientMainPageNewsActions from '../Client/actions/mainPage/clientMainPageNewsActions';
import AuditActions from './actions/Audit/auditActions';
import AuditElements from './elements/Audit/auditElements';
import AuditConfig from './config/auditConfig';
import MenuConfig from './config/menuConfig';
import AuditLocators from './locators/Audit/auditLocators';


/**
   * @description ### Тест аудита
  Данный тест состоит из следующих шагов:
  - Заходим под тестовым пользователем на страницу аудита
  - Выставляем режим дат за последние сутки
  - Выставляем режим сортировки по убыванию времени
  - Проверяем первое событие в таблице на соответствие даты, пользователя и события(заход на страницу) ожидаемым
  - Затем проверяем доступные для выставления периоды на соответствие ожидаемым диапазонам дат и проверяем что события
    входят в данный диапазон
*/
test.describe.serial('Checking that events are logged and control elements are functional', () => {
    test.beforeAll(async () => {
        await SQL.createEmployee(AdminTestConfig.ADMIN_USER, AdminTestConfig.ADMIN_PASSWORD, AccountsConfig.accountType.Admin)
        await SQL.createEmployee(AdminTestConfig.OPERATOR_USER, AdminTestConfig.ADMIN_PASSWORD, AccountsConfig.accountType.Operator)
        await SQL.createCustomer(ClientTestConfig.CLIENT_NAME, ClientTestConfig.CLIENT_EMAIL, await SQL.getHashedPassword(ClientTestConfig.CLIENT_PASSWORD))
    });

    /**
 * @description ### Заходим на страницу аудита и проверяем что событие записалось
*/
    test.describe.serial('Checking that events are logged and control elements are operational', () => {
        let adminPage, adminChecker
        test.beforeAll(async ({ browser }, testInfo) => {
            ({ page: adminPage, checker: adminChecker } = await TestUtils.setupTest(browser, AdminTestConfig.ADMIN_ADDRESS, testInfo));
            await AdminLoginPageActions.login(adminPage, AdminTestConfig.ADMIN_USER, AdminTestConfig.ADMIN_PASSWORD)
            await MainPageActions.changeCabinetRegime(adminPage, MainPageConfig.cabinetRegime.Operator)
            await MainPageActions.changeCabinetRegime(adminPage, MainPageConfig.cabinetRegime.Admin)
            await AdminMenuActions.navigateToPage(adminPage, "Аудит пользователей", MenuConfig.menuRegime.Admin)
        });
        test.afterAll(async () => {
            await TestUtils.teardownTest(adminChecker, adminPage);
        });

        /**
       * @description ### Переход на страницу и проверка что событие перехода отображается
    */
        test("Checking the last event", async () => {
            const now = new Date();
            const auditActions = new AuditActions(adminPage)
            await auditActions.selectPeriod(AuditConfig.selectPeriodOptions.Other.value)
            await auditActions.setEndDateManually(now)
            await auditActions.setStartDateManually(now)
            await auditActions.selectPeriod(AuditConfig.selectPeriodOptions.Day.value)
            await auditActions.tableActions.sortByAscending(AuditLocators.eventTableLocators.timestampSortCellId.locator)
            await auditActions.checkRowDateValidity(1)
            await auditActions.checkRowOperationValidity(1, "Открытие веб-страницы")
            await auditActions.checkRowUserValidity(1, "Администратор")
        })

        /**
     * @description ### Проверка корректной работы выставления периодов
  */
        test("Checking the periods", async () => {
            const now = new Date();
            const auditActions = new AuditActions(adminPage)
            await auditActions.selectPeriod(AuditConfig.selectPeriodOptions.Other.value)
            await auditActions.setEndDateManually(now)
            await auditActions.setStartDateManually(now)
            for (const periodOption of AuditConfig.testPeriods) {
                await auditActions.selectPeriod(periodOption.value)
                await auditActions.verifyStartStopDate(periodOption.name)
                await auditActions.tableActions.sortByAscending(AuditLocators.eventTableLocators.timestampSortCellId.locator)
                await auditActions.checkRowDateValidity(1)
                await auditActions.tableActions.sortByDescending(AuditLocators.eventTableLocators.timestampSortCellId.locator)
                await auditActions.checkRowDateValidity(1)
            }
        })
    })

})







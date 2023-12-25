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
import MenuConfig from './config/menuConfig';

/**
   * @description ### Тест новостей
  Данный тест состоит из следующих шагов:
  - Создаем новость администратором и выдаем права на нее определенной группе пользователей
  - Переход по всем ссылкам на которые ведут элементы подменю
  - После перехода по ссылке проверяется соответствие заголовка элемента меню и заголовка страницы
*/
test.describe.serial('Admin creates news and the user views the news', () => {
  test.beforeAll(async () => {
    await SQL.createEmployee(AdminTestConfig.ADMIN_USER, AdminTestConfig.ADMIN_PASSWORD, AccountsConfig.accountType.Admin)
    await SQL.createEmployee(AdminTestConfig.OPERATOR_USER, AdminTestConfig.ADMIN_PASSWORD, AccountsConfig.accountType.Operator)
    await SQL.createCustomer(ClientTestConfig.CLIENT_NAME, ClientTestConfig.CLIENT_EMAIL, await SQL.getHashedPassword(ClientTestConfig.CLIENT_PASSWORD))
  });
  
      /**
   * @description ### Создаем админом новость для групп пользователей 
*/
  test.describe.serial('Admin creates news', () => {
    let adminPage, adminChecker
    test.beforeAll(async ({ browser }, testInfo) => {
      ({ page: adminPage, checker: adminChecker } = await TestUtils.setupTest(browser, AdminTestConfig.ADMIN_ADDRESS, testInfo));
      await AdminLoginPageActions.login(adminPage, AdminTestConfig.ADMIN_USER, AdminTestConfig.ADMIN_PASSWORD)
      await MainPageActions.changeCabinetRegime(adminPage, MainPageConfig.cabinetRegime.Operator)
      await MainPageActions.changeCabinetRegime(adminPage, MainPageConfig.cabinetRegime.Admin)
    });
    test.afterAll(async () => {
      await TestUtils.teardownTest(adminChecker, adminPage);
    });
  
    /**
   * @description ### Создаем новость и определяем целевые группы
*/
    test("Creating news", async () => {
      await AdminMenuActions.navigateToPage(adminPage, "Управление новостями", MenuConfig.menuRegime.Admin)
      const newsActions = new NewsActions(adminPage)
      await newsActions.removeNews(NewsConfig.testNewsTitle)
      const now = new Date();
      const inFiveDays = new Date();
      
      inFiveDays.setDate(now.getDate() + 5);
      
      const fromDate = DateHelper.formatDateToString(now);
      const toDate = DateHelper.formatDateToString(inFiveDays);
      await newsActions.addNewNews({
        title: NewsConfig.testNewsTitle,
        preview: NewsConfig.testPreview,
        content: NewsConfig.testContent,
        fromDate: fromDate,
        toDate: toDate,
        groups: NewsConfig.testNewsGroups
      });
  })
})

test.describe.serial('Checking the presence of news by the subscriber', () => {
  let clientPage, clientChecker
  test.beforeAll(async ({ browser }, testInfo) => {
    ({ page: clientPage, checker: clientChecker } = await TestUtils.setupTest(browser, ClientTestConfig.CLIENT_ADDRESS, testInfo));
    await ClientLoginPageActions.login(clientPage, ClientTestConfig.CLIENT_EMAIL, ClientTestConfig.CLIENT_PASSWORD)
  });
  test.afterAll(async () => {
    await TestUtils.teardownTest(clientChecker, clientPage);
  });

  test("Проверка что для клиента отображается новость", async () => {
    const clientMainPageNewsActions = new ClientMainPageNewsActions(clientPage)
    await clientMainPageNewsActions.checkNewsIsShown(NewsConfig.testNewsTitle)
  });

});

})







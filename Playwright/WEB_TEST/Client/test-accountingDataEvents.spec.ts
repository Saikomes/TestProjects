import { test, expect } from '../lib/fixtures/hook';
import { Chart } from 'chart.js';
import ClientTestConfig from './config/clientTestConfig';
import SQL from '../Common/SQL/SQL';
import TestUtils from '../Common/testUtils';
import ClientLoginPageActions from './actions/clientLoginPageActions';
import ClientMainPageMenuActions from './actions/mainPage/clientMainPageMenuActions';
import AccountingDataEventsModule from './modules/AccountingDataEvents/accountingDataEventsModule';
import AccountingDataEventsActions from './actions/AccountingDataEvents/accountingDataEventsActions';
import AccountingDataEventsConfig from './config/accountingDataEventsConfig';

/**
 * @description ### Тест страницы "Журналы событий"
Данный тест состоит из следующих шагов:
- Выставляем в соотвествии с testCase определенные настройки на панели управления
- Получаем набор событий исходя из БД из параметров testCase
- Выставляем параметры в диалоге "Фильтрация"
- Проверяем наборы событий в начале и конце интервала. События с метками времени
  и другими характеристиками должны быть найдены в таблице полученной из БД
*/
AccountingDataEventsConfig.testCases.forEach((testCase) => {
  test.describe.serial('Checking the Accounting data event page', async () => {
    let clientPage, clientChecker;
    let accountingDataEventsActions: AccountingDataEventsActions, accountingDataEventsModule: AccountingDataEventsModule
    test.beforeAll(async ({ browser }, testInfo) => {
      await SQL.createCustomer(ClientTestConfig.CLIENT_NAME, ClientTestConfig.CLIENT_EMAIL, await SQL.getHashedPassword(ClientTestConfig.CLIENT_PASSWORD));
      ({ page: clientPage, checker: clientChecker } = await TestUtils.setupTest(browser, ClientTestConfig.CLIENT_ADDRESS, testInfo));
      await ClientLoginPageActions.login(clientPage, ClientTestConfig.CLIENT_EMAIL, ClientTestConfig.CLIENT_PASSWORD)
      const clientMainPageMenuActions = new ClientMainPageMenuActions(clientPage)
      accountingDataEventsActions = new AccountingDataEventsActions(clientPage)
      accountingDataEventsModule = new AccountingDataEventsModule(clientPage)
      await clientMainPageMenuActions.navigateToPage("Журналы событий")
      await accountingDataEventsModule.applyTestCaseParams(testCase)
    });
    test.afterAll(async () => {
      await TestUtils.teardownTest(clientChecker, clientPage);
    });


            /**
* @description ### Проверка экспорта данных
*/
test("Checking events", async ({ }) => {
  const table = await accountingDataEventsModule.GetDbData(testCase)
  await accountingDataEventsModule.VerifyPointDataMatchesDB(testCase, table)
})

        /**
* @description ### Проверка экспорта данных
*/
test("Checking export", async ({ }) => {
    const reportPage = await accountingDataEventsActions.controlPanelActions.exportResult(testCase.reportType)
    expect(reportPage.url(), `Страница отчета успешно загружена`).not.toEqual(clientPage.url())
  })

  });

})

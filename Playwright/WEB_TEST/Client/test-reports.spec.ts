import { test, expect } from '../lib/fixtures/hook';
import BrowserActions from '../Common/browserActions';
import ClientTestConfig from './config/clientTestConfig';
import SQL from '../Common/SQL/SQL';
import ClientMainPageMenuActions from './actions/mainPage/clientMainPageMenuActions';
import TestUtils from '../Common/testUtils';
import ClientLoginPageActions from './actions/clientLoginPageActions';
import ReportsConfig from './config/reportsConfig';
import ClientReportActions from './actions/reports/clientReportActions';
import ClientReportElements from './elements/reports/clientReportElements';
import moment from 'moment-timezone';
import DateHelper from '../Common/modules/dateHelper';

async function checkReportPageUrl(page, report) {
  const url = new URL((page as any).url())

  await BrowserActions.waitForPageReady(page, 120000)
  expect(url.searchParams.get("id"), `id отчета ${report.Name} совпадает с ожидаемым`).toEqual(report.ReportId)
  expect(moment(url.searchParams.get("StartDT")).toISOString(), `StartDT отчета ${report.Name} совпадает с ожидаемым`).toEqual(DateHelper.formatStringToDate(report.Settings.beginDate.value, 'dd.mm.yyyy').toISOString())
  expect(moment(url.searchParams.get("EndDT")).toISOString(), `EndDT отчета ${report.Name} совпадает с ожидаемым`).toEqual(DateHelper.formatStringToDate(report.Settings.endDate.value, 'dd.mm.yyyy').toISOString())
  if (report.Settings.paramForReport) {
    const foundParam = Object.values(ReportsConfig.parametersForReport).find(param => {
      return param.Name === report.Settings.paramForReport.value;
    });
    if (foundParam) {
      expect(url.searchParams.get("ParamTypes"), `ParamTypes отчета ${report.Name} совпадает с ожидаемым`).toEqual(foundParam.value)
    }
  }
}

test.describe.serial('Тест отчетов', async () => {
  let clientPage, clientChecker;
  let clientReportElements
  let clientReportActions
  test.beforeAll(async ({ browser }, testInfo) => {
    await SQL.createCustomer(ClientTestConfig.CLIENT_NAME, ClientTestConfig.CLIENT_EMAIL, await SQL.getHashedPassword(ClientTestConfig.CLIENT_PASSWORD));
    ({ page: clientPage, checker: clientChecker } = await TestUtils.setupTest(browser, ClientTestConfig.CLIENT_ADDRESS, testInfo));
    await ClientLoginPageActions.login(clientPage, ClientTestConfig.CLIENT_EMAIL, ClientTestConfig.CLIENT_PASSWORD)
    const clientMainPageMenuActions = new ClientMainPageMenuActions(clientPage)
    await clientMainPageMenuActions.navigateToPage("Отчеты")
    clientReportElements = new ClientReportElements(clientPage)
    clientReportActions = new ClientReportActions(clientPage)
  });
  test.afterAll(async () => {
    await TestUtils.teardownTest(clientChecker, clientPage);
  });
  /**
     * @description ### Тест обхода всех страниц через меню
    Данный тест состоит из следующих шагов:
    - Переход по всем ссылкам на которые ведут элементы меню
    - После перехода по ссылке проверяется соответствие заголовка элемента меню и заголовка страницы
  */
  Object.values(ReportsConfig.reports).forEach((report) => {
    test(`Проверка отчета "${report.Name}" `, async ({ }) => {
      await clientReportActions.clientReportListActions.expandCategory(report.Category)
      await clientReportActions.clientReportListActions.selectReportByName(report.Name)
      await clientReportActions.uiFormActions.applySettings(report.Settings)
      await clientReportActions.showReport()
      const newPage = await new Promise(resolve => {
        clientPage.once('popup', resolve);
      });
      await checkReportPageUrl(newPage, report)

    })
  })
})
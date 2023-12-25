import { test, expect } from '../lib/fixtures/hook';
import { Chart } from 'chart.js';
import ClientTestConfig from './config/clientTestConfig';
import SQL from '../Common/SQL/SQL';
import TestUtils from '../Common/testUtils';
import ClientLoginPageActions from './actions/clientLoginPageActions';
import ClientMainPageMenuActions from './actions/mainPage/clientMainPageMenuActions';
import PowerGridMetricsModule from './modules/PowerGridMetrics/powerGridMetricsModule';
import PowerGridMetricsActions from './actions/PowerGridMetrics/powerGridMetricsActions';
import PowerGridMetricsElements from './elements/PowerGridMetrics/powerGridMetricsElements';
import PowerGridMetricsConfig from './config/powerGridMetricsConfig';

/**
 * @description ### Тест страницы "Параметры сети"
Данный тест состоит из следующих шагов:
- Выставляем в соотвествии с testCase определенные настройки на панели управления
- Получаем набор параметров для отображения исходя из параметров testCase
- Проверяем что параметры отображаются на легенде графика
*/
PowerGridMetricsConfig.testCases.forEach((testCase) => {
  test.describe.serial('Checking the Power grid page', async () => {
    let clientPage, clientChecker;
    let powerGridMetricsActions: PowerGridMetricsActions, powerGridMetricsModule: PowerGridMetricsModule, powerGridMetricsElements: PowerGridMetricsElements
    test.beforeAll(async ({ browser }, testInfo) => {
      await SQL.createCustomer(ClientTestConfig.CLIENT_NAME, ClientTestConfig.CLIENT_EMAIL, await SQL.getHashedPassword(ClientTestConfig.CLIENT_PASSWORD));
      ({ page: clientPage, checker: clientChecker } = await TestUtils.setupTest(browser, ClientTestConfig.CLIENT_ADDRESS, testInfo));
      await ClientLoginPageActions.login(clientPage, ClientTestConfig.CLIENT_EMAIL, ClientTestConfig.CLIENT_PASSWORD)
      const clientMainPageMenuActions = new ClientMainPageMenuActions(clientPage)
      powerGridMetricsActions = new PowerGridMetricsActions(clientPage)
      powerGridMetricsModule = new PowerGridMetricsModule(clientPage)
      powerGridMetricsElements = new PowerGridMetricsElements(clientPage)
      await clientMainPageMenuActions.navigateToPage("Параметры сети")
      await powerGridMetricsModule.applyTestCaseParams(testCase)
    });
    test.afterAll(async () => {
      await TestUtils.teardownTest(clientChecker, clientPage);
    });


        /**
* @description ### Проверка наличия компонентов
*/
test("Checking get current data", async ({ }) => {
  const [response] = await Promise.all([
    clientPage.waitForResponse(response =>
      response.url().includes('PowerGridMonitoring/LoadClientCurrentValues')
    ),
    powerGridMetricsActions.controlPanelActions.getCurrentData()
  ]);
  expect(response.status()).toBe(200)
})


    /**
* @description ### Проверка наличия компонентов
*/
    test("Checking content", async ({ }) => {
      expect(await powerGridMetricsElements.dataForPeriodChartElements.dataForPeriodChart().isVisible()).toBeTruthy()
      expect(await powerGridMetricsElements.iuVectorDiagramElements.iuVectorDiagram().isVisible()).toBeTruthy()
      expect(await powerGridMetricsElements.sVectorDiagramElements.sVectorDiagram().isVisible()).toBeTruthy()
    })

    /**
* @description ### Проверка экспорта данных
*/
    test("Checking export", async ({ }) => {
      for(let reportType in PowerGridMetricsConfig.reportTypes) {
        const reportPage = await powerGridMetricsActions.controlPanelActions.exportResult(PowerGridMetricsConfig.reportTypes[reportType].name, testCase.reportFormat, testCase.allParamsInReport)
        expect(reportPage.url(), `Страница отчета успешно загружена`).not.toEqual(clientPage.url())
      }
    })

    /**
* @description ### Проверка экспорта данных
*/
    test("Checking chart", async ({ }) => {
      await powerGridMetricsActions.dataForPeriodChartActions.checkTooltip()
      for (const esParameter of testCase.esParameters) {
        await powerGridMetricsActions.dataForPeriodChartActions.checkLegendContainsPoint(esParameter)
      }
    })

  });

})

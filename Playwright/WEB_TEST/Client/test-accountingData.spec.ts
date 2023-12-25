import { test, expect } from '../lib/fixtures/hook';
import { Chart } from 'chart.js';
import ClientTestConfig from './config/clientTestConfig';
import SQL from '../Common/SQL/SQL';
import TestUtils from '../Common/testUtils';
import ClientLoginPageActions from './actions/clientLoginPageActions';
import ClientMainPageMenuActions from './actions/mainPage/clientMainPageMenuActions';
import AccountingDataConfig from './config/accountingDataConfig';
import AccountingDataElements from './elements/AccountingData/accountingDataElements';
import AccountingDataActions from './actions/AccountingData/accountingDataActions';
import AccountingDataModule from './modules/AccountingData/accountingDataModule';

/**
 * @description ### Тест страницы "Учетные данные"
Данный тест состоит из следующих шагов:
- Выставляем в соотвествии с testCase определенные настройки на панели управления
- Выставляем параметры в диалоге "Настройки"
- Проверяем критические точки для каждого устройства конфигурации(соответствие периоду на панели)
- Проверяем тип периода в таблице(разница во времени между точками)
- Проверяем тарифы если выставлен параметр в панели
- Проверяем итоговые значения в соответствии с выставленными параметрами в конфиге
- Проверяем суммарные показания если выставлен параметр "Суммирование"
*/
AccountingDataConfig.testCases.forEach((testCase) => {
  test.describe.serial('Checking the Accounting data page', async () => {
    let clientPage, clientChecker;
    let accountingDataElements: AccountingDataElements, accountingDataActions: AccountingDataActions, accountingDataModule: AccountingDataModule
    test.beforeAll(async ({ browser }, testInfo) => {
      await SQL.createCustomer(ClientTestConfig.CLIENT_NAME, ClientTestConfig.CLIENT_EMAIL, await SQL.getHashedPassword(ClientTestConfig.CLIENT_PASSWORD));
      ({ page: clientPage, checker: clientChecker } = await TestUtils.setupTest(browser, ClientTestConfig.CLIENT_ADDRESS, testInfo));
      await ClientLoginPageActions.login(clientPage, ClientTestConfig.CLIENT_EMAIL, ClientTestConfig.CLIENT_PASSWORD)
      const clientMainPageMenuActions = new ClientMainPageMenuActions(clientPage)
      accountingDataElements = new AccountingDataElements(clientPage)
      accountingDataActions = new AccountingDataActions(clientPage)
      accountingDataModule = new AccountingDataModule(clientPage)
      await clientMainPageMenuActions.navigateToPage("Учетные данные")
      await accountingDataModule.applyTestCaseParams(testCase)
    });
    test.afterAll(async () => {
      await TestUtils.teardownTest(clientChecker, clientPage);
    });

    /**
* @description ### Проверка экспорта данных
*/
    test("Checking export", async ({ }) => {
      const reportPage = await accountingDataActions.controlPanelActions.exportResult(testCase.reportType)
      expect(reportPage.url(), `Страница отчета успешно загружена`).not.toEqual(clientPage.url())
    })

    /**
 * @description ### Проверка отображаемых точек учета
 В зависимости от того какой выбран уровень отображения точек учета,
 идет проверка что пользователь видит только точки вплоть до заданного уровня,
 то есть для уровня "Объект учета" видны "Объекты учета" и "Потребители"
 Проверка идет по typeid
*/
    test("Checking available metering points", async ({ }) => {
      const meteringPoints = await accountingDataElements.pointsTreePanelElements.pointsTreeRow().all()
      const allowedTypes = testCase.pointLevel.allowedTypes
      for (let meteringPoint of meteringPoints) {
        const pointLevel = await meteringPoint.getAttribute('typeid');
        expect(allowedTypes, `видимость точки ${await meteringPoint.locator("a").first().textContent()} соотвествует выставленным параметрам`).toContain(pointLevel)

      }
    })


    /**
     * @description ### Проверка отображаемых данных точки учета
    Данный тест состоит из следующих шагов:
    - Прокручиваем до точки учета
    - Раскрываем точку при необходимости
    - Получаем данные с начала и конца периода
    - Сравниваем данные с данными из БД
    Данная проверка осуществляется для всех точек выставленных в конфигурации
  */
    if (testCase.controlPanel.sum.value != true) {
      test.describe.serial('Checking without the sum', async () => {
        test("Checking the displayed data for the metering point", async ({ }) => {
          //выполняем sql запрос в соответствии с установленными в UI параметрами
          //сохраняем данные для дальнейшей сверки
          const table = await accountingDataModule.GetDbData(testCase)
          for (let device of testCase.devices) {
            const rootName = device.name.split('\\')[1]
            const rootRegex = `${rootName}`
            await accountingDataActions.readingsTableActions.slickAllRows(true)
            await accountingDataActions.readingsTableActions.findAndExpandRoot(rootRegex)
            if (testCase.controlPanel.tariff.value == true) {
              for (let tariff of device.tariffs) {
                await accountingDataActions.readingsTableActions.slickAllRows(true)
                const tariffRoot = tariff == 0 ? `^Общий тариф*$` : `^Тариф ${tariff}.*$`
                await accountingDataActions.readingsTableActions.findAndExpandRoot(tariffRoot)
                await accountingDataModule.VerifyPointDataMatchesDB(testCase, table, device.deviceID, tariff)
              }
            }
            else {
              await accountingDataModule.VerifyPointDataMatchesDB(testCase, table, device.deviceID, 0)
            }
          }
        })


        /**
         * @description ### Проверка итовых значений точек учета
        Данный тест состоит из следующих шагов:
        - Прокручиваем до Итогов по каждой точке и общего итога 
        - Сравниваем данные с БД
      */
        test("Checking the final values of the metering poin", async ({ }) => {
          const table = await accountingDataModule.GetDbData(testCase)
          let additionalParams = await accountingDataModule.GetAdditionalParams(testCase)
          for (let device of testCase.devices) {
            const rootName = device.name.split('\\')[1]
            await accountingDataActions.readingsTableActions.slickAllRows(true)
            for (let additionalParam of additionalParams) {
              const { dbOptionIdentifier, uiIdentifier } = additionalParam;
              if (testCase.controlPanel.tariff.value == false) {
                const overAllRow = await accountingDataActions.readingsTableActions.findRow(`Итого по .*${rootName}${uiIdentifier ? `, ${uiIdentifier}` : ''} $`)
                await accountingDataModule.VerifyOverallMatchesDB(testCase, table, device.deviceID, overAllRow, dbOptionIdentifier)
              }
            }
          }
          if (testCase.devices.length > 1) {
            for (let additionalParam of additionalParams) {
              const { dbOptionIdentifier, uiIdentifier } = additionalParam;
              const overAllRow = await accountingDataActions.readingsTableActions.findRow(`^Итого по выбранным точкам учета${uiIdentifier ? `, ${uiIdentifier}` : ''} $`)
              await accountingDataModule.VerifyOverallMatchesDB(testCase, table, null, overAllRow, dbOptionIdentifier)
            }
          }
        })
      })
    }

    /**
     * @description ### Проверка отображаемых данных точки учета
    Данный тест состоит из следующих шагов:
    - Прокручиваем до точки учета
    - Раскрываем точку при необходимости
    - Получаем данные с начала и конца периода
    - Сравниваем данные с данными из БД
  */
    if (testCase.controlPanel.sum.value == true) {
      test.describe.serial('Checking with the sum', async () => {
        test("Checking the displayed data for the metering point", async ({ }) => {
          //выполняем sql запрос в соответствии с установленными в UI параметрами
          //сохраняем данные для дальнейшей сверки
          const table = await accountingDataModule.GetDbData(testCase)
          const rootRegex = `^Сумма по выбранным точкам учета*$`
          await accountingDataActions.readingsTableActions.findAndExpandRoot(rootRegex)
          if (testCase.controlPanel.tariff.value == true) {
            await accountingDataActions.readingsTableActions.slickAllRows(true)
            const tariffRoot = `^Общий тариф*$`
            await accountingDataActions.readingsTableActions.findAndExpandRoot(tariffRoot)
            await accountingDataModule.VerifyPointDataMatchesDB(testCase, table, '0', 0)
          }
          else {
            await accountingDataModule.VerifyPointDataMatchesDB(testCase, table, '0', 0)
          }
        })


        /**
         * @description ### Проверка итовых значений точек учета
        Данный тест состоит из следующих шагов:
        - Прокручиваем до Итогов по каждой точке и общего итога 
        - Сравниваем данные с БД
      */
        test("Checking the final values of the metering point", async ({ }) => {
          const table = await accountingDataModule.GetDbData(testCase)
          let additionalParams = await accountingDataModule.GetAdditionalParams(testCase)
          await accountingDataActions.readingsTableActions.slickAllRows(true)
          for (let additionalParam of additionalParams) {
            const { dbOptionIdentifier, uiIdentifier } = additionalParam;
            const overAllRow = await accountingDataActions.readingsTableActions.findRow(`^Итого по Сумма по выбранным точкам учета${uiIdentifier ? `, ${uiIdentifier}` : ''} $`)
            await accountingDataModule.VerifyOverallMatchesDB(testCase, table, null, overAllRow, dbOptionIdentifier)
          }
        })

      });
    }


    if (testCase.checkLossDetalisation) {
      /**
 * @description ### Проверка детализации потерь(включается в зависимости от параметров конфигурации)
*/
      test("Checking the detalisation of losses", async ({ }) => {
        let detalisationButton = clientPage.getByTitle('Детализация потерь')
        if (await detalisationButton.isVisible()) {
          await detalisationButton.click()
          expect(await clientPage.getByRole('dialog').filter({ hasText: "Потери" }).isVisible(), "Диалог детализации потерь видим пользователю").toBeTruthy()
        }
      })
    }

  });

})

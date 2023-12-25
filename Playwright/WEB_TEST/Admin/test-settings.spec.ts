import { test, expect } from '../lib/fixtures/hook'
import AdminTestConfig from './config/adminTestConfig';
import TestUtils from '../Common/testUtils';
import AdminMenuActions from './actions/Common/adminMenuActions';
import MainPageActions from './actions/MainPage/mainPageActions';
import MainPageConfig from './config/mainPageConfig';
import GlobalSettingsConfig from './config/globalSettingsConfig';
import AccountsConfig from './config/accountsConfig';
import AdminLoginPageActions from './actions/adminLoginPageActions';
import ClientTestConfig from '../Client/config/clientTestConfig';
import SQL from '../Common/SQL/SQL';
import GlobalSettingsPageActions from './actions/GlobalSettings/globalSettingsPageActions';
import GlobalSettingsTabActions from './actions/GlobalSettings/globalSettingsTabActions';
import GlobalSettingsModule from './modules/GlobalSettings/globalSettingsModule';
import MenuConfig from './config/menuConfig';

/**
   * @description ### Тест общесистемных настроек
  Данный тест состоит из следующих шагов:
  - Применяем настройки из конфигурации на странице общесистемных настроек
  - Проверяем что настройки применились в БД
  - В новом контексте проверяем что настройки на странице соответсвуют ранее выставленным
*/
test.describe.serial('Testing system-wide settings', () => {
  let adminPage, adminChecker, originalValues
    test.beforeAll(async () => {
        originalValues = await GlobalSettingsModule.getOriginalDBValues(GlobalSettingsConfig.externalSystemSettings)
        await SQL.createEmployee(AdminTestConfig.ADMIN_USER, AdminTestConfig.ADMIN_PASSWORD, AccountsConfig.accountType.Admin)
        await SQL.createCustomer(ClientTestConfig.CLIENT_NAME, ClientTestConfig.CLIENT_EMAIL, await SQL.getHashedPassword(ClientTestConfig.CLIENT_PASSWORD))
    });

    test.afterAll(async () => {
      await GlobalSettingsModule.restoreOriginalDBValues(originalValues, GlobalSettingsConfig.externalSystemSettings)
    });

    test.beforeEach(async ({ browser }, testInfo) => {
      ({ page: adminPage, checker: adminChecker } = await TestUtils.setupTest(browser, AdminTestConfig.ADMIN_ADDRESS, testInfo));
      await AdminLoginPageActions.login(adminPage, AdminTestConfig.ADMIN_USER, AdminTestConfig.ADMIN_PASSWORD)
      await MainPageActions.changeCabinetRegime(adminPage, MainPageConfig.cabinetRegime.Operator)
      await MainPageActions.changeCabinetRegime(adminPage, MainPageConfig.cabinetRegime.Admin)
  });

  test.afterEach(async () => {
    await TestUtils.teardownTest(adminChecker, adminPage);
});



    test.describe.serial('Setting the configurations and verifying that the settings have been applied to the database', () => {
            /**
         * @description ### Настройки системы выставляем в соответствии с конфгурацией
        */
        test("Setting system-wide configurations according to the configuration", async () => {
            await AdminMenuActions.navigateToPage(adminPage, "Общесистемные настройки", MenuConfig.menuRegime.Admin)
            const globalSettingsPageActions = new GlobalSettingsPageActions(adminPage)
            const globalSettingsTabActions = new GlobalSettingsTabActions(adminPage)
            await globalSettingsPageActions.toggleGlobalSettingsTab()
            await globalSettingsTabActions.uiFormActions.applySettings(GlobalSettingsConfig.externalSystemSettings.map(setting => setting.ui))
            await globalSettingsTabActions.saveChanges()
        })

        test("Checking that the changes have been applied to the database", async () => {
          await GlobalSettingsModule.checkDBForExpectedValues(GlobalSettingsConfig.externalSystemSettings)
      })

    });

    test("Checking that the changes are reflected in the interface in the new context", async () => {
      await AdminMenuActions.navigateToPage(adminPage, "Общесистемные настройки", MenuConfig.menuRegime.Admin)
      const globalSettingsPageActions = new GlobalSettingsPageActions(adminPage)
      const globalSettingsTabActions = new GlobalSettingsTabActions(adminPage)
      await globalSettingsPageActions.toggleGlobalSettingsTab()
      await globalSettingsTabActions.uiFormActions.verifySettings(GlobalSettingsConfig.externalSystemSettings.map(setting => setting.ui))
  })

})







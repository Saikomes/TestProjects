import { test, expect } from '../lib/fixtures/hook'
import AdminTestConfig from './config/adminTestConfig';
import TestUtils from '../Common/testUtils';
import AdminMenuActions from './actions/Common/adminMenuActions';
import MainPageActions from './actions/MainPage/mainPageActions';
import MainPageConfig from './config/mainPageConfig';
import AdminLoginPageActions from './actions/adminLoginPageActions';
import MenuConfig from './config/menuConfig';
import CustomersAndContractsConfig from './config/customersAndContractsConfig';
import ExecutiveUserActions from './actions/CustomersAndContracts/executiveUserActions';
import ExecutiveUserElements from './elements/CustomersAndContracts/ExecutiveUserElements';
import MergeUsersDialogActions from './actions/CustomersAndContracts/Dialogs/mergeUsersDialogActions';
import ExecutiveUserLocators from './locators/CustomersAndContracts/ExecutiveUserLocators';
import DeviceRegistryConfig from './config/deviceRegistryConfig';
import DeviceRegistryModule from './modules/DeviceRegistry/deviceRegistryModule';
import PagesConfig from '../Common/config/pagesConfig';
import ContractsModule from './modules/CustomersAndContracts/contractsModule';
import CustomersModule from './modules/CustomersAndContracts/customersModule';
import DocumentsModule from './modules/CustomersAndContracts/documentsModule';
import ExecutiveUserModule from './modules/CustomersAndContracts/executiveUsersModule';

test.describe.serial('Market Participants Test', () => {

  /**
     * @description ### Тест страницы "Субъекты рынка"
    Данный тест состоит из следующих шагов:
    - Создаем нового субъекта и выставляем ему свойства
    - Проверяем что настройки применились через редактирование строки
    - Удаляем нового субъекта и проверяем что удаление прошло успешно
  */
  test.describe.serial('Market Entities Page Test', () => {
    let adminPage, adminChecker
    let customersModule: CustomersModule;

    test.beforeAll(async ({ browser }, testInfo) => {
      ({ page: adminPage, checker: adminChecker } = await TestUtils.setupTest(browser, AdminTestConfig.ADMIN_ADDRESS, testInfo));
      await AdminLoginPageActions.login(adminPage, AdminTestConfig.ADMIN_USER, AdminTestConfig.ADMIN_PASSWORD)
      await MainPageActions.changeCabinetRegime(adminPage, MainPageConfig.cabinetRegime.Admin)
      await MainPageActions.changeCabinetRegime(adminPage, MainPageConfig.cabinetRegime.Operator)
      customersModule = new CustomersModule(adminPage);
      await AdminMenuActions.navigateToPage(adminPage, PagesConfig.operatorPages.Customers, MenuConfig.menuRegime.Operator);
    });
    test.afterAll(async () => {
      await TestUtils.teardownTest(adminChecker, adminPage);
    });
    /**
  * @description ### Создаем тестового субъекта
  */
    test("Creating a test subject and assigning specific properties to it", async () => {
      await customersModule.DeleteSubject(CustomersAndContractsConfig.testSubjectName)
      await customersModule.CreateSubject(CustomersAndContractsConfig.testSubjectSettings)
    })


    test("Verifying that the settings have been applied", async () => {
      await customersModule.CheckCustomerSettings(CustomersAndContractsConfig.testSubjectName, CustomersAndContractsConfig.testSubjectSettings)
    })

    test("Verifying that the subject is being deleted", async () => {
      await customersModule.DeleteSubject(CustomersAndContractsConfig.testSubjectName)
    })

  });


  test.describe.serial('Contracts Page Test', () => {
    let adminPage, adminChecker
    let contractsModule;

    test.beforeAll(async ({ browser }, testInfo) => {
      ({ page: adminPage, checker: adminChecker } = await TestUtils.setupTest(browser, AdminTestConfig.ADMIN_ADDRESS, testInfo));
      await AdminLoginPageActions.login(adminPage, AdminTestConfig.ADMIN_USER, AdminTestConfig.ADMIN_PASSWORD)
      await MainPageActions.changeCabinetRegime(adminPage, MainPageConfig.cabinetRegime.Admin)
      await MainPageActions.changeCabinetRegime(adminPage, MainPageConfig.cabinetRegime.Operator)
      contractsModule = new ContractsModule(adminPage)
      await AdminMenuActions.navigateToPage(adminPage, PagesConfig.operatorPages.Contracts, MenuConfig.menuRegime.Operator);
    });
    test.afterAll(async () => {
      await TestUtils.teardownTest(adminChecker, adminPage);
    });
    /**
  * @description ### Создаем тестовый конракт
  */
    test("Сreating a test contract and assign specific properties to it", async () => {
      await contractsModule.CreateContract(CustomersAndContractsConfig.testContractSettings)
    })

    test("Check that the contract settings are applied", async () => {
      await contractsModule.CheckContractSettings(CustomersAndContractsConfig.testContractNumber, CustomersAndContractsConfig.testContractSettings)
    })

    test("Check that the contract is deleted", async () => {
      await contractsModule.DeleteContract(CustomersAndContractsConfig.testContractNumber)
    })

  });

  test.describe.serial('Test of the "Documents" page (including the creation of a new document)', () => {
    let adminPage, adminChecker, documentsModule

    test.beforeAll(async ({ browser }, testInfo) => {
      ({ page: adminPage, checker: adminChecker } = await TestUtils.setupTest(browser, AdminTestConfig.ADMIN_ADDRESS, testInfo));
      await AdminLoginPageActions.login(adminPage, AdminTestConfig.ADMIN_USER, AdminTestConfig.ADMIN_PASSWORD)
      await MainPageActions.changeCabinetRegime(adminPage, MainPageConfig.cabinetRegime.Admin)
      await MainPageActions.changeCabinetRegime(adminPage, MainPageConfig.cabinetRegime.Operator)
      documentsModule = new DocumentsModule(adminPage)
    });
    test.afterAll(async () => {
      await TestUtils.teardownTest(adminChecker, adminPage);
    });

            /**
* @description ### Проверка что документ удаляется
*/
test("Delete the document if it exists", async () => {
  await AdminMenuActions.navigateToPage(adminPage, PagesConfig.operatorPages.Documents, MenuConfig.menuRegime.Operator);
  await documentsModule.DeleteDocument(CustomersAndContractsConfig.testDocumentTableSettings,CustomersAndContractsConfig.documentNumber)
})

    /**
* @description ### Создание документа для счетчика
*/
    test("Search for the device and add a document to it", async () => {
      await AdminMenuActions.navigateToPage(adminPage, PagesConfig.operatorPages.DeviceRegistry, MenuConfig.menuRegime.Operator);
      const deviceRegistryModule = new DeviceRegistryModule(adminPage)
      await deviceRegistryModule.findDevice(DeviceRegistryConfig.searchOptions.ID.value, DeviceRegistryConfig.deviceId)
      await deviceRegistryModule.cleanDeviceDocuments()
      await deviceRegistryModule.addDeviceDocument(CustomersAndContractsConfig.testDocumentSettings, CustomersAndContractsConfig.documentNumber)
    })

    /**
* @description ### Проверка что документ создан, проверка его данных
*/
    test("Check that the document is created with the expected settings", async () => {
      await AdminMenuActions.navigateToPage(adminPage, PagesConfig.operatorPages.Documents, MenuConfig.menuRegime.Operator);
      await documentsModule.CheckDocumentSettings(CustomersAndContractsConfig.testDocumentTableSettings,CustomersAndContractsConfig.documentNumber)
    })

        /**
* @description ### Проверка что документ удаляется
*/
test("Check that the document is deleted", async () => {
  await AdminMenuActions.navigateToPage(adminPage, PagesConfig.operatorPages.Documents, MenuConfig.menuRegime.Operator);
  await documentsModule.DeleteDocument(CustomersAndContractsConfig.testDocumentTableSettings,CustomersAndContractsConfig.documentNumber, true)
})
  });

  
  test.describe.serial('Test of the "Operational Staff" page', () => {
    let adminPage, adminChecker
    let executiveUserModule

    test.beforeAll(async ({ browser }, testInfo) => {
      ({ page: adminPage, checker: adminChecker } = await TestUtils.setupTest(browser, AdminTestConfig.ADMIN_ADDRESS, testInfo));
      await AdminLoginPageActions.login(adminPage, AdminTestConfig.ADMIN_USER, AdminTestConfig.ADMIN_PASSWORD)
      await MainPageActions.changeCabinetRegime(adminPage, MainPageConfig.cabinetRegime.Admin)
      await MainPageActions.changeCabinetRegime(adminPage, MainPageConfig.cabinetRegime.Operator)
      executiveUserModule = new ExecutiveUserModule(adminPage)
      await AdminMenuActions.navigateToPage(adminPage, PagesConfig.operatorPages.ExecutivePersonal, MenuConfig.menuRegime.Operator);
    });
    test.afterAll(async () => {
      await TestUtils.teardownTest(adminChecker, adminPage);
    });
    /**
  * @description ### Создаем нового субъекта
  */

    for (const user in CustomersAndContractsConfig.testExecutiveUserSettings) {
      test(`Create a personnel unit for ${user} and assign specific properties to it`, async () => {
        const settings = CustomersAndContractsConfig.testExecutiveUserSettings[user];
        await executiveUserModule.CreateExecutiveUser(settings)
      });

      test(`Check that the personnel unit settings have been applied (${user})`, async () => {
        const settings = CustomersAndContractsConfig.testExecutiveUserSettings[user];
        await executiveUserModule.CheckUserSettings(settings, settings.name.value)
      });
    }

    test("Merge accounts and verify that the merging is successful", async () => {
      await executiveUserModule.MergeUsers(CustomersAndContractsConfig.testMergeUsersSettings)
      await executiveUserModule.CheckUsersMerged(CustomersAndContractsConfig.firstExecutiveUserName, CustomersAndContractsConfig.secondExecutiveUserName)
    })

  });
})





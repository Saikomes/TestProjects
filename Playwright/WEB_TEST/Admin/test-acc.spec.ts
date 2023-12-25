import { test, expect } from '../lib/fixtures/hook'
import BrowserActions from '../Common/browserActions';
import AdminTestConfig from './config/adminTestConfig';
import TestUtils from '../Common/testUtils';
import AdminMenuActions from './actions/Common/adminMenuActions';
import MainPageActions from './actions/MainPage/mainPageActions';
import MainPageConfig from './config/mainPageConfig';
import EmployeesGroupsActions from './actions/Accounts/EmployeesGroupsActions';
import AccountsConfig from './config/accountsConfig';
import ManageEmployeeAccountsActions from './actions/Accounts/manageEmployeeAccountsActions';
import ManageCustomerAccountsActions from './actions/Accounts/manageCustomerAccountsActions';
import AdminLoginPageActions from './actions/adminLoginPageActions';
import ClientTestConfig from '../Client/config/clientTestConfig';
import ClientLoginPageActions from '../Client/actions/clientLoginPageActions';
import AdminReportListActions from './actions/Reports/adminReportListActions';
import AdminReportListElements from './elements/Reports/adminReportListElements';
import ClientMainPageMenuElements from '../Client/elements/mainPage/clientMainPageMenuElements';
import AdminMainPageMenuElements from './elements/MainPage/adminMainPageMenuElements';
import ClientMainPageMenuActions from '../Client/actions/mainPage/clientMainPageMenuActions';
import SQL from '../Common/SQL/SQL';
import menuStructure from './modules/menuStructure';
import ClientReportListElements from '../Client/elements/reports/clientReportListElements';
import ClientReportListActions from '../Client/actions/reports/clientReportListActions';
import EmployeesGroupsElements from './elements/Accounts/elmpoyeesGroupsElements';
import MenuConfig from './config/menuConfig';
import PageHelpers from './modules/PageHelpers';
import PageActions from '../Common/pageActions';
import dbConfig from '../Common/SQL/dbConfig';

/**
   * @description ### Тест выдачи прав и и проерка на их применение
  Данный тест состоит из следующих шагов:
  - Администратор создает тестовые роли для оператора и абонента с ограниченными правами
  - Администратор включает тестового оператора и абонента в роли
  - Проверка что для абонента доступны только разрешенные страницы и отчеты
  - Проверка что для оператора доступны только разрешенные страницы и отчеты
*/
test.describe.serial('Checking the subscriber and operator restrictions functionality', () => {
  test.beforeAll(async () => {
    await SQL.createEmployee(AdminTestConfig.ADMIN_USER, AdminTestConfig.ADMIN_PASSWORD, AccountsConfig.accountType.Admin)
    await SQL.createEmployee(AccountsConfig.testOperatorName, AccountsConfig.testOperatorPassword, AccountsConfig.accountType.Operator)
    await SQL.createCustomer(AccountsConfig.testClientName, AccountsConfig.testClientEmail, await SQL.getHashedPassword(AccountsConfig.testClientPassword))
  });
  
      /**
   * @description ### Выдаем права абоненту и оператору в соответствии с конфигурацией
*/
  test.describe.serial('Issuing of permissions by the admin', () => {
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
   * @description ### Создаем группу и выдаем ей разрешения определенные в конфигурации
*/
    test("Creating employee group", async () => {
      await AdminMenuActions.navigateToPage(adminPage, "Группы сотрудников", MenuConfig.menuRegime.Admin)
      const employeesGroupsActions = new EmployeesGroupsActions(adminPage)
      const employeesGroupsElements = new EmployeesGroupsElements(adminPage)
      await employeesGroupsActions.cleanGroupFromPermissions("Все")
      await employeesGroupsActions.deleteGroupIfExists(AccountsConfig.employeeTestGroupName)
      expect(await employeesGroupsElements.employeesGroupItemByName(AccountsConfig.employeeTestGroupName).isVisible(), `Группа ${AccountsConfig.employeeTestGroupName} удалена`).toBeFalsy()
      await employeesGroupsActions.addNewGroup()
      await employeesGroupsActions.renameGroup(AccountsConfig.employeeTestGroupName)
      for (let permissionGroup of AccountsConfig.employeeTestGroupPermissions.groups) {
        for (let permission of permissionGroup.permissions) {
          await employeesGroupsActions.setPermission(permissionGroup.groupName, permission)
        }
      }
      await employeesGroupsActions.saveGroup()
      await BrowserActions.waitForPageReady(adminPage)
      expect(await employeesGroupsElements.employeesGroupItemByName(AccountsConfig.employeeTestGroupName).isVisible(), `Группа ${AccountsConfig.employeeTestGroupName} создана`).toBeTruthy()
    })

        /**
   * @description ### В созданную группу мы добавляем нашего тестового оператора
*/
    test("Adding an Employee to a test group", async ({ }) => {
      await AdminMenuActions.navigateToPage(adminPage, "Учетные записи сотрудников", MenuConfig.menuRegime.Admin)
      const manageEmployeeAccountsActions = new ManageEmployeeAccountsActions(adminPage)
      await manageEmployeeAccountsActions.removeAllAssignments(AccountsConfig.testOperatorName)
      await manageEmployeeAccountsActions.grantGroupAssignment(AccountsConfig.testOperatorName, AccountsConfig.employeeTestGroupName)
    })

        /**
   * @description ### Создаем группу для абонента и даем ей права из конфигурации
*/
    test("Creation of a test subscriber group", async ({ }) => {
      await AdminMenuActions.navigateToPage(adminPage, "Группы абонентов", MenuConfig.menuRegime.Admin)
      const employeesGroupsActions = new EmployeesGroupsActions(adminPage)
      await employeesGroupsActions.cleanGroupFromPermissions("Все")
      await employeesGroupsActions.deleteGroupIfExists(AccountsConfig.abonentTestGroupName)
      await employeesGroupsActions.addNewGroup()
      const employeesGroupsElements = new EmployeesGroupsElements(adminPage)
      await employeesGroupsActions.renameGroup(AccountsConfig.abonentTestGroupName)
      for (let permissionGroup of AccountsConfig.abonentTestGroupPermissions.groups) {
        for (let permission of permissionGroup.permissions) {
          await employeesGroupsActions.setPermission(permissionGroup.groupName, permission)
        }
      }
      await employeesGroupsActions.saveGroup()
      await BrowserActions.waitForPageReady(adminPage)
      expect(await employeesGroupsElements.employeesGroupItemByName(AccountsConfig.abonentTestGroupName).isVisible(), `Группа ${AccountsConfig.abonentTestGroupName} успешно создана`).toBeTruthy()
    })

            /**
   * @description ### Включаем созданного нами пользователя в группу
*/
    test("Adding a subscriber to the test group", async ({ }) => {
      await AdminMenuActions.navigateToPage(adminPage, "Учетные записи абонентов", MenuConfig.menuRegime.Admin)
      const manageCustomerAccountsActions = new ManageCustomerAccountsActions(adminPage)
      await manageCustomerAccountsActions.removeAllAssignments(AccountsConfig.testClientEmail)
      await manageCustomerAccountsActions.grantGroupAssignment(AccountsConfig.testClientEmail, AccountsConfig.abonentTestGroupName)
    })
  })


  test.describe.serial('Verification of the subscribers granted permissions', () => {
    let clientPage, clientChecker
    test.beforeAll(async ({ browser }, testInfo) => {
      ({ page: clientPage, checker: clientChecker } = await TestUtils.setupTest(browser, ClientTestConfig.CLIENT_ADDRESS, testInfo));
      await ClientLoginPageActions.login(clientPage, AccountsConfig.testClientEmail, AccountsConfig.testClientPassword)
    });
    test.afterAll(async () => {
      await TestUtils.teardownTest(clientChecker, clientPage);
    });

    test("Checking that only the permitted pages are displayed for the client", async () => {
      const mainPageMenuElements = new ClientMainPageMenuElements(clientPage)
      const mainMenuItems = await mainPageMenuElements.mainMenuPageItem().all();
      for (let menuItem of mainMenuItems) {
        const menuItemTitle = await mainPageMenuElements.menuItemTitle(menuItem).textContent()
        const targetGroup = AccountsConfig.abonentTestGroupPermissions.groups.find(group => group.groupName === 'Разрешения на страницы');
    /**
     * @title Страица включена в разрешенные"
     */
        expect((targetGroup && targetGroup.permissions.includes(menuItemTitle)), `Страница ${menuItemTitle} включена в разрешенные`).toBeTruthy()
      }
    });

    test("Checking that only the allowed reports are displayed for the client and all permitted reports are present", async () => {
      const clientMainPageMenuActions = new ClientMainPageMenuActions(clientPage)
      await clientMainPageMenuActions.navigateToPage("Отчеты")
      const reportListActions = new ClientReportListActions(clientPage)
      const reportListElements = new ClientReportListElements(clientPage)
      await reportListActions.expandCategory("Стандартные")
      
      const reportRows = await reportListElements.reportRow().all()
      const reportsOnPage: string[] = [];
      for (let reportRow of reportRows) {
        const reportName = await reportListElements.reportRowName(reportRow).textContent();
        reportsOnPage.push(reportName);
      }

      const reportsGroup = AccountsConfig.abonentTestGroupPermissions.groups.find(group => group.groupName === 'Разрешения на отчеты');
      let allowedReports
      if (reportsGroup) {
        allowedReports = reportsGroup.permissions;
      }
      for (let report of reportsOnPage) {
        expect(allowedReports, `Report "${report}" is expected`).toContain(report);
      }

      for (let allowedReport of allowedReports) {
        expect(reportsOnPage, `Report "${allowedReport}" is present on page`).toContain(allowedReport);
      }
    });

  });

  if(dbConfig.selectedDBMS == "PGSQL") {
  test.describe.serial('Verification of the operators granted permissions.', () => {
    let operatorPage, operatorChecker
    test.beforeAll(async ({ browser }, testInfo) => {
      ({ page: operatorPage, checker: operatorChecker } = await TestUtils.setupTest(browser, AdminTestConfig.ADMIN_ADDRESS, testInfo));
      await AdminLoginPageActions.login(operatorPage, AccountsConfig.testOperatorName, AccountsConfig.testOperatorPassword)
    });
    test.afterAll(async () => {
      await TestUtils.teardownTest(operatorChecker, operatorPage, false);
    });

    test("For the operator, only permitted pages are accessible", async ({ }) => {
      const mainMenuItems = await AdminMainPageMenuElements.mainMenuItem(operatorPage).all()
      const subMenuItems = await AdminMainPageMenuElements.subMenuItem(operatorPage).all()
      for (let menuItem of mainMenuItems) {
        const classAttribute = await menuItem.getAttribute('class');
        if (!classAttribute.includes('menuFolder')) {
        const menuItemTitle = await AdminMainPageMenuElements.menuItemTitle(menuItem).textContent()
        let isMenuItemAllowed = AccountsConfig.employeeTestGroupPermissions.groups.some(group => group.permissions.includes(menuItemTitle));
        await AdminMenuActions.checkItemForBlock(isMenuItemAllowed, menuItem, menuItemTitle)
      }
    }

      for (let subMenuItem of subMenuItems) {
        let menuItem
        const subMenuItemTitle = await AdminMainPageMenuElements.subMenuItemTitle(subMenuItem).textContent()
        let menuItemElement = menuStructure.Operator.find(item =>
          item.subMenu.some(subMenu => subMenu.subMenuName === subMenuItemTitle)
        );
        let menuItemTitle = menuItemElement.menuName
        let isSubMenuItemAllowed = AccountsConfig.employeeTestGroupPermissions.groups.some(group => group.permissions.includes(subMenuItemTitle))
        || AccountsConfig.guarantedAdminPages.includes(subMenuItemTitle);
        menuItem = await AdminMainPageMenuElements.mainMenuItemByName(operatorPage, menuItemTitle)
        await menuItem.click()
        await AdminMenuActions.checkItemForBlock(isSubMenuItemAllowed, subMenuItem, subMenuItemTitle)
        await menuItem.click()
      }

    })

    test("For the operator, only allowed reports are displayed and all permitted reports are present", async ({ }) => {
      await AdminMenuActions.navigateToPage(operatorPage, "Отчеты", MenuConfig.menuRegime.Operator)
      const reportListActions = new AdminReportListActions(operatorPage)
      const reportListElements = new AdminReportListElements(operatorPage)
      await reportListActions.expandCategory("Стандартные")
      
      const reportRows = await reportListElements.reportRow().all()
      const reportsOnPage: string[] = [];
      for (let reportRow of reportRows) {
        const reportName = await reportListElements.reportRowName(reportRow).textContent();
        reportsOnPage.push(reportName);
      }
    
      const reportsGroup = AccountsConfig.employeeTestGroupPermissions.groups.find(group => group.groupName === 'Разрешения на отчеты');
      let allowedReports
      if (reportsGroup) {
        allowedReports = reportsGroup.permissions;
      }
    
      for (let report of reportsOnPage) {
        expect(allowedReports, `Report "${report}" is expected`).toContain(report);
      }
    
      for (let allowedReport of allowedReports) {
        expect(reportsOnPage, `Report "${allowedReport}" is present on page`).toContain(allowedReport);
      }
    })
    
  });
  }
})







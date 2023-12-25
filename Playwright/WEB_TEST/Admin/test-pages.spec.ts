import { test, expect } from '../lib/fixtures/hook'
import PageActions from '../Common/pageActions';
import AdminTestConfig from './config/adminTestConfig';
import TestUtils from '../Common/testUtils';
import AdminMenuActions from './actions/Common/adminMenuActions';
import AdminLoginPageActions from './actions/adminLoginPageActions';
import AdminMainPageMenuElements from './elements/MainPage/adminMainPageMenuElements';
import SQL from '../Common/SQL/SQL';
import AccountsConfig from './config/accountsConfig';
import MenuConfig from './config/menuConfig';
import MainPageConfig from './config/mainPageConfig';
import MainPageActions from './actions/MainPage/mainPageActions';

for (const regime in MainPageConfig.cabinetRegime) {
test.describe.serial(`Navigating pages through the menu for the regime: ${regime}`, async () => {
  let adminPage, adminChecker;
  test.beforeAll(async ({ browser }, testInfo) => {
    await SQL.createEmployee(AdminTestConfig.ADMIN_USER, AdminTestConfig.ADMIN_PASSWORD, AccountsConfig.accountType.Admin);
    ({ page: adminPage, checker: adminChecker } = await TestUtils.setupTest(browser, AdminTestConfig.ADMIN_ADDRESS, testInfo));
    await AdminLoginPageActions.login(adminPage, AdminTestConfig.ADMIN_USER, AdminTestConfig.ADMIN_PASSWORD)
    await MainPageActions.changeCabinetRegime(adminPage, MainPageConfig.cabinetRegime.Operator)
    await MainPageActions.changeCabinetRegime(adminPage, MainPageConfig.cabinetRegime[regime])
  });
  test.afterAll(async () => {
    await TestUtils.teardownTest(adminChecker, adminPage);
  });
/**
   * @description ### Тест обхода всех страниц через меню
  Данный тест состоит из следующих шагов:
  - Переход по всем ссылкам на которые ведут элементы меню
  - Переход по всем ссылкам на которые ведут элементы подменю
  - После перехода по ссылке проверяется соответствие заголовка элемента меню и заголовка страницы
*/
test("Navigating through all the pages accessible from the main menu", async ({}) => {
  await adminPage.waitForLoadState('load');
  const mainMenuItems = await AdminMainPageMenuElements.mainMenuItem(adminPage).all()
  const subMenuItems = await AdminMainPageMenuElements.subMenuItem(adminPage).all()
  for (let menuItem of mainMenuItems) {
    const classAttribute = await menuItem.getAttribute('class');
    if (classAttribute && classAttribute.split(' ').includes('menuFolder')) {
      continue;
    }
    const menuItemTitle = await AdminMainPageMenuElements.menuItemTitle(menuItem).textContent()
    /**
     * @title Переход на страницу меню
     */
    await AdminMenuActions.navigateToPage(adminPage, menuItemTitle, MenuConfig.menuRegime[regime]);
    await PageActions.goBack(adminPage);
  }

  for (let subMenuItem of subMenuItems) {
    const subMenuItemTitle = await AdminMainPageMenuElements.subMenuItemTitle(subMenuItem).textContent()
    /**
     * @title Переход на страницу подменю
     */
    await AdminMenuActions.navigateToPage(adminPage, subMenuItemTitle, MenuConfig.menuRegime[regime]);
    await PageActions.goBack(adminPage);
  }

})
})
}

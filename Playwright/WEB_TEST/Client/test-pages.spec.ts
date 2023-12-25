import { test, expect} from '../lib/fixtures/hook';
import BrowserActions from '../Common/browserActions';
import ClientTestConfig from './config/clientTestConfig';
import SQL from '../Common/SQL/SQL';
import ClientMainPageMenuActions from './actions/mainPage/clientMainPageMenuActions';
import MainPageMenuElements from './elements/mainPage/clientMainPageMenuElements';
import TestHelpers from '../Common/modules/testHelpers';
import TestUtils from '../Common/testUtils';
import ClientLoginPageActions from './actions/clientLoginPageActions';
import PageActions from '../Common/pageActions';
import CommonClientPageActions from './actions/common/commonClientPageActions';

test.describe.serial('Обход страниц через меню', async () => {
  let clientPage, clientChecker;
  test.beforeAll(async ({ browser }, testInfo) => {
    await SQL.createCustomer(ClientTestConfig.CLIENT_NAME, ClientTestConfig.CLIENT_EMAIL, await SQL.getHashedPassword(ClientTestConfig.CLIENT_PASSWORD));
    ({ page: clientPage, checker: clientChecker } = await TestUtils.setupTest(browser, ClientTestConfig.CLIENT_ADDRESS, testInfo));
    await ClientLoginPageActions.login(clientPage, ClientTestConfig.CLIENT_EMAIL, ClientTestConfig.CLIENT_PASSWORD)
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
test("Проход по всем страницам доступным с меню сайта", async ({}) => {
  await clientPage.waitForLoadState('load');
  const mainPageMenuElements = new MainPageMenuElements(clientPage)
  const mainPageMenuActions = new ClientMainPageMenuActions(clientPage)
  const commonPageActions = new CommonClientPageActions(clientPage)
  const mainMenuItems = await mainPageMenuElements.mainMenuPageItem().all();
  for (let menuItem of mainMenuItems) {
    const menuItemTitle = await mainPageMenuElements.menuItemTitle(menuItem).textContent()
    await menuItem.click()
    await BrowserActions.waitForPageReady(clientPage)
    await commonPageActions.checkForPageTitle(menuItemTitle)
    await PageActions.goBack(clientPage)
  }
})
})
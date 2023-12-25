import { test, expect} from '../lib/fixtures/hook';
import BrowserActions from '../Common/browserActions';
import PageActions from './modules/pageActions'
import ClientTestConfig from './config/clientTestConfig';
import PageElements from './modules/pageElements';
import SQL from '../Common/SQL/SQL';
import TestUtils from '../Common/testUtils';
import ClientLoginPageActions from './actions/clientLoginPageActions';

test.describe.serial('Checking the About Program page', async () => {
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
   * @description ### Тест окна "О программе"
  Данный тест состоит из следующих шагов:
  - Открытие окна "О программе"
  - Проверка на соответствие заголовка отображаемого содержимого ожидаемому
  - Проверка отображаемого серийного номера
  - Проверка отображаемой версии дистрибутива
*/
  test("The About Program window opens and contains the expected information, including the serial number", async ({}) => {
    const aboutButton = await clientPage.getByRole('link', { name: 'О программе' });
    await aboutButton.click()
    const dialogContent = await clientPage.locator(PageElements.aboutDialogContent.locator);

    const headerText = await dialogContent.locator('h2').textContent();
    const headerPattern = /^Энергосфера \d+\.\d+$/;
    expect(headerPattern.test(headerText)).toBe(true);
    
    const dialogText = await dialogContent.textContent();
    expect(dialogText, `Серийный номер в окне совпадает с ожидаемым: ${ClientTestConfig.SERIAL_NUMBER}`).toContain(`Серийный номер: ${ClientTestConfig.SERIAL_NUMBER}`);
    const expectedDistrVesrion = await SQL.esDistrVersion();
    expect(dialogText, `Версия дистрибутива в окне совпадает с ожидаемой: ${expectedDistrVesrion}`).toContain(`Версия дистрибутива: ${expectedDistrVesrion}`);
  })

});



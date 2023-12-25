import { test, expect } from '../lib/fixtures/hook'
import AdminTestConfig from './config/adminTestConfig';
import AccountsConfig from './config/accountsConfig';
import SQL from '../Common/SQL/SQL';
import TestUtils from '../Common/testUtils';
import AdminMainPageElements from './elements/MainPage/adminMainPageElements';
import AdminLoginPageActions from './actions/adminLoginPageActions';
import MainPageActions from './actions/MainPage/mainPageActions';
import HelpDialogElements from './elements/MainPage/helpDialogElements';
import HelpDialogActions from './actions/MainPage/helpDialogActions';
import ClientMainPageMenuElements from '../Client/elements/mainPage/clientMainPageMenuElements';
import ClientTestConfig from '../Client/config/clientTestConfig';
import BrowserActions from '../Common/browserActions';
import MainPageConfig from './config/mainPageConfig';
import dbConfig from '../Common/SQL/dbConfig';


/**
   * @description ### Тест элементов упарвления на главной странице
  Данный тест состоит из следующих шагов:
  - Проверка открытия и содержимого окна "О программе"
  - Проверка открытия окна "Помощь"
  - Проверка функции "Выход"
  - Проверка перехода на страницу абонента
*/
test.describe.serial('Checking the controls on the main page', async () => {
  let adminPage, adminChecker;
  test.beforeEach(async ({ browser }, testInfo) => {
    await SQL.createEmployee(AdminTestConfig.ADMIN_USER, AdminTestConfig.ADMIN_PASSWORD, AccountsConfig.accountType.Admin);
    await SQL.createCustomer(ClientTestConfig.CLIENT_NAME, ClientTestConfig.CLIENT_EMAIL, await SQL.getHashedPassword(ClientTestConfig.CLIENT_PASSWORD));
    ({ page: adminPage, checker: adminChecker } = await TestUtils.setupTest(browser, AdminTestConfig.ADMIN_ADDRESS, testInfo));
    await AdminLoginPageActions.login(adminPage, AdminTestConfig.ADMIN_USER, AdminTestConfig.ADMIN_PASSWORD)
  });
  test.afterEach(async () => {
    await TestUtils.teardownTest(adminChecker, adminPage);
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
    await MainPageActions.clickAboutButton(adminPage)
    const aboutDialogContent = AdminMainPageElements.aboutDialogContent(adminPage)

    const headerText = await aboutDialogContent.locator('h2').textContent();
    const headerPattern = /^Энергосфера \d+\.\d+$/;
    /**
     * @title Проверка заголовка окна "О программе"
     */
    expect(headerPattern.test(headerText), "Заголовок окна 'О программе' ожижаем").toBeTruthy();
    
    const dialogText = await aboutDialogContent.textContent();
    const expectedDistrVersion = await SQL.esDistrVersion();
    /**
     * @title Проверка серийного номера
     */
    expect(dialogText, `Серийный номер ожидаем ${AdminTestConfig.SERIAL_NUMBER}`).toContain(`Серийный номер: ${AdminTestConfig.SERIAL_NUMBER}`);
    /**
     * @title Проверка версии дистрибутива
     */
    expect(dialogText, `Версия дистрибутива: ${expectedDistrVersion}`).toContain(`Версия дистрибутива: ${expectedDistrVersion}`);

  })

  /**
   * @description ### Тест окна "Помощь"
  Данный тест состоит из следующих шагов:
  - Открытие окна "Помощь"
  - Проверка что окно видимо пользователю
*/
  test("The Help window opens", async ({}) => {
    await MainPageActions.clickHelpButton(adminPage)
    const helpDialogElements = new HelpDialogElements(adminPage);
    const helpDialogActions = new HelpDialogActions(adminPage);
    const helpDialog = helpDialogElements.helpDialog()

    expect(await helpDialog.isVisible(), "Окно 'Помощь' открывается и видимо пользователю").toBeTruthy();

    await helpDialogActions.closeDialog(helpDialog)

  })

    /**
   * @description ### Тест функции "Выход"
  Данный тест состоит из следующих шагов:
  - Нажатие кнопки "Выход"
  - Проверка что пользователь видит окно авторизации
*/
if(dbConfig.selectedDBMS == "PGSQL") {
  test("The 'Exit' button works", async ({}) => {
    await MainPageActions.clickLogoutButton(adminPage)
    const logonForm = adminPage.locator('.logon-form')
    await logonForm.waitFor({ state: 'visible' })
    expect(await logonForm.isVisible(), "Нажатие на 'Выход' перенаправляет к форме авторизации").toBeTruthy();

  })
}

      /**
   * @description ### Тест функции перехода на кабинет абонента
  Данный тест состоит из следующих шагов:
  - Ввод данных абонента(email)
  - Выбор подходящего варианта в меню
  - Проверка что переход осуществился(проверка заголовка страницы абонента)
*/
  test("The transition to the subscriber's cabinet works", async ({}) => {
    await MainPageActions.switchToClientPage(adminPage, ClientTestConfig.CLIENT_EMAIL)
    const clientMainPageMenuElements = new ClientMainPageMenuElements(adminPage)
    const cabinetTitle = clientMainPageMenuElements.cabinetTitle()
    await cabinetTitle.waitFor({ state: 'visible' })
    const textContent = await cabinetTitle.textContent();
    expect(textContent && textContent.trim(), `Current cabinet title is ${textContent.trim()}`).toBe("Кабинет абонента");

  })

        /**
   * @description ### Тест функции смены режима кабинета
  Данный тест состоит из следующих шагов:
  - Переключаем режим на Администратор
  - Проверяем что заголовок страницы- Администратор
  - Переключаем режим на Оператор
  - Проверяем что заголовок страницы- Оператор
*/
test("Changing the cabinet mode", async ({}) => {
  await MainPageActions.changeCabinetRegime(adminPage, MainPageConfig.cabinetRegime.Operator)
  const headerElement = AdminMainPageElements.adminHeaderTitle(adminPage)
  let headerText = await headerElement.textContent();
  expect(headerText, `Смена режима на 'Оператор' проходит успешно`).toBe('Оператор');
  await MainPageActions.changeCabinetRegime(adminPage, MainPageConfig.cabinetRegime.Admin)
  headerText = await headerElement.textContent();
  expect(headerText, `Смена режима на 'Администратор' проходит успешно`).toBe('Администратор');
})

});



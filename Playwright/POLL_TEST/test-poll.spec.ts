import { test, expect, Locator } from '@playwright/test';
import commentsDict from './modules/commentsDict';
import TestConfig from './config/testConfig';
import TestFunctions from './modules/testFunctions'
import PageActions from './modules/pageActions'
import PageElements from './modules/pageElements'
import BrowserActions from './modules/browserActions';
import CommonTestSteps from './modules/commonTestSteps'


test.describe.serial('windows test', async () => {
  let page;
  let wsLogStream;
  let wsLogPath;
  test.beforeAll(async ({ browser }, testInfo) => {
    const setupResult = await CommonTestSteps.setupTest(browser, testInfo, `ws_windows.txt`);
    page = setupResult.page;
    wsLogStream = setupResult.wsLogStream;
    wsLogPath = setupResult.wsLogPath;
  });

  test.afterAll(async ({} ) => {
    await CommonTestSteps.teardownTest(page, wsLogStream)
  });

  test.beforeEach(async ({ }) => {
    await CommonTestSteps.beforeEachTest(wsLogPath)
  });

  test.afterEach(async ({ }, testInfo) => {
    await CommonTestSteps.afterEachTest(testInfo, wsLogPath)
  });

/**
   * @description ### Все окна по умолчанию видимы
*/
  test('all windows seen by default', async ({}) => {
    await page.waitForSelector(PageElements.areaProtocol.locator);
    await page.waitForSelector(PageElements.areaStatistic.locator);
    await page.waitForSelector(PageElements.areaStatus.locator);
    expect(await TestFunctions.isVisible(page, PageElements.areaProtocol.locator)).toBeTruthy();
    expect(await TestFunctions.isVisible(page, PageElements.areaStatistic.locator)).toBeTruthy();
    expect(await TestFunctions.isVisible(page, PageElements.areaStatus.locator)).toBeTruthy();  
  })

/**
   * @description ### После деактивации в меню 'Окна', окна исчезают из видимости
*/
  test("windows disappearing after deactivation", async ({}) => {
    await PageActions.changeWindowVisability(page, PageElements.areaProtocol.alias);
    await PageActions.changeWindowVisability(page, PageElements.areaStatus.alias);
    await PageActions.changeWindowVisability(page, PageElements.areaStatistic.alias);
    expect(await TestFunctions.isVisible(page, PageElements.areaProtocol.locator)).toBeFalsy(); 
    expect(await TestFunctions.isVisible(page, PageElements.areaStatistic.locator)).toBeFalsy();
    expect(await TestFunctions.isVisible(page, PageElements.areaStatus.locator)).toBeFalsy();   
  })

/**
   * @description ### После активации в меню 'Окна', окно становится видимым
*/
  test("windows appearing after activation", async ({}) => {
    await PageActions.changeWindowVisability(page, PageElements.areaProtocol.alias);
    expect(await TestFunctions.isVisible(page, PageElements.areaProtocol.locator)).toBeTruthy();  
  })
});

test.describe.serial('devices', async () => {
  let page;
  let pollStatus: any[]
  let wsLogStream;
  let wsLogPath;
  test.beforeAll(async ({ browser }, testInfo) => {
    const setupResult = await CommonTestSteps.setupTest(browser, testInfo, `ws_devices.txt`);
    page = setupResult.page;
    wsLogStream = setupResult.wsLogStream;
    wsLogPath = setupResult.wsLogPath;
  });

  test.afterAll(async ({} ) => {
    await CommonTestSteps.teardownTest(page, wsLogStream)
  });

  test.beforeEach(async ({ }) => {
    await CommonTestSteps.beforeEachTest(wsLogPath)
  });

  test.afterEach(async ({ }, testInfo) => {
    await CommonTestSteps.afterEachTest(testInfo, wsLogPath)
  });

/**
   * @description ### В окне 'устройства' присутствуют устройства и показан корректный статус
*/
  test("device window includes devices with correct status", async () => {
    for (const elementName of TestConfig.ELEMENT_NAMES) {
      const areaDevices = await page.locator(PageElements.areaDevices.locator);
      const deviceLine = await areaDevices.locator(PageElements.tableRow).filter({ hasText: elementName });
      await expect(deviceLine).toBeVisible();
      const deviceStatus = await deviceLine.locator(PageElements.deviceStatus);
      const locator = await page.getByText(elementName);
      await TestFunctions.clickButton(page, locator);
      const locatorAttributeValue = await deviceStatus.getAttribute('fill');
      expect(locatorAttributeValue).toEqual(TestConfig.CORRECT_STATUS_COLOR);
      pollStatus = await deviceLine.locator(PageElements.pollStatus).all()
    }
  })
/**
   * @description ### Устройства имеют корректный статус опроса
*/
  test("devices have correct poll status", async () => {
    for (const element of pollStatus.slice(1)) {
      const locatorAttributeValue = await element.getAttribute('fill');
      expect(locatorAttributeValue).toEqual(TestConfig.CORRECT_POLL_COLOR);
    }
  })
})

// PSO_TEST, PSO-3538
// test.describe.serial('protocol', async () => {
  // let page;
  // let wsLogStream;
  // let wsLogPath;
  // test.beforeAll(async ({ browser }, testInfo) => {
    // const setupResult = await CommonTestSteps.setupTest(browser, testInfo, `ws_protocols.txt`);
    // page = setupResult.page;
    // wsLogStream = setupResult.wsLogStream;
    // wsLogPath = setupResult.wsLogPath;
  // });

  // test.afterAll(async ({ }) => {
    // await CommonTestSteps.teardownTest(page, wsLogStream)
  // });

  // test.beforeEach(async ({ }) => {
    // await CommonTestSteps.beforeEachTest(wsLogPath)
  // });

  // test.afterEach(async ({ }, testInfo) => {
    // await CommonTestSteps.afterEachTest(testInfo, wsLogPath)
  // });

// /**
//   * @description ### Проверка на соответствие событий протокола и БД
// */
 // test("visible protocol events matches DB", async () => {
    // const areaDevices = await page.locator(PageElements.areaDevices.locator);
    // const areaProtocol = await page.locator(PageElements.areaProtocol.locator);
    // for (const elementName of TestConfig.ELEMENT_NAMES) {
      // const locator = await areaDevices.getByText(`${elementName}`);
      // TestFunctions.clickButton(page, locator)
      // const dbEvents = commentsDict[elementName];
      // await page.waitForSelector(`text=${PageElements.areaProtocol.alias} ${elementName}`);
      // const eventLines = await areaProtocol.locator(PageElements.tableRow).all();
      // for (const line of eventLines) {
        // const eventElements = await line.locator(PageElements.tableRowCell).all();
        // const correctEvent = await TestFunctions.checkEventMatch(eventElements, dbEvents, TestConfig.TOLLERATED_EVENTS)
        // expect(correctEvent).toBeTruthy();
      // }
    // }
  // })
// });

test.describe.serial('status', async () => {
  let page;
  let tooltipNumericValue;
  let wsLogStream;
  let wsLogPath;
  test.beforeAll(async ({ browser }, testInfo) => {
    const setupResult = await CommonTestSteps.setupTest(browser, testInfo, `ws_status.txt`);
    page = setupResult.page;
    wsLogStream = setupResult.wsLogStream;
    wsLogPath = setupResult.wsLogPath;
  });

  test.afterAll(async ({} ) => {
    await CommonTestSteps.teardownTest(page, wsLogStream)
  });

  test.beforeEach(async ({ }) => {
    await CommonTestSteps.beforeEachTest(wsLogPath)
  });

  test.afterEach(async ({ }, testInfo) => {
    await CommonTestSteps.afterEachTest(testInfo, wsLogPath)
  });

/**
   * @description ### Проверка что дата последнего показания прибора не слишком устарела
*/
  test("indication date in poll status is not outdated", async () => {
    const areaStatus = await page.locator(PageElements.areaStatus.locator);
    const areaDevices = await page.locator(PageElements.areaDevices.locator);
    const buttonLocator = areaDevices.locator(PageElements.searchField.locator).getByRole('button');
    await TestFunctions.clickButton(page, buttonLocator);
    await areaDevices.getByPlaceholder(PageElements.searchField.placeholder).fill(TestConfig.ELEMENT_NAMES[0]);
    await areaDevices.locator(PageElements.tableRow).first().click();
    const currentDateTime = await page.$eval('.toolbar-time', (el) => {
      if (el && el.innerHTML) {
        return el.innerHTML.split('<br>').join(' ').trim();
      }
      return null;
    });
    const indicationRow = areaStatus.locator('pso-datatable-body-row:has(span:text-is("Показания"))')
    const lastIndicationDate = await indicationRow.locator('pso-datatable-body-cell:nth-child(2) >> span').textContent()
    const date1 = TestFunctions.parseCustomDateTime(currentDateTime);
    const date2 = TestFunctions.parseCustomDateTime(lastIndicationDate);
    
    const timeDifference = Math.abs(date1.getTime() - date2.getTime());
    expect(timeDifference).toBeLessThan(TestConfig.maxIndicationDelay)

  })

});

test.describe.serial('statistic', async () => {
  let page;
  let columnElements
  let wsLogStream;
  let wsLogPath;
  test.beforeAll(async ({ browser }, testInfo) => {
    const setupResult = await CommonTestSteps.setupTest(browser, testInfo, `ws_statistic.txt`);
    page = setupResult.page;
    wsLogStream = setupResult.wsLogStream;
    wsLogPath = setupResult.wsLogPath;
  });

  test.afterAll(async ({} ) => {
    await CommonTestSteps.teardownTest(page, wsLogStream)
  });

  test.beforeEach(async ({ }) => {
    await CommonTestSteps.beforeEachTest(wsLogPath)
  });

  test.afterEach(async ({ }, testInfo) => {
    await CommonTestSteps.afterEachTest(testInfo, wsLogPath)
  });
/**
   * @description ### Выбор параметра для отображения в статистике
*/
  test("parameter to be shown in statistic can be chosen", async () => {
    const areaProtocolElement = await page.locator(PageElements.areaProtocol.locator);
    await page.locator(PageElements.statisticDropdownMenu).click()
    const dropDownMenuLocator = page.getByText('Среднее время записи информации в SQL-базу, мс')
    await TestFunctions.clickButton(page, dropDownMenuLocator);
    columnElements = await areaProtocolElement.locator(PageElements.column).all();
  })


/**
   * @description ### Проверка значения столбцов гистограммы
*/
  test("check of column values", async () => {
    for (const columnElement of columnElements) {
      const heightStyle = await columnElement.getAttribute('style');
      const heightValue = TestFunctions.getHeightValueFromStyle(heightStyle);
      if (heightValue > 0) {
        await columnElement.click();
        const tooltipElement = await page.locator(PageElements.tooltip);
        const tooltipText = await tooltipElement.textContent();
        const numericValue = TestFunctions.getNumericValueFromText(tooltipText);
        expect(numericValue).toBeGreaterThan(0)
      }
    }
  })
});



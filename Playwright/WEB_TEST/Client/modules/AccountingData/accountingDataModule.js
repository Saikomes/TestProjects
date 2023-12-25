import AccountingDataActions from "../../actions/AccountingData/accountingDataActions";
import AccountingDataElements from "../../elements/AccountingData/accountingDataElements";
import AccountingDataConfig from "../../config/accountingDataConfig";
import DateHelper from "../../../Common/modules/dateHelper";
import ClientTestConfig from "../../config/clientTestConfig";
import BrowserActions from "../../../Common/browserActions";
import PointParamsPanelActions from "../../actions/common/DataPanels/pointParamsPanelActions";
import TypeDataToolbarActions from "../../actions/common/DataPanels/typeDataToolbarActions";
import SQL from "../../../Common/SQL/SQL";
import { expect } from "@playwright/test";

export class AccountingDataModule {

  constructor(page) {
    this.page = page
    this.accountingDataActions = new AccountingDataActions(page)
    this.accountingDataElements = new AccountingDataElements(page)
  }

  async selectDevicesAndParams(testCase) {
    if(testCase.detalisationParams) {
      expect(testCase.devices.length, "В режиме детализации в конфигурации прописана одна точка учета").toEqual(1)
      await this.accountingDataActions.typeDataToolbarActions.selectDetalisationRegime()
      await this.accountingDataActions.pointsTreePanelActions.pointsTreeTableActions.selectNode(testCase.devices[0].deviceID, true)
      await this.accountingDataActions.pointParamsPanelActions.applyParams(testCase.columns)
    }
    else {
      // await this.accountingDataActions.typeDataToolbarActions.selectAccountingPointRegime()
      for (let device of testCase.devices) {
        await this.accountingDataActions.pointsTreePanelActions.pointsTreeTableActions.selectNode(device.deviceID)
      }
    }
    await BrowserActions.waitForPageReady(this.page)
  }

  async applyTestCaseParams(testCase) {
    await this.accountingDataActions.controlPanelActions.applySettings(testCase.controlPanel)
    await this.accountingDataActions.controlPanelActions.openSettingsDialog()
    const settingsDialog = this.accountingDataElements.resultSettingsDialogElements.resultSettingsDialog()
    await this.accountingDataActions.resultSettingsDialogActions.applySettings(testCase.settings, settingsDialog)
    await this.accountingDataActions.resultSettingsDialogActions.chooseDialogOption(settingsDialog, "Применить")
    await this.accountingDataActions.pointsTreePanelActions.selectEnergoresourse(testCase.energoResourse.Id)
    await this.accountingDataActions.pointsTreePanelActions.selectPointLevel(testCase.pointLevel.value)
    await this.selectDevicesAndParams(testCase)
    await this.accountingDataActions.readingsTypePanelActions.selectReadingsType(testCase.dataKind.name)
    await BrowserActions.waitForPageReady(this.page)
  }
  
  async GetAdditionalParams(testCase) {
    let options = [];

    if (testCase.settings.sum.value) {
      options.push({ dbOptionIdentifier: "Суммирование", uiIdentifier: "" });
    }

    if (testCase.settings.sumLoss.value) {
      options.push({ dbOptionIdentifier: "Безучетное потребление", uiIdentifier: "БУП" });
    }

    if (testCase.settings.sumWithUncounted.value) {
      options.push({ dbOptionIdentifier: "С учетом безучетного потребления", uiIdentifier: "с учетом БУП" });
    }

    if (testCase.settings.sumWithLossAndUncounted.value) {
      options.push({ dbOptionIdentifier: "С учетом потерь и безучетного потребления", uiIdentifier: "с учетом потерь БУП" });
    }
    return options;
  }

  async extractColumnsById(readings, id) {
    let targetReadings;
    const dbColumn = [];
    const uiColumn = [];
    for (const key in readings) {
        if (readings[key].resourseId === id) {
            targetReadings = readings[key].readings;
            break;
        }
    }
    for (const key in targetReadings) {
        dbColumn.push(targetReadings[key].dbColumn);
        uiColumn.push(targetReadings[key].uiColumn);
    }

    return { dbColumn, uiColumn };
}

  async GetDbData(testCase) {
    const pointIds = []
    const options = []
    for (let device of testCase.devices) {
      pointIds.push(device.deviceID)
    }
    if (testCase.settings.sumWithUncounted.value) {
      options.push('CalcUnaccounted')
    }
    if (testCase.settings.sumWithLoss.value) {
      options.push('CalcLoss')
    }
    if (testCase.settings.calcS.value) {
      options.push('CalcS')
    }
    const rootPointIDs = `${testCase.pointLevel.value};` + pointIds.join(',') + `;${testCase.energoResourse.Id}`;
    const dbOptions = options.join(',');
    const paramTypes = Object.values(AccountingDataConfig.energoResourseParamTypes).find((energoResourseParamType) => energoResourseParamType.Id === testCase.energoResourse.Id).ParamTypes
    const table = await SQL.getAccountingDataIndications({
      SecurityToken: await SQL.getUserAccountId(ClientTestConfig.CLIENT_EMAIL),
      RootPointIDs: rootPointIDs,
      DataKind: testCase.dataKind.value,
      StartDT: testCase.controlPanel.beginDate.value,
      EndDT: testCase.controlPanel.endDate.value,
      PeriodType: testCase.controlPanel.periodType.value,
      ID_TimeSchema: null,
      SumPoints: testCase.controlPanel.sum.value,
      RateCount: testCase.controlPanel.tariff.value,
      UseMeaCoeffs: testCase.controlPanel.coef.value,
      ParamTypes: paramTypes,
      RestrictType: '1',
      GetTotalsOnly: '0',
      Options: dbOptions

    })
    return table
  }

  async VerifyPointDataMatchesDB(testCase, dbTable, deviceID, rateNumber) {
    let timeDiff;
    let expectedDiff;
    const firstReadings = await this.accountingDataActions.readingsTableActions.extractAllVisibleReadings(testCase.columns)
    const [firstDateReading, secondDateReading] = firstReadings.slice(0, 2);
    if (firstDateReading.date instanceof Date && secondDateReading.date instanceof Date) {
      timeDiff = Number(secondDateReading.date) - Number(firstDateReading.date);
      expectedDiff = DateHelper.getExpectedDifference(testCase.controlPanel.periodType.value, testCase.controlPanel.beginDate.value)
    }
    //Прокручиваем таблицу до конца
    await this.accountingDataActions.readingsTableActions.scrollToEnd(this.accountingDataElements.readingsTableElements.readingsTableViewport())
    //Получаем данные конца периода
    const lastReadings = await this.accountingDataActions.readingsTableActions.extractAllVisibleReadings(testCase.columns)
    const lastDateReading = lastReadings[lastReadings.length - 1]
    //Убеждаемся что данные начала и конца совпадают с данными БД
    await this.accountingDataActions.readingsTableActions.ensureDataMatchesDB(dbTable, deviceID, rateNumber, lastDateReading, testCase.columns)
    await this.accountingDataActions.readingsTableActions.ensureDataMatchesDB(dbTable, deviceID, rateNumber, firstDateReading, testCase.columns)
    expect(firstDateReading.date, `Дата первого события в таблице ожидаема для ${deviceID}`).toEqual(DateHelper.formatStringToDate(testCase.controlPanel.beginDate.value, 'dd.mm.yyyy'))
    expect(lastDateReading.date, `Дата последнего события в таблице ожидаема для ${deviceID}`).toEqual(DateHelper.formatStringToDate(testCase.controlPanel.endDate.value, 'dd.mm.yyyy'))
    expect(timeDiff, `Период отображаемых событий ожидаем: ${testCase.controlPanel.periodType.name}`).toEqual(expectedDiff)
  }

  async VerifyOverallMatchesDB(testCase, dbTable, deviceID, overallRow, additionalParam) {
    const overallReadings = await this.accountingDataActions.readingsTableActions.extractReadingsFromRow(overallRow, testCase.columns)
    await this.accountingDataActions.readingsTableActions.ensureDataMatchesDB(dbTable, deviceID, null, overallReadings, testCase.columns, additionalParam)
  }

}

export default AccountingDataModule;
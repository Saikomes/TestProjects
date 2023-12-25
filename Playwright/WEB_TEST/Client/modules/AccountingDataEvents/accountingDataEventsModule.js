import AccountingDataEventsActions from "../../actions/AccountingDataEvents/accountingDataEventsActions";
import AccountingDataEventsElements from "../../elements/AccountingDataEvents/accountingDataEventsElements";
import AccountingDataEventsConfig from "../../config/accountingDataEventsConfig";
import AccountingDataConfig from "../../config/accountingDataConfig";
import DateHelper from "../../../Common/modules/dateHelper";
import ClientTestConfig from "../../config/clientTestConfig";
import BrowserActions from "../../../Common/browserActions";
import PointParamsPanelActions from "../../actions/common/DataPanels/pointParamsPanelActions";
import TypeDataToolbarActions from "../../actions/common/DataPanels/typeDataToolbarActions";
import SQL from "../../../Common/SQL/SQL";
import { expect } from "@playwright/test";

export class AccountingDataEventsModule {

  constructor(page) {
    this.page = page
    this.accountingDataEventsActions = new AccountingDataEventsActions(page)
    this.accountingDataEventsElements = new AccountingDataEventsElements(page)
  }

  async selectDevices(testCase) {
    await this.accountingDataEventsActions.angPointsTreePanelActions.angPointsTreeTableActions.unselectAllNodes()
    for (let device of testCase.devices) {
        await this.accountingDataEventsActions.angPointsTreePanelActions.angPointsTreeTableActions.findAndSelectNode(device.deviceID, true)
        await BrowserActions.waitForPageReady(this.page)
      }
  }

  async applyTestCaseParams(testCase) {
    await this.accountingDataEventsActions.angPointsTreePanelActions.selectEnergoresourse(testCase.energoResourse.Id)
    await this.selectDevices(testCase)
    await this.accountingDataEventsActions.controlPanelActions.applySettings(testCase.controlPanel)
    await this.accountingDataEventsActions.controlPanelActions.openFilterDialog()
    const filterDialog = this.accountingDataEventsElements.filterByCategoryDialogElements.filterByCategoryDialog()
    await this.accountingDataEventsActions.filterByCategoryDialogActions.deselectAllEvents()
    for (const filterOption in testCase.filterOptions) {
        await this.accountingDataEventsActions.filterByCategoryDialogActions.filterDialogTableActions.findAndSelectNode(testCase.filterOptions[filterOption].Name, false)
    }
    await this.accountingDataEventsActions.filterByCategoryDialogActions.closeDialog(filterDialog)
    await BrowserActions.waitForPageReady(this.page)
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
    const eventCategories = []
    const importances = []
    for (let device of testCase.devices) {
      pointIds.push(device.deviceID)
    }
    for (let eventCategory of testCase.eventCategories) {
      eventCategories.push(eventCategory.categoryID)
    }
    for (let importanceLevel of testCase.importances) {
      importances.push(importanceLevel.id)
    }
    const rootPointIDs = `${testCase.pointLevel.value};` + pointIds.join(',') + `;${testCase.energoResourse.Id}`;
    const eventIds = eventCategories.join(',');
    const importanceIds = importances.join(',');
    const table = await SQL.getAccountingDataEvents({
      SecurityToken: await SQL.getUserAccountId(ClientTestConfig.CLIENT_EMAIL),
      RootPointIDs: rootPointIDs,
      EventCategories: eventIds,
      LinkedParams: null,
      Importances: importanceIds,
      StartDT: testCase.controlPanel.beginDate.value,
      EndDT: testCase.controlPanel.endDate.value,
      JoinPairEvents: testCase.controlPanel.groupBy.value,
      ID_TimeSchema: null,
      MaxCount: '5000',
      GetPointName: '1'
    })
    return table
  }

  async VerifyPointDataMatchesDB(testCase, dbTable) {
    await this.accountingDataEventsActions.eventsTableActions.sortColumn("Время-от", "descending")
    const firstReadings = await this.accountingDataEventsActions.eventsTableActions.extractAllVisibleReadings(testCase.columns)
    for(let reading of firstReadings) {
      await this.accountingDataEventsActions.eventsTableActions.ensureDataMatchesDB(dbTable, reading)
    }
    //Прокручиваем таблицу до конца
    await this.accountingDataEventsActions.eventsTableActions.scrollToEnd(this.accountingDataEventsElements.eventsTableElements.readingsTableViewport())
    //Получаем данные конца периода
    const lastReadings = await this.accountingDataEventsActions.eventsTableActions.extractAllVisibleReadings(testCase.columns)
    for(let reading in lastReadings) {
      await this.accountingDataEventsActions.eventsTableActions.ensureDataMatchesDB(dbTable, reading)
    }
  }

}

export default AccountingDataEventsModule;
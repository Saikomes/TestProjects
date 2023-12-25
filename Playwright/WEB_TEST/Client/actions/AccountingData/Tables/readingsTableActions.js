import ReadingsTableElements from "../../../elements/AccountingData/Tables/readingsTableElements";
import TableHelper from "../../../../Common/modules/tableHelper";
import DateHelper from "../../../../Common/modules/dateHelper";
import moment from 'moment-timezone';
import { expect } from "@playwright/test";
import dbConfig from "../../../../Common/SQL/dbConfig";

export class ReadingsTableActions extends TableHelper {

  constructor(page, parentLocator = null) {
    super(page)
    this.readingsTableElements = new ReadingsTableElements(page, parentLocator);
  }

  async findAndExpandRoot(rootRegex) {
    const rootElement = await this.readingsTableElements.expandableRow(rootRegex)
    await this.scrollUntil(this.readingsTableElements.readingsTableViewport(), rootElement)
    const slickToggle = this.readingsTableElements.expandButton(rootElement)
    const expandClassAttribute = await slickToggle.getAttribute('class');
    const groupExpanded = expandClassAttribute.includes('slick-collapse');
    if (!groupExpanded) {
      await slickToggle.click()
    }
  }

  async findRow(rowRegex) {
    const rowElement = this.readingsTableElements.dataRowByCellValue(rowRegex)
    await this.scrollUntil(this.readingsTableElements.readingsTableViewport(), rowElement)
    return rowElement;
  }

  async expandRow(rowElement) {
    const slickToggle = this.readingsTableElements.expandButton(rowElement)
    const expandClassAttribute = await slickToggle.getAttribute('class');
    const groupExpanded = expandClassAttribute.includes('slick-collapse');
    if (!groupExpanded) {
      await slickToggle.hover()
      await slickToggle.click()
    }
  }

  async slickRow(rowElement) {
    const slickToggle = this.readingsTableElements.expandButton(rowElement)
    const expandClassAttribute = await slickToggle.getAttribute('class');
    const elementHandle = await slickToggle.elementHandle(); 
    const groupExpanded = expandClassAttribute.includes('slick-collapse');
    if (groupExpanded) {
      await elementHandle.waitForElementState('stable');
      await slickToggle.click({ force: true });
    }
  }

  async getDataRows() {
    const allRows = await this.readingsTableElements.dataRow().all()
    const dateRegexp = /\d{2}\.\d{2}\.\d{4}/;

    let dateRows = [];

    for (let i = 0; i < allRows.length; i++) {
      const row = allRows[i];
      if (await row.isVisible()) {
        const cellText = await row.textContent();
        if (dateRegexp.test(cellText)) {
          dateRows.push(row);
        }
      }
    }
    return dateRows
  }

  async extractDateFromRow(dataRow) {
    const rowText = await dataRow.textContent()
    const dateText = rowText.match(/\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}/)[0]
    const date = DateHelper.formatStringToFullDate(dateText, 'dd.mm.yyyy hh:mm')
    return date;
  }

  async findColumnIndex(searchText) {
    const columnHeader = this.readingsTableElements.columnHeaderName()
    if (!columnHeader) {
        console.error('columnHeaderName() возвращает undefined');
        return -1;
    }

    const elements = await columnHeader.all();
    if (!elements) {
        console.error('columnHeader.all() возвращает undefined');
        return -1;
    }
    // Находим индекс колонки по переданному тексту
    let foundIndex = -1;
    for (let index = 0; index < elements.length; index++) {
        const text = await elements[index].innerText();
        if (text.includes(searchText) && foundIndex === -1) {
            foundIndex = index;
            break;
        }
    }

    return foundIndex;
}

    //readingsDescription
    //  aIncome: {uiColumn: 'aIncome', dbColumn: 'A прием', headerTitle: 'A прием'},
    //  rIncome: {uiColumn: 'rIncome', dbColumn: 'R прием', headerTitle: 'R прием'},
    //  aOutcome: {uiColumn: 'aOutcome', dbColumn: 'A отдача', headerTitle: 'A отдача'},
    //  rOutcome: {uiColumn: 'rOutcome', dbColumn: 'R отдача', headerTitle: 'R отдача'},
  async extractReadingsFromRow(dataRow, readingsDescription) { 
    const rowText = await dataRow.innerText();
    const dateMatch = rowText.match(/\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}/);
    let date = null;
    
    if (dateMatch && dateMatch[0]) {
      const dateText = dateMatch[0];
      date = DateHelper.formatStringToFullDate(dateText, 'dd.mm.yyyy hh:mm');
    }

    let readings = { date: date };
    for (const key in readingsDescription) {
      const reading = readingsDescription[key];
      const columnIndex = await this.findColumnIndex(reading.headerTitle);
      expect(columnIndex, "Найден столбец с ожидаемыми данными").not.toBe(-1)
      readings[reading.uiColumn] = await this.readingsTableElements.columnValue(dataRow, columnIndex).textContent();
    }
    return readings;
}

async extractAllVisibleReadings(readingsDescription) {
  const dataRows = await this.getDataRows();
  const readingsPromises = dataRows.map((reading) => 
    this.extractReadingsFromRow(reading, readingsDescription)
  );
  const readings = await Promise.all(readingsPromises);
  const sortedReadings = readings.sort((a, b) => new Date(a.date) - new Date(b.date));
  return sortedReadings
}


  //Проверяем что для определенного устройства в определенное время
  //Показания совпадают с показаниями таблицы из БД
  async findValueInTable(dbTable, deviceID, rateNumber, date, parameter, AdditionalParam) {
    const pointId = deviceID === null ? null : "PNT" + deviceID
    const pointDate = date === null ? null : date
    const pointRate = rateNumber === null ? null : rateNumber
    const foundItem = dbTable.find(item => {
      const foundParam = (item) => {
        if(AdditionalParam != "По умолчанию" && AdditionalParam != "Суммирование") {
           return item.ParameterName === AdditionalParam && item.LinkedParameterName === parameter;
        }
        else
        {
          return item.ParameterName === parameter;
        }
      }
      if (item.Date === null && pointDate === null) {
        return item.PointId === pointId && item.RateNumber === pointRate && foundParam(item);
      }
      if (item.Date === null || pointDate === null) {
        return false;
      }
    
      let formattedDbDate = moment.utc(item.Date).tz('Europe/Moscow')
      if (dbConfig.selectedDBMS == "MSSQL") {
        formattedDbDate = formattedDbDate.subtract(5, 'hours');
      }
      let formattedAppDate = moment(pointDate).tz('Europe/Moscow')
      return item.PointId === pointId && item.RateNumber === pointRate && formattedDbDate.isSame(formattedAppDate, 'second') && foundParam(item)
    });
  
    return foundItem ? foundItem.Value : null;
  }

  async ensureDataMatchesDB(dbReadingsTable, deviceID, rateNumber, readings, columns, AdditionalParam = "По умолчанию") {
    // const filteredReadings = Object.keys(columns)
    // .filter(key => readings.hasOwnProperty(columns[key].uiColumn))
    // .reduce((obj, key) => {
    //     obj[key] = columns[key];
    //     return obj;
    // }, {});

    for (const key in columns) {
      const dbValue = await this.findValueInTable(dbReadingsTable, deviceID, rateNumber, readings.date, columns[key].dbColumn, AdditionalParam);
      expect(dbValue.toFixed(2), `Показания для ${deviceID} на ${readings.date} совпадают с БД`).toEqual(Number(readings[key].replace(/\s/g, '').replace(',', '.')).toFixed(2));
    }

  }

  async slickAllRows(skipFirst) {
    await this.scrollToStart(this.readingsTableElements.readingsTableViewport())
    await this.scrollAndAct(this.readingsTableElements.readingsTableViewport(),
        '.slick-row:has(.slick-toggle.slick-collapse)', this.slickRow.bind(this),{skipFirst: skipFirst}
        )
    await this.scrollToStart(this.readingsTableElements.readingsTableViewport())
  }


}

export default ReadingsTableActions
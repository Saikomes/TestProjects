import EventsTableElements from "../../../elements/AccountingDataEvents/Tables/eventsTableElements"
import BrowserActions from "../../../../Common/browserActions";
import moment from "moment-timezone";
import TableHelper from "../../../../Common/modules/tableHelper";
import { expect } from "@playwright/test";

class EventsTableActions extends TableHelper{

    constructor(page) {
        super(page)
        this.eventsTableElements = new EventsTableElements(page)
    }

    async sortColumn(headerLabel, direction) {
        const columnHeader = this.eventsTableElements.sortableHeader(headerLabel)
        if (direction == "descending") {
            while (await columnHeader.getAttribute("aria-sort") != "descending") {
                await columnHeader.locator('i').click()
                await BrowserActions.waitForPageReady(this.page)
            }
        }
        else if (direction == "ascending") {
            while (await columnHeader.getAttribute("aria-sort") != "ascending") {
                await columnHeader.locator('i').click()
                await BrowserActions.waitForPageReady(this.page)
            }
        }
    }

    async extractImportance() {

    }

    //readingsDescription
    // importance: {uiColumn: 'Важность', dbColumn: 'Importance', index: '0'},
    // pointName: {uiColumn: 'Название ТУ', dbColumn: 'PointName', index: '1'},
    // eventDescr: {uiColumn: 'Событие', dbColumn: 'EventDescr', index: '2'},
    // duration: {uiColumn: 'Длительность', dbColumn: 'Duration', index: '5'},
    async extractReadingsFromRow(dataRow, readingsDescription) {
        let readings = {};
        for (const key in readingsDescription) {
            const reading = readingsDescription[key];
            const columnIndex = reading.index
            const columnValue = await this.eventsTableElements.columnValue(dataRow, columnIndex);
            readings[key] = await columnValue.getAttribute("title")
            expect(readings[reading.uiColumn], "Данные из таблицы событий извлечены").not.toBe(null)
        }
        return readings;
    }



    async getDataRows() {
        const allRows = await this.eventsTableElements.tableRow().all()
        return allRows
      }

    async extractAllVisibleReadings(readingsDescription) {
        const dataRows = await this.getDataRows();
        const readingsPromises = dataRows.map((reading) =>
            this.extractReadingsFromRow(reading, readingsDescription)
        );
        const readings = await Promise.all(readingsPromises);
        const sortedReadings = readings.sort((a, b) => new Date(a.DTOnMs) - new Date(b.DTOnMs));
        return sortedReadings
    }

      //Проверяем что для определенного устройства в определенное время
  //Показания совпадают с показаниями таблицы из БД
  async findValueInTable(dbTable, readings) {
    const startDate = moment.utc(readings.startDate, 'DD.MM.YYYY HH:mm:ss:SSS').tz('Europe/Moscow'); //преобразуем дату из UI
    const pointName = readings.pointName
    const eventDescr = readings.eventDescr
    const foundItem = dbTable.find(item => {
    const lowerCaseItem = Object.keys(item).reduce((newItem, key) => {
        newItem[key.toLowerCase()] = item[key];
        return newItem;
    }, {});

      const foundParam = (item) => {
        return lowerCaseItem.pointname === pointName && item.eventdescr === eventDescr
      }

      const formattedDbDate = (ms) => {
        const baseDate = new Date('2000-01-01T00:00:00Z'); // Базовая дата в UTC
        const date = new Date(baseDate.getTime() + Number(ms)); // Добавляем миллисекунды
        console.log(moment(date).tz('Europe/Moscow'))
        return moment(date).tz('Europe/Moscow'); // Преобразуем в Moment с учётом часового пояса 'Europe/Moscow'
    };
      return formattedDbDate(lowerCaseItem.dtonms).isSame(startDate, 'second') && foundParam(lowerCaseItem)
    });
    expect(foundItem).not.toBeNull()
  }

    async ensureDataMatchesDB(dbReadingsTable, readings) {
        // const filteredReadings = Object.keys(columns)
        // .filter(key => readings.hasOwnProperty(columns[key].uiColumn))
        // .reduce((obj, key) => {
        //     obj[key] = columns[key];
        //     return obj;
        // }, {});
        await this.findValueInTable(dbReadingsTable, readings);
    
    
      }

}
export default EventsTableActions
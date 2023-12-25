import AccountingDataEventsLocators from "../../../locators/AccountingDataEvents/accountingDataEventsLocators";
import TestHelpers from "../../../../Common/modules/testHelpers";


class EventsTableLocators {

    constructor(page) {
        this.page = page;
    }

    eventsTable() {
        return this.page.locator(AccountingDataEventsLocators.eventsTableLocators.eventsTable.locator)
    }

    readingsTableViewport() {
        return TestHelpers.getLinkedLocator(this.eventsTable(), AccountingDataEventsLocators.eventsTableLocators.readingsTableViewport.locator)
    }

    tableRow() {
        return TestHelpers.getLinkedLocator(this.eventsTable(), AccountingDataEventsLocators.eventsTableLocators.tableRow.locator)
    }

    sortableHeader(headerLabel) {
        return TestHelpers.getLinkedLocator(this.eventsTable(), AccountingDataEventsLocators.eventsTableLocators.sortableHeader.locator(headerLabel))
    }


    async columnValue(row, columnIndex) {
        return await TestHelpers.getLinkedLocator(row, AccountingDataEventsLocators.eventsTableLocators.rowColumn.locator).nth(columnIndex)
    }

}
export default EventsTableLocators
import AccountingDataLocators from "../../../locators/AccountingData/accountingDataLocators";
import TestHelpers from "../../../../Common/modules/testHelpers";
import { expect } from "@playwright/test"

export class ReadingsTableElements {

    constructor(page, parentLocator = null) { 
        this.page = page;
        this.parentLocator = parentLocator ? page.locator(parentLocator) : page;
    }

    readingsTable() {
        return this.parentLocator.locator(AccountingDataLocators.readingsTableLocators.readingsTable.locator)
    }

    readingsTableViewport() {
        return TestHelpers.getLinkedLocator(this.readingsTable(), AccountingDataLocators.readingsTableLocators.readingsTableViewport.locator)
    }

    dataRow() {
        return TestHelpers.getLinkedLocator(this.readingsTable(), AccountingDataLocators.readingsTableLocators.dataRow.locator)
    }

    dataRowByCellValue(cellValue) {
        return TestHelpers.getLinkedLocator(this.readingsTable(), AccountingDataLocators.readingsTableLocators.dataRowByCellValue.locator(cellValue))
    }

    expandButton(dataRow) {
        return dataRow.locator(AccountingDataLocators.readingsTableLocators.expandButton.locator)
    }

    columnHeader() {
        TestHelpers.getLinkedLocator(this.readingsTable(), AccountingDataLocators.readingsTableLocators.columnHeader.locator)
    }

    columnHeaderName() {
        return TestHelpers.getLinkedLocator(this.readingsTable(), AccountingDataLocators.readingsTableLocators.columnHeaderName.locator)
    }

    async expandableRow(regex) {
        const dataRows = await this.dataRowByCellValue(regex).all()
        const filteredRows = await Promise.all(dataRows.map(async (element) => {
            const count = await element.locator('.slick-collapse, .slick-expand').count();
            return count > 0 ? element : null;
        }));
        const expandableRow = filteredRows.filter(row => row !== null)
        expect(expandableRow.length, "Найден корень показаний точки").toBe(1)
        return expandableRow[0]
    }

    // async expandableRow() {
    //     const rows = await TestHelpers.getLinkedLocator(this.readingsTable(), AccountingDataLocators.readingsTableLocators.dataRow.locator).all();
        
    //     const filteredRows = await Promise.all(rows.map(async (element) => {
    //         const count = await element.locator('.slick-collapse, .slick-expand').count();
    //         return count === 0 ? element : null;
    //     }));
        
    //     return filteredRows.filter(row => row !== null);
    // }

    columnValue(row, index) {
        return TestHelpers.getLinkedLocator(row, AccountingDataLocators.readingsTableLocators.columnValue.locator(index))
    }

}

export default ReadingsTableElements
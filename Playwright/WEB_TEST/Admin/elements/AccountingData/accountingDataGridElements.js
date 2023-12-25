import AccountingDataLocators from "../../locators/accountingDataLocators";

export class AccountingDataGridElements {
    static getCell(page, row, column) {
        const cellLocator = AccountingDataLocators.gridLocators.cell.locator(row, column);
        return page.locator(cellLocator);
    }

    static getCheckboxInsideCell(page, row, column) {
        const cellLocator = AccountingDataLocators.gridLocators.cell.locator(row, column);
        return page.locator(`${cellLocator} >> ${AccountingDataLocators.gridLocators.checkboxInsideCell.locator}`);
    }

    static getRowSwitcher(page, row) {
        return page.locator(AccountingDataLocators.gridLocators.rowSwitcher.locator(row));
    }

    static async getTableRows(page) {
        return await page.locator(AccountingDataLocators.gridLocators.tableRow.locator).all()
    }
}

export default AccountingDataGridElements
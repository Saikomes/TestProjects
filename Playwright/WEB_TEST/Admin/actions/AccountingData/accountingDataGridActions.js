import AccountingDataGridElements from "../../elements/AccountingData/accountingDataGridElements";

export class AccountingDataGridActions {

    static async visibleRowCount(page) {
        const pointsTreeRows = await AccountingDataGridElements.getTableRows(page)
        return pointsTreeRows.length
    }

    static async waitForRows(page) {
        await page.waitForFunction(async (page) => {
            const rows = await AccountingDataGridElements.getTableRows(page);
            return rows.length > 0;
        }, page);
    }

    // static async isChecked(page, row, column) {
    //     const checkbox = AccountingDataGridElements.getCheckboxInsideCell(page, row, column);
    //     return await checkbox.isChecked();
    // }

    // static async setChecked(page, row, column, value) {
    //     const checkbox = AccountingDataGridElements.getCheckboxInsideCell(page, row, column);
    //     const isChecked = await checkbox.isChecked();
    //     if (isChecked !== value) {
    //         await checkbox.click();
    //     }
    // }

    // static async isRowExpanded(page, row) {
    //     const switcher = AccountingDataGridElements.getRowSwitcher(page, row);
    //     const classNames = await switcher.getAttribute('class');
    //     return classNames.includes('slick-expanded');
    // }

    // static async setRowState(page, row, expand) {
    //     if (await this.isRowExpanded(page, row) === expand) {
    //         return;
    //     }

    //     const switcher = AccountingDataGridElements.getRowSwitcher(page, row);
    //     await switcher.click();

    //     // Add your waiting logic here, if necessary
    // }

    // static async expandRow(page, row) {
    //     await this.setRowState(page, row, true);
    // }

    // static async collapseRow(page, row) {
    //     await this.setRowState(page, row, false);
    // }
}
export default AccountingDataGridActions

import { test, expect } from '@playwright/test';
import AccountingDataPage from '../locators/AccountingDataPage';
import BrowserActions from '../modules/browserActions';
import AccountingDataConfig from '../config/accountingDataConfig';

class PointsTreeActions {

    static async visibleRowCount(page) {
        const pointsTreeRows = await page.locator(AccountingDataPage.pointsTreeRow.locator).all()
        expect(pointsTreeRows.length).toBeGreaterThan(0)
    }

    static async getChecked(page, row, column) {
        const cell = await this.getCell(page, row, column);
        const cb = await cell.locator('input[type="checkbox"]');
        const isChecked = await cb.getAttribute('checked');
        return !!isChecked;
    }

    static async setChecked(page, row, column, value) {
        const cell = await this.getCell(page, row, column);
        const cb = await cell.locator('input[type="checkbox"]');
        const isChecked = await cb.getAttribute('checked');
        if (!!isChecked !== value) {
            await cb.click();
        }
    }

    static async getCell(page, row, column) {
        return page.locator(`#refGrid-NodesReference-pointsTree tbody tr:nth-child(${row + 1}) td:nth-child(${column + 1})`);
    }

    static async setRowState(page, row, expand) {
        if (await this.isRowExpanded(page, row) === expand) {
            return;
        }
        const switcher = await this.getSwitcher(page, row);
        await switcher.click();
        // Wait for row to expand/collapse
        await page.waitForTimeout(1000); // You might want to use a better condition to wait
    }

    static async getSwitcher(page, row) {
        const cell = await this.getCell(page, row, 0);
        return cell.locator('.slick-toggle');
    }

    static async isRowExpanded(page, row) {
        const switcher = await this.getSwitcher(page, row);
        const classAttribute = await switcher.getAttribute('class');
        return classAttribute.includes('slick-collapse');
    }

    static async expandRow(page, row) {
        return this.setRowState(page, row, true);
    }

    static async collapseRow(page, row) {
        return this.setRowState(page, row, false);
    }
}

export default PointsTreeActions

import AccountingDataLocators from "../../locators/accountingDataLocators";

export class AccountingDataBaseElements {

    static getMainPlot(page) {
        return page.locator(AccountingDataLocators.baseLocators.mainPlot.locator);
    }

    static getMainGrid(page) {
        return page.locator(AccountingDataLocators.baseLocators.mainGrid.locator);
    }

    static getChartLegend(page) {
        return page.locator(AccountingDataLocators.baseLocators.chartLegend.locator);
    }

    static getLegendEntries(page) {
        return page.locator(AccountingDataLocators.baseLocators.legendEntries.locator);
    }
}

export default AccountingDataBaseElements
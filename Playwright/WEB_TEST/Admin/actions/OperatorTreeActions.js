import { test, expect } from '@playwright/test';
import AccountingDataPage from '../locators/AccountingDataPage';
import BrowserActions from '../../Common/browserActions';
import AccountingDataConfig from '../config/accountingDataConfig';
import AccountingDataGridActions from './AccountingData/accountingDataGridActions';
import AccountingDataGridElements from '../elements/AccountingData/accountingDataGridElements';
import AccountingDataBaseElements from '../elements/AccountingData/accountingDataBaseElements';

class OperatorTreeActions {

    static async SearchNodeBy(page, customerCriteria, nodeSelectionCriteria) {
        this.ChooseCustomerCriteria(customerCriteria)
        this.ChooseNodeSelectionCriteria(page, nodeSelectionCriteria)

    }

    //Установить критерий поиска потребителей
    static async ChooseCustomerCriteria(page, criteria) {
        //Choose correct option for criteria in selectPointTypeMenu
        const menuItemText = await page.locator(`${AccountingDataPage.selectorPointsTree.locator} option[value=${criteria}]`).textContent();
        //Choose customer ctiteria in menu
        await page.locator(AccountingDataPage.selectPointTypeMenu.locator).click()
        const menu = await page.locator(AccountingDataPage.pointsTreeMenu.locator)
        const menuItem = menu.locator(`${AccountingDataPage.menuItem.locator}:has-text("${menuItemText}")`)
        await menuItem.click()
        //Wait for ajax to complete and intrface is not blocked
        await BrowserActions.waitForPageReady(page)
    }

    //Установить критерий поиска объекта учета
    static async ChooseNodeSelectionCriteria(page, criteriaValue) {
        //Choose correct option for criteria in nodesReferenceMenu
        const menuItemName = await page.locator(`${AccountingDataPage.nodesReferenceTree.locator} option[value="${criteriaValue}"]`).textContent();

        //Choose customer criteria in menu
        await page.locator(AccountingDataPage.nodesReferenceButton.locator).click();
        const menu = await page.locator(AccountingDataPage.nodesReferenceMenu.locator);
        const menuItem = menu.locator(`${AccountingDataPage.menuItem.locator}:has-text("${menuItemName}")`);
        await menuItem.click();

        //Wait for ajax to complete and interface is not blocked
        await BrowserActions.waitForPageReady(page);
    }

    //заполнить поле поиска и запустить поиск
    static async LaunchSearch(page, query) {
        //Fill search field with passed query 
        await page.locator(AccountingDataPage.edtSearchPoint.locator).fill(`${query}`);
        await page.locator(AccountingDataPage.btnSearchPoint.locator).click()
        //Wait for ajax to complete and interface is not blocked
        await BrowserActions.waitForPageReady(page);
        //Wait for rows in grid to appear
        await AccountingDataGridActions.waitForRows(page)
    }

    static async CheckLegend(page, expectedRows) {
        const legendRowsElements = await AccountingDataBaseElements.getLegendEntries(page).all();
        
        // Extract text content from each of the legend row elements
        const legendTexts = [];
        for (const entry of legendRowsElements) {
            const text = await entry.textContent();
            legendTexts.push(text);
        }
    
        // Check if the lengths are equal
        expect(legendTexts.length).toEqual(expectedRows.length, 'Mismatch in number of legend rows.');
    
        // Check that all elements are present
        for (const expectedRow of expectedRows) {
            expect(legendTexts).toContain(expectedRow, `Expected row "${expectedRow}" not found.`);
        }
    }
}

export default OperatorTreeActions

import AuditElements from "../../elements/Audit/auditElements";
import UiFormActions from "../Common/uiFormActions";
import DateHelper from "../../../Common/modules/dateHelper";
import TableActions from "../Common/tableActions";
import BrowserActions from "../../../Common/browserActions";
import { expect } from "@playwright/test";

class AuditActions {
    constructor(page) {
        this.page = page;
        this.auditElements = new AuditElements(page);
        this.uiFormActions = new UiFormActions(page)
        this.tableActions = new TableActions(page)
    }

    async selectPeriod(periodValue) {
        const dropdown = this.auditElements.periodSelectionDropdown();
        await this.uiFormActions.selectDropdownOptionByElement(dropdown, periodValue)
    }

    async verifyStartStopDate(periodOption) {
        const startTimeString = await this.auditElements.fromDateInput().evaluate(el => el.value);
        const endTimeString = await this.auditElements.toDateInput().evaluate(el => el.value);
    
        const startTime = DateHelper.formatStringToDate(startTimeString);
        const endTime = DateHelper.formatStringToDate(endTimeString);
    
        const dateDifference = (endTime - startTime) / (1000 * 60 * 60 * 24); 
    
        switch (periodOption) {
            case 'Day':
                expect(dateDifference).toEqual(1);
                break;
            case 'Week':
                expect(dateDifference).toEqual(7);
                break;
            case 'Month':
                expect(dateDifference).toBeGreaterThanOrEqual(27);
                expect(dateDifference).toBeLessThanOrEqual(32);
                break;
            case 'Quarter':
                expect(dateDifference).toBeGreaterThanOrEqual(88);
                expect(dateDifference).toBeLessThanOrEqual(93);
                break;
            case 'Year':
                expect(dateDifference).toBeGreaterThanOrEqual(364);
                expect(dateDifference).toBeLessThanOrEqual(367);
                break;
            default:
                break;
        }
    }

    async setPeriodManually(startDate, endDate) {
        await this.auditElements.fromDateInput().fill(DateHelper.formatDateToString(startDate))
        await this.auditElements.toDateInput().fill(DateHelper.formatDateToString(endDate))
        await this.auditElements.toDateInput().click()
        await this.auditElements.toDateInput().press('Enter')
    }

    async setStartDateManually(startDate) {
        await this.auditElements.fromDateInput().fill(DateHelper.formatDateToString(startDate))
        await this.auditElements.toDateInput().click()
        await this.auditElements.toDateInput().press('Enter')
        await BrowserActions.waitForPageReady(this.page)
    }

    async setEndDateManually(endDate) {
        await this.auditElements.toDateInput().fill(DateHelper.formatDateToString(endDate))
        await this.auditElements.toDateInput().click()
        await this.auditElements.toDateInput().press('Enter')
        await BrowserActions.waitForPageReady(this.page)
    }

    async checkRowDateValidity(rowNumber) {
        const operationRow = this.auditElements.tableRowByIndex(rowNumber)
        const timestampString =  await this.auditElements.timestampCell(operationRow).textContent()
        const minTimeString = await this.auditElements.fromDateInput().evaluate(el => el.value);
        const maxTimeString = await this.auditElements.toDateInput().evaluate(el => el.value);

        const timestamp = DateHelper.formatStringToFullDate(timestampString, 'yyyy.mm.dd hh:mm:ss.ms');
        const minTime = DateHelper.formatStringToDate(minTimeString);
        const maxTime = DateHelper.formatStringToDate(maxTimeString);
        await BrowserActions.waitForPageReady(this.page)

        expect(timestamp.getTime(), `event time ${timestamp} is less than expected ${maxTime} `).toBeLessThanOrEqual(maxTime.getTime())
        expect(timestamp.getTime(), `event time ${timestamp} is more than expected ${minTime} `).toBeGreaterThanOrEqual(minTime.getTime())

    }

    async checkRowUserValidity(rowNumber, expectedUser) {
        const operationRow = this.auditElements.tableRowByIndex(rowNumber)
        const user = await this.auditElements.userCell(operationRow).textContent()
        expect(user, `user that caused event with row number ${rowNumber} is ${expectedUser} `).toEqual(expectedUser);
    }

    async checkRowOperationValidity(rowNumber, expectedOperation) {
        const operationRow = this.auditElements.tableRowByIndex(rowNumber)
        const operation = await this.auditElements.operationCell(operationRow).textContent()
        expect(operation, `operation that caused event with row number ${rowNumber} is ${expectedOperation}`).toEqual(expectedOperation)
    }

}

export default AuditActions
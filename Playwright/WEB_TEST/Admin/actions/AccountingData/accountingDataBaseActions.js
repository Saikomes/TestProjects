import { AccountingDataElements } from './accountingDataElements';

export class AccountingDataBaseActions {

    static async openReportPage(page) {
        const reportButton = AccountingDataElements.getReportButton(page);
        await reportButton.click();
        // Add waiting logic if necessary
    }

    static async setDecimalPlaces(page, value) {
        const decimalPlacesSelector = AccountingDataElements.getDecimalPlacesSelector(page);
        await decimalPlacesSelector.selectOption({ value: value.toString() });
    } 
}
export default AccountingDataBaseActions
import NewsLocators from "../../locators/News/newsLocators";
import { TestHelpers } from "../../../Common/modules/testHelpers";
import AuditLocators from "../../locators/Audit/auditLocators";

class AuditElements {
    constructor(page) {
        this.page = page;
    }

    periodSelectionDropdown() {
        return this.page.locator(AuditLocators.dateManagementLocators.periodSelectionDropdown.locator)
    }

    fromDateInput() {
        return this.page.locator(AuditLocators.dateManagementLocators.fromDateInput.locator)
    }

    toDateInput() {
        return this.page.locator(AuditLocators.dateManagementLocators.toDateInput.locator)
    }

    tableRow() {
        return this.page.locator(AuditLocators.eventTableLocators.tableRow.locator)
    }

    tableRowByIndex(rowIndex = 1) {
        return this.page.locator(AuditLocators.eventTableLocators.tableRow.locator).nth(rowIndex);
    }

    timestampCell(eventRow) {
        return TestHelpers.getLinkedLocator(eventRow, AuditLocators.eventTableLocators.timestampCell.locator);
    }

    userCell(eventRow) {
        return TestHelpers.getLinkedLocator(eventRow, AuditLocators.eventTableLocators.userCell.locator);
    }

    operationCell(eventRow) {
        return TestHelpers.getLinkedLocator(eventRow, AuditLocators.eventTableLocators.operationCell.locator);
    }

}
export default AuditElements
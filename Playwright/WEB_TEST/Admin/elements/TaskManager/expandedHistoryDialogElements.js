import TaskManagerLocators from "../../locators/TaskManager/taskManagerLocators";
import UiDialogElements from "../Common/uiDialogElements";
import { TestHelpers } from "../../../Common/modules/testHelpers";

class ExpandedHistoryDialogElements extends UiDialogElements {
    constructor(page) {
        super(page)
    }

    expandedHistoryDialog() {
        return this.page.locator(TaskManagerLocators.expandedHistoryDialogLocators.expandedHistoryDialog.locator)
    }

    historyRowByNumber(rowNumber) {
        return TestHelpers.getLinkedLocator(this.expandedHistoryDialog(), TaskManagerLocators.expandedHistoryDialogLocators.historyRowByNumber.locator(rowNumber));
    }

    historyRowDateTime(row) {
        return TestHelpers.getLinkedLocator(row, TaskManagerLocators.expandedHistoryDialogLocators.historyRowDateTime.locator);
    }

    historyRowEvent(row) {
        return TestHelpers.getLinkedLocator(row, TaskManagerLocators.expandedHistoryDialogLocators.historyRowEvent.locator);
    }

}
export default ExpandedHistoryDialogElements
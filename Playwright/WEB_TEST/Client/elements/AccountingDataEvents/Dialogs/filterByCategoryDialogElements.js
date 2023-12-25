import AccountingDataEventsLocators from "../../../locators/AccountingDataEvents/accountingDataEventsLocators";
import UiDialogElements from "../../common/uiDialogElements";
import TestHelpers from "../../../../Common/modules/testHelpers";


class FilterByCategoryDialogElements extends UiDialogElements {

    constructor(page) {
        super(page)
    }

    filterByCategoryDialog() {
        return this.page.getByLabel(AccountingDataEventsLocators.filterByCategoryDialogLocators.filterByCategoryDialog.label)
    }

    selectAllButton() {
        return TestHelpers.getLinkedLocator(this.filterByCategoryDialog(), AccountingDataEventsLocators.filterByCategoryDialogLocators.selectAllButton.locator)
    }

    deselectAllButton() {
        return TestHelpers.getLinkedLocator(this.filterByCategoryDialog(), AccountingDataEventsLocators.filterByCategoryDialogLocators.deselectAllButton.locator)
    }

    invertButton() {
        return TestHelpers.getLinkedLocator(this.filterByCategoryDialog(), AccountingDataEventsLocators.filterByCategoryDialogLocators.invertButton.locator)
    }

    expandAllButton() {
        return TestHelpers.getLinkedLocator(this.filterByCategoryDialog(), AccountingDataEventsLocators.filterByCategoryDialogLocators.expandAllButton.locator)
    }

    collapseAllButton() {
        return TestHelpers.getLinkedLocator(this.filterByCategoryDialog(), AccountingDataEventsLocators.filterByCategoryDialogLocators.collapseAllButton.locator)
    }
}
export default FilterByCategoryDialogElements
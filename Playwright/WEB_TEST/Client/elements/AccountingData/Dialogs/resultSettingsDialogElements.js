import UiDialogElements from "../../common/uiDialogElements";
import AccountingDataLocators from "../../../locators/AccountingData/accountingDataLocators";

class ResultSettingsDialogElements extends UiDialogElements {
    constructor(page) {
        super(page)
    }
    resultSettingsDialog() {
        return this.page.locator(AccountingDataLocators.settingsLocators.settingsDialog.locator)
    }

}
export default ResultSettingsDialogElements
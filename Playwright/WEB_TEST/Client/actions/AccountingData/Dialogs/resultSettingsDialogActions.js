import { expect } from "@playwright/test";
import ResultSettingsDialogElements from "../../../elements/AccountingData/Dialogs/resultSettingsDialogElements";
import UiDialogActions from "../../Common/uiDialogActions";
class ResultSettingsDialogActions extends UiDialogActions {
    constructor(page) {
        super(page, new ResultSettingsDialogElements(page));
    }
}
export default ResultSettingsDialogActions
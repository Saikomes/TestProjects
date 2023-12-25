import { expect } from "@playwright/test";
import editScheduleDialogElements from "../../elements/TaskManager/editScheduleDialogElements";
import UiDialogActions from "../Common/uiDialogActions";

class EditScheduleDialogActions extends UiDialogActions {
    constructor(page) {
        super(page, new editScheduleDialogElements(page));
    }

    async chooseFrequencyRegime(regime) {
        await this.uiDialogElements.frequencyButton().click()
        await this.uiDialogElements.frequencyMenuOptionByName(regime).click()
    }

    async setInterval(intervalValue) {
        await this.uiDialogElements.scheduleInterval().fill(intervalValue.toString())
    }

    async setDayOfMonth(dayOfMonth) {
        await this.uiDialogElements.scheduleDayOfMonth().fill(dayOfMonth)
    }

}
export default EditScheduleDialogActions
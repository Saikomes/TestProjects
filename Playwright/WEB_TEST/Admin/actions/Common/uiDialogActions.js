import UiDialogElements from "../../elements/Common/uiDialogElements";
import UiFormActions from "./uiFormActions";

class UiDialogActions extends UiFormActions {
    constructor(page, dialogElements) {
        super(page)
        this.uiDialogElements = dialogElements;
    }

    async chooseDialogOption(dialog, dialogOption) {
        await this.uiDialogElements.dialogOptionByName(dialog, dialogOption).click()
    }

    async closeDialog(dialog) {
        await this.uiDialogElements.dialogCloseButton(dialog).click()
    }

}

export default UiDialogActions
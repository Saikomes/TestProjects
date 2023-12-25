import ToolTipDialogElements from "../../elements/Dialogs/toolTipDialogElements";

class ToolTipDialogActions {
    constructor(page) {
        this.page = page;
        this.toolTipDialogElements = new ToolTipDialogElements(page);
    }

    async chooseDialogOption(dialog, optionName) {
        await this.toolTipDialogElements.toolTipOptionButton(dialog, optionName).click()
    }

}

export default ToolTipDialogActions
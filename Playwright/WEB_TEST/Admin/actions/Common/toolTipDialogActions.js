import ToolTipDialogElements from "../../elements/Common/toolTipDialogElements";

class ToolTipDialogActions {
    constructor(page) {
        this.page = page;
        this.toolTipDialogElements = new ToolTipDialogElements(page);
    }

    async chooseDialogOption(optionName) {
        await this.toolTipDialogElements.toolTipOptionButton(optionName).click()
    }

}

export default ToolTipDialogActions
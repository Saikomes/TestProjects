import { expect } from "@playwright/test";
import ExpandedHistoryDialogElements from "../../elements/TaskManager/expandedHistoryDialogElements";
import UiDialogActions from "../Common/uiDialogActions";

class ExpandedHistoryDialogActions extends UiDialogActions {
    constructor(page) {
        super(page, new ExpandedHistoryDialogElements(page));
    }

    async getLastTaskLaunchHistory() {
        const firstRow = this.uiDialogElements.historyRowByNumber(1);
        const secondRow = this.uiDialogElements.historyRowByNumber(2);
        const firstRowText = await this.uiDialogElements.historyRowEvent(firstRow).textContent();
        const secondRowText = await this.uiDialogElements.historyRowEvent(secondRow).textContent();
        return [firstRowText, secondRowText];
    }

    async checkLastTaskLaunchForErrors() {
        const [firstRowText, secondRowText] = await this.getLastTaskLaunchHistory();
        expect([firstRowText, secondRowText]).toContain("Задача запущена");
        const historyText = firstRowText === "Задача запущена" ? secondRowText : firstRowText;
        expect(historyText).not.toContain("Ошибка");
    }

}
export default ExpandedHistoryDialogActions
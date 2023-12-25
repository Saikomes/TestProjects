import JqTableLocators from "../../../locators/Common/Tables/jqTableLocators";
import TestHelpers from "../../../../Common/modules/testHelpers";
import { UiTableElements } from "./uiTableElements";
export class JqTableElements extends UiTableElements {
    constructor(page, parentLocator = null) {
        super(page, parentLocator)
    }

    tableRow() {
        return this.parentLocator.locator(JqTableLocators.tableRow.locator);
    }

    tableRowById(id) {
        return this.parentLocator.locator(JqTableLocators.tableRowById.locator(id));
    }

    tableRowByIndex(index) {
        return this.parentLocator.locator(JqTableLocators.tableRow.locator).nth(index);
    }

    //Ищем строку по значению того или иного столбца,
    //В качестве аргумента передаем id header а столбца
    //Также передаем значение столбца
    tableRowByGridValue(columnHeaderId, gridValue) {
        return this.parentLocator.locator(JqTableLocators.tableRowByGridValue.locator(columnHeaderId, gridValue)).first();
    }

    rowCell(row, cellDescription) {
        return TestHelpers.getLinkedLocator(row, JqTableLocators.tableCell.locator(cellDescription));
    }

}

export default JqTableElements
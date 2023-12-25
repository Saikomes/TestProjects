import UiSearchToolbarLocators from "../../locators/Common/uiSearchToolbarLocators";
import { UiFormElements } from "./uiFormElements";
export class UiSearchToolbarElements  {
    constructor(page) {
        this.page = page
    }

    searchToolBar() {
        return this.page.locator(UiSearchToolbarLocators.searchPanel.locator)
    }

}
import { UiSearchToolbarElements } from "../../elements/Common/uiSearchToolbarElements";
import UiFormActions from "./uiFormActions";
class UiSearchToolbarActions extends UiFormActions {
    constructor(page) {
        super(page);
        this.uiSearchToolbarElements = new UiSearchToolbarElements(page)
    }

    async applySearchSettings(settings) {
        await this.applySettings(settings, this.uiSearchToolbarElements.searchToolBar());
    }

    async checkSearchSettings(settings) {
        await this.verifySettings(settings, this.uiSearchToolbarElements.searchToolBar());
    }
}

export default UiSearchToolbarActions
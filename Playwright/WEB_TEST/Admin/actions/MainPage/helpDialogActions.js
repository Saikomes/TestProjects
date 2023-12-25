import { expect } from "@playwright/test";
import HelpDialogElements from "../../elements/MainPage/helpDialogElements";
import UiDialogActions from "../Common/uiDialogActions";

class HelpDialogActions extends UiDialogActions {
    constructor(page) {
        super(page, new HelpDialogElements(page));
    }
}
export default HelpDialogActions
import { expect } from "@playwright/test";
import EditAccountDialogElements from "../../elements/GlobalSettings/editAccountDialogElements";
import UiDialogActions from "../Common/uiDialogActions";

class EditAccountDialogActions extends UiDialogActions {
    constructor(page) {
        super(page, new EditAccountDialogElements(page));
    }
}
export default EditAccountDialogActions
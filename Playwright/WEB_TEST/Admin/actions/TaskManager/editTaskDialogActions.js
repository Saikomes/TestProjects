import { expect } from "@playwright/test";
import EditTaskDialogElements from "../../elements/TaskManager/editTaskDialogElements";
import UiDialogActions from "../Common/uiDialogActions";

class EditTaskDialogActions extends UiDialogActions {
    constructor(page) {
        super(page, new EditTaskDialogElements(page));
    }
}
export default EditTaskDialogActions

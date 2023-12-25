import { expect } from "@playwright/test";
import MergeUsersDialogElements from "../../../elements/CustomersAndContracts/Dialogs/mergeUsersDialogElements";
import UiDialogActions from "../../Common/uiDialogActions";
class MergeUsersDialogActions extends UiDialogActions {
    constructor(page) {
        super(page, new MergeUsersDialogElements(page));
    }
}
export default MergeUsersDialogActions
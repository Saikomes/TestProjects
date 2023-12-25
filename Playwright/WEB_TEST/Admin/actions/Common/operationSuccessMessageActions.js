import OperationSuccessMessageElements from "../../elements/Common/operationSuccessMessageElements";
import { expect } from "@playwright/test";
class OperationSuccessMessageActions {
    constructor(page) {
        this.page = page;
        this.operationSuccessMessageElements = new OperationSuccessMessageElements(page);
    }

    async verifySuccessDialogMessage(message) {
        await expect(this.operationSuccessMessageElements.successMessageDialog()).toBeVisible();
        const dialogMessage = await this.operationSuccessMessageElements.successMessageDialogText().textContent()
        expect(dialogMessage).toEqual(message)
    }

}

export default OperationSuccessMessageActions
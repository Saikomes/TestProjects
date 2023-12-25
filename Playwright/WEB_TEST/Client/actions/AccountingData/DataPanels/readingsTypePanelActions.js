import ReadingsTypePanelElements from "../../../elements/AccountingData/DataPanels/readingsTypePanelElements";
import BrowserActions from "../../../../Common/browserActions";
import { expect } from "@playwright/test";
export class ReadingsTypePanelActions  {

    constructor(page) {
        this.page = page
        this.readingsTypePanelElements = new ReadingsTypePanelElements(page)
    }

    async selectReadingsType(type) {
        switch (type) {
            case 'Показания(НИ)':
              await this.readingsTypePanelElements.NIButton().click()
              break;
            case 'Показания(ПР)':
                await this.readingsTypePanelElements.PRButton().click()
              break;
            case 'Профиль(ЭН)':
                await this.readingsTypePanelElements.PEButton().click()
              break;
            case 'Профиль(МЩ)':
                await this.readingsTypePanelElements.PPButton().click()
                break;
            default:
              throw Error("Неверный тип показаний")
          }
          await BrowserActions.waitForPageReady(this.page)
    }

}

export default ReadingsTypePanelActions
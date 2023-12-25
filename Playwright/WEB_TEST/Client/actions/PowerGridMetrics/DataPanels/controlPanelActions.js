import ControlPanelElements from "../../../elements/PowerGridMetrics/DataPanels/controlPanelElements";
import BrowserActions from "../../../../Common/browserActions";
import { expect } from "@playwright/test";
import BaseControlPanelActions from "../../common/DataPanels/baseControlPanelActions";
import ToolTipDialogActions from "../../../../Common/actions/Dialogs/toolTipDialogActions";
import ToolTipDialogElements from "../../../../Common/elements/Dialogs/toolTipDialogElements";
import PowerGridMetricsLocators from "../../../locators/PowerGridMetrics/powerGridMetricsLocators";
import PowerGridMetricsConfig from "../../../config/powerGridMetricsConfig";
export class ControlPanelActions extends BaseControlPanelActions {

    constructor(page) {
        const controlPanelElements = new ControlPanelElements(page)
        super(page, controlPanelElements);
    }

    async clickMetricsParamsButton() {
        await this.controlPanelElements.gridMetricsParamsButton().click()
    }

    async getCurrentData() {
        await this.controlPanelElements.getCurrentDataButton().click()
        const toolTipDialogElements = new ToolTipDialogElements(this.page)
        const toolTipDialogActions = new ToolTipDialogActions(this.page)
        const confirmTooltip = toolTipDialogElements.toolTipDialogByLabel("Подтверждение")
        const errorTooltip = toolTipDialogElements.toolTipDialogByLabel("Ошибка!")
        const warningTooltip = toolTipDialogElements.toolTipDialogByLabel("Внимание")
        await toolTipDialogActions.chooseDialogOption(confirmTooltip, "Ок")
        expect(await errorTooltip.isVisible()).toBeFalsy()
        await toolTipDialogActions.chooseDialogOption(warningTooltip, "Закрыть")
    }

    async exportResult(kind, format, allParams) {
        await this.controlPanelElements.exportFormatButton().hover()
        await this.controlPanelElements.exportFormatButton().click()
        await this.controlPanelElements.exportFormatOption(format).hover()
        await this.controlPanelElements.exportFormatOption(format).click()
        if(allParams) {
            await this.elementActions.checkCheckbox2(this.controlPanelElements.controlPanel(), PowerGridMetricsLocators.controlPanelLocators.reportWithParams.locator)
        }
        if(kind == PowerGridMetricsConfig.reportTypes.regimeParams.name) {
            await this.controlPanelElements.showReportButton().click()
        }
        else {
            await this.controlPanelElements.showReportTgButton().click()
        }
        const newPage = await new Promise(resolve => {
            this.page.once('popup', resolve);
        });

        await BrowserActions.waitForPageReady(newPage)
        await newPage.waitForLoadState('networkidle')
        
        const url = newPage.url();

        expect(url).not.toBeNull()

        return newPage;
        
    }

}

export default ControlPanelActions
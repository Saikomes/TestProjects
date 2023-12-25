import ControlPanelElements from "../../../elements/AccountingDataEvents/DataPanels/controlPanelElements";
import BrowserActions from "../../../../Common/browserActions";
import { expect } from "@playwright/test";
import BaseControlPanelActions from "../../common/DataPanels/baseControlPanelActions";
import DataForPeriodChartElements from "../../../elements/PowerGridMetrics/Charts/dataForPeriodChartElements";
export class DataForPeriodChartActions {

    constructor(page) {
        this.page = page
        this.dataForPeriodChartElements = new DataForPeriodChartElements(page)
    }

    async checkTooltip() {
        const canvas = await this.dataForPeriodChartElements.chartCanvas().first();
        await canvas.hover()
        const boundingBox = await canvas.boundingBox();
        let tooltipFound = false
        
        // Перемещаемся по вертикали внутри границ canvas
        for (let y = boundingBox.y; y < boundingBox.y + boundingBox.height; y += 5) { // Инкремент в 5 пикселей
          await this.page.mouse.move(boundingBox.x + boundingBox.width / 2, y);
          // Проверяем, появился ли tooltip
          if (await this.dataForPeriodChartElements.chartTooltip().isVisible()) {
            tooltipFound = true;
            break;
          }
        }
        expect(tooltipFound).toBeTruthy()
        const tooltipContent = await this.dataForPeriodChartElements.chartTooltip().textContent();
        console.log(tooltipContent)
    }

    async checkLegendContainsPoint(text) {
        const legentPoint = this.dataForPeriodChartElements.chartLegendPoint(text)
        expect(await legentPoint.isVisible()).toBeTruthy()
    }

}

export default DataForPeriodChartActions
import PowerGridMetricsLocators from "../../../locators/PowerGridMetrics/powerGridMetricsLocators"
import TestHelpers from "../../../../Common/modules/testHelpers"

class DataForPeriodChartElements {
    constructor(page) {
        this.page = page
    }

    dataForPeriodChart() {
        return this.page.locator(PowerGridMetricsLocators.dataForPeriodChartLocators.dataForPeriodChart.locator)
    }

    chartCanvas() {
        return TestHelpers.getLinkedLocator(this.dataForPeriodChart(), PowerGridMetricsLocators.dataForPeriodChartLocators.chartCanvas.locator)
    }

    chartTooltip() {
        return this.page.locator(PowerGridMetricsLocators.dataForPeriodChartLocators.chartTooltip.locator)
    }

    pointTime() {
        return TestHelpers.getLinkedLocator(this.chartTooltip(), PowerGridMetricsLocators.dataForPeriodChartLocators.pointTime.locator)
    }

    pointValue() {
        return TestHelpers.getLinkedLocator(this.chartTooltip(), PowerGridMetricsLocators.dataForPeriodChartLocators.pointValue.locator)
    }

    chartLegend() {
        return this.page.locator(PowerGridMetricsLocators.dataForPeriodChartLocators.chartLegend.locator)
    }

    chartLegendPoint(text) {
        return TestHelpers.getLinkedLocator(this.chartLegend(), PowerGridMetricsLocators.dataForPeriodChartLocators.chartLegendPoint.locator(text))
    }
    
}
export default DataForPeriodChartElements
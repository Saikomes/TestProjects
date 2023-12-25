import PowerGridMetricsActions from "../../actions/PowerGridMetrics/powerGridMetricsActions";
import PowerGridMetricsElements from "../../elements/PowerGridMetrics/powerGridMetricsElements";
import BrowserActions from "../../../Common/browserActions";

export class PowerGridMetricsModule {

  constructor(page) {
    this.page = page
    this.powerGridMetricsActions = new PowerGridMetricsActions(page)
    this.powerGridMetricsElements = new PowerGridMetricsElements(page)
  }

  async selectDevice(testCase) {
    await this.powerGridMetricsActions.pointsTreePanelActions.pointsTreeTableActions.unselectAllNodes()
    await this.powerGridMetricsActions.pointsTreePanelActions.pointsTreeTableActions.findAndSelectNode(testCase.devices[0].deviceID, true)
    await BrowserActions.waitForPageReady(this.page)
  }

  async applyTestCaseParams(testCase) {
    await this.selectDevice(testCase)
    await this.powerGridMetricsActions.controlPanelActions.applySettings(testCase.controlPanel)
    await this.powerGridMetricsActions.controlPanelActions.clickMetricsParamsButton()
    await this.powerGridMetricsActions.gridMetricsParamsDialogActions.deselectAllEvents()
    await this.page.waitForTimeout(10000) //Обходим загрузку контента которая мешает выбору компонентов, блок появляется не сразу
    await BrowserActions.waitForPageReady(this.page)
    const gridMetricsParamsDialog = this.powerGridMetricsElements.gridMetricsParamsDialogElements.gridMetricsParamsDialog()
    for (const esParameter of testCase.esParameters) {
      await this.powerGridMetricsActions.gridMetricsParamsDialogActions.gridMetricsParamsTableActions.findAndSelectNode(esParameter, false)
    }
    await this.powerGridMetricsActions.gridMetricsParamsDialogActions.closeDialog(gridMetricsParamsDialog)
    await BrowserActions.waitForPageReady(this.page)
  }

}

export default PowerGridMetricsModule;
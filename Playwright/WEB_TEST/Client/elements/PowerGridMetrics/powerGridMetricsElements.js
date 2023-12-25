import ControlPanelElements from "./DataPanels/controlPanelElements";
import GridMetricsParamsDialogElements from "./Dialogs/gridMetricsParamsDialogElements";
import DataForPeriodChartElements from "./Charts/dataForPeriodChartElements";
import IuVectorDiagramElements from "./Diagrams/iuVectorDiagramElements";
import SVectorDiagramElements from "./Diagrams/sVectorDiagramElements";
import TestHelpers from "../../../Common/modules/testHelpers";

class PowerGridMetricsElements {
    constructor(page) {
        this.page = page
        this.controlPanelElements = new ControlPanelElements(page)
        this.gridMetricsParamsDialogElements = new GridMetricsParamsDialogElements(page)
        this.dataForPeriodChartElements = new DataForPeriodChartElements(page)
        this.iuVectorDiagramElements = new IuVectorDiagramElements(page)
        this.sVectorDiagramElements = new SVectorDiagramElements(page)
    }
    
}
export default PowerGridMetricsElements
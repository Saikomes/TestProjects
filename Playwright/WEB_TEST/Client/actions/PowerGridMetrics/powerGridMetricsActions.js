import ControlPanelActions from "./DataPanels/controlPanelActions";
import PointsTreePanelActions from "../common/DataPanels/PointsTreePanelActions";
import PointParamsPanelActions from "../common/DataPanels/pointParamsPanelActions";
import TypeDataToolbarActions from "../common/DataPanels/typeDataToolbarActions";
import DataForPeriodChartActions from "./Charts/dataForPeriodChartActions";
import GridMetricsParamsDialogActions from "./Dialogs/gridMetricsParamsDialogActions";

class PowerGridMetricsActions {
    constructor(page) {
        this.page = page
        this.pointsTreePanelActions = new PointsTreePanelActions(page)
        this.controlPanelActions = new ControlPanelActions(page)
        this.pointParamsPanelActions = new PointParamsPanelActions(page)
        this.typeDataToolbarActions = new TypeDataToolbarActions(page)
        this.dataForPeriodChartActions = new DataForPeriodChartActions(page)
        this.gridMetricsParamsDialogActions = new GridMetricsParamsDialogActions(page)
    }
    
}
export default PowerGridMetricsActions
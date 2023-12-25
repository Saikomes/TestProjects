import ResultSettingsDialogActions from "./Dialogs/resultSettingsDialogActions";
import ControlPanelActions from "./DataPanels/controlPanelActions";
import ReadingsTableActions from "./Tables/readingsTableActions";
import PointsTreePanelActions from "../common/DataPanels/PointsTreePanelActions";
import PointParamsPanelActions from "../common/DataPanels/pointParamsPanelActions";
import TypeDataToolbarActions from "../common/DataPanels/typeDataToolbarActions";
import ReadingsTypePanelActions from "./DataPanels/readingsTypePanelActions";

class AccountingDataActions {
    constructor(page) {
        this.page = page
        this.pointsTreePanelActions = new PointsTreePanelActions(page)
        this.resultSettingsDialogActions = new ResultSettingsDialogActions(page)
        this.controlPanelActions = new ControlPanelActions(page)
        this.readingsTableActions = new ReadingsTableActions(page)
        this.pointParamsPanelActions = new PointParamsPanelActions(page)
        this.typeDataToolbarActions = new TypeDataToolbarActions(page)
        this.readingsTypePanelActions = new ReadingsTypePanelActions(page)
    }
    
}
export default AccountingDataActions
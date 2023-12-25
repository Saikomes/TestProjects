import ResultSettingsDialogElements from "./Dialogs/resultSettingsDialogElements";
import ControlPanelElements from "./DataPanels/controlPanelElements";
import ReadingsTableElements from "./Tables/readingsTableElements";
import PointsTreePanelElements from "../common/DataPanels/pointsTreePanelElements";
import ReadingsTypePanelElements from "./DataPanels/readingsTypePanelElements";
import TypeDataToolbarElements from "../common/DataPanels/typeDataToolbarElements";
import TestHelpers from "../../../Common/modules/testHelpers";

class AccountingDataElements {
    constructor(page) {
        this.page = page
        this.resultSettingsDialogElements = new ResultSettingsDialogElements(page)
        this.controlPanelElements = new ControlPanelElements(page)
        this.readingsTableElements = new ReadingsTableElements(page)
        this.pointsTreePanelElements = new PointsTreePanelElements(page)
        this.readingsTypePanelElements = new ReadingsTypePanelElements(page)
        this.typeDataToolbarElements = new TypeDataToolbarElements(page)
    }
    
}
export default AccountingDataElements
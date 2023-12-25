import FilterByCategoryDialogElements from "./Dialogs/filterByCategoryDialogElements";
import ControlPanelElements from "./DataPanels/controlPanelElements";
import EventsTableElements from "../../elements/AccountingDataEvents/Tables/eventsTableElements"
import AngPointsTreePanelElements from "./DataPanels/angPointsTreePanelElements";
import TestHelpers from "../../../Common/modules/testHelpers";

class AccountingDataEventsElements {
    constructor(page) {
        this.page = page
        this.filterByCategoryDialogElements = new FilterByCategoryDialogElements(page)
        this.controlPanelElements = new ControlPanelElements(page)
        this.eventsTableElements = new EventsTableElements(page)
        this.angPointsTreePanelElements = new AngPointsTreePanelElements(page)
    }
    
}
export default AccountingDataEventsElements
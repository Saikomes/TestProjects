import AngPointsTreePanelActions from "./DataPanels/angPointsTreePanelActions"
import EventsTableActions from "./Tables/eventsTableActions"
import FilterByCategoryDialogActions from "./Dialogs/filterByCategoryDialogActions"
import ControlPanelActions from "./DataPanels/controlPanelActions"

class AccountingDataEventsActions {
    constructor(page) {
        this.page = page
        this.angPointsTreePanelActions = new AngPointsTreePanelActions(page)
        this.eventsTableActions = new EventsTableActions(page)
        this.filterByCategoryDialogActions = new FilterByCategoryDialogActions(page)
        this.controlPanelActions = new ControlPanelActions(page)
    }
    
}
export default AccountingDataEventsActions
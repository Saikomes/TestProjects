import PointsDetailsTableElements from "../../../elements/Common/DataPanels/pointsDetailsTableElements"
class PointsTreeDetailsTableActions {
    constructor(page, parentLocator = null) {
        this.page = page
        this.pointsDetailsTableElements = new PointsDetailsTableElements(page, parentLocator);
    }
}

export default PointsTreeDetailsTableActions
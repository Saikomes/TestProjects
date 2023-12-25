import PointsTreeTableLocators from "../../../locators/AccountingDataEvents/Tables/angPointsTreeTableLocators";
import AngTableLocators from "../../../locators/common/Tables/angTableLocators";
import TestHelpers from "../../../../Common/modules/testHelpers";

class AngTableElements {

    constructor(page, treeId) {
        this.page = page;
        this.treeId = treeId;
    }

    treeById() {
        return this.page.locator(AngTableLocators.treeById.locator(this.treeId))
    }

    treeNodeContent() {
        return TestHelpers.getLinkedLocator(this.treeById(), AngTableLocators.treeNodeContent.locator)
    } 

    treeNodeById(nodeId) {
        return TestHelpers.getLinkedLocator(this.treeById(), AngTableLocators.treeNodeById.locator(nodeId))
    } 

    treeNodeByLabel(label) {
        return TestHelpers.getLinkedLocator(this.treeById(), AngTableLocators.treeNodeByLabel.locator(label))
    } 

    async expandableRows() {
        const elements = await TestHelpers.getLinkedLocator(this.treeById(), AngTableLocators.treeNode.locator).all()
        const filteredElements = [];

        for (const element of elements) {
            const isNotLeafNode = await element.evaluate(el => !el.classList.contains('ui-treenode-leaf'));
            if (isNotLeafNode) {
                filteredElements.push(element);
            }
        }

        return filteredElements;
    }

    expandNodeButton(node) {
        return TestHelpers.getLinkedLocator(node, AngTableLocators.expandNodeButton.locator)
    }
    
    expandedNode() {
        return TestHelpers.getLinkedLocator(this.treeById(), AngTableLocators.expandedNode.locator)
    }

    slickedNode() {
        return TestHelpers.getLinkedLocator(this.treeById(), AngTableLocators.slickedNode.locator)
    }

}
export default AngTableElements
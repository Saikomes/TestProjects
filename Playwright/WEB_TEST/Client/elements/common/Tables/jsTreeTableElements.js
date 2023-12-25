import JsTreeTableLocators from "../../../locators/common/Tables/jsTreeTableLocators";
import TestHelpers from "../../../../Common/modules/testHelpers";

class JsTreeTableElements {

    constructor(page, treeId) {
        this.page = page;
        this.treeId = treeId;
    }

    treeById() {
        return this.page.locator(JsTreeTableLocators.treeById.locator(this.treeId))
    }

    treeNodeRow() {
        return TestHelpers.getLinkedLocator(this.treeById(), JsTreeTableLocators.treeNodeRow.locator)
    }

    treeNodeContent(treeNodeLocator) {
        return TestHelpers.getLinkedLocator(treeNodeLocator, JsTreeTableLocators.treeNodeContent.locator)
    }

    treeNodeCheckBox(treeNodeLocator) {
        return TestHelpers.getLinkedLocator(treeNodeLocator, JsTreeTableLocators.treeNodeCheckBox.locator)
    }

    treeNodeById(nodeId) {
        return TestHelpers.getLinkedLocator(this.treeById(), JsTreeTableLocators.treeNodeById.locator(nodeId))
    } 

    treeNodeByLabel(label) {
        return TestHelpers.getLinkedLocator(this.treeById(), JsTreeTableLocators.treeNodeByLabel.locator(label))
    } 

    async expandableRows() {
        const elements = await TestHelpers.getLinkedLocator(this.treeById(), JsTreeTableLocators.treeNodeRow.locator).all()
        const filteredElements = [];

        for (const element of elements) {
            const isNotLeafNode = await element.evaluate(el => !el.classList.contains('jstree-leaf'));
            if (isNotLeafNode) {
                filteredElements.push(element);
            }
        }

        return filteredElements;
    }

    expandNodeButton(node) {
        return TestHelpers.getLinkedLocator(node, JsTreeTableLocators.expandNodeButton.locator)
    }
    
    expandedNode() {
        return TestHelpers.getLinkedLocator(this.treeById(), JsTreeTableLocators.expandedNode.locator)
    }

    slickedNode() {
        return TestHelpers.getLinkedLocator(this.treeById(), JsTreeTableLocators.slickedNode.locator)
    }

}
export default JsTreeTableElements
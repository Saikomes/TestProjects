import JsTreeTableElements from "../../../elements/common/Tables/jsTreeTableElements";
import BrowserActions from "../../../../Common/browserActions";
import { expect } from "@playwright/test";

class JsTreeTableActions {

    constructor(page, treeId) {
        this.page = page;
        this.treeId = treeId;
        this.jsTreeTableElements = new JsTreeTableElements(page, treeId)
    }

    async unselectAllNodes() {
        await this.expandAllNodes()
        let nodeLocators = await this.jsTreeTableElements.treeNodeRow().all();
        for (let nodeLocator of nodeLocators) {
            const classAttribute = await nodeLocator.getAttribute("class");
            if (classAttribute && classAttribute.includes("jstree-checked")) {
                await this.jsTreeTableElements.treeNodeCheckBox(nodeLocator).click()
            } 
        }
        await BrowserActions.waitForPageReady(this.page);
    }

    async selectNode(criteria, isById = true) {
        let nodeLocator;
        if (isById) {
            nodeLocator = this.jsTreeTableElements.treeNodeById(criteria);
        } else {
            nodeLocator = this.jsTreeTableElements.treeNodeByLabel(criteria);
        }
        
        await nodeLocator.click()
        const pointsTreeElementCheckbox = this.jsTreeTableElements.treeNodeCheckBox(nodeLocator)
        const isCheckboxVisible = await pointsTreeElementCheckbox.isVisible();
        const isUnchecked = await nodeLocator.getAttribute('class').then(classes => classes.includes('jstree-unchecked'));
        if (isUnchecked && isCheckboxVisible) {
            await pointsTreeElementCheckbox.click();
            await BrowserActions.waitForPageReady(this.page, 80000)
        }
        await BrowserActions.waitForPageReady(this.page);
    }
    
    async findAndSelectNode(criteria, isById = true) {
        let nodeLocator;
        if (isById) {
            nodeLocator = this.jsTreeTableElements.treeNodeById(criteria);
        } else {
            nodeLocator = this.jsTreeTableElements.treeNodeByLabel(criteria);
        }
    
        await BrowserActions.waitForPageReady(this.page);
        while (!await nodeLocator.isVisible()) {
            const expandButton = await this.jsTreeTableElements.expandNodeButton(await this.jsTreeTableElements.slickedNode()).first()
            await expandButton.click();
        }
        expect(await nodeLocator.isVisible(), `Узел (${criteria}) видим`).toBeTruthy()
        await this.selectNode(criteria, isById)
        await BrowserActions.waitForPageReady(this.page);
    }

    async expandNode(node) {
        if(await node.getAttribute('jstree-opened') == "false") {
            await this.jsTreeTableElements.expandNodeButton(node).click()
        }
    }

    async slickNode(node) {
        if(await node.getAttribute('jstree-opened') == "true") {
            await this.jsTreeTableElements.expandNodeButton(node).click()
        }
    }

    async expandAllNodes() {
        while(await this.jsTreeTableElements.slickedNode().first().isVisible()) {
            await this.jsTreeTableElements.expandNodeButton(await this.jsTreeTableElements.slickedNode().first()).click()
        }
        await BrowserActions.waitForPageReady(this.page);
    }

    async slickAllNodes() {
        while(await this.jsTreeTableElements.expandedNode().first().isVisible()) {
            await this.jsTreeTableElements.expandNodeButton(await this.jsTreeTableElements.expandedNode().first()).click()
        }
        await BrowserActions.waitForPageReady(this.page);
    }

}
export default JsTreeTableActions
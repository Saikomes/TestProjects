import AngTableElements from "../../../elements/common/Tables/angTableElements";
import BrowserActions from "../../../../Common/browserActions";
import { expect } from "@playwright/test";

class AngTableActions {

    constructor(page, treeId) {
        this.page = page;
        this.treeId = treeId;
        this.angTableElements = new AngTableElements(page, treeId)
    }

    async unselectAllNodes() {
        await this.expandAllNodes()
        let nodeLocators = await this.angTableElements.treeNodeContent().all();
        for (let nodeLocator of nodeLocators) {
            if (await nodeLocator.getAttribute("aria-selected") == "true") {
                await nodeLocator.click();
            }   
        }
        await BrowserActions.waitForPageReady(this.page);
    }

    async selectNode(criteria, isById = true) {
        let nodeLocator;
        if (isById) {
            nodeLocator = this.angTableElements.treeNodeById(criteria);
        } else {
            nodeLocator = this.angTableElements.treeNodeByLabel(criteria);
        }
    
        if (await nodeLocator.getAttribute("aria-selected") == "false") {
            await nodeLocator.click();
        }
        await BrowserActions.waitForPageReady(this.page);
    }
    
    async findAndSelectNode(criteria, isById = true) {
        let nodeLocator;
        if (isById) {
            nodeLocator = this.angTableElements.treeNodeById(criteria);
        } else {
            nodeLocator = this.angTableElements.treeNodeByLabel(criteria);
        }
    
        while (!await nodeLocator.isVisible()) {
            await this.angTableElements.expandNodeButton(await this.angTableElements.slickedNode().first()).click();
        }
        expect(await nodeLocator.isVisible(), `Узел (${criteria}) видим`).toBeTruthy()
        await this.selectNode(criteria, isById)
        await BrowserActions.waitForPageReady(this.page);
    }

    async expandNode(node) {
        if(await node.getAttribute('aria-expanded') == "false") {
            await this.angTableElements.expandNodeButton(node).click()
        }
    }

    async slickNode(node) {
        if(await node.getAttribute('aria-expanded') == "true") {
            await this.angTableElements.expandNodeButton(node).click()
        }
    }

    async expandAllNodes() {
        while(await this.angTableElements.slickedNode().first().isVisible()) {
            await this.angTableElements.expandNodeButton(await this.angTableElements.slickedNode().first()).click()
        }
        await BrowserActions.waitForPageReady(this.page);
    }

    async slickAllNodes() {
        while(await this.angTableElements.expandedNode().first().isVisible()) {
            await this.angTableElements.expandNodeButton(await this.angTableElements.expandedNode().first()).click()
        }
        await BrowserActions.waitForPageReady(this.page);
    }

}
export default AngTableActions
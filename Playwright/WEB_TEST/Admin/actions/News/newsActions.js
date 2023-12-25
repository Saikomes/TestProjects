import { expect } from "@playwright/test";
import NewsElements from "../../elements/News/newsElements";
import ToolTipDialogActions from "../Common/toolTipDialogActions";
class NewsActions {
    constructor(page) {
        this.page = page;
        this.newsElements = new NewsElements(page);
        this.toolTipDialogActions = new ToolTipDialogActions(page)
    }

    async addNewNews(newsData) {
        const { title, preview, content, fromDate, toDate, groups } = newsData;
        await this.newsElements.addNewsButton().click();
        await this.newsElements.editNewsDialog().isEnabled();
        await this.newsElements.titleInput().fill(title);
        await this.newsElements.previewInput().fill(preview);
        await this.newsElements.publishCheckbox().check();
        await this.newsElements.publishSinceInput().fill(fromDate);
        await this.newsElements.publishToInput().fill(toDate);
        for (const groupName of groups) {
            await this.newsElements.groupsSelector().click();
            await this.newsElements.groupSelectMenuItemByName(groupName).click();
        }
        const contentInput = this.newsElements.newsContentInput();
        await this.newsElements.newsContentInputHtml(contentInput).click();
        await this.page.keyboard.type(content);
        await this.newsElements.saveButton().click();
        await this.newsElements.closeButton().click();
        expect(this.newsElements.newsRowByTitle(title), `News "${title}" is added`).toBeVisible()
    }

    async removeNews(newsName) {
        const newsRows = await this.newsElements.newsRowByTitle(newsName).all()
        for (const newsRow of newsRows) {
            await this.newsElements.editNewsButton(newsRow).click()
            await this.newsElements.editNewsDialog().isEnabled();
            await this.newsElements.publishCheckbox().uncheck()
            await this.newsElements.saveButton().click()
            await this.newsElements.removeNewsButton(newsRow).click()
            await this.toolTipDialogActions.chooseDialogOption("Удалить")
            expect(newsRow, `News "${newsName}" is deleted`).not.toBeVisible()
        }
    }

}

export default NewsActions
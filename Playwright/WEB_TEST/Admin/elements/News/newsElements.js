import NewsLocators from "../../locators/News/newsLocators";
import { TestHelpers } from "../../../Common/modules/testHelpers";

class NewsElements {
    constructor(page) {
        this.page = page;
    }

    newsRowByTitle(title) {
        return this.page.locator(NewsLocators.newsPageLocators.newsRowByTitle.locator(title))
    }

    searchField() {
        return this.page.locator(NewsLocators.newsPageLocators.searchField.locator)
    }

    searchButton() {
        return this.page.locator(NewsLocators.newsPageLocators.searchButton.locator)
    }
    
    addNewsButton() {
        return this.page.locator(NewsLocators.newsPageLocators.addNewsButton.locator)
    }

    editNewsButton(newsRowLocator) {
        return TestHelpers.getLinkedLocator(newsRowLocator, NewsLocators.newsPageLocators.editNewsButton.locator)
    }
    
    removeNewsButton(newsRowLocator) {
        return TestHelpers.getLinkedLocator(newsRowLocator, NewsLocators.newsPageLocators.removeNewsButton.locator)
    }

    editNewsDialog() {
        return this.page.locator(NewsLocators.editNewsDialogLocators.editNewsDialog.locator)
    }

    titleInput() {
        return TestHelpers.getLinkedLocator(this.editNewsDialog(), NewsLocators.editNewsDialogLocators.titleInput.locator);
    }

    previewInput() {
        return TestHelpers.getLinkedLocator(this.editNewsDialog(), NewsLocators.editNewsDialogLocators.previewInput.locator);
    }

    publishCheckbox() {
        return TestHelpers.getLinkedLocator(this.editNewsDialog(), NewsLocators.editNewsDialogLocators.publishCheckbox.locator);
    }

    publishSinceInput() {
        return TestHelpers.getLinkedLocator(this.editNewsDialog(), NewsLocators.editNewsDialogLocators.publishSinceInput.locator);
    }

    publishToInput() {
        return TestHelpers.getLinkedLocator(this.editNewsDialog(), NewsLocators.editNewsDialogLocators.publishToInput.locator);
    }

    groupsSelector() {
        return TestHelpers.getLinkedLocator(this.editNewsDialog(), NewsLocators.editNewsDialogLocators.groupsSelector.locator);
    }

    groupSelectMenu() {
        return TestHelpers.getLinkedLocator(this.editNewsDialog(), NewsLocators.editNewsDialogLocators.groupSelectMenu.locator);
    }

    groupSelectMenuItemByName(itemName) {
        return  this.page.locator(NewsLocators.editNewsDialogLocators.groupSelectMenuItem.locator(itemName));
    }

    newsContentInput() {
        return TestHelpers.getLinkedFrameLocator(this.editNewsDialog(), NewsLocators.editNewsDialogLocators.newsContentFrame.locator);
    }

    newsContentInputBody() {
        return TestHelpers.getLinkedLocator(this.newsContentInput(), "body");
    }

    newsContentInputHtml() {
        return TestHelpers.getLinkedLocator(this.newsContentInput(), "html");
    }

    saveButton() {
        return TestHelpers.getLinkedLocator(this.editNewsDialog(), NewsLocators.editNewsDialogLocators.saveButton.locator);
    }

    closeButton() {
        return TestHelpers.getLinkedLocator(this.editNewsDialog(), NewsLocators.editNewsDialogLocators.closeBitton.locator);
    }

}
export default NewsElements
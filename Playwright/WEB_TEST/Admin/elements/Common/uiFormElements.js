import UiFormLocators from "../../locators/Common/uiFormLocators";
export class UiFormElements {
    constructor(page) {
        this.page = page;
    }

    inputElement(id) {
        return this.page.locator(UiFormLocators.inputById.locator(id));
    }

    checkboxElement(id) {
        return this.page.locator(UiFormLocators.checkboxById.locator(id));
    }

    toggleElement(id) {
        return this.page.locator(UiFormLocators.toggleByLabelFor.locator(id));
    }

    dropdownButtonById(id) {
        return this.page.locator(UiFormLocators.dropdownButtonById.locator(id));
    }

    dropdownMenuOptionById(id, optionText) {
        return this.page.locator(`ul${UiFormLocators.dropdownMenuById.locator(id)} li a:text("${optionText}")`);
    }

    async dropdownButtonByElement(dropdownMenuElement) {
        const menuId = await dropdownMenuElement.evaluate(el => el.id);
        return this.page.locator(UiFormLocators.dropdownButtonById.locator(`#${menuId}`));
    }

    async dropdownMenuOptionByElement(dropdownMenuElement, optionText) {
        const menuId = await dropdownMenuElement.evaluate(el => el.id);
        return this.page.locator(`ul${UiFormLocators.dropdownMenuById.locator(`#${menuId}`)} li a:text("${optionText}")`);
    }
}
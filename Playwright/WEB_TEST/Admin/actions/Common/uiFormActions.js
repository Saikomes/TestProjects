import { expect } from "@playwright/test";
import { UiFormElements } from "../../elements/Common/uiFormElements";
import TestHelpers from "../../../Common/modules/testHelpers";
import ElementActions from "../../modules/elementActions";
import ElementVerifications from "../../modules/elementVerifications";
class UiFormActions {
    constructor(page) {
        this.page = page;
        this.uiFormElements = new UiFormElements(page);
        this.elementActions = new ElementActions(page)
        this.elementVerifications = new ElementVerifications(page)
    }


    async applySettings(settings, origin = this.page) {
        for (const setting of settings) {
            const elementLocator = setting.locator;

            if(setting == null || setting == undefined) {
                continue;
            }

            switch (setting.type) {
                case 'input':
                    await this.elementActions.setInputValue(origin, elementLocator, setting.value);
                    break;
                case 'checkbox':
                    if (setting.value) {
                        await this.elementActions.checkCheckbox(origin, elementLocator);
                    } else {
                        await this.elementActions.uncheckCheckbox(origin, elementLocator);
                    }
                    break;
                case 'toggle':
                    await this.elementActions.toggleElement(origin, elementLocator, setting.value);
                    break;
                case 'dropdown':
                    await this.elementActions.selectDropdownOption(origin, elementLocator, setting.value);
                    break;
                case 'select2':
                    await this.elementActions.chooseOptionInSelect2(origin, elementLocator, setting.value);
                    break;
            }
        }
    }

    async verifySettings(settings, origin = this.page) {
        for (const setting of settings) {
            const element = await origin.locator(setting.locator);

            const elementId = await element.evaluate(el => el.id);

            const elementLocator = setting.locator;

            if(setting == null || setting == undefined) {
                continue;
            }

            switch (setting.type) {
                case 'input':
                    await this.elementVerifications.verifyInputValue(origin, elementLocator, setting.value);
                    break;

                case 'checkbox':
                    await this.elementVerifications.verifyCheckboxState(origin, elementLocator, setting.value);
                    break;

                case 'toggle':
                    await this.elementVerifications.verifyToggleState(origin, elementLocator, setting.value);
                    break;

                case 'dropdown':
                    await this.elementVerifications.verifyDropdownOptionSelected(origin, elementLocator, setting.value);
                    break;

                case 'select2':
                    await this.elementVerifications.verifySelect2Option(origin, elementLocator, setting.value);
                    break;
            }
        }
    }

    async selectDropdownOptionByElement(dropdownElement, value) {
        const optionElement = dropdownElement.locator(`option[value='${value}']`);
        const optionText = await optionElement.textContent();
        
        const dropdownButton =await this.uiFormElements.dropdownButtonByElement(dropdownElement);
        await dropdownButton.click();
        await this.page.waitForTimeout(1000)
        const menuOptionLocator = await this.uiFormElements.dropdownMenuOptionByElement(dropdownElement, optionText);
        if(!await menuOptionLocator.isVisible()) {
            await dropdownButton.click(); 
        }
        await menuOptionLocator.click();
    }

}

export default UiFormActions
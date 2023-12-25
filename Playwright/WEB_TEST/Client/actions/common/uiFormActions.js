import { expect } from "@playwright/test";
import TestHelpers from "../../../Common/modules/testHelpers";
import ClientElementActions from "../../modules/clientElementActions";
import ClientElementVerifications from "../../modules/clientElementVerifications";
class UiFormActions {
    constructor(page) {
        this.page = page;
        this.elementActions = new ClientElementActions(page)
        this.elementVerifications = new ClientElementVerifications(page)
    }

    async applySettings(settings, origin = this.page) {
        const settingsArray = Array.isArray(settings) ? settings : Object.values(settings);
        for (const setting of settingsArray) {
            if(setting == null || setting == undefined ) {
                continue;
            }
            const elementLocator = setting.locator;

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
                case 'checkbox2':
                    if (setting.value) {
                        await this.elementActions.checkCheckbox2(origin, elementLocator);
                    } else {
                        await this.elementActions.uncheckCheckbox2(origin, elementLocator);
                    }
                    break;
                case 'dropdown':
                    await this.elementActions.selectDropdownOption(origin, elementLocator, setting.value);
                    break;
                case 'dropdown2':
                    await this.elementActions.selectDropdown2Option(origin, elementLocator, setting.value);
                    break;
                case 'select':
                    await this.elementActions.chooseOptionInSelect(origin, elementLocator, setting.value);
                    break;
                case 'select2':
                    await this.elementActions.chooseOptionInSelect2(origin, elementLocator, setting.value);
                    break;
                case 'calendar':
                    await this.elementActions.selectDateInCalendar(origin, elementLocator, setting.value);
                    break;
            }
        }
    }

    async verifySettings(settings, origin = this.page) {
        for (const setting of settings) {

            if(setting == null || setting == undefined ) {
                continue;
            }
            
            const element = await origin.locator(setting.locator);

            const elementId = await element.evaluate(el => el.id);

            const elementLocator = setting.locator;

            switch (setting.type) {
                case 'input':
                    await this.elementVerifications.verifyInputValue(origin, elementLocator, setting.value);
                    break;

                case 'checkbox':
                    await this.elementVerifications.verifyCheckboxState(origin, elementLocator, setting.value);
                    break;

                case 'dropdown':
                    await this.elementVerifications.verifyDropdownOptionSelected(origin, elementLocator, setting.value);
                    break;

                case 'select':
                    await this.elementVerifications.verifySelectOption(origin, elementLocator, setting.value);
                    break;

                case 'select2':
                    await this.elementVerifications.verifySelect2Option(origin, elementLocator, setting.value);
                    break;
                
                case 'calendar':
                    await this.elementVerifications.verifyCalendarDate(origin, elementLocator, setting.value);
                    break;
            }
        }
    }

}

export default UiFormActions
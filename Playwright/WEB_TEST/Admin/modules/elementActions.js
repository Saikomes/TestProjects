import TestHelpers from "../../Common/modules/testHelpers";
import CommonElementActions from "../../Common/modules/commonElementActions";
import { expect } from '@playwright/test';

class ElementActions extends CommonElementActions {
  constructor(page) {
    super(page)
  }

  async setInputValue(parentElement, inputLocator, value) {

    const inputElement = TestHelpers.getLinkedLocator(parentElement, inputLocator)
    await inputElement.fill(value);
  }

  async checkCheckbox(parentElement, checkboxLocator) {
    const checkboxElement = TestHelpers.getLinkedLocator(parentElement, checkboxLocator)
    const isChecked = await checkboxElement.isChecked();

    if (!isChecked) {
      await checkboxElement.check();
    }
  }

  async uncheckCheckbox(parentElement, checkboxLocator) {
    const checkboxElement = TestHelpers.getLinkedLocator(parentElement, checkboxLocator)
    const isChecked = await checkboxElement.isChecked();

    if (isChecked) {
      await checkboxElement.uncheck();
    }
  }

  async toggleElement(parentElement, toggleLocator, value) {
    const toggleElement = TestHelpers.getLinkedLocator(parentElement, toggleLocator)
    const elementId = await toggleElement.evaluate(el => el.id);
    const labelLocator = await origin.locator(`label[for="${elementId.replace('#', '')}"]`);
    const isToggled = await labelLocator.evaluate(element => element.classList.contains('ui-state-active'));
    if (value !== isToggled) {
      await labelLocator.click();
    }
  }

  async selectDropdownOption(parentElement, dropdownLocator, value) {
    const dropdownElement = TestHelpers.getLinkedLocator(parentElement, dropdownLocator)
    const elementId = await dropdownElement.evaluate(el => el.id);
    const optionElement = await parentElement.locator(`#${elementId} option[value='${value}']`);

    const optionText = await optionElement.textContent();

    const dropdownButtonId = `#${elementId}-button`;
    const dropdownButton = await parentElement.locator(dropdownButtonId);
    await dropdownButton.click();

    const menuId = `#${elementId}-menu`;
    const menuOptionLocator = await parentElement.locator(`ul${menuId} li a:text("${optionText}")`);
    await menuOptionLocator.click();
  }

  static async clickButton(page, selectorOrLocator) {
    if (typeof selectorOrLocator === 'string') {
      await page.locator(`text=${selectorOrLocator}`).click();
    } else {
      await selectorOrLocator.click();
    }
  }

  static async clickMenuItem(page, menuItemName) {
    await page.getByRole('menuitem', { name: menuItemName }).click();
  }
  
  static async isVisible(page, locator) {
    return await page.locator(locator).isVisible();
  }

  static getHeightValueFromStyle(style) {
    const matches = (style || '').match(/height:\s*(\d+(?:[,.]\d+)?)/i);
    return parseFloat(matches?.[1] || '0');
  }

  static getNumericValueFromText(text) {
    const valueMatches = text.match(/([\d]+)(?:\.([\d]+))?/);
    const integerPart = valueMatches?.[1] || '0';
    const decimalPart = valueMatches?.[2] || '0';
    const numericValue = parseFloat(integerPart + '.' + decimalPart);
  
    return numericValue;
  }

  static async checkEventMatch(eventElements, dbEvents, tolleratedEvents) {
    const eventTime = await eventElements[0].textContent();
    const eventComment = await eventElements[3].textContent();
  
    const correspondingDBEvent = dbEvents.find(event => {
      const dbTime = event.dateTime.trim();
      const dbComment = event.action.trimStart();
      return eventTime === dbTime && eventComment === dbComment;
    });
  
    if (!correspondingDBEvent) {
      return tolleratedEvents.includes(eventComment)
    }
    else {
      return true
    }

  }

}

export default ElementActions;
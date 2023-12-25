import TestHelpers from "../../Common/modules/testHelpers";
import CommonElementVerifications from "../../Common/modules/commonElementVerifications";
import { expect } from '@playwright/test';

class ElementVerifications extends CommonElementVerifications {
  constructor(page) {
    super(page)
  }

  async verifyInputValue(parentElement, inputLocator, expectedValue) {
    const inputElement = TestHelpers.getLinkedLocator(parentElement, inputLocator);
    const inputValue = await inputElement.inputValue();
    expect(inputValue, `Значение input ${inputLocator} ожидаемо: ${expectedValue}`).toBe(expectedValue);
  }

  async verifyCheckboxState(parentElement, checkboxLocator, expectedState) {
    const checkboxElement = TestHelpers.getLinkedLocator(parentElement, checkboxLocator);
    const isChecked = await checkboxElement.isChecked();
    expect(isChecked, `Значение checkbox ${checkboxLocator} ожидаемо: ${expectedState}`).toBe(expectedState);
  }

  async verifyToggleState(parentElement, toggleLocator, expectedState) {
    const toggleElement = TestHelpers.getLinkedLocator(parentElement, toggleLocator);
    const elementId = await toggleElement.evaluate(el => el.id);
    const labelLocator = await this.page.locator(`label[for="${elementId.replace('#', '')}"]`);
    const isToggled = await labelLocator.evaluate(element => element.classList.contains('ui-state-active'));
    expect(isToggled, `Значение toggle ${checkboxLocator} ожидаемо: ${isToggled}`).toBe(expectedState);
  }

  async verifyDropdownOptionSelected(parentElement, dropdownLocator, expectedValue) {
    const dropdownElement = TestHelpers.getLinkedLocator(parentElement, dropdownLocator);
    const elementId = await dropdownElement.evaluate(el => el.id);
    const optionElement = await parentElement.locator(`#${elementId} option[value='${expectedValue}']`);
    const optionSelected = await optionElement.evaluate(option => option.hasAttribute('selected'));
    expect(optionSelected, `В Dropdown ${dropdownLocator} выбрана опция: ${expectedValue}`).toBeTruthy();
  }

}

export default ElementVerifications;
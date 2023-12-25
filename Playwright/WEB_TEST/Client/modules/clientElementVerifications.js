import TestHelpers from '../../Common/modules/testHelpers';
import CommonElementVerifications from '../../Common/modules/commonElementVerifications';
import { expect } from '@playwright/test';

class ClientElementVerifications extends CommonElementVerifications{
  constructor(page) {
    super(page)
  }

  async verifyInputValue(parentElement, inputLocator, expectedValue) {
    const inputElement = TestHelpers.getLinkedLocator(parentElement, inputLocator);
    const inputValue = await inputElement.inputValue();
    expect(inputValue).toBe(expectedValue);
  }

  async verifyCheckboxState(parentElement, checkboxLocator, expectedState) {
    const checkboxElement = TestHelpers.getLinkedLocator(parentElement, checkboxLocator);
    const checkboxBox = await checkboxElement.locator('.ui-chkbox-box');
    const isChecked = await checkboxBox.getAttribute('class').then(classes => 
      classes.split(' ').some(cls => ['jstree-unchecked', 'ui-state-active'].includes(cls))
  );
    expect(isChecked).toBe(expectedState);
  }

  async verifyDropdownOptionSelected(parentElement, dropdownLocator, expectedValue) {
    const dropdownElement = TestHelpers.getLinkedLocator(parentElement, dropdownLocator)
    await dropdownElement.click()
    const optionElement = await dropdownElement.locator(`option[value='${value}']`);

    const optionText = await optionElement.textContent();

    const menuLocator = this.page.locator(".ui-dropdown-items")
    const option = await menuLocator.locator(`p-dropdownitem li:has(span:text-is("${optionText}"))`)
    optionIsSelected = await option.getAttribute('aria-selected')
    expect(optionIsSelected == "true").toBeTruthy();
  }

  async verifySelectOption(parentElement, selectLocator, expectedValue) {
    const selectElement = TestHelpers.getLinkedLocator(parentElement, selectLocator)
    const actualValue = await selectElement.inputValue();
    expect(actualValue).toEqual(expectedValue);
  }

  async verifyCalendarDate(parentElement, calendarLocator, expectedDate) {
    const calendarElement = TestHelpers.getLinkedLocator(parentElement, calendarLocator)
    const inputElement = await calendarElement.locator('input');
    const dateValue = await inputElement.inputValue();
    expect(dateValue).toEqual(expectedDate);
  }

}

export default ClientElementVerifications;
import TestHelpers from '../../Common/modules/testHelpers';
import BrowserActions from '../../Common/browserActions';
import CommonElementActions from '../../Common/modules/commonElementActions';
import { expect } from '@playwright/test';

class ClientElementActions extends CommonElementActions {
  constructor(page) {
    super(page)
  }

  async setInputValue(parentElement, inputLocator, value) {

    const inputElement = TestHelpers.getLinkedLocator(parentElement, inputLocator)
    await inputElement.fill(value);
  }

    async checkCheckbox2(parentElement, checkboxLocator) {
      const checkboxElement = TestHelpers.getLinkedLocator(parentElement, checkboxLocator)
      const isChecked = await checkboxElement.isChecked();
  
      if (!isChecked) {
        await checkboxElement.check();
      }
    await BrowserActions.waitForPageReady(this.page)
  }

  async uncheckCheckbox2(parentElement, checkboxLocator) {
    const checkboxElement = TestHelpers.getLinkedLocator(parentElement, checkboxLocator)
    const isChecked = await checkboxElement.isChecked();

    if (isChecked) {
      await checkboxElement.uncheck();
    }
  }

  async checkCheckbox(parentElement, checkboxLocator) {
    const checkboxElement = TestHelpers.getLinkedLocator(parentElement, checkboxLocator)
    const checkboxBox = await checkboxElement.locator('.ui-chkbox-box');
    let isChecked = await checkboxBox.getAttribute('aria-checked')
    while(isChecked == "false") {
      await checkboxBox.click();
      isChecked = await checkboxBox.getAttribute('aria-checked')
    }
    await BrowserActions.waitForPageReady(this.page)
  }

  async uncheckCheckbox(parentElement, checkboxLocator) {
    const checkboxElement = TestHelpers.getLinkedLocator(parentElement, checkboxLocator)
    const checkboxBox = await checkboxElement.locator('.ui-chkbox-box');
    let isChecked = await checkboxBox.getAttribute('aria-checked')
    while(isChecked == "true") {
      await checkboxBox.click();
      isChecked = await checkboxBox.getAttribute('aria-checked')
    }
    await BrowserActions.waitForPageReady(this.page)
  }

  async selectDropdownOption(parentElement, dropdownLocator, value) {
    let dropdownElement = TestHelpers.getLinkedLocator(parentElement, dropdownLocator)
    await dropdownElement.click()
    const optionElement = await dropdownElement.locator(`option[value='${value}']`);

    const optionText = await optionElement.textContent();

    const menuLocator = this.page.locator(".ui-dropdown-items")
    await menuLocator.locator(`p-dropdownitem li:has(span:text-is("${optionText}"))`).click()
    await BrowserActions.waitForPageReady(this.page)
  }

  async selectDropdown2Option(parentElement, dropdownLocator, value) {
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

  async chooseOptionInSelect(parentElement, selectLocator, value) {
    const selectElement = TestHelpers.getLinkedLocator(parentElement, selectLocator)
    await selectElement.selectOption(value)
  }

  async selectDateInCalendar(parentElement, calendarLocator, date) {
    const calendarElement = TestHelpers.getLinkedLocator(parentElement, calendarLocator)
    let [dayValue, monthValue, yearValue] = date.split('.').map(Number).map(String);
    const calendarButton = calendarElement.locator(`button:has-text("ui-btn")`)
    if(await calendarButton.isVisible())
    {
      await calendarButton.click()
    }
    else 
    {
      await calendarElement.click()
    }
    const datePicker = this.page.locator('.ui-datepicker')
    const monthSelect = datePicker.locator('select.ui-datepicker-month')
    monthValue = String(Number(monthValue) -1) 
    await monthSelect.selectOption(monthValue)
    const yearSelect = datePicker.locator('select.ui-datepicker-year')
    await yearSelect.selectOption(yearValue)
    await datePicker.locator(`a:text-is('${dayValue}')`).click()
    await BrowserActions.waitForPageReady(this.page)
    await this.page.waitForTimeout(1000);
  }



}

export default ClientElementActions;
import TestHelpers from './testHelpers';
import { expect } from '@playwright/test';

class CommonElementActions {
  constructor(page) {
    this.page = page;
  }

  async chooseOptionInSelect2(parentElement, selectLocator, value) {
    const selectElement = TestHelpers.getLinkedLocator(parentElement, selectLocator)
    await selectElement.click();

    const activeSelectElement = await this.page.locator('.select2-drop.select2-drop-active[style*="display: block"]');
    const activeSelectElementInput = activeSelectElement.locator('.select2-input')
    const isDropdownType = await activeSelectElementInput.isVisible();
  
    //в зависимости от типа select заполнение происходит по разному
    if (isDropdownType) {
      await activeSelectElementInput.fill(value);
    } else {
      await selectElement.locator('input').fill(value)
    }
    const optionLocator = await this.page.locator(`ul.select2-results li:has(.select2-result-label:has-text("${value}"))`).first();
    await optionLocator.click();
  }

}

export default CommonElementActions;
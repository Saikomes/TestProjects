import TestHelpers from "../../Common/modules/testHelpers";
import { expect } from '@playwright/test';

class CommonElementVerifications {
  constructor(page) {
    this.page = page;
  }

  async verifySelect2Option(parentElement, selectLocator, expectedValue) {
    const selectElement = TestHelpers.getLinkedLocator(parentElement, selectLocator);
    const selectedOptionText = await selectElement.locator(`.select2-chosen`).textContent()
    expect(selectedOptionText, `В Select ${selectLocator} выбрана опция: ${expectedValue}`).toEqual(expectedValue);
  }

}

export default CommonElementVerifications;
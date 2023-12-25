import { readFileSync } from 'fs';

export class TestFunctions {

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

  static async clickButton(page, buttonName) {
    await page.getByRole('button', { name: buttonName }).click();
  }
  
  static async clickMenuItem(page, menuItemName) {
    await page.getByRole('menuitem', { name: menuItemName }).click();
  }
  
  static async isVisible(page, locator) {
    return await page.locator(locator).isVisible();
  }
}

export default TestFunctions
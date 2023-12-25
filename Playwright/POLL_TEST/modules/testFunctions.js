import { readFileSync } from 'fs';
export class TestFunctions {

  static async attachFile(testInfo, fileName) {
    const data = readFileSync(fileName, 'utf8');
    return await testInfo.attach('ws_log.txt', {
        name: 'ws_log.txt',
        contentType: 'text/plain',
        body: Buffer.from(data, 'utf-8')
    });
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
  
        const eventTimeParts = eventTime.split(' ')[1];
        const eventTimeDate = new Date(`1970-01-01T${eventTimeParts}Z`);
  
        const dbTimeParts = dbTime.split(' ')[1];
        const dbTimeDate = new Date(`1970-01-01T${dbTimeParts}Z`);
  
        const timeDifference = Math.abs(eventTimeDate - dbTimeDate);
        const toleranceInMilliseconds = 5
  
        return (timeDifference <= toleranceInMilliseconds && eventComment === dbComment);
    });
  
    if (!correspondingDBEvent) {
      return tolleratedEvents.includes(eventComment);
    } else {
      return true;
    }
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

  static parseCustomDateTime(str) {
    const parts = str.split(' ');
    let datePart, timePart;
  
    // Определение, какая часть строки содержит время
    if (parts[0].includes(':')) {
      [timePart, datePart] = parts;
    } else {
      [datePart, timePart] = parts;
    }
  
    const [day, month, year] = datePart.split('.').map(Number);
    const [hour, minute, second] = timePart.split(':').map(Number);
    
    return new Date(year, month - 1, day, hour, minute, second);
  }

}

export default TestFunctions
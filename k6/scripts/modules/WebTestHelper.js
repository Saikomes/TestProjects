import { check, fail } from 'k6'
import { parseHTML } from "k6/html";

export class WebTestHelper {
  constructor(base_url, timeout, user) {
    this.base_url = base_url
    this.global_timeout = timeout
    this.user = user
  }
  createRequests(urls) {
    let requests = []
    for (let i = 0; i < urls.length; i++) {
      requests.push({
        method: 'GET',
        url: this.base_url + urls[i],
        params: { timeout: this.global_timeout }
      });
    }
    return requests;
  }
  checkStatus(response, groupLabel) {
    check(response, {
      [`Status of request is 200`]: (res) => res.status === 200,
    }) || this.processError(`Status is ${response.status} instead of 200, url: ${response.request.url}`, groupLabel, this.user);
  }
  checkForErrors(response, groupLabel) {
    check(response, {
      [`Response dont have errors`]: (res) => {
        return !res.text().includes('b-exception-message');
      }
    }) || this.processError(`Response contains errors, url: ${response.request.url}`, groupLabel, this.user);
  }
  checkForExpectedTag(response, tag, expected, groupLabel) {
    check(response, {
      [`Found tag ${tag} inner text: ${expected}`]: (res) => {
        let tagValue = res.find(`${tag}`).text()
        if (tagValue == expected) {
          return true;
        } else {
          this.processError(`Tag value is not valid, tag ${tag} value is ${tagValue}`, groupLabel, this.user);
          return false;
        }
      }
    })
  }
  checkTextHTML(response, text, groupLabel, expected = true) {
    if (expected) {
      check(response, {
        [`Found text ${text}`]: (res) => {
          return res.text().includes(`${text}`);
        }
      }) || this.processError(`Response doesn't include expected text: ${text}`, groupLabel, this.user);
    }
    else {
      check(response, {
        [`Unexpected text ${text} is not found`]: (res) => {
          return !res.text().includes(`${text}`);
        }
      }) || this.processError(`Response includes unexpected text: ${text}`, groupLabel, this.user);
    }
  }
  checkForRedirect(request, response, groupLabel) {
    check(response, {
      [`Redirect of ${request} is succesfull`]: (res) => res !== request,
    }) || this.processError('Redirect is not succesfull', groupLabel, this.user);
  }
  parseToHTML(response) {
    return parseHTML(response.body);
  }
  parseToJSON(response) {
    return JSON.parse(response.body);
  }
  checkTextJSON(response, text, groupLabel, expected = true) {
    if (expected) {
      check(text, {
        [`Found text ${text}`]: (res) => {
          return JSON.stringify(res).includes(`${text}`);
        }
      }) || fail(`Response doesn't include expected text: ${text}`);
    }
    else {
      check(response, {
        [`Unexpected text ${text} is found`]: (res) => {
          return !JSON.stringify(res).includes(`${text}`);
        }
      }) || this.processError(`Response includes unexpected text: ${text}`, groupLabel, this.user);
    }
  }
  getJsonValue(response, key) {
    const regexPattern = `"${key}":([a-zA-Z0-9]+)`;
    const regex = new RegExp(regexPattern);
    const matches = response.text().match(regex);
    if (matches && matches.length > 1) {
      return matches[1];
    } else {
      return null;
    }
  }
  getDataText(text, pattern) {
    const regex = new RegExp(pattern);
    const matches = text.match(regex);
    if (matches && matches.length > 1) {
      return matches[1];
    } else {
      return null;
    }
  }
  processError(message, groupLabel, user) {
    const currentTime = new Date().toLocaleString();
    const separator = '\n';
  
    console.error(
      `Error in group: ${groupLabel}, user: ${user.Email}${separator}` +
      `Date and time: ${currentTime}${separator}` +
      `Message: ${message}${separator}`
    );
  
    fail(message);
  }
}

export default WebTestHelper

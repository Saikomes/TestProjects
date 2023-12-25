import { sleep, group } from 'k6'
import http from 'k6/http'
import WebTestHelper from './WebTestHelper.js'

export class CommonSteps {
  constructor(webTestHelper) {
    this.webTestHelper = webTestHelper
    this.token = null
  }
  login(groupName) {
    group(groupName, () => {
      const mainResp = http.get(this.webTestHelper.base_url)
      const urls = ['sb/mainCss.css.v1', 'sb/mainJs.js.v1', 'sb/Account.js.v1',
        'Content/Images/Customer/es_logo_software.svg', 'Content/Images/eso-logo-small.svg', 'Content/Images/Customer/planet.png', 'Content/Images/favicon.png']
      const requests = this.webTestHelper.createRequests(urls)
      const responses = http.batch(requests)
      responses.forEach((response) => {
        this.webTestHelper.checkStatus(response);
      });
      const parsedResp = this.webTestHelper.parseToHTML(mainResp)
      this.webTestHelper.checkStatus(mainResp, groupName)
      this.webTestHelper.checkForErrors(parsedResp, groupName)
      this.webTestHelper.checkForRedirect(this.webTestHelper.base_url, mainResp.url, groupName)
      this.webTestHelper.checkForExpectedTag(parsedResp, 'h2', "Вход в систему", groupName)
      this.token = parsedResp
        .find('input[name=__RequestVerificationToken]')
        .first()
        .attr('value');
    })
  }
  main(groupName) {
    group(groupName, () => {
      const authResponse = http.post(
        this.webTestHelper.base_url + 'Account/Logon',
        {
          __RequestVerificationToken: `${this.token}`,
          Email: `${this.webTestHelper.user.Email}`,
          Password: '12345678',
          RememberMe: `true`,
        },
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        })

      const urls = ['sb/PdfDetector.js.v1',
        'Content/Images/Customer/bell.svg', 'Content/Images/Customer/demo-avatar.svg', 'Content/Images/Customer/down-caret.svg',
        'Content/Images/Customer/CustomerOffice/arrow_underline.svg',
        'Content/Images/Customer/CustomerOffice/icon_accounting_data.svg', 'Content/Images/Customer/CustomerOffice/icon-show-events.svg',
        'Content/Images/Customer/CustomerOffice/icon-report-list-index.svg', 'Content/Images/Customer/CustomerOffice/icon-simplified-view-index.svg',
        'Content/Images/Customer/CustomerOffice/icon-meter-data-entry-index.svg', 'Content/Images/Customer/CustomerOffice/icon-account-membership-details.svg',
        'Content/Images/Customer/CustomerOffice/icon_show_deviation.svg', 'Content/Images/Customer/CustomerOffice/icon-show-power-grid-metrics.svg',
        'Content/Images/Customer/CustomerOffice/icon-%D1%81onsumption-summary-index.svg', 'Content/Images/Customer/CustomerOffice/icon-device-registry-show-device-registry.svg',
        'Content/Images/Customer/CustomerOffice/icon-%D1%81ustomer-plans-index.svg'
      ]
      const batches = this.webTestHelper.createRequests(urls)
      const responses = http.batch(batches)
      responses.forEach((response) => {
        this.webTestHelper.checkStatus(response);
      });
      const parsedResp = this.webTestHelper.parseToHTML(authResponse)
      this.webTestHelper.checkStatus(authResponse, groupName)
      this.webTestHelper.checkForRedirect(authResponse.request.url, authResponse.url, groupName)
      this.webTestHelper.checkForErrors(parsedResp, groupName)
      this.webTestHelper.checkForExpectedTag(parsedResp, 'h1', "Кабинет абонента", groupName)
      this.webTestHelper.checkTextHTML(parsedResp, "Кабинет абонента", groupName)
    })
  }
}

export default CommonSteps

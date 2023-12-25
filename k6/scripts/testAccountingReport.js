import { sleep, group, check } from 'k6'
import http from 'k6/http'
import { Trend } from 'k6/metrics';
import { scenario } from 'k6/execution';
import { SharedArray } from 'k6/data';
import { URLSearchParams } from './modules/urlSearchParams.js'
import { getAngularDepReqs } from './modules/AngularDepReqs.js'
import WebTestHelper from './modules/WebTestHelper.js'
import ValidateReport from './modules/ValidateReport.js'
import DateHelper from './modules/DateHelper.js'
import CommonSteps from './modules/CommonSteps.js'

export let options = {
  scenarios: {
    ramping_vus: {
      exec: 'testAccountingReport',
      executor: 'ramping-vus',
      startVUs: 1,
      stages: [
        { duration: '1m', target: 1 },
        { duration: '1m', target: 0 },
      ],
      gracefulRampDown: '0s',
      gracefulStop: '0s',
    },
  },
};

const reportsDuration = new Trend('report_group_duration', true);
const localUsersPath = "./data/usersAccountingReport.json"
const localReportsPath = "./data/reports.json"
let reportFormat = 'html'

let reports = new SharedArray('reports', function () {
  return JSON.parse(open(localReportsPath)).Reports.Report;
});

let accountingReportUsers = new SharedArray('accountingReportUsers', function () {
  return JSON.parse(open(localUsersPath)).root.users;
});


export function testAccountingReport() {

  let userIndex = scenario.iterationInTest % accountingReportUsers.length
  const userId = `user${__VU}`;
  console.log(`ar user: ${userIndex}`);
  const user = accountingReportUsers[userIndex];
  let reportPageResponse;
  const webTestHelper = new WebTestHelper(__ENV.base_url, __ENV.timeout, user)
  const commonSteps = new CommonSteps(webTestHelper)
  commonSteps.login('ar-01-login')
  sleep((4 + Math.random() - 0.5)*__ENV.scale)
  commonSteps.main('ar-02-main')
  sleep((1 + Math.random() - 0.5)*__ENV.scale)

  group('ar-03-accountingData', function () {
    const reportName = `ar-03-accountingData`
    const mainResp = http.get(__ENV.base_url + 'AccountingData/ShowData')
    const parsedMainResp = webTestHelper.parseToHTML(mainResp)
    const pointIDs = webTestHelper.getJsonValue(parsedMainResp, "NodeObjectId")
    const curDate = DateHelper.getCurrentDayBeginning()
    const paramsGridData = new URLSearchParams({
      level: "3",
      dataKind: '1',
      resourceTypeId: '1',
      endDate: curDate,
      beginDate: DateHelper.getDateOneMonthAgo(curDate),
      groupBy: "3",
      sumByPoint: "false",
      withTariffs: "false",
      withCoeffs: "true",
      onlyTotals: "false",
      cutFromEndDate: "true",
      ptIds: "2,4,6,8",
      showAmount: "1,5,7,9",
      pointIDs: `${pointIDs}`
    });
    const paramsMainTree = new URLSearchParams({
      resourceTypeId: "1",
      isDetalized: "false",
      UrlEncode: "true",
      UseToGroupResults: "false"
    });
    let finalReqs = [
      {
        method: 'GET',
        url: webTestHelper.base_url + `AccountingData/GetGridData/?${paramsGridData.toString()}`,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'x-requested-with': 'XMLHttpRequest',
        },
      },
      {
        method: 'GET',
        url: webTestHelper.base_url + `AccountingData/GetMainTree/?${paramsMainTree.toString()}`,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'x-requested-with': 'XMLHttpRequest',
        },
      },
    ];
    let urls = [
      'Content/Images/Customer/icon-double-up.svg', 'Content/Images/jQuery/ui-icons_ffffff_0.png', 'Angular/images/ae8e3674fd32997dc5217d5d6199a5a5.gif',
      'Content/Images/jQuery/jstree-icons9.png', 'Content/Images/Customer/calendar-icon.svg', 'Angular/fonts/primeicons.ttf', 'Content/Images/jQuery/ui-icons_525252_0.png',
      'Content/Images/accounting-tree-icons.png', 'Content/Images/Customer/status_alarm9.png', 'Content/Images/Customer/status_ok9.png', 'Angular/images/fbd91e98576f66fd2702495251b15240.gif',
      'Content/Images/Customer/chevron-up-icon.svg', 'Content/Images/jQuery/ajax-loader-small.gif',
    ]
    let angularDeps = getAngularDepReqs(parsedMainResp)
    urls = urls.concat(angularDeps)
    const requests = webTestHelper.createRequests(urls)
    finalReqs = finalReqs.concat(requests)
    const responses = http.batch(finalReqs)
    responses.forEach((response) => {
      webTestHelper.checkStatus(response);
    });
    const parsedGetGridData = webTestHelper.parseToJSON(responses[0])
    const parsedGetMainTree = webTestHelper.parseToJSON(responses[1])
    const appJsResponse = responses.find(res => res.request.url.includes('app.js'))
    let urlAngJS = [
      `Angular/js/0.js?${webTestHelper.getDataText(appJsResponse.body, `0:"([a-zA-Z0-9]+)"`)}`,
      `Angular/js/1.js?${webTestHelper.getDataText(appJsResponse.body, `1:"([a-zA-Z0-9]+)"`)}`,
      `Angular/js/7.js?${webTestHelper.getDataText(appJsResponse.body, `7:"([a-zA-Z0-9]+)"`)}`,
    ]
    const angJsRequests = webTestHelper.createRequests(urlAngJS)
    const angJsResponses = http.batch(angJsRequests)
    responses.forEach((angJsResponses) => {
      webTestHelper.checkStatus(angJsResponses);
    });
    webTestHelper.checkStatus(mainResp, reportName)
    webTestHelper.checkTextHTML(parsedMainResp, "Данные получены за период:", reportName)
    webTestHelper.checkTextJSON(parsedGetGridData, "RowIdToPointId", reportName)
    webTestHelper.checkTextJSON(parsedGetMainTree, "NodeObjectId", reportName)
    //simulate angular startup delay(ES-3585)
    sleep((1.2)*__ENV.scale)
  })
  sleep((15 + Math.random() - 0.5)*__ENV.scale)

  group('ar-04-reportPage', function () {
    const reportPageResponse = http.get(__ENV.base_url + 'ReportList')
    const reportName = `ar-04-reportPage`
    const parsedMainResp = webTestHelper.parseToHTML(reportPageResponse)
    const paramsTreeForUser = new URLSearchParams({
      resourceTypeId: "1",
      UrlEncode: "true",
      UseToGroupResults: "false",
      RecordedValue: ""
    });
    let finalReqs = [
      {
        method: 'GET',
        url: webTestHelper.base_url + `AccountingTree/GetTreeForUser/?${paramsTreeForUser.toString()}`,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'x-requested-with': 'XMLHttpRequest',
        },
      },
    ];
    let urls = [
      'Content/Images/jQuery/ui-icons_525252_0.png', 'Content/Images/jQuery/ajax-loader-small.gif', 'Content/Images/Customer/seek-prev.svg',
      'Content/Images/Customer/seek-next.svg', 'Content/Images/Customer/chevron-down-icon.svg'
    ]
    let angularDeps = getAngularDepReqs(parsedMainResp)
    urls = urls.concat(angularDeps)
    const requests = webTestHelper.createRequests(urls)
    finalReqs = finalReqs.concat(requests)
    const responses = http.batch(finalReqs)
    responses.forEach((response) => {
      webTestHelper.checkStatus(response);
    });
    const parsedGetTreeResp = webTestHelper.parseToJSON(responses[0])
    webTestHelper.checkStatus(reportPageResponse, reportName)
    webTestHelper.checkStatus(responses[0], reportName)
    webTestHelper.checkForErrors(parsedMainResp, reportName)
    webTestHelper.checkTextJSON(parsedGetTreeResp, "Статус счетчика", reportName)
    //simulate angular startup delay(ES-3585)
    sleep((0.7)*__ENV.scale)
  })
  sleep((1 + Math.random() - 0.5)*__ENV.scale)
  const startTime = new Date();
  let reportsCount = reports.length
  let reportsSleep = 0
  for (let i = 0; i < reports.length; i++) {
    group(`ar-${i + 5}-${reports[i]._alias}`, function () {
      const curMonth = DateHelper.getCurrentMonthBeginning()
      const reportName = `ar-${i + 5}-${reports[i]._alias}`
      const paramsReport = new URLSearchParams({
        id: reports[i]._id,
        StartDT: DateHelper.getDateOneMonthAgo(curMonth),
        EndDT: curMonth,
        Precision: "2",
        RootPointIDs: "null",
        RateCount: "0",
        FixedNIs: "0",
        ParamTypes: "2",
        format: reportFormat
      });
      const paramsViewerEvent = new URLSearchParams({
        stiweb_component: "Viewer",
        stiweb_action: "Resource",
        stiweb_theme: "Office2022WhiteBlue",
        stiweb_cachemode: "cache",
        stiweb_version: "2023.1.8",
      });
      const paramsReportSnapshot = new URLSearchParams({
        id: reports[i]._id,
        StartDT: curMonth,
        EndDT: DateHelper.getDateOneMonthAfter(curMonth),
        Precision: "2",
        RootPointIDs: "null",
        RateCount: "0",
        FixedNIs: "0",
        ParamTypes: "2",
        format: reportFormat
      });
      const paramsViewerEventScripts = new URLSearchParams(paramsViewerEvent);
      const paramsViewerEventImages = new URLSearchParams(paramsViewerEvent);
      paramsViewerEventImages.append("stiweb_data", "images");
      paramsViewerEventScripts.append("stiweb_data", "scripts");
      reportPageResponse = http.get(webTestHelper.base_url + `Report?${paramsReport.toString()}`)

      let viewerEventScripts = http.get(webTestHelper.base_url + `StiView/ViewerEvent?${paramsViewerEventScripts.toString()}`)
      let viewerEventImages = http.get(webTestHelper.base_url + `StiView/ViewerEvent?${paramsViewerEventImages.toString()}`)
      const reportSnapshotResponse = http.post(
        webTestHelper.base_url + `StiView/GetReportSnapshot?${paramsReportSnapshot.toString()}`,
        {
          stiweb_component: 'Viewer',
          stiweb_action: 'GetReport',
          stiweb_parameters:
            'eyJ2aWV3ZXJJZCI6Ik12Y1ZpZXdlciIsInJvdXRlcyI6eyJjb250cm9sbGVyIjoiUmVwb3J0IiwiYWN0aW9uIjoiSW5kZXgifSwiZm9ybVZhbHVlcyI6e30sImNsaWVudEd1aWQiOiJlYmEwYzMxNmNmOTc0NGNiODI5ZTQzNWE2ODA2MzI4MCIsImRyaWxsRG93bkd1aWQiOm51bGwsImRhc2hib2FyZERyaWxsRG93bkd1aWQiOm51bGwsImNhY2hlTW9kZSI6Ik9iamVjdENhY2hlIiwiY2FjaGVUaW1lb3V0IjoxMCwiY2FjaGVJdGVtUHJpb3JpdHkiOiJOb3JtYWwiLCJwYWdlTnVtYmVyIjowLCJvcmlnaW5hbFBhZ2VOdW1iZXIiOjAsInJlcG9ydFR5cGUiOiJBdXRvIiwiem9vbSI6MTAwLCJ2aWV3TW9kZSI6IlNpbmdsZVBhZ2UiLCJzaG93Qm9va21hcmtzIjp0cnVlLCJvcGVuTGlua3NXaW5kb3ciOiJfYmxhbmsiLCJjaGFydFJlbmRlclR5cGUiOiJBbmltYXRlZFZlY3RvciIsInJlcG9ydERpc3BsYXlNb2RlIjoiRnJvbVJlcG9ydCIsImRyaWxsRG93blBhcmFtZXRlcnMiOltdLCJlZGl0YWJsZVBhcmFtZXRlcnMiOm51bGwsInVzZVJlbGF0aXZlVXJscyI6dHJ1ZSwicGFzc1F1ZXJ5UGFyYW1ldGVyc0ZvclJlc291cmNlcyI6ZmFsc2UsInBhc3NRdWVyeVBhcmFtZXRlcnNUb1JlcG9ydCI6ZmFsc2UsInZlcnNpb24iOiIyMDIzLjEuOCIsInJlcG9ydERlc2lnbmVyTW9kZSI6ZmFsc2UsImltYWdlc1F1YWxpdHkiOiJOb3JtYWwiLCJwYXJhbWV0ZXJzUGFuZWxTb3J0RGF0YUl0ZW1zIjp0cnVlLCJjb21iaW5lUmVwb3J0UGFnZXMiOmZhbHNlLCJhbGxvd0F1dG9VcGRhdGVDb29raWVzIjpmYWxzZX0=',
        },
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      )
      const parsedMainResp = webTestHelper.parseToHTML(reportPageResponse)
      const parsedReportSnapshot = webTestHelper.parseToJSON(reportSnapshotResponse)
      webTestHelper.checkStatus(reportPageResponse, reportName)
      webTestHelper.checkStatus(reportSnapshotResponse, reportName)
      webTestHelper.checkStatus(viewerEventScripts, reportName)
      webTestHelper.checkStatus(viewerEventImages, reportName)
      webTestHelper.checkForErrors(parsedMainResp, reportName)
      webTestHelper.checkForExpectedTag(parsedMainResp, "title", reports[i]._name, reportName)
      webTestHelper.checkTextJSON(parsedReportSnapshot, "reportBookmarks", reportName)
      webTestHelper.checkTextJSON(parsedReportSnapshot, "данные не найдены", reportName, false)
      const validateReport = new ValidateReport(reportFormat, reports[i]._title)
      validateReport.validate(reportSnapshotResponse)
    });
    const waitTime = (15 + Math.random() - 0.5)*__ENV.scale
    reportsSleep += waitTime * 1000

    sleep(waitTime)
  }
  const endTime = new Date();

  const duration = (endTime - startTime - reportsSleep) / reportsCount;
  reportsDuration.add(duration, { group: `::ar-${reports.length + 5}-reportAvg`, userId });
}

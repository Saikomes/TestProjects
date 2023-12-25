import { sleep, group } from 'k6'
import http from 'k6/http'
import { scenario } from 'k6/execution';
import { SharedArray } from 'k6/data';
import { parseHTML } from "k6/html";
import WebTestHelper from './modules/WebTestHelper.js'
import CommonSteps from './modules/CommonSteps.js'

export let options = {
  scenarios: {
    ramping_vus: {
      exec: 'testSimplifiedView',
      executor: 'ramping-vus',
      startVUs: 1,
      stages: [
//        { duration: '1s', target: 1 },
//        { duration: '1m', target: 1 },
        { duration: '60s', target: 250 },
        { duration: '10m', target: 250 },
      ],
      gracefulRampDown: '30s',
      gracefulStop: '30s',
    },
  },
};

const localUsersPath = "./data/users.json"

const simplifiedViewUsers = new SharedArray('simplifiedViewUsers', function () {
  return JSON.parse(open(localUsersPath)).root.users;
});


export function testSimplifiedView() {
  let userIndex = scenario.iterationInTest % simplifiedViewUsers.length
  console.log(`sv user: ${userIndex}`);
  const user = simplifiedViewUsers[userIndex];
  const webTestHelper = new WebTestHelper(__ENV.base_url, __ENV.timeout, user)
  const commonSteps = new CommonSteps(webTestHelper)

  commonSteps.login('sv-01-login')
  sleep((4 + Math.random() - 0.5)*__ENV.scale)
  commonSteps.main('sv-02-main')
  sleep((1 + Math.random() - 0.5)*__ENV.scale)

  group('sv-03-simplifiedView', function () {
    const mainResp = http.get(webTestHelper.base_url + 'SimplifiedView')
    const urls = ['sb/d3.js.v1', 'Content/Images/Customer/warning-icon.svg',
      'Content/Images/jQuery/ui-icons_525252_0.png', 'Content/Images/Customer/seek-prev.svg',
      'Content/Images/Customer/seek-next.svg']
    const requests = webTestHelper.createRequests(urls)
    const responses = http.batch(requests)
    responses.forEach((response) => {
      webTestHelper.checkStatus(response);
    });
    const parsedResp = webTestHelper.parseToHTML(mainResp)
    webTestHelper.checkStatus(mainResp)
    webTestHelper.checkForErrors(parsedResp)
    webTestHelper.checkTextHTML(parsedResp, "Потребление электроэнергии за")
  })
  sleep((15 + Math.random() - 0.5)*__ENV.scale)
}

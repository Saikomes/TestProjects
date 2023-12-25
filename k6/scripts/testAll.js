export { testSimplifiedView } from './testSimplifiedView.js';
export { testAccountingReport } from './testAccountingReport.js';

const simplifiedUsers = Math.round(__ENV.vus * 0.9)
const reportUsers = __ENV.vus - simplifiedUsers

export let options = {
  scenarios: {
    simplifiedView: {
      executor: 'ramping-vus',
      exec: 'testSimplifiedView',
      stages: [
        { duration: '60s', target: simplifiedUsers },
        { duration: '10m', target: simplifiedUsers },
      ],
      gracefulRampDown: '30s',
      gracefulStop: '30s',
    },
    accountingReport: {
      executor: 'ramping-vus',
      exec: 'testAccountingReport',
      stages: [
        { duration: '60s', target: reportUsers },
        { duration: '10m', target: reportUsers },
      ],
      gracefulRampDown: '30s',
      gracefulStop: '30s',
    },
  },
};

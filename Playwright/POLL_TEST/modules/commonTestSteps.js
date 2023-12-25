import fs from 'fs'
import path from 'path';
import BrowserActions from './browserActions';
import TestFunctions from './testFunctions';

export class CommonTestSteps {
static setupTest = async (browser, testInfo, wsLogFileName) => {
  let page;
  let wsLogStream;
  let wsLogPath;

  const wsLogsDir = path.join(testInfo.outputDir, "wsLogs");
  wsLogPath = path.join(wsLogsDir, wsLogFileName);
  fs.mkdirSync(wsLogsDir, { recursive: true });
  const setupResult = await BrowserActions.setup(browser, wsLogPath);

  page = setupResult.page;
  wsLogStream = setupResult.wsLogStream;

  return { page, wsLogStream, wsLogPath };
};

static teardownTest = async (page, wsLogStream) => {
  await BrowserActions.teardown(page, wsLogStream);
};

static beforeEachTest = async (wsLogPath) => {
  fs.truncate(wsLogPath, 0, () => {});
};

static afterEachTest = async (testInfo, wsLogPath) => {
  await TestFunctions.attachFile(testInfo, wsLogPath);
};
}
export default CommonTestSteps 
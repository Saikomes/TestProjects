import ResponseChecker from "./responseChecker";
import BrowserActions from "./browserActions";
import { expect } from "@playwright/test";
export class TestUtils {

    static async setupTest(browser, url, testInfo) {
        const page = await BrowserActions.setup(browser, url);
        const checker = new ResponseChecker(testInfo);
        await checker.checkReqsForErrors(page);
        return { page, checker };
    }

    static async teardownTest(checker, page, expectedExceptions = false) {
        const failedRequests = checker.getFailedRequests();
        if(expectedExceptions) {
            expect(failedRequests).toEqual([]);
        }
        await BrowserActions.teardown(page);
    }
}
export default TestUtils
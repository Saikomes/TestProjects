import BrowserActions from './browserActions';
import PageActions from './pageActions';
import ResponseChecker from '../../Common/responseChecker';
import { expect } from '@playwright/test';


export class TestUtils {

    static async setupTest(browser) {
        const page = await BrowserActions.setup(browser);
        const checker = new ResponseChecker();
        await checker.checkReqsForErrors(page);
        await PageActions.login(page);
        
        return { page, checker };
    }

    static async teardownTest(checker, page) {
        const failedRequests = checker.getFailedRequests();
        // expect(failedRequests).toEqual([]);
        await BrowserActions.teardown(page);
    }
}

export default TestUtils

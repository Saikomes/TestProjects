import BrowserActions from './browserActions';
import PageActions from './pageActions';
import RequestChecker from '../../Common/requestChecker';
import { expect } from '@playwright/test';
import CommonElements from '../locators/CommonElements';


export class TestUtils {

    static async setupTest(browser) {
        const page = await BrowserActions.setup(browser);
        const checker = new RequestChecker();
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

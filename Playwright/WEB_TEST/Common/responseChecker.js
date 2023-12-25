import path from "path";
import { test, expect } from '@playwright/test';
import fs from 'fs/promises';

class ResponseChecker {
    constructor(testInfo) {
        this.failedRequests = [];
        this.testInfo = testInfo;
    }

    async attachFile(requestUrl, buffer) {
        return await this.testInfo.attach(requestUrl.replace(/\W/g, '_') + '.txt', {
            name: requestUrl.replace(/\W/g, '_') + '.txt',
            contentType: 'text/plain',
            body: buffer
        });
    }

    async checkReqsForErrors(page) {
        page.on('requestfinished', async (request) => {
            const response = await request.response();
            const requestUrl = request.url();
            let requestFailed = false
            if (response) {
                const status = response.status();
                let responseBody = "";
                let buffer;
                const contentType = response.headers()['content-type'] || '';

                let isFileAttached = false;

                if (status !== 200 && status !== 302) {
                    this.failedRequests.push({
                        url: requestUrl,
                        statusError: `Incorrect status: ${status}`
                    });
                    requestFailed = true
                }

                if (contentType.includes('javascript') || contentType.startsWith('image/') || contentType == 'text/css' || contentType == 'application/json') {
                    return;
                }
                else if (requestFailed) {
                    try {
                        buffer = await response.body();
                        await this.attachFile(requestUrl, buffer);
                        isFileAttached = true;
                    } catch (err) {
                        console.error(`Error while trying to read and attach the response body. status: ${status}, url: ${requestUrl}`);
                    }
                }

                if (status !== 302) {
                    try {
                        buffer = await response.body();
                        responseBody = buffer.toString('utf8')
                    } catch (err) {
                        console.error(`Error while trying to convert the response body to string. status: ${status}, url: ${requestUrl}`);
                    };
                }

                if (responseBody.includes("b-exception-message")) {
                    if (!isFileAttached) {
                        await this.attachFile(requestUrl, buffer);
                    }

                    this.failedRequests.push({
                        url: requestUrl,
                        textError: "Response contains b-exception-message"
                    });
                }
            } else {
                console.error(`Request to ${requestUrl} did not receive a valid HTTP response.`);
            }
        });
    }

    getFailedRequests() {
        return this.failedRequests;
    }
}

export default ResponseChecker

import fs from 'fs';
import TestConfig from '../config/testConfig';
import TestFunctions from './testFunctions';
const iconv = require('iconv-lite');

export class BrowserActions {
    static async setup(browser, wsLogFileName) {
        const page = await browser.newPage();
    
        const wsLogStream = fs.createWriteStream(wsLogFileName, {flags: 'a'});
        page.on('websocket', ws => {
            wsLogStream.write(Buffer.from(`WebSocket opened: ${ws.url()}\n`, 'utf8'));
            ws.on('framesent', event => wsLogStream.write(Buffer.from(`Frame sent: ${JSON.stringify(event.payload)}\n`, 'utf8')));
            ws.on('framereceived', event => wsLogStream.write(Buffer.from(`Frame received: ${JSON.stringify(event.payload)}\n`, 'utf8')));
            ws.on('close', () => wsLogStream.write(Buffer.from('WebSocket closed\n', 'utf8')));
        });

        await page.goto(TestConfig.BASE_URL);
        return {page, wsLogStream};
    }

    static async teardown(page, wsLogStream) {
        await wsLogStream.end()
        await page.close();
    }
}


export default BrowserActions;

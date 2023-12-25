import { defineConfig, devices } from '@playwright/test';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();
//   require('dotenv').config({ path: './envVars.env' });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    /* Maximum time one test can run for. */
    timeout: 3600 * 1000,
    outputDir: 'playwright-report/',
    expect: {
        /**
         * Maximum time expect() should wait for the condition to be met.
         * For example in `await expect(locator).toHaveText();`
         */
        timeout: 20000
    },
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: 1,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        ['monocart-reporter', {
            name: "Test Report",
            outputFile: './playwright-report/index.html',
            traceViewerUrl: 'https://trace.playwright.dev/?trace={traceUrl}',
            attachmentPath: (currentPath, extras) => {
                // console.log(currentPath, extras);
                // return `https://cenfun.github.io/monocart-reporter/${relativePath}`;
            },

            visitor: (data, metadata, collect) => {

                // auto collect data from the comments
                const parserOptions = {
                    // Indicate the mode the code should be parsed in.
                    // Can be one of "script", "module", or "unambiguous". Defaults to "script".
                    sourceType: 'module',

                    // enable typescript syntax.
                    plugins: ['typescript']

                    // more https://babeljs.io/docs/babel-parser
                };
                const comments = collect.comments(parserOptions);
                if (comments) {
                    // Append all collected comments data to report data
                    Object.assign(data, comments);
                }

            },
            // custom columns
            columns: (defaultColumns) => {

                // insert custom column(s) before a default column
                const index = defaultColumns.findIndex((column) => column.id === 'duration');
                defaultColumns.splice(index, 0, {
                    // define the column in reporter
                    id: 'owner',
                    name: 'Owner',
                    align: 'center',
                    searchable: true,
                    styleMap: {
                        'font-weight': 'normal'
                    }
                }, {
                    // another column for JIRA link
                    id: 'jira',
                    name: 'JIRA Key',
                    width: 100,
                    searchable: true,
                    styleMap: 'font-weight:normal;',
                    formatter: (v, rowItem, columnItem) => {
                        const key = rowItem[columnItem.id];
                        return `<a href="https://your-jira-url/${key}" target="_blank">${v}</a>`;
                    }
                });

                // append grouped columns
                // defaultColumns.push({
                //     id: 'group',
                //     name: 'Group',
                //     subs: [{
                //         id: 'item1',
                //         name: 'Item 1'
                //     }, {
                //         id: 'item2',
                //         name: 'Item 2'
                //     }]
                // });

                defaultColumns.push({
                    id: 'description',
                    name: 'Description',
                    width: 300,
                    markdown: true,
                    searchable: true
                });

            }
        }]
    ],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
        actionTimeout: 40000,
        /* Base URL to use in actions like `await page.goto('/')`. */
        // baseURL: 'http://localhost:3000',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on',
        video: {
            mode: 'off',
            size: { width: 640, height: 480 }
        }
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
            viewport: { width: 1920, height: 1080 },
        },

         // {
             // name: 'firefox',
             // use: { ...devices['Desktop Firefox'],
             // viewport: { width: 1920, height: 1080 },
             // headless: false,
             // },
         // },

        // {
            // name: 'webkit',
            // use: { ...devices['Desktop Safari'],
                   // viewport: { width: 1920, height: 1080 },
            // },
        // },

        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'] },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: { ...devices['iPhone 12'] },
        // },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: { channel: 'msedge' },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: { channel: 'chrome' },
        // },
    ],

    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    // outputDir: 'test-results/',

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   port: 3000,
    // },
});

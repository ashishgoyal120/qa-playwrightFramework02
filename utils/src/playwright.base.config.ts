import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';


type EnvName = 'local' | 'stage';

interface CreateBasePlaywrightConfigOptions {
    baseURLMap: Record<EnvName, string>;
}

export function createBasePlaywrightConfig({ baseURLMap }: CreateBasePlaywrightConfigOptions) {
    const environment = (process.env.ENV as EnvName) || 'local';
    const baseURL = baseURLMap[environment];

    if (!baseURL) {
        throw new Error(`Missing baseURL for enviornment "${environment}"`);
    }

    const outputDir = path.resolve('distReports/.playwright/reports');

    return defineConfig({
        testDir: './tests',
        timeout: environment === 'local' ? 60 * 1000 : 60 * 1000,
        expect: {
            timeout: environment === 'local' ? 10 * 1000 : 10 * 1000
        },
        use: {
            baseURL,
            screenshot: 'only-on-failure',
            video: 'off',
            trace: 'off'
        },
        outputDir: path.join(outputDir, 'test-results'),
        reporter: [
            [
                'json',
                {
                    outputFile: path.join(outputDir, 'json-report/results.json')
                }
            ],
            [
                'html',
                {
                    outputFolder: path.join(outputDir, 'playwright-report'),
                    open: 'always'

                }
            ]
        ],
        // ...(environment !== 'stage' ? {} : {}),
        projects: [
            {
                name: 'setup',
                testDir: path.resolve('utils/src'),
                testMatch: /.*auth\.setup\.ts/
            },
            {
                name: 'chromium',
                use: {
                    ...devices['Desktop Chrome'],
                    storageState: 'playwright/.auth/storageState.json'
                },
                dependencies: ['setup']
            },
            // {
            //     name: 'firefox',
            //     use: {
            //         ...devices['Desktop Firefox'],
            //         storageState: 'playwright/.auth/storageState.json'
            //     },
            //     dependencies: ['setup']
            // }
        ]
    })
}
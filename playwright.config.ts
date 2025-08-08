import { createBasePlaywrightConfig } from "./utils/src/playwright.base.config";

export default createBasePlaywrightConfig({
  baseURLMap: {
    'local': 'https://opensource-demo.orangehrmlive.com/',
    'stage': 'https://Google.com/'
  }
})
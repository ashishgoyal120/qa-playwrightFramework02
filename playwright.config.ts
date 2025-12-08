import { createBasePlaywrightConfig } from "./utils/src/playwright.base.config";

export default createBasePlaywrightConfig({
  baseURLMap: {
    'qa': 'https://opensource-demo.orangehrmlive.com/',
    'stage': 'https://Google.com/',
    local: 'https://Google.com/',
  }
})
import {
    Before,
    After
} from "@cucumber/cucumber"
import { Builder } from 'selenium-webdriver'
import * as fs from "fs"


Before(
    async function() {
        const driver = new Builder().forBrowser("chrome").build()
        await driver.manage().window().maximize()

        global.gdriver = driver
    }
)

After(
    async function(scenario) {

        const scenarioStatus = scenario.result?.status

        if (scenarioStatus === 'FAILED') {
            global.gdriver.takeScreenshot().then(
                (image) => {
                    fs.writeFileSync(`./reports/screenshots/${scenario.pickle.name}.png`, image, 'base64')
                }
            )
        }

        await global.gdriver.quit()
    }
)
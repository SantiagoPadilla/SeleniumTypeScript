import {
    Before,
    After
} from "@cucumber/cucumber"

import * as fs from "fs"
import { env } from '../../env/parseEnv'
import { ScenarioWorld } from "./world"


Before(
    
    async function(this: ScenarioWorld, scenario) {

        const ready = await this.init()
        return ready

    }
)

After(
    async function(this: ScenarioWorld, scenario) {
        const {
            screen: { driver }
        } = this

        const scenarioStatus = scenario.result?.status

        if (scenarioStatus === 'FAILED') {

            driver.takeScreenshot().then(
                (image) => {
                    fs.writeFileSync(`${env('SCREENSHOT_PATH')}${scenario.pickle.name}.png`, image, 'base64')
                }
            )

        }

        await driver.quit()
    }
)
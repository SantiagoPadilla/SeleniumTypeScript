import { Builder, WebDriver } from 'selenium-webdriver'
import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber'
import { env } from '../../env/parseEnv'
import { stringIsOfOptions } from '../../support/options-helper'
import firefox from 'selenium-webdriver/firefox'
import { Options } from 'selenium-webdriver/firefox'


export type Screen = {
    driver: WebDriver
}

export class ScenarioWorld extends World {
    constructor(options: IWorldOptions) {
        super(options)
    }

    screen!: Screen

    async init(): Promise<Screen>{
        const browser = await this.newBrowser()
        const browserBuilder = await this.browserBuildr(browser)
        const driver = browserBuilder.build()
        await driver.manage().window().maximize()

        this.screen = { driver }

        return this.screen
    }

    private newBrowser = async(): Promise<string> => {
        const automationBrowser = env('UI_AUTOMATION_BROWSER')
        const automationBrowsers = ['chrome', 'firefox']
        const validAutomationBrowser = stringIsOfOptions(automationBrowser, automationBrowsers)
        return validAutomationBrowser
    }

    private browserBuildr = async(browser: string): Promise<Builder> => {

        const builder = new Builder()
        switch(browser) {
            case "chrome": {
                const chromeOptions = (new Options())

                // chromeOptions.addArguments(
                //     env('BROWSER_ARGUMENTS')
                // )

                return builder.forBrowser(browser)/*.withCapabilities(chromeOptions)*/
                break
            }
            case "firefox": {
                const firefoxOptions = new firefox.Options()
                firefoxOptions.addArguments(env('BROWSER_ARGUMENTS'))
                firefoxOptions.set("acceptInsecureCerts", true)

                return builder.forBrowser(browser).setFirefoxOptions(firefoxOptions)
                break
            }
            default: {
                return builder.forBrowser(browser)
                break
            }
        }
    }
}

setWorldConstructor(ScenarioWorld)
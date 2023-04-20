import { Given, setDefaultTimeout } from '@cucumber/cucumber'
import { until, By } from 'selenium-webdriver'
import { GoogleSearch } from '../pages/google_search_page'
import { ScenarioWorld } from './setup/world'

setDefaultTimeout(2 * 10000)

Given("you navigate to {string}", 
async function (this: ScenarioWorld, url) {
    const { 
        screen: {driver}
    } = this

    await driver.get(url)

})

Given("you accept the google cookies", 
async function (this: ScenarioWorld) {
    const { 
        screen: {driver}
    } = this

    const googleSearch = new GoogleSearch()
    const cookieButton = await driver.findElement(googleSearch.elements.cookiesButton)
    await driver.wait(until.elementIsVisible(cookieButton)).click();
    
})

import { When, setDefaultTimeout } from '@cucumber/cucumber'
import { By, until, Key } from 'selenium-webdriver'
import { GoogleSearch } from '../pages/google_search_page'
import { ScenarioWorld } from './setup/world'

setDefaultTimeout(2 * 10000)

When("you search the word {string}", 
async function(this: ScenarioWorld, searchText) {
    const { 
        screen: {driver}
    } = this

    const googleSearch = new GoogleSearch()
    const searchTextField = await driver.findElement(googleSearch.elements.searchTextField)
    await driver.wait(until.elementIsVisible(searchTextField))
    await searchTextField.sendKeys(searchText)
    await searchTextField.sendKeys(Key.ENTER)

})


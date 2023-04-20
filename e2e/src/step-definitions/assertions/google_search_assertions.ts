import { Then, setDefaultTimeout } from '@cucumber/cucumber'
import { expect } from 'chai'
import { until } from 'selenium-webdriver'
import { GoogleSearch } from '../../pages/google_search_page'
import { ScenarioWorld } from '../setup/world'

setDefaultTimeout(2 * 10000)

Then("you validate that the search results are less than {string}", 
async function (this: ScenarioWorld, num: string) {
    const { 
        screen: {driver}
    } = this

    const googleSearch = new GoogleSearch()
    const textResultElement = await driver.findElement(googleSearch.elements.textResult)
    await driver.wait(until.elementIsVisible(textResultElement))
    const textResult = await textResultElement.getAttribute("innerText")
    const isLessThan = BigInt(textResult.split(" ")[1].replaceAll(".", "")) < BigInt(num)
    expect(isLessThan).to.be.true

})

Then("you validate that the search results are more than {string}", 
async function (this: ScenarioWorld, num: string) {
    const { 
        screen: {driver}
    } = this

    const googleSearch = new GoogleSearch()
    const textResultElement = await driver.findElement(googleSearch.elements.textResult)
    await driver.wait(until.elementIsVisible(textResultElement))
    const textResult = await textResultElement.getAttribute("innerText")
    const isBiggerThan = BigInt(textResult.split(" ")[1].replaceAll(".", "")) > BigInt(num)
    expect(isBiggerThan).to.be.true

})
import { Then, setDefaultTimeout } from '@cucumber/cucumber'
import { expect } from 'chai'
import { By, until, Key } from 'selenium-webdriver'
import { GoogleSearch } from '../../pages/google_search_page'

setDefaultTimeout(2 * 5000)

Then("you validate that the search results are less than {string}", async (num) =>{

    const googleSearch = new GoogleSearch()
    const textResultElement = await global.gdriver.findElement(googleSearch.elements.textResult)
    await global.gdriver.wait(until.elementIsVisible(textResultElement))
    const textResult = await textResultElement.getAttribute("innerText")
    const isLessThan = BigInt(textResult.split(" ")[1].replaceAll(".", "")) < BigInt(num)
    expect(isLessThan).to.be.true

})

Then("you validate that the search results are more than {string}", async (num) =>{

    const googleSearch = new GoogleSearch()
    const textResultElement = await global.gdriver.findElement(googleSearch.elements.textResult)
    await global.gdriver.wait(until.elementIsVisible(textResultElement))
    const textResult = await textResultElement.getAttribute("innerText")
    const isBiggerThan = BigInt(textResult.split(" ")[1].replaceAll(".", "")) > BigInt(num)
    expect(isBiggerThan).to.be.true

})
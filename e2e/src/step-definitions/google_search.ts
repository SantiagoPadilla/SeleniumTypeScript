import { When, setDefaultTimeout } from '@cucumber/cucumber'
import { By, until, Key } from 'selenium-webdriver'
import { GoogleSearch } from '../pages/google_search_page'

setDefaultTimeout(2 * 5000)

When("you search the word {string}", async (searchText) => {

    const googleSearch = new GoogleSearch()
    const searchTextField = await global.gdriver.findElement(googleSearch.elements.searchTextField)
    await global.gdriver.wait(until.elementIsVisible(searchTextField))
    await searchTextField.sendKeys(searchText)
    await searchTextField.sendKeys(Key.ENTER);

})


import { Given, setDefaultTimeout } from '@cucumber/cucumber'
import { until, By } from 'selenium-webdriver'
import { GoogleSearch } from '../pages/google_search_page'

setDefaultTimeout(2 * 5000)

Given("you navigate to {string}", async (url) => {

    await global.gdriver.get(url)

})

Given("you accept the google cookies", async () => {
    const googleSearch = new GoogleSearch()
    const cookieButton = await global.gdriver.findElement(googleSearch.elements.cookiesButton)
    await global.gdriver.wait(until.elementIsVisible(cookieButton)).click();
    
})

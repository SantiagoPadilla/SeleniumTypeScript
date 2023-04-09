import { By, until, Key } from 'selenium-webdriver'

export class GoogleSearch {

    elements = {
        searchTextField: By.css(".gLFyf"),
        textResult: By.css("#result-stats"),
        cookiesButton: By.css("#L2AGLb > .QS5gu")
    }

}
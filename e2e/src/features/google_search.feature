@regression
Feature: Search for a specific word on Google and validate the number of search results

Background: 
  Given you navigate to 'https://www.google.es/'
  And you accept the google cookies

Scenario: Search Apple on google and validate the search results, which show less than 10000
  When you search the word "Apple"
  Then you validate that the search results are less than "10000"

Scenario: Search Apple on google and validate the search results, which show more than 100000
  When you search the word "Apple"
  Then you validate that the search results are more than "100000"
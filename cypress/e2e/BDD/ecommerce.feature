Feature: End to End Ecommerce Validation

@Sanity
Scenario: Ecommerce Products delivery
Given I am on Ecommerce page
When I login into the application
And I add items to cart
And Validate the total price limit
Then select the country and purchase successfully

@Smoke 
Scenario Outline: Ecommerce Products delivery with Outline(cucumber driven)

Given I am on Ecommerce page
When I login into the application portal
| username               |  password |
| rahulshettyacademy     |  learning | 
And I add items to cart
And Validate the total price limit
Then select the country and purchase successfully

#use scenario Outline when passing the credentials from feature file
#to run = npx cypress run --env tags = "Smoke" --headed
# @smoke are consider as tagging helps to run group of scenarios
Feature: Home Page

Scenario: Home page successfully launch
Given User validate the home page loaded successfully

Scenario: Validate electronics home page banner
Given User validate the home page loaded successfully
Then User validate the home page banner

Scenario: Home page list of products
Given User validate the home page loaded successfully
Then User validate list of products are showing in home page

Scenario Outline: Home page top nav shopping category
Given User validate the home page loaded successfully
Then User validate top navigation shopping categories "<categories>"
Examples:
| categories                                                            |
| Fashion,Electronics,Food,Books,Jewelry,Beauty,Home,Sports,Kids,Garden |

Scenario: Home page side panel categories
Given User validate the home page loaded successfully
Then User validate side panel categories "<categories>"
Examples:
| categories                         |
| CATEGORY,PRICE,COLOR,BRAND,STORAGE |

Scenario Outline: Home page verify different language dropdown
Given User validate the home page loaded successfully
Then User verify the different language "<diffLanguage>" dropdown

Examples:
| diffLanguage |
| English,Français,Deutsch,Italiano|

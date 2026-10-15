Feature: Login Page Test Cases

Scenario Outline: Verify email, password and ogin button
Given User validate the home page loaded successfully
Then User click on login profile button
Then User verify "<emailBox>" textbox
Then User verify "<passBox>" textbox
Then User verify login button
Examples:
| emailBox | passBox |
| email    | pass    |

Scenario Outline: User login into the application
Given User validate the home page loaded successfully
Then User click on login profile button
Then User enter "<emailId>" in "<emailTxtBox>" textbox
Then User enter "<PassWord>" in "<passTxtBox>" textbox
Then User click on login button
Then User verify login dashboard
Examples:
| emailId           | emailTxtBox | PassWord   | passTxtBox |
| testing@gmail.com | email       | Shahbaz123 | pass       |

Scenario Outline: User login with wrong password
Given User validate the home page loaded successfully
Then User click on login profile button
Then User enter "<emailId>" in "<emailTxtBox>" textbox
Then User enter "<PassWord>" in "<passTxtBox>" textbox
Then User click on login button
Then User verify failed login
Examples:
| emailId           | emailTxtBox | PassWord  | passTxtBox |
| testing@gmail.com | email       | WrongPass | pass       |

Scenario Outline: User login with wrong email
Given User validate the home page loaded successfully
Then User click on login profile button
Then User enter "<emailId>" in "<emailTxtBox>" textbox
Then User enter "<PassWord>" in "<passTxtBox>" textbox
Then User click on login button
Then User verify failed login
Examples:
| emailId         | emailTxtBox | PassWord   | passTxtBox |
| XXXXX@gmail.com | email       | Shahbaz123 | pass       |
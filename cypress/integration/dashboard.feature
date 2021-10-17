Feature: Department Head Dashboard
  Department head can see departments
  Department head can click each department to see employees time record

  Scenario: See all departments
    Given I visit on the login page
    When I fill in "email" with "test@email.com"
    And I fill in "password" with "1234"
    And I press "Login"
    Then I should be on the dashboard page
    And I should see "งานเชือดไก่", "งานถอนขนไก่" and "งานไก่ตกราว"

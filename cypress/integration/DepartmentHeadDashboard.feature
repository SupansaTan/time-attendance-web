Feature: Department Head Dashboard
  Department head can see departments
  Department head can click each department to see employees time record

  Scenario: See all departments
    Given I visit on the login page
    When I fill in "email" with "7@gmail.com"
    And I fill in "password" with "0007"
    And I press "Login"
    Then I should be on the dashboard page
    And I should see "เชือดไก่ 1" and "ถอนขนไก่ 1"  

  Scenario: See employees time record
    Given I visit on the login page
    When I fill in "email" with "7@gmail.com"
    And I fill in "password" with "0007"
    And I press "Login"
    Then I should be on the dashboard page
    When I press "เชือดไก่ 1"
    And I should see "Department" and "เชือดไก่ 1"
    And I should see "Time Record"

Feature: Employee Dashboard
  Employee can see informations, shift/OT plan and actual

  Scenario: see employee informations
    Given I visit on the login page
    When I fill in "email" with "1@gmail.com"
    And I fill in "password" with "0001"
    And I press "Login"
    Then I should be on the dashboard page
    And I should see "Employee Informations"
    And I should see "Dapartment" with "เชือดไก่ 1"
    And I should see "Employee Type" with "daily"

 Scenario: see Shift and OT actual
    Given I visit on the login page
    When I fill in "email" with "1@gmail.com"
    And I fill in "password" with "0001"
    And I press "Login"
    Then I should be on the dashboard page
    And I should see "Start Time", "End Time" and "OT"
    
  Scenario: see Shift and OT plan
    Given I visit on the login page
    When I fill in "email" with "1@gmail.com"
    And I fill in "password" with "0001"
    And I press "Login"
    Then I should be on the dashboard page
    And I should see "Shift", "OT" and "Break Time"

 

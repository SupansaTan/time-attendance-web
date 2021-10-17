Feature: Employee Dashboard
  Employee can see informations, shift/OT plan and actual

  Scenario: see employee informations
    Given I visit on the login page
    When I fill in "email" with "employee@email.com"
    And I fill in "password" with "1234"
    And I press "Login"
    Then I should be on the dashboard page
    And I should see "Employee Informations"
    And I should see "Dapartment" with "งานไก่ตกราว"
    And I should see "Employee Type" with "Monthly"

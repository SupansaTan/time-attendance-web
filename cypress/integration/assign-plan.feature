Feature: Department Head Assign Plan
  Department Head can see departments and assign shift/OT plan

  Scenario: See all departments
    Given I visit on the login page
    When I fill in "email" with "7@gmail.com"
    And I fill in "password" with "0007"
    And I press "Login"
    Then I should be on the dashboard page
    When I click Assign Plan
    Then I should be on the assign plan page
    Then I should see "Departments"
    And I should see "เชือดไก่ 1" and "ถอนขนไก่ 1" 

  Scenario: Department Head select assign shift mode
    Given I visit on the Assign Plan Page
    Then I should see "Departments"
    And I should see "เชือดไก่ 1" and "ถอนขนไก่ 1" 
    When I press "ถอนขนไก่ 1"
    Then I should be on the Assign Plan Page
    And I should see "Assign"
    When I click on "Shift" Mode
    And I select "From" with "12/09/2564"
    And I select "To" with "12/09/2564"
    Then I can see "Employees" Table
    And I click checkbox of "ดำเนิน เหินเวหา"
    And I select "Shift" with "09:00"
    And I press "Submit"
    Then I should see "09:00 - 17:00" in "Shift" field of "ดำเนิน เหินเวหา"

  Scenario: Department Head select assign OT mode
    Given I visit on the Assign Plan Page
    Then I should see "Departments"
<<<<<<< HEAD
    And I should see "เชือดไก่ 1" and "ถอนขนไก่ 1" 
    When I press "เชือดไก่ 1"
=======
    And I should see "ถอนขนไก่ 1" and "งานไก่ตกราว 1"
    When I press "ถอนขนไก่ 1"
>>>>>>> 6e20f585534c433e51d3ee50fefc3da991527bb7
    Then I should be on the Assign Plan Page
    And I should see "Assign"
    When I click on "OT" Mode
    And I select "From" with "12/09/2564"
    And I select "To" with "12/09/2564"
    Then I can see "Employees" Table
    And I click checkbox of "ดำเนิน เหินเวหา"
    And I select "OT" with "2.5"
    And I press "Submit"
    Then I should see "2.5" in "OT Plan" field of "ดำเนิน เหินเวหา"

  Scenario: Department Head select assign shift and OT mode
    Given I visit on the Assign Plan Page
    Then I should see "Departments"
    And I should see "เชือดไก่ 1" and "ถอนขนไก่ 1"  
    When I press "เชือดไก่ 1"
    Then I should be on the Assign Plan Page
    And I should see "Assign"
    When I click on "Shift" and "OT" Mode
    And I select "From" with "12/09/2564"
    And I select "To" with "12/09/2564"
    Then I can see "Employees" Table
    And I click checkbox of "ภูวดล พาสกุล"
    And I select "Shift" with "09:00"
    And I select "OT" with "2.5"
    And I press "Submit"
    Then I should see "09:00 - 17:00" in "Shift" field of "ภูวดล พาสกุล"
    And I should see "2.5" in "OT Plan" field of "ภูวดล พาสกุล"

Feature: Department Head Assign Plan
  Department Head can see departments and assign shift/OT plan

  Scenario: See all departments
    Given I visit on the login page
    When I fill in "email" with "5@gmail.com"
    And I fill in "password" with "0005"
    And I press "Login"
    Then I should be on the dashboard page
    When I click Assign Plan
    Then I should be on the assign plan page
    Then I should see "Departments"
    And I should see "ถอนขนไก่ 1" and "งานไก่ตกราว 1" 

  Scenario: Department Head select assign shift mode
    Given I visit on the login page
    When I fill in "email" with "5@gmail.com"
    And I fill in "password" with "0005"
    And I press "Login"
    Then I should be on the dashboard page
    When I click Assign Plan
    Then I should be on the assign plan page
    Then I should see "Departments"
    And I should see "ถอนขนไก่ 1" and "งานไก่ตกราว 1"  
    When I press "ถอนขนไก่ 1"
    Then I should be on the Assign Plan Page
    And I should see "Assign"
    When I click on "Shift" Mode
    And I can see "From" 
    And I can see "To" 
    Then I can see "Employees" Table
    And I can see checkbox of  "ดำเนิน เหินเวหา"
    And I can see "Start Shift" with "09:00"
    Then I should see "01:00 - 10:00" in "Shift" field of "ดำเนิน เหินเวหา"

  Scenario: Department Head select assign OT mode
    Given I visit on the login page
    When I fill in "email" with "5@gmail.com"
    And I fill in "password" with "0005"
    And I press "Login"
    Then I should be on the dashboard page
    When I click Assign Plan
    Then I should be on the assign plan page
    Then I should see "Departments"
<<<<<<< HEAD
    And I should see "เชือดไก่ 1" and "ถอนขนไก่ 1" 
    When I press "เชือดไก่ 1"
=======
    And I should see "ถอนขนไก่ 1" and "งานไก่ตกราว 1" 
    When I press "ถอนขนไก่ 1"
>>>>>>> BDD
    Then I should be on the Assign Plan Page
    And I should see "Assign"
    When I click on "OT" Mode
    And I can see "From" 
    And I can see "To" 
    Then I can see "Employees" Table
    And  I can see checkbox of  "ดำเนิน เหินเวหา"
    And I select "OT" with "3"
    Then I should see "3" in "OT Plan" field of "ดำเนิน เหินเวหา"

  Scenario: Department Head select assign shift and OT mode
    Given I visit on the login page
    When I fill in "email" with "5@gmail.com"
    And I fill in "password" with "0005"
    And I press "Login"
    Then I should be on the dashboard page
    When I click Assign Plan
    Then I should be on the assign plan page
    Then I should see "Departments"
<<<<<<< HEAD
    And I should see "เชือดไก่ 1" and "ถอนขนไก่ 1"  
    When I press "เชือดไก่ 1"
=======
    And I should see "ถอนขนไก่ 1" and "งานไก่ตกราว 1"   
    When I press "ถอนขนไก่ 1"
>>>>>>> BDD
    Then I should be on the Assign Plan Page
    And I should see "Assign"
    When I click on "Shift" and "OT" Mode
    And I can see "From" 
    And I can see "To" 
    Then I can see "Employees" Table
    And I can see checkbox of  "ดำเนิน เหินเวหา"
    And I can see "Start Shift" with "09:00"
    And I select "OT" with "3"
    Then I should see "01:00 - 10:00" in "Shift" field of "ดำเนิน เหินเวหา"
    Then I should see "3" in "OT Plan" field of "ดำเนิน เหินเวหา"

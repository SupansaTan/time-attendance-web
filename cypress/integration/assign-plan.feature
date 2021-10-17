Feature: Department Head Assign Plan
  Department head can see Assign Plan
  Department head can click Assign Plan
  Department head can click Assign Shift
  Department head can see Assign Shift
  Department head can click Assign OT
  Department head can see Assign OT
  Department head can click Assign Shift and Assign OT 
  Department head can see Assign Shift and Assign OT

  Scenario: See all Assign Plan
    Given I visit on the Assign Plan
    When I  click Assign Plan
    And I can see "Assign Shift" and "Assign OT"
    And I press "Assign Shift"
    Then I should be on the Assign Shift
    And I should see "ภูสิทธิ บาดตาสาว", "นฤมล มนูญศักดิ์" and "ไกรยุทธ์ อัศวรัช"
    And I press "Assign OT"
    Then I should be on the Assign OT
    And I should see "ภูสิทธิ บาดตาสาว", "นฤมล มนูญศักดิ์" and "ไกรยุทธ์ อัศวรัช"

  
  Scenario : Department Head can select assign shift mode
    Given I visit on the Assign Plan
    When I click on "Shift" Mode
    And I can see "Assign Shift" Mode
    And I press "Date"
    Then I can select "Start Date" and "End Date"
    And I press "Shift"
    Then I can select "Time" 
    And I press "Submit"
    Then Assign will save my assign shift
    And I press "Some Employee"
    Then it will select some employee
    And I press "All Employee"
    Then it will select all employee
    And I press "Shift All "
    Then it will show all time
    And I press "Shift Select 05.00 "
    Then it will show 05.00 
    And I press "OT Plan All "
    Then it will show all Hours
    And I press "OT Plan Select 2.5 "
    Then it will show 2.5
    And I press "Type All "
    Then it will show all employee type
    And I press "Type Monthly "
    Then it will show employee Monthly type


  Scenario : Department Head can select assign ot mode
    Given I visit on the Assign Plan
    When I click on "OT " Mode
    And I can see "Assign OT" Mode
    And I press "Date"
    Then I can select "Start Date" and "End Date"
    And I press "OT"
    Then I can select "Hours" 
    And I press "Submit"
    Then Assign will save my assign ot
    And I press "Some Employee"
    Then it will select some employee
    And I press "All Employee"
    Then it will select all employee
    And I press "Shift All "
    Then it will show all time
    And I press "Shift Select 05.00 "
    Then it will show 05.00 
    And I press "OT Plan All "
    Then it will show all Hours
    And I press "OT Plan Select 2.5 "
    Then it will show 2.5
    And I press "Type All "
    Then it will show all employee type
    And I press "Type Monthly "
    Then it will show employee Monthly type


  Scenario : Department Head can select assign shift and ot mode
    Given I visit on the Assign Plan
    When I click on "Shift" and "OT " Mode
    And I can see "Assign Shift"and"Assign OT" Mode
    And I press "Date"
    Then I can select "Start Date" and "End Date"
    And I press "Shift"
    Then I can select "Time"
    And I press "OT"
    Then I can select "Hours" 
    And I press "Submit"
    Then Assign will save my assign shift and ot 
    And I press "Some Employee"
    Then it will select some employee
    And I press "All Employee"
    Then it will select all employee
    And I press "Shift All "
    Then it will show all time
    And I press "Shift Select 05.00 "
    Then it will show 05.00 
    And I press "OT Plan All "
    Then it will show all Hours
    And I press "OT Plan Select 2.5 "
    Then it will show 2.5
    And I press "Type All "
    Then it will show all employee type
    And I press "Type Monthly "
    Then it will show employee Monthly type 



  
  

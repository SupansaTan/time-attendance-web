/// <reference types="cypress" />
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { first } from 'cypress/types/lodash';

/* Department Head select assign ot mode */

Given('I visit on the login page', () => {
    cy.visit('/auth/login');
  })
  
  When('I fill in "email" with "5@gmail.com"', () => {
    cy.get("[type='email']").type('5@gmail.com')
  })
  
  And('I fill in "password" with "0005"', () => {
    cy.get('[type="password"]').type('0005')
  }) 
  
  And('I press "Login"', () => {
    cy.get('form').submit() 
  })
  
  Then('I should be on the dashboard page', () => {
    cy.visit('/dashboard')
  })
  
  When('I click Assign Plan', () => {
    cy.get('.navbar-wrapper').contains('Assign Plan').click() /*get เอามาจาก class tag*/
  })
  
  Then('I should be on the assign plan page', () => {
    cy.visit('/assign-plan')
  })
  

Then('I should see "Departments"', () => {
    cy.get('.contain-wrapper').contains('Departments')
})

And('I should see "ถอนขนไก่ 1" and "งานไก่ตกราว 1"', () => {
    cy.get('.contain-wrapper').contains("ถอนขนไก่ 1")
    cy.contains("งานไก่ตกราว 1")
})

When('I press "ถอนขนไก่ 1"', () => {
    cy.get('.contain-wrapper').contains("ถอนขนไก่ 1").click()
})

Then('I should be on the Assign Plan Page', () => {
    cy.visit('/assign-plan/3')
})

And('I should see "Assign"', () => {
    cy.get('.assign-wrapper').contains("Assign")
})

When('I click on "OT" Mode', () => {
    cy.get('.assign-wrapper').contains("OT").click()
})

And('I can see "From"', () => {
  cy.get('.from-wrapper').contains('From');
})

And('I can see "To"', () => {
  cy.get('.from-wrapper').contains('To');
})

Then('I can see "Employees" Table', () => {
    cy.get('.heading-wrapper').contains("Employee")
})

And('I can see checkbox of  "ดำเนิน เหินเวหา"', () => {
  cy.get('.table-responsive').contains("ดำเนิน เหินเวหา")
})


And('I select "OT" with "3"', () => {
  cy.get('.assign-wrapper').contains("OT")
  cy.get("[type='number']").type("3")
})



Then('I should see "3" in "OT Plan" field of "ดำเนิน เหินเวหา"', () => {
    cy.get('.table-responsive').contains("OT Plan")
})

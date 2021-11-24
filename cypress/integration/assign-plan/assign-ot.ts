/// <reference types="cypress" />
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

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

And('I select "From" with "12/09/2564"', () => {
    cy.get('.assign-wrapper').contains("From","12/09/2564").select("12/09/2564")
})

And('I select "To" with "12/09/2564"', () => {
    cy.get('.assign-wrapper').contains("To","12/09/2564").select("12/09/2564")
})

Then('I can see "Employees" Table', () => {
    cy.get('.table-responsive').contains("Employee")
})

And('I click checkbox of "ดำเนิน เหินเวหา"', () => {
    cy.get('.table-responsive').contains("ดำเนิน เหินเวหา").click()
})

And('I select "OT" with "2.5"', () => {
    cy.get('.assign-wrapper').contains("OT","2.5").select("2.5")
})

And('I press "Submit"', () => {
    cy.get('.assign-wrapper').submit() 
})

Then('I should see "2.5" in "OT Plan" field of "ดำเนิน เหินเวหา"', () => {
    cy.get('.table-responsive').contains("OT Plan")
})

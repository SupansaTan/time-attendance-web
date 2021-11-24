/// <reference types="cypress" />
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

/* Department Head select assign shift mode */

Given('I visit on the login page', () => {
    cy.visit('/auth/login');
  })
  
  When('I fill in "email" with "7@gmail.com"', () => {
    cy.get("[type='email']").type('7@gmail.com')
  })
  
  And('I fill in "password" with "0007"', () => {
    cy.get('[type="password"]').type('0007')
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

And('I should see "เชือดไก่ 1" and "ถอนขนไก่ 1"', () => {
    cy.get('.contain-wrapper').contains("เชือดไก่ 1")
    cy.contains("ถอนขนไก่ 1")
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

When('I click on "Shift" Mode', () => {
    cy.get('.assign-wrapper').contains("Shift").click()
})

And('I select "From" with "11/25/2021"', () => {
    cy.get('input[id="start"]').type('11/25/2021');
    

})

And('I select "To" with "11/25/2021"', () => {
    cy.get('input[id="last"]').type('11/25/2021');
})

Then('I can see "Employees" Table', () => {
    cy.get('.table-responsive').contains("Employee")
})

And('I click checkbox of "ดำเนิน เหินเวหา"', () => {
    cy.get('.table-responsive').contains("ดำเนิน เหินเวหา").click()
})

And('I select "Shift" with "09:00"', () => {
    cy.get('.assign-wrapper').contains("Shift","09:00").select("09:00")
})

And('I press "Submit"', () => {
    cy.get('.assign-wrapper').submit() 
})

Then('I should see "09:00 - 17:00" in "Shift" field of "ดำเนิน เหินเวหา"', () => {
    cy.get('.table-responsive').contains("Shift")
})

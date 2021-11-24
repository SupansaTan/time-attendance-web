/// <reference types="cypress" />
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

/* Department Head select assign shift mode */
Given('I visit on the Assign Plan Page', () => {
    cy.visit('/assign-plan')
})

Then('I should see "Departments"', () => {
    cy.get('.contain-wrapper').contains('Departments')
})

And('I should see "ถอนขนไก่ 1" and "งานไก่ตกราว 1"', () => {
    cy.get('.contain-wrapper').contains("ถอนขนไก่ 1", "งานไก่ตกราว 1")
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

And('I select "From" with "12/09/2564"', () => {
    cy.get('.assign-wrapper').contains("From","12/09/2564").select()
})

And('I select "To" with "12/09/2564"', () => {
    cy.get('.assign-wrapper').contains("To","12/09/2564").select()
})

Then('I can see "Employees" Table', () => {
    cy.get('.table-responsive').contains("Employee")
})

And('I click checkbox of "ดำเนิน เหินเวหา"', () => {
    cy.get('.table-responsive').contains("ดำเนิน เหินเวหา").click()
})

And('I select "Shift" with "09:00"', () => {
    cy.get('.assign-wrapper').contains("Shift","09:00").select()
})

And('I press "Submit"', () => {
    cy.get('.assign-wrapper').submit() 
})

Then('I should see "09:00 - 17:00" in "Shift" field of "ดำเนิน เหินเวหา"', () => {
    cy.get('.table-responsive').contains("Shift")
})

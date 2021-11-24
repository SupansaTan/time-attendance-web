/// <reference types="cypress" />
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

/* See all departments */

Given('I visit on the dashboard page', () => {
  cy.visit('/dashboard')
})

When('I click Assign Plan', () => {
  cy.get('.title').contains('Assign Plan').click() /*get เอามาจาก class tag*/
})

Then('I should be on the assign plan page', () => {
  cy.visit('/assign-plan')
})

Then('Then I should see "Departments"', () => {
  cy.get('.contain-wrapper').contains('Departments')
})

And('I should see "ถอนขนไก่ 1" and "งานไก่ตกราว 1"', () => {
  cy.get('.contain-wrapper').contains("ถอนขนไก่ 1", "งานไก่ตกราว 1")
})

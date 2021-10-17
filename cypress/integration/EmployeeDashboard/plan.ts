/// <reference types="cypress" />
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

/* Scenario: See Shift and OT plan */
Given('I visit on the login page', () => {
  cy.visit('/login');
})

When('I fill in "email" with "employee@email.com"', () => {
  cy.get('[type="email"]').type('employee@email.com')
})

And('I fill in "password" with "1234"', () => {
  cy.get('[type="password"]').type('1234')
})

And('I press "Login"', () => {
  cy.find('button[type=submit]').submit()
})

Then('I should be on the dashboard page', () => {
  cy.visit('/dashboard')
})

And('I should see "Shift", "OT" and "Break Time"', () => {
  cy.get('.plan-wrapper').contains('Shift')
  cy.get('.plan-wrapper').contains('OT')
  cy.get('.plan-wrapper').contains('Break Time')
})

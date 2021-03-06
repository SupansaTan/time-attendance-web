/// <reference types="cypress" />
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

/* Scenario: See Shift and OT actual */
Given('I visit on the login page', () => {
  cy.visit('/auth/login');
})

When('I fill in "email" with "1@gmail.com"', () => {
  cy.get("[type='email']").type('1@gmail.com')
})

And('I fill in "password" with "0001"', () => {
  cy.get('[type="password"]').type('0001')
}) 

And('I press "Login"', () => {
  cy.get('form').submit() 
})

Then('I should be on the dashboard page', () => {
  cy.visit('/dashboard')
})

And('I should see "Start Time", "End Time" and "OT"', () => {
  cy.get('.d-inline').contains('Start Time')
  cy.contains('End Time')
  cy.contains('OT')
})

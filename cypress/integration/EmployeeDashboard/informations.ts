/// <reference types="cypress" />
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

/* Scenario: See employee informations */
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

And('I should see "Employee Informations"', () => {
  cy.get('.information-wrapper').contains('Employee Informations')
})

And('I should see "Dapartment" with "งานไก่ตกราว"', () => {
  cy.get('.information-wrapper').contains('Dapartment', 'งานไก่ตกราว')
})

And('I should see "Employee Type" with "Monthly"', () => {
  cy.get('.information-wrapper').contains('Employee Type', 'Monthly')
})

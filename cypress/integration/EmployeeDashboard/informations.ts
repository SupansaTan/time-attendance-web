/// <reference types="cypress" />
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

/* Scenario: See employee informations */
Given('I visit on the login page', () => {
  cy.visit('/auth/login');
})

When('I fill in "email" with "1@gmail.com"', () => {
  cy.get('[type="email"]').type('1@gmail.com')
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

And('I should see "Employee Informations"', () => {
  cy.get('.card.information-wrapper').contains('Employee Informations')
})

And('I should see "Department" with "เชือดไก่ 1"', () => {
  cy.get('.card.information-wrapper').contains('Department')
  cy.contains('เชือดไก่ 1')
})

And('I should see "Employee Type" with "daily"', () => {
  cy.get('.card.information-wrapper').contains('Employee Type')
  cy.contains('daily')
})

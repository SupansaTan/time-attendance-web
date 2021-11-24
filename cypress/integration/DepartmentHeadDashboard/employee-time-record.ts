/// <reference types="cypress" />
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

/* Scenario: See employees time record */
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

When('I press "เชือดไก่ 1"', () => {
  cy.get('.card.department').contains('เชือดไก่ 1').click()
})

And('I should see "Department" and "เชือดไก่ 1"', () => {
  cy.get('.department-info-wrapper').contains('Department')
  cy.contains('เชือดไก่ 1')
})

And('I should see "Time Record"', () => {
  cy.get('.heading').contains('Time Record')
})

/// <reference types="cypress" />
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

/* Scenario: See all departments */

Given('I visit on the login page', () => {
  cy.visit('/login');
})

When('I fill in "email" with "test@email.com"', () => {
  cy.get('[type="email"]').type('test@email.com')
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

And('I should see "งานเชือดไก่", "งานถอนขนไก่" and "งานไก่ตกราว"', () => {
  cy.get('.departments-wrapper').contains('งานเชือดไก่');
})

